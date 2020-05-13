import * as React from "react"
import {
  ActivityIndicator,
  FlatList,
  View,
  ViewStyle,
} from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { CurrencyCard, Screen } from "../../components"
import { color } from "../../theme"
import { useStores } from "../../models/root-store"
import { useCallback, useEffect, useState } from "react"
import { autorun } from "mobx"
import { generateRainbowColors } from "../../utils/color"
import { useStickyItem } from "../../hooks/useStickyItem"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent
}
const TOP_STICKY_ITEM: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  marginTop: 0,
  zIndex: 2
}
const BOTTOM_STICKY_ITEM: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  marginBottom: 0
}
const LOADER_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}

export interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = () => {
  const store = useStores()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [colors, setColors] = useState(generateRainbowColors(0, 0.5, 1))

  const [
    showBottom,
    showTop,
    handleLayout,
    handleListLayout,
    handleScroll
  ] = useStickyItem(19)

  const renderListItem = useCallback(({ item, index }) => <CurrencyCard
    onLayout={index === 0 ? handleLayout : null}
    key={item[0].toString()}
    color={item}
    text={store.exchange.rates[index] ? store.exchange.rates[index].text : null}
  />, [store.exchange.rates, handleLayout])

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const resp = await store.exchange.loadRate("BTC", "ETH")
        if (resp.kind !== "ok") {
          setError(resp.message ? resp.message : `Неизвестная ошибка при загрузке данных "${resp.kind}"`)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    return autorun(() => {
      if (store.exchange.rates.length !== colors.length) {
        setColors(generateRainbowColors(store.exchange.rates.length, 0.5, 1))
      }
    })
  }, [])

  if (isLoading) {
    return <View style={FULL}>
      <View style={LOADER_CONTAINER}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  }

  return (
    <View style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        {error ? <CurrencyCard color={[0, 0.5, 0.5]} text={error} /> : null}
        {!error && showTop && colors.length >= 20 ? <CurrencyCard
          color={colors[19]}
          text={store.exchange.rates[19] ? store.exchange.rates[19].text : null}
          style={TOP_STICKY_ITEM}
        /> : null}
        {!error ? <FlatList
          onLayout={handleListLayout}
          onScroll={handleScroll}
          data={colors}
          renderItem={renderListItem}
          keyExtractor={item => item[0].toString()}
        /> : null}
        {!error && showBottom && colors.length >= 20 ? <CurrencyCard
          color={colors[19]}
          text={store.exchange.rates[19] ? store.exchange.rates[19].text : null}
          style={BOTTOM_STICKY_ITEM}
        /> : null}
      </Screen>
    </View>
  )
}

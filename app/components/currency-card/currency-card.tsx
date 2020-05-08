import * as React from "react"
import { Platform, TextStyle, View, ViewProps } from "react-native"
import { Text } from "../"
import { currencyCardStyles as styles } from "./currency-card.styles"
import { getComplementary, hslToRgb } from "../../utils/color"

export interface CurrencyCardProps extends ViewProps {
  color: [number, number, number],
  text: string
}

const TEXT_STYLE: TextStyle = {
  marginLeft: 10
}

export const CurrencyCard: React.FunctionComponent<CurrencyCardProps> = props => {
  const { color, text, style, ...rest } = props
  const rgb = hslToRgb(...color)
  const textColor = hslToRgb(getComplementary(color[0]), color[1], color[2])
  return <View style={[styles.CONTAINER, style]} {...rest}>
    <View style={[styles.WRAPPER, { backgroundColor: rgb }]}>
      <Text preset="default" text={Platform.OS} style={{ color: textColor }}/>
      <Text preset="default" text={text} style={[TEXT_STYLE, { color: textColor }]}/>
    </View>
  </View>
}

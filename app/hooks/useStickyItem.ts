import { useCallback, useMemo, useState } from "react"
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { ITEM_MARGIN } from "../components/currency-card/currency-card.styles"

type TUseStickyItem = (index: number) => [
  boolean,
  boolean,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
  (event: NativeSyntheticEvent<NativeScrollEvent>) => void
]

export const useStickyItem: TUseStickyItem = (index) => {
  const [itemHeight, setItemHeight] = useState(10000)
  const [listHeight, setListHeight] = useState(10000)
  const [showBottom, setShowBottom] = useState(true)
  const [showTop, setShowTop] = useState(false)

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setItemHeight(event.nativeEvent.layout.height + ITEM_MARGIN * 2)
  }, [])

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const itemsRendered = listHeight / itemHeight
    if (event.nativeEvent.contentOffset.y >= itemHeight * (index + 1 - itemsRendered) - ITEM_MARGIN) {
      if (event.nativeEvent.contentOffset.y >= itemHeight * index) {
        setShowTop(true)
      } else if (showTop) {
        setShowTop(false)
      }
      setShowBottom(false)
    } else if (!showBottom) {
      setShowBottom(true)
    }
  }, [showBottom, itemHeight, showTop, listHeight])

  const handleListLayout = useCallback((event: LayoutChangeEvent) => {
    setListHeight(event.nativeEvent.layout.height)
  }, [])

  return useMemo(() => ([
    showBottom,
    showTop,
    handleLayout,
    handleListLayout,
    handleScroll
  ]), [
    showBottom,
    showTop,
    handleLayout,
    handleListLayout,
    handleScroll
  ])
}

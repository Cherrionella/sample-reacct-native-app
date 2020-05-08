import { ViewStyle } from "react-native"

export const ITEM_MARGIN = 10

export const currencyCardStyles = {
  CONTAINER: {
    paddingHorizontal: 10,
    marginVertical: ITEM_MARGIN,
  } as ViewStyle,
  WRAPPER: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  } as ViewStyle
}

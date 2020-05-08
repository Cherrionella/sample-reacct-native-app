import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export interface Rate {
  currencySrc: string,
  currencyDst: string,
  rate: number
}

export type GetExchangeRateResult = { kind: "ok", data: Rate } | GeneralApiProblem

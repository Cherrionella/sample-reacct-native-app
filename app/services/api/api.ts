import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getExchangeRate (src: string, dst: string): Promise<Types.GetExchangeRateResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/calc/fx`, {
      ccy1: src,
      ccy2: dst
    })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertRate = raw => {
      return {
        currencySrc: src,
        currencyDst: dst,
        rate: raw[0]
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawRates = response.data
      const resultRate: Types.Rate = convertRate(rawRates)
      return { kind: "ok", data: resultRate }
    } catch {
      return { kind: "bad-data" }
    }
  }
}

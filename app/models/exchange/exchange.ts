import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { RateModel } from "../rate"
import { withEnvironment } from "../extensions"
import { times } from "ramda"

/**
 * Model description here for TypeScript hints.
 */
export const ExchangeModel = types
  .model("Exchange")
  .props({
    rates: types.optional(types.array(RateModel), [])
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions(self => ({
    loadRate: flow(function * loadRate(src: string, dst: string) {
      const result = yield self.environment.api.getExchangeRate(src, dst)
      if (result.kind === "ok") {
        self.rates.replace(times(() => RateModel.create(result.data), 50))
      }

      return result
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ExchangeType = Instance<typeof ExchangeModel>
export interface Exchange extends ExchangeType {}
type ExchangeSnapshotType = SnapshotOut<typeof ExchangeModel>
export interface ExchangeSnapshot extends ExchangeSnapshotType {}

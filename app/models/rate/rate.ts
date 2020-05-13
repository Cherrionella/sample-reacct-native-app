import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const RateModel = types
  .model("Rate")
  .props({
    currencySrc: types.string,
    currencyDst: types.string,
    rate: types.number
  })
  .views(self => ({
    get text () {
      return `${self.currencySrc}/${self.currencyDst}: ${self.rate.toFixed(10)}`
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type RateType = Instance<typeof RateModel>
export interface Rate extends RateType {}
type RateSnapshotType = SnapshotOut<typeof RateModel>
export interface RateSnapshot extends RateSnapshotType {}

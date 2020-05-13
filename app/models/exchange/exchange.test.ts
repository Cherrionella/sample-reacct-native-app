import { ExchangeModel, Exchange } from "./exchange"

test("can be created", () => {
  const instance: Exchange = ExchangeModel.create({})

  expect(instance).toBeTruthy()
})

import { RateModel, Rate } from "./rate"

test("can be created", () => {
  const instance: Rate = RateModel.create({
    currencySrc: 'BTC',
    currencyDst: 'ETH',
    rate: 1
  })

  expect(instance).toBeTruthy()
})

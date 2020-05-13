import { RateModel, Rate } from "./rate"

test("can be created", () => {
  const instance: Rate = RateModel.create({
    currencySrc: 'BTC',
    currencyDst: 'ETH',
    rate: 1
  })

  expect(instance).toBeTruthy()
})

test("correct text", () => {
  const instance: Rate = RateModel.create({
    currencySrc: 'BTC',
    currencyDst: 'ETH',
    rate: 1
  })

  expect(instance.text).toBe("BTC/ETH: 1.0000000000")
})

test("correct text for failed retrieve rate", () => {
  const instance: Rate = RateModel.create({
    currencySrc: 'BTC',
    currencyDst: 'ETH',
    rate: -1
  })

  expect(instance.text).toBe("Не удалось загрузить данные")
})

import { RateModel, Rate } from "./rate"

test("can be created", () => {
  const instance: Rate = RateModel.create({})

  expect(instance).toBeTruthy()
})
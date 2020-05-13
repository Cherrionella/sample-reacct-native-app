import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { CurrencyCard } from "./currency-card"

declare let module

storiesOf("CurrencyCard", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CurrencyCard color={[0.5, 0.5, 0.5]} text="test" />
      </UseCase>
    </Story>
  ))

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { App } from "../app/App"
import { Provider } from "react-redux"
import { store } from "../app/store"
import { StoryFn } from "@storybook/react"
import { ReduxStoreProviderDecorator } from "../app/ReduxStoreProviderDecorator"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof App> = {
  title: "TODOLISTS/App",
  component: App,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  /*argTypes: {
    addItem: {
      description: 'Clicked button inside form',
      action: 'clicked'
    },
  },*/
  decorators: [ReduxStoreProviderDecorator],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} // satisfies Meta<typeof Button>;

export default meta
type Story = StoryObj<typeof App>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AppStory: StoryFn = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export const AppWithDecoratorStory: Story = {}

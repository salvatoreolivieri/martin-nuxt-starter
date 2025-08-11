import type { Meta, StoryObj } from "@storybook/vue3"

import AreaChart from "./AreaChart.vue"

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: "Design System/Chart/Area",
  component: AreaChart,
} as Meta<typeof AreaChart>

export default meta
type Story = StoryObj<typeof meta>

export const Area: Story = {
  args: {},
}

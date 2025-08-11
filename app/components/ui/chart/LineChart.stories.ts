import type { Meta, StoryObj } from "@storybook/vue3"

import LineChart from "./LineChart.vue"

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: "Design System/Chart/Line",
  component: LineChart,
} as Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {
  args: {},
}

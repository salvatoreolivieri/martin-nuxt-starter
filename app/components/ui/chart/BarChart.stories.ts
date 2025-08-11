import type { Meta, StoryObj } from "@storybook/vue3"

import BarChart from "./BarChart.vue"

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: "Design System/Chart/Bar",
  component: BarChart,
} as Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

export const Bar: Story = {
  args: {},
}

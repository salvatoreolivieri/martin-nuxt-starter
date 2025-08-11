import type { Meta, StoryObj } from "@storybook/vue3"

import DonutChart from "./DonutChart.vue"

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: "Design System/Chart/Donut",
  component: DonutChart,
} as Meta<typeof DonutChart>

export default meta
type Story = StoryObj<typeof meta>

export const Donut: Story = {
  args: {},
}

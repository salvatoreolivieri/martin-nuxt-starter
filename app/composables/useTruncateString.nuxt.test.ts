// test/composables/useTruncateString.test.ts
import { describe, expect, it } from "vitest"

import { useTruncateString } from "./useTruncateString"

describe("useTruncateString", () => {
  it("returns original string if length is less than or equal to limit", () => {
    const result = useTruncateString("hello", 5)
    expect(result).toBe("hello")
  })

  it("truncates and adds ellipsis if string is longer than limit", () => {
    const result = useTruncateString("hello world", 5)
    expect(result).toBe("hello...")
  })

  it("handles empty string", () => {
    const result = useTruncateString("", 5)
    expect(result).toBe("")
  })

  it("handles limit of 0", () => {
    const result = useTruncateString("hello", 0)
    expect(result).toBe("...")
  })

  it("works with unicode characters", () => {
    const result = useTruncateString("こんにちは世界", 3)
    expect(result).toBe("こんに...")
  })
})

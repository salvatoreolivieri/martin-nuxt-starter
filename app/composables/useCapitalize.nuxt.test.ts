import { describe, expect, it } from "vitest"

import { useCapitalize } from "./useCapitalize"

describe("useCapitalize", () => {
  it("capitalizes a lowercase word", () => {
    expect(useCapitalize("hello")).toBe("Hello")
  })

  it("does not return the original string if it was lowercase", () => {
    expect(useCapitalize("hello")).not.toBe("hello")
  })

  it("returns the same string if already capitalized", () => {
    expect(useCapitalize("Hello")).toBe("Hello")
  })

  it("capitalizes only the first letter", () => {
    expect(useCapitalize("hELLO")).toBe("HELLO")
  })

  it("returns empty string if input is empty", () => {
    expect(useCapitalize("")).toBe("")
  })

  it("handles single character", () => {
    expect(useCapitalize("a")).toBe("A")
  })

  it("handles non-letter characters", () => {
    expect(useCapitalize("!hey")).toBe("!hey") // or however your function behaves
  })

  it("handles null or undefined input gracefully", () => {
    // Only include if your function is expected to handle these
    expect(useCapitalize(null as unknown as string)).toBe("")
    expect(useCapitalize(undefined as unknown as string)).toBe("")
  })
})

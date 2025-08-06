import { beforeEach, describe, expect, it, vi } from "vitest"

import { useFetchDebugger } from "./useFetchDebugger"

// Arrange
const MOCK_URL = "https://jsonplaceholder.typicode.com/users"

// Reset before each test
beforeEach(() => {
  vi.restoreAllMocks()
})

describe("useFetchDebugger", () => {
  it("given a successful fetch setup, when execute is called, then it should fetch data correctly after a delay", async () => {
    // Act
    const {
      data,
      error,
      isLoading,
      execute,
    }
      = await useFetchDebugger<Array<any>>(MOCK_URL, {
        delayMs: 10,
      })

    // Initial assertions
    expect(data.value).toBe(null)
    expect(error.value).toBe(null)
    expect(isLoading.value).toBe(true)

    // Act - fetch
    await execute()

    // Assert
    expect(data.value?.length).toBeGreaterThanOrEqual(1)
    expect(error.value).toBeNull()
    expect(isLoading.value).toBe(false)
  })

  it("given triggerError setup as true, when execute is called, then it should simulate an error", async () => {
    // Act
    const {
      data,
      error,
      isLoading,
      execute,
    }
      = await useFetchDebugger(MOCK_URL, {
        triggerError: true,
      })

    await execute()

    // Assert
    expect(error.value).toBeInstanceOf(Error)
    expect(error.value?.message).toBe("Simulated error")
    expect(data.value).toBeNull()
    expect(isLoading.value).toBe(false)
  })
})

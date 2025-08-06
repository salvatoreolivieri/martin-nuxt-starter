/**
 * Custom composable to simulate and debug fetch requests with delay and optional error simulation.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {object} params - Configuration parameters.
 * @param {object} [params.options] - Additional options to pass to `useFetch`.
 * @param {number} [params.delayMs] - Delay in milliseconds before the fetch is executed.
 * @param {boolean} [params.triggerError] - Whether to simulate an error instead of performing the fetch.
 *
 * @returns {{
 *   data: Ref<any>,
 *   error: Ref<Error | null>,
 *   isLoading: Ref<boolean>,
 *   execute: () => Promise<void>
 * }} - Returns reactive refs for data, error, and loading state, along with the execute function to manually trigger the fetch.
 */
export async function useFetchDebugger<T>(
  url: string,
  {
    options,
    delayMs = 0,
    triggerError = false,
  }: {
    options?: object
    delayMs?: number
    triggerError?: boolean
  },
) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref<boolean>(false)

  /**
   * Utility function to introduce an artificial delay.
   *
   * @param {number} ms - Milliseconds to delay.
   * @returns {Promise<void>} - A promise that resolves after the delay.
   */
  const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms))

  /**
   * Executes the fetch request with delay and error simulation logic.
   *
   * @returns {Promise<void>}
   */
  const execute = async () => {
    if (triggerError) {
      // Simulate an error
      error.value = new Error("Simulated error")
      data.value = null
      return
    }

    isLoading.value = true
    await delay(delayMs)

    const {
      data: fetchData,
      error: fetchError,
    } = await useFetch<T>(
      url,
      {
        server: false,
        lazy: true,
        ...options,
      },
    )

    data.value = fetchData.value
    error.value = fetchError.value ?? null
    isLoading.value = !fetchError.value && !fetchData.value
  }

  execute()

  return {
    data,
    error,
    isLoading,
    execute,
  }
}

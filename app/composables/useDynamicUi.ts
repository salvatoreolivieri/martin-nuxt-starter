import type { ComponentPropsMap, ComponentsKey } from "~/generated/componentsMapping"

import { componentsMapping } from "~/generated/componentsMapping"

/**
 * The component entry format which encapsulates the component name, its props and unique key ID.
 */
type ComponentEntry = {
  component: Component
  props: ComponentPropsMap[keyof ComponentPropsMap] | undefined
  id: string
}

/**
 * Defines the structure of the content to be rendered on a page.
 */
export type PageContent = Array<ComponentEntry>

function generateUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    },
  )
}

/**
 * Composable that provides methods for dynamically creating UI components.
 */
export function useDynamicUi() {
  /**
   * Generates a new component entry.
   *
   * @template K - A valid component key from `ComponentsKey`.
   * @param {K} key - The key corresponding to the component to generate.
   * @param {ComponentPropsMap[K]} props - The props to pass to the component.
   * @returns {ComponentEntry} A fully formed component entry with unique ID.
   */
  const generateComponent = <K extends ComponentsKey>(
    key: K,
    {
      props,
      connector,
    }: {
      connector?: () => ComponentPropsMap[K] | undefined
      props?: ComponentPropsMap[K]
    },
  ): ComponentEntry => {
    if (connector && !props) {
      props = connector()
    }

    return {
      component: componentsMapping[key],
      props,
      id: generateUuid(), // TODO: check this, it may create Hydration mismatch
    }
  }

  return {
    generateComponent,
  }
}

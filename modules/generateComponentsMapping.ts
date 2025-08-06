import { defineNuxtModule } from "@nuxt/kit"
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs"
import { join, parse } from "pathe"

function pascalToCamel(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export default defineNuxtModule({
  meta: {
    name: "generate-components-mapping",
    configKey: "generateComponentsMapping",
  },

  async setup(_options, nuxt) {
    const componentsDir = join(
      nuxt.options.rootDir,
      "app/components/Marketing",
    )
    const outputDir = join(nuxt.options.rootDir, "app/generated")
    const outputFile = join(outputDir, "componentsMapping.ts")

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir)
    }

    const files = readdirSync(componentsDir).filter(file =>
      file.endsWith(".vue"),
    )

    const componentData = files.map((file) => {
      const name = parse(file).name // e.g., HeroSection or BentoGrid
      const key = pascalToCamel(name.replace(/Section$/, "")) // heroSection → hero, BentoGrid → bentoGrid
      const vuePath = `~/components/Marketing/${name}.vue`
      const propsPath = join(componentsDir, `${name}.props.ts`)
      const propsImportPath = `~/components/Marketing/${name}.props`

      return {
        key,
        name,
        vuePath,
        hasProps: existsSync(propsPath),
        propsImportPath,
      }
    })

    const keys = componentData.map(c => `'${c.key}'`).join(" | ")

    const vueImports = componentData
      .map(c => `import ${c.name} from '${c.vuePath}'`)
      .join("\n")

    const propsImports = componentData
      .filter(c => c.hasProps)
      .map(
        c =>
          `import type { ${c.name}Props } from '${c.propsImportPath}'`,
      )
      .join("\n")

    const propsEntries = componentData
      .map(
        c =>
          `  ${c.key}: ${
            c.hasProps ? `${c.name}Props` : "undefined"
          };`,
      )
      .join("\n")

    const mappingEntries = componentData
      .map(c => `  ${c.key}: ${c.name},`)
      .join("\n")

    const contents = `
      // ⚠️ This file is auto-generated. Do not edit manually.

      import type { Component } from 'vue'
      ${vueImports}
      ${propsImports}

      /**
       * Represents the keys used for mapping components.
       */
      export type ComponentsKey = ${keys};

      /**
       * Defines the props mapping for each component.
       */
      export type ComponentPropsMap = {
      ${propsEntries}
      }

      /**
       * Maps each component key to its respective Vue component.
       */
      export const componentsMapping: Record<ComponentsKey, Component> = {
      ${mappingEntries}
      }
    `

    writeFileSync(outputFile, contents.trimStart())
    console.log(`✅ componentsMapping.ts generated in /generated`)
  },
})

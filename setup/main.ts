import { defineAppSetup } from '@slidev/types'
import { createI18n } from 'vue-i18n'

export interface SlidevI18nLocaleConfig {
  name?: string
  key?: string
  icon?: string
}

interface SlidevI18nConfig {
  locale?: string
  fallbackLocale?: string
  locales?: Record<string, SlidevI18nLocaleConfig>
}

const locales = import.meta.glob('/locales/*.json', { import: 'default', eager: true, as: 'json'})
const config = import.meta.glob('/i18n.json', { import: 'default', eager: true, as: 'json'})

const availableLocales: string[] = []
const messages: any = {}

export const configData = config['/i18n.json'] as SlidevI18nConfig

const locale = configData?.locale || availableLocales[0] || 'en'
const fallbackLocale = configData?.fallbackLocale || availableLocales[0] || 'en'

for (const locale in locales) {
  const lang = locale.split('/').pop()?.split('.').shift()
  if (!lang) continue
  availableLocales.push(lang)
  messages[lang] = locales[locale]
}

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale,
  availableLocales,
  messages
})

export default defineAppSetup(({app}) => {
  app.use(i18n)
})
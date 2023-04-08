<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import MenuButton from '@slidev/client/internals/MenuButton.vue'
import { configData, SlidevI18nLocaleConfig } from './setup/main'

const { locale, availableLocales, t } = useI18n()

const localesConfig = reactive<Record<string, SlidevI18nLocaleConfig>>({
  en: {
    name: 'English',
    icon: 'openmoji:flag-united-kingdom',
  },
  fr: {
    name: 'Français',
    icon: 'openmoji:flag-france',
  },
  de: {
    name: 'Deutsch',
    icon: 'openmoji:flag-germany',
  },
})

function getName(locale: string) {
  const config = localesConfig[locale]
  return config.key ? t(config.key) : config.name
}

function setLocale(newLocale: string) {
  locale.value = newLocale
}

onMounted(() => {
  if (!configData?.locales) return
  for (const locale in configData.locales) {
    if (locale in localesConfig)
      localesConfig[locale] = { ...localesConfig[locale], ...configData.locales[locale] }
    else localesConfig[locale] = configData.locales[locale]
  }
})
</script>

<template>
  <div class="w-1px opacity-10 bg-current m-1 lg:m-2"></div>
  <MenuButton>
    <template #button>
      <button class="slidev-icon-btn-i18n flex justify-center items-center h-full !text-sm !px-0 p-1">
        <Icon class="ml-0.5" :icon="localesConfig[locale].icon || ''" />
        <carbon:chevron-up class="opacity-50" />
      </button>
    </template>
    <template #menu>
      <div v-for="availableLocale in availableLocales">
        <button class="slidev-icon-btn-i18n w-full flex items-center text-sm" @click="setLocale(availableLocale)">
          <Icon class="mr-2" :icon="localesConfig[availableLocale].icon || ''" />
          <span>{{ getName(availableLocale) }}</span>
        </button>
      </div>
    </template>
  </MenuButton>
</template>

<style scoped>
.slidev-icon-btn-i18n {
  @apply cursor-pointer select-none !outline-none;
  @apply opacity-75 transition duration-200 ease-in-out align-middle rounded p-1;
  @apply hover:(opacity-100 bg-gray-400 bg-opacity-10);
  @apply md:p-2;
}
</style>
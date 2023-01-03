/* eslint-disable prettier/prettier */
import { mapLanguageToTranslation } from './mapLanguageToTranslation'

export function getLocalLanguage() {
  const storageLocale =
    localStorage.getItem('locale') !== undefined
      ? (localStorage.getItem('locale') as string)
      : process.env.REACT_APP_DEFAULT_LANGUAGE || undefined

  localStorage.setItem('locale', storageLocale as string)
  // console.log('LOCALE LANGUAGE: ', storageLocale)
  localStorage.setItem('lookupsLanguage', setLookupsLanguage(storageLocale))
  // console.log('LOOKUPS LANGUAGE: ', setLookupsLanguage(storageLocale))
  return storageLocale || ''
}

const setLookupsLanguage = (language?: string): string => {
  // console.log("getLookupsLanguage: ", language);
  switch (language) {
    case 'en-US':
      return 'en_US'
    case 'he-IL':
      return 'he_IL'    
    default:
      return ''
  }
}

export const getLookupsLanguage = (): string => {
  const localizationState = localStorage.getItem('localizationState')

  if (localizationState) {
    const { lookupsLanguage = 'he_IL' } = JSON.parse(
      localStorage.getItem('localizationState') as string
    )
    return lookupsLanguage
  }
  
  return 'he_IL'
}

export const setLocaleLanguage = (savingLocale: string) => {
  // console.log("SET Locale Language to: ", savingLocale);
  setRtlEnabled(false)
  localStorage.setItem('locale', savingLocale)
  localStorage.setItem('lookupsLanguage', setLookupsLanguage(savingLocale))

  if (savingLocale === 'he-IL') {
    setRtlEnabled(true)
  }
}

export const getRtlEnabled = (): boolean => {
  const { rtlEnabled = true } = JSON.parse(
    localStorage.getItem('localizationState') as any
  )
  return rtlEnabled
}

export const setRtlEnabled = (isEnabled: boolean) => {
  // console.log("SET RtlEnabled to: ", isEnabled);
  localStorage.setItem('rtlEnabled', JSON.stringify(isEnabled))
}

export const changeLocaleLanguage = (savingLocale: string) => {
  setLocaleLanguage(savingLocale)
  document.location.reload()
}

export const translate = (idToSearch: string | undefined) => {
  // console.log('translate: ', idToSearch)
  if (idToSearch === undefined) {
    return '** Not defined! **'
  }

  const languageTranslationJson = mapLanguageToTranslation.filter(
    (obj) => obj.localLanguage === getLookupsLanguage()
  )[0]

  const lang: any = Object.keys(languageTranslationJson.languageJson)[0] // Get the first object
  // console.log('translate-lang: ', lang)

  return languageTranslationJson.languageJson[lang][idToSearch]
}


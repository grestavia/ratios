import { Locale } from '../i18n.config'
 
const dictionaries = {
  en: () => import('@/app/messages/en.json').then((module) => module.default),
  id: () => import('@/app/messages/id.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: Locale) => dictionaries[locale]()
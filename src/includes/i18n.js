import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import ptBR from '@/locales/pt_BR.json';

const storageLocale = localStorage.getItem('locale') || 'en';

export default createI18n({
  legacy: false,
  locale: storageLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    pt: ptBR
  }
});

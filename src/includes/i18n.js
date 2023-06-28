import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import ptBR from '@/locales/pt_BR.json';
import About from '@/locales/about.json';

const storageLocale = localStorage.getItem('locale') || 'en';

ptBR.about = About.ptBR;
en.about = About.en;

export default createI18n({
  legacy: false,
  locale: storageLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    pt: ptBR
  }
});

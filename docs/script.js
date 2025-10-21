// docs/script.js - минимальная логика: переключение языка и простая навигация
const translations = {
  ru: {
    'nav.features': 'Функции',
    'nav.download': 'Скачать',
    'nav.contact': 'Контакты',
    'cta.download': 'Скачать',
    'cta.features': 'Узнать больше',
    'select.server': 'Сервер',
    'select.teacher': 'Учитель',
    'select.student': 'Ученик',
    'features.title': 'Ключевые возможности',
    'download.title': 'Скачать',
    'download.note': 'Собранные установщики будут доступны в репозитории (Actions → Artifacts).',
    'contact.title': 'Контакты'
  },
  en: {
    'nav.features': 'Features',
    'nav.download': 'Download',
    'nav.contact': 'Contact',
    'cta.download': 'Download',
    'cta.features': 'Learn more',
    'select.server': 'Server',
    'select.teacher': 'Teacher',
    'select.student': 'Student',
    'features.title': 'Key features',
    'download.title': 'Download',
    'download.note': 'Built installers are available in repository (Actions → Artifacts).',
    'contact.title': 'Contact'
  },
  hy: {
    'nav.features': 'Ֆունկցիաներ',
    'nav.download': 'Ներբեռնել',
    'nav.contact': 'Կապ',
    'cta.download': 'Ներբեռնել',
    'cta.features': 'Դիտել ավելին',
    'select.server': 'Սերվեր',
    'select.teacher': 'Ուսուցիչ',
    'select.student': 'Ուսանող',
    'features.title': 'Հիմնական հնարավորություններ',
    'download.title': 'Ներբեռնել',
    'download.note': 'Հավաքված տեղադրիչները հասանելի կլինեն репозиторииում (Actions → Artifacts).',
    'contact.title': 'Կապ'
  }
};

const langSelect = document.getElementById('langSelect');
const applyTranslations = (lang) => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = (translations[lang] && translations[lang][key]) ? translations[lang][key] : el.textContent;
    el.textContent = txt;
  });
};

if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    localStorage.setItem('edu_lang_v1', lang);
    applyTranslations(lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('edu_lang_v1') || 'ru';
  const sel = document.getElementById('langSelect');
  if (sel) sel.value = saved;
  applyTranslations(saved);

  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const nav = document.getElementById('mainNav');
      nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    });
  }
});

// docs/script.js - минимальная логика: переключение языка и простая навигация
const translations = {
  ru: {
    'nav.features': 'Функции',
    'nav.download': 'Скачать',
    'nav.contact': 'Контакты',
    'hero.title': 'EduVerse',
    'hero.subtitle': 'Вселенная знаний в каждой школе — сервер, панель учителя и панель ученика',
    'cta.download': 'Скачать',
    'cta.features': 'Узнать больше',
    'select.server': 'Сервер',
    'select.server.desc': 'Централизованное управление, бэкапы и мониторинг.',
    'select.teacher': 'Учитель',
    'select.teacher.desc': 'Создание тестов, статистика, классное управление.',
    'select.student': 'Ученик',
    'select.student.desc': 'Прохождение тестов, учебные материалы и личная статистика.',
    'features.title': 'Ключевые возможности',
    'features.local_server.title': 'Локальный сервер',
    'features.local_server.desc': 'Разворачивается локально или в облаке, хранение данных в SQLite/Postgres.',
    'features.test_engine.title': 'Тест‑движок',
    'features.test_engine.desc': 'Создание тестов, автооценка MCQ, история попыток и аналитика.',
    'features.personalization.title': 'Персонализация',
    'features.personalization.desc': 'Настройка внешнего вида, логотипа, фонов и локализация интерфейса.',
    'features.offline_mode.title': 'Оффлайн‑режим',
    'features.offline_mode.desc': 'Десктоп‑сервер и клиенты работают в локальной сети без интернета.',
    'download.title': 'Скачать',
    'download.note': 'Собранные установщики будут доступны в репозитории (Actions → Artifacts). Ниже — ссылки на репозиторий и инструкции по сборке.',
    'download.windows.title': 'Windows',
    'download.windows.desc': 'MSI / EXE (unsigned). Подпись можно добавить позже.',
    'download.macos.title': 'macOS',
    'download.macos.desc': 'DMG / PKG (unsigned). Требуется notarize для удаления Gatekeeper предупреждений.',
    'download.artifacts': 'Артефакты',
    'contact.title': 'Контакты',
    'contact.repo_label': 'Репозиторий проекта:',
    'contact.pages_note': 'Если хотите, могу автоматически настроить GitHub Pages или Action для деплоя (нужен push файлов).',
    'footer.copyright': '© EduVerse — All rights reserved',
    'footer.auto_generated': 'Сайт сгенерирован автоматически. Для вопросов: откройте issue в репозитории.'
  },
  en: {
    'nav.features': 'Features',
    'nav.download': 'Download',
    'nav.contact': 'Contact',
    'hero.title': 'EduVerse',
    'hero.subtitle': 'A universe of knowledge in every school — server, teacher panel and student panel',
    'cta.download': 'Download',
    'cta.features': 'Learn more',
    'select.server': 'Server',
    'select.server.desc': 'Centralized management, backups and monitoring.',
    'select.teacher': 'Teacher',
    'select.teacher.desc': 'Create tests, statistics, classroom management.',
    'select.student': 'Student',
    'select.student.desc': 'Take tests, learning materials and personal statistics.',
    'features.title': 'Key features',
    'features.local_server.title': 'Local server',
    'features.local_server.desc': 'Deploy locally or in the cloud, data storage in SQLite/Postgres.',
    'features.test_engine.title': 'Test engine',
    'features.test_engine.desc': 'Create tests, auto-grading MCQ, attempt history and analytics.',
    'features.personalization.title': 'Personalization',
    'features.personalization.desc': 'Customize appearance, logo, backgrounds and interface localization.',
    'features.offline_mode.title': 'Offline mode',
    'features.offline_mode.desc': 'Desktop server and clients work in local network without internet.',
    'download.title': 'Download',
    'download.note': 'Built installers are available in repository (Actions → Artifacts). Below are links to repository and build instructions.',
    'download.windows.title': 'Windows',
    'download.windows.desc': 'MSI / EXE (unsigned). Signature can be added later.',
    'download.macos.title': 'macOS',
    'download.macos.desc': 'DMG / PKG (unsigned). Notarization required to remove Gatekeeper warnings.',
    'download.artifacts': 'Artifacts',
    'contact.title': 'Contact',
    'contact.repo_label': 'Project repository:',
    'contact.pages_note': 'If you want, I can automatically configure GitHub Pages or Action for deployment (push files needed).',
    'footer.copyright': '© EduVerse — All rights reserved',
    'footer.auto_generated': 'Site generated automatically. For questions: open an issue in the repository.'
  },
  hy: {
    'nav.features': 'Ֆունկցիաներ',
    'nav.download': 'Ներբեռնել',
    'nav.contact': 'Կապ',
    'hero.title': 'EduVerse',
    'hero.subtitle': 'Գիտելիքների տիեզերք ամեն դպրոցում — սերվեր, ուսուցչի և ուսանողի վահանակ',
    'cta.download': 'Ներբեռնել',
    'cta.features': 'Դիտել ավելին',
    'select.server': 'Սերվեր',
    'select.server.desc': 'Կենտրոնացված կառավարում, պահուստավորում և մոնիտորինգ։',
    'select.teacher': 'Ուսուցիչ',
    'select.teacher.desc': 'Թեստերի ստեղծում, վիճակագրություն, դասարանի կառավարում։',
    'select.student': 'Ուսանող',
    'select.student.desc': 'Թեստերի անցում, ուսումնական նյութեր և անձնական վիճակագրություն։',
    'features.title': 'Հիմնական հնարավորություններ',
    'features.local_server.title': 'Տեղական սերվեր',
    'features.local_server.desc': 'Տեղադրվում է տեղական կամ ամպային, տվյալների պահպանում SQLite/Postgres-ում։',
    'features.test_engine.title': 'Թեստերի համակարգ',
    'features.test_engine.desc': 'Թեստերի ստեղծում, MCQ ավտոգնահատում, փորձերի պատմություն և վերլուծություն։',
    'features.personalization.title': 'Անհատականացում',
    'features.personalization.desc': 'Արտաքին տեսքի, լոգոյի, ֆոնի և ինտերֆեյսի տեղայնացման կարգավորում։',
    'features.offline_mode.title': 'Օֆլայն ռեժիմ',
    'features.offline_mode.desc': 'Դեսքթոփ սերվերը և կլիենտները աշխատում են տեղական ցանցում առանց ինտերնետի։',
    'download.title': 'Ներբեռնել',
    'download.note': 'Հավաքված տեղադրիչները հասանելի կլինեն репозիторииում (Actions → Artifacts). Ստորև — հղումներ репозիториիին և հավաքման հրահանգներին։',
    'download.windows.title': 'Windows',
    'download.windows.desc': 'MSI / EXE (ստորագրված չէ). Ստորագրությունը կարելի է ավելացնել ավելի ուշ։',
    'download.macos.title': 'macOS',
    'download.macos.desc': 'DMG / PKG (ստորագրված չէ). Անհրաժեշտ է notarize՝ Gatekeeper զգուշացումները հեռացնելու համար։',
    'download.artifacts': 'Արտեֆակտներ',
    'contact.title': 'Կապ',
    'contact.repo_label': 'Նախագծի պահոց:',
    'contact.pages_note': 'Եթե ցանկանում եք, կարող եմ ավտոմատ կարգավորել GitHub Pages կամ Action՝ տեղակայման համար (անհրաժեշտ է ֆայլերի push)։',
    'footer.copyright': '© EduVerse — Բոլոր իրավունքները պաշտպանված են',
    'footer.auto_generated': 'Կայքը ստեղծվել է ավտոմատ։ Հարցերի համար՝ բացեք issue պահոցում։'
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

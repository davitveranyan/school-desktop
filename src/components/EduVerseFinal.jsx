import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Server, Users, BookOpen, Settings, LogOut, Eye, EyeOff, Edit, Upload, Save,
  Globe, Lock, CheckCircle, AlertCircle, Palette, X
} from 'lucide-react';

const colorMap = {
  blue: { bg: '#DBEAFE', fg: '#2563EB', btn: '#2563EB', btnHover: '#1D4ED8' },
  green: { bg: '#D1FAE5', fg: '#16A34A', btn: '#16A34A', btnHover: '#15803D' },
  purple: { bg: '#EDE9FE', fg: '#7C3AED', btn: '#7C3AED', btnHover: '#6D28D9' },
  orange: { bg: '#FFF7ED', fg: '#EA580C', btn: '#EA580C', btnHover: '#C2410C' }
};

const STORAGE_KEYS = {
  customization: 'edu_customization_v1',
  language: 'edu_lang_v1'
};

const EduVerseFinal = () => {
  const [appMode, setAppMode] = useState('select');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const [passwordChange, setPasswordChange] = useState({ current: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(() => localStorage.getItem(STORAGE_KEYS.language) || 'ru');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [screenResolution, setScreenResolution] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    devicePixelRatio: typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenResolution({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveSize = () => {
    if (screenResolution.width < 768) return 'mobile';
    if (screenResolution.width < 1024) return 'tablet';
    if (screenResolution.width < 1920) return 'desktop';
    return 'large';
  };
  const screenSize = getResponsiveSize();

  const [customization, setCustomization] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.customization);
      return saved ? JSON.parse(saved) : {
        backgroundImage: 'default',
        customBgUrl: '',
        iconImage: 'default',
        customIconUrl: ''
      };
    } catch {
      return {
        backgroundImage: 'default',
        customBgUrl: '',
        iconImage: 'default',
        customIconUrl: ''
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.customization, JSON.stringify(customization));
    } catch (e) {
      console.warn('Failed to persist customization', e);
    }
  }, [customization]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, currentLanguage);
  }, [currentLanguage]);

  const users = {
    admin: { login: 'admin', password: 'admin123', role: 'admin', firstLogin: true },
    teacher1: { login: 'teacher1', password: 'teacher123', role: 'teacher', firstLogin: true },
    student1: { login: 'student1', password: 'student123', role: 'student', firstLogin: true }
  };

  useEffect(() => {
    (async () => {
      try {
        if (typeof invoke === 'function') {
          await invoke('init');
        }
      } catch (e) {
        console.info('Tauri init failed (likely running in browser):', e.message || e);
      }
    })();
  }, []);

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3500);
  };

  const translations = {
    ru: {
      'select.title': 'EduVerse',
      'select.tagline': 'Вселенная знаний в каждой школе',
      'select.server': 'Серверная часть',
      'select.teacher': 'Учительская панель',
      'select.student': 'Ученическая панель',
      'select.open': 'Открыть',
      'login.title': 'Вход в систему',
      'login.username': 'Логин',
      'login.password': 'Пароль',
      'login.submit': 'Войти',
      'login.back': 'Назад',
      'login.error': 'Неверный логин или пароль',
      'password.change.title': 'Обязательная смена пароля',
      'password.change.welcome': 'Добро пожаловать в EduVerse!',
      'password.change.message': 'Это ваш первый вход. Для безопасности смените временный пароль.',
      'password.current': 'Текущий пароль',
      'password.new': 'Новый пароль',
      'password.confirm': 'Повторите пароль',
      'password.requirements': 'Требования к паролю:',
      'password.req1': 'Минимум 8 символов',
      'password.req2': 'Минимум 1 заглавная буква',
      'password.req3': 'Минимум 1 цифра',
      'password.submit': 'Сменить пароль',
      'password.show': 'Показать пароли',
      'password.hide': 'Скрыть пароли',
      'password.success': 'Пароль успешно изменен!',
      'password.error.match': 'Пароли не совпадают',
      'password.error.length': 'Пароль должен содержать минимум 8 символов',
      'password.error.upper': 'Пароль должен содержать заглавную букву',
      'password.error.digit': 'Пароль должен содержать цифру',
      'nav.dashboard': 'Главная',
      'nav.users': 'Пользователи',
      'nav.content': 'Контент',
      'nav.personalization': 'Персонализация',
      'nav.settings': 'Настройки',
      'nav.logout': 'Выход',
      'custom.title': 'Настройка внешнего вида',
      'custom.background': 'Фоновое изображение',
      'custom.currentBg': 'Текущий фон',
      'custom.uploadBg': 'Загрузить свой фон',
      'custom.bgSize': 'Рекомендуемый размер: 1920x1080px',
      'custom.icon': 'Иконка приложения',
      'custom.currentIcon': 'Текущая иконка',
      'custom.uploadIcon': 'Загрузить свою иконку',
      'custom.apply': 'Применить изменения',
      'custom.success': 'Настройки сохранены!',
      'custom.warning': 'Изменения вступят в силу после перезапуска клиентов',
      'common.save': 'Сохранить',
      'common.cancel': 'Отмена',
      'common.close': 'Закрыть',
      'common.delete': 'Удалить',
      'common.edit': 'Редактировать',
      'common.add': 'Добавить',
      'common.search': 'Поиск',
      'system.version': 'Версия',
      'system.status': 'Статус сервера',
      'system.online': 'Онлайн',
      'system.offline': 'Оффлайн',
      'system.ip': 'IP-адрес',
      'system.database': 'База данных',
      'system.connected': 'Подключена',
      'system.connections': 'Активных подключений',
      'system.resolution': 'Разрешение экрана',
      'system.displayMode': 'Режим отображения',
      'system.scale': 'Масштаб (DPR)'
    },
    en: {
      'select.title': 'EduVerse',
      'select.tagline': 'Universe of Knowledge in Every School',
      'select.server': 'Server Panel',
      'select.teacher': 'Teacher Panel',
      'select.student': 'Student Panel',
      'select.open': 'Open',
      'login.title': 'System Login',
      'login.username': 'Username',
      'login.password': 'Password',
      'login.submit': 'Login',
      'login.back': 'Back',
      'login.error': 'Invalid username or password',
      'password.change.title': 'Mandatory Password Change',
      'password.change.welcome': 'Welcome to EduVerse!',
      'password.change.message': 'This is your first login. Please change your temporary password.',
      'password.submit': 'Change Password',
      'custom.title': 'Appearance Settings',
      'custom.apply': 'Apply Changes'
    },
    hy: {
      'select.title': 'EduVerse',
      'select.tagline': 'Գիտելիքների տիեզերք բոլոր դպրոցներում',
      'select.server': 'Սերվերի պանել',
      'select.teacher': 'Ուսուցիչի պանել',
      'select.student': 'Աշակերտի պանել',
      'select.open': 'Բացել',
      'login.title': 'Մուտք համակարգ',
      'login.username': 'Մուտքանուն',
      'login.password': 'Գաղտնաբառ',
      'login.submit': 'Մուտք',
      'login.back': 'Հետ',
      'login.error': 'Սխալ մուտքանուն կամ գաղտնաբառ',
      'password.change.title': 'Պարտադիր գաղտնաբառի փոփոխություն',
      'password.submit': 'Փոխել գաղտնաբառը',
      'custom.title': 'Արտաքին տեսքի կարգավորում',
      'custom.apply': 'Կիրառել փոփոխությունները'
    }
  };

  const t = (key) => translations[currentLanguage]?.[key] ?? key;

  const defaultBackground = `linear-gradient(135deg, #2D4A3E 0%, #1a2f26 100%)`;
  const currentBackground = customization.backgroundImage === 'custom' && customization.customBgUrl
    ? `url(${customization.customBgUrl})`
    : defaultBackground;

  const handleFileUpload = async (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'background' ? 'image/*' : 'image/png,image/svg+xml';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'background') {
          setCustomization(prev => ({ ...prev, backgroundImage: 'custom', customBgUrl: event.target.result }));
          showNotification('Фон загружен успешно!', 'success');
        } else {
          setCustomization(prev => ({ ...prev, iconImage: 'custom', customIconUrl: event.target.result }));
          showNotification('Иконка загружена успешно!', 'success');
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (typeof invoke === 'function') {
        const res = await invoke('login', { login: loginData.login, password: loginData.password }).catch(() => null);
        if (res && res.status === 'ok') {
          if (res.user?.firstLogin && isFirstLogin) {
            setShowModal(true);
            setModalType('changePassword');
            return;
          }
          setIsLoggedIn(true);
          showNotification(`Добро пожаловать, ${loginData.login}!`, 'success');
          return;
        }
      }
    } catch (err) {
      console.info('Backend login error, falling back to demo:', err);
    }

    const user = Object.values(users).find(u => u.login === loginData.login && u.password === loginData.password);
    if (!user) {
      showNotification(t('login.error'), 'error');
      return;
    }

    if (user.firstLogin && isFirstLogin) {
      setShowModal(true);
      setModalType('changePassword');
    } else {
      setIsLoggedIn(true);
      showNotification(`Добро пожаловать, ${loginData.login}!`, 'success');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordChange.new !== passwordChange.confirm) {
      showNotification(t('password.error.match'), 'error');
      return;
    }
    if (passwordChange.new.length < 8) {
      showNotification(t('password.error.length'), 'error');
      return;
    }
    if (!/[A-Z]/.test(passwordChange.new)) {
      showNotification(t('password.error.upper'), 'error');
      return;
    }
    if (!/\d/.test(passwordChange.new)) {
      showNotification(t('password.error.digit'), 'error');
      return;
    }

    try {
      if (typeof invoke === 'function') {
        await invoke('change_password', {
          login: loginData.login,
          current: passwordChange.current,
          new_password: passwordChange.new
        }).catch(() => null);
      }
    } catch (err) {
      console.info('Password change backend error (continuing client-side):', err);
    }

    setIsFirstLogin(false);
    setShowModal(false);
    setIsLoggedIn(true);
    setPasswordChange({ current: '', new: '', confirm: '' });
    showNotification(t('password.success'), 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAppMode('select');
    setLoginData({ login: '', password: '' });
    setActiveTab('dashboard');
    showNotification('Вы успешно вышли из системы', 'info');
  };

  const applyCustomization = async () => {
    showNotification(t('custom.success'), 'success');
    setTimeout(() => {
      showNotification(t('custom.warning'), 'info');
    }, 1200);
  };

  const renderNotification = () => {
    if (!notification.show) return null;
    const bg = notification.type === 'success' ? '#059669' : notification.type === 'error' ? '#DC2626' : '#2563EB';
    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in" role="status" aria-live="polite">
        <div style={{ background: bg }} className="text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          {notification.type === 'success' && <CheckCircle size={20} />}
          {notification.type === 'error' && <AlertCircle size={20} />}
          {notification.type === 'info' && <AlertCircle size={20} />}
          <span>{notification.message}</span>
          <button onClick={() => setNotification({ show: false, message: '', type: '' })} aria-label="Close notification">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderPasswordChangeModal = () => {
    if (!showModal || modalType !== 'changePassword') return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6" role="dialog" aria-modal="true" aria-labelledby="pwd-change-title">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-yellow-600" />
            </div>
            <h2 id="pwd-change-title" className="text-xl font-bold text-gray-900">{t('password.change.title')}</h2>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-900 mb-2 font-semibold">{t('password.change.welcome')}</p>
            <p className="text-sm text-blue-800">{t('password.change.message')}</p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('password.current')}</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordChange.current}
                onChange={(e) => setPasswordChange({ ...passwordChange, current: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                aria-label={t('password.current')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('password.new')}</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordChange.new}
                onChange={(e) => setPasswordChange({ ...passwordChange, new: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                aria-label={t('password.new')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('password.confirm')}</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordChange.confirm}
                onChange={(e) => setPasswordChange({ ...passwordChange, confirm: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                aria-label={t('password.confirm')}
                required
              />
            </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              {showPassword ? t('password.hide') : t('password.show')}
            </button>

            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm font-medium mb-2">{t('password.requirements')}</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className={passwordChange.new.length >= 8 ? 'text-green-600' : 'text-gray-400'} />
                  {t('password.req1')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className={/[A-Z]/.test(passwordChange.new) ? 'text-green-600' : 'text-gray-400'} />
                  {t('password.req2')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className={/\d/.test(passwordChange.new) ? 'text-green-600' : 'text-gray-400'} />
                  {t('password.req3')}
                </li>
              </ul>
            </div>

            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              {t('password.submit')}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderModeSelect = () => {
    const tiles = [
      { mode: 'server', icon: Server, title: t('select.server'), color: 'blue', features: ['Управление системой', 'Настройка внешнего вида', 'Управление пользователями', 'Редактирование контента'] },
      { mode: 'teacher', icon: Users, title: t('select.teacher'), color: 'green', features: ['Управление классами', 'Создание тестов', 'Временные ограничения', 'Детальная статистика'] },
      { mode: 'student', icon: BookOpen, title: t('select.student'), color: 'purple', features: ['Прохождение тестов', 'Изучение материалов', 'Личная статистика', 'Достижения и рейтинг'] }
    ];

    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: currentBackground, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
              <BookOpen size={48} className="text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">{t('select.title')}</h1>
            <p className="text-xl text-white opacity-90">{t('select.tagline')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiles.map(({ mode, icon: Icon, title, color, features }) => {
              const cm = colorMap[color] || colorMap.blue;
              return (
                <div key={mode} className="bg-white bg-opacity-95 backdrop-blur rounded-2xl p-8 shadow-2xl hover:scale-105 transition-transform cursor-pointer" onClick={() => setAppMode(mode)} role="button" tabIndex={0} aria-label={title}>
                  <div style={{ width: 80, height: 80, background: cm.bg, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Icon size={40} color={cm.fg} />
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-3">{title}</h2>
                  <ul className="text-sm text-gray-700 space-y-2 mb-6">
                    {features.map((feature, idx) => <li key={idx}>✓ {feature}</li>)}
                  </ul>
                  <button style={{ width: '100%', background: cm.btn, color: '#fff' }} className="py-3 rounded-lg font-medium hover:opacity-95">
                    {t('select.open')}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {['ru', 'en', 'hy'].map(lang => (
              <button key={lang} onClick={() => setCurrentLanguage(lang)} className={`px-6 py-2 rounded-lg font-medium transition-all ${currentLanguage === lang ? 'bg-white text-blue-600' : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'}`} aria-pressed={currentLanguage === lang}>
                {lang === 'ru' ? '🇷🇺 RU' : lang === 'en' ? '🇬🇧 EN' : '🇦🇲 HY'}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLoginScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: currentBackground, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white bg-opacity-95 backdrop-blur rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <button onClick={() => setAppMode('select')} className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium">← {t('login.back')}</button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Server size={32} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold">{t('login.title')}</h1>
          <p className="text-gray-600 mt-2">EduVerse {appMode === 'server' ? 'Server' : appMode === 'teacher' ? 'Teacher' : 'Student'}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4" aria-label="Login form">
          <div>
            <label className="block text-sm font-medium mb-2">{t('login.username')}</label>
            <input type="text" value={loginData.login} onChange={(e) => setLoginData({ ...loginData, login: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required aria-label={t('login.username')} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('login.password')}</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required aria-label={t('login.password')} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">{t('login.submit')}</button>
        </form>

        <div className="mt-6 flex justify-center gap-2">
          {['ru', 'en', 'hy'].map(lang => (
            <button key={lang} onClick={() => setCurrentLanguage(lang)} className={`px-4 py-2 rounded font-medium transition-colors ${currentLanguage === lang ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{lang.toUpperCase()}</button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            Демо-доступы:<br />
            <strong>Админ:</strong> admin / admin123<br />
            <strong>Учитель:</strong> teacher1 / teacher123<br />
            <strong>Ученик:</strong> student1 / student123
          </p>
        </div>
      </div>
    </div>
  );

  const renderServerPanel = () => (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-900 text-white flex flex-col">
        <div className="p-4 border-b border-indigo-600">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold">EduVerse</h1>
              <p className="text-xs text-indigo-200">Server Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 overflow-y-auto" aria-label="Main navigation">
          {[
            { id: 'dashboard', icon: Server, label: t('nav.dashboard') },
            { id: 'users', icon: Users, label: t('nav.users') },
            { id: 'content', icon: BookOpen, label: t('nav.content') },
            { id: 'personalization', icon: Palette, label: t('nav.personalization') },
            { id: 'settings', icon: Settings, label: t('nav.settings') }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded mb-1 transition-colors ${activeTab === item.id ? 'bg-indigo-600' : 'hover:bg-indigo-800'}`} aria-current={activeTab === item.id}>
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-600">
          <div className="mb-3 flex items-center gap-2">
            <Globe size={20} />
            <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)} className="bg-indigo-800 text-white px-3 py-1 rounded text-sm cursor-pointer" aria-label="Select language">
              <option value="ru">🇷🇺 RU</option>
              <option value="en">🇬🇧 EN</option>
              <option value="hy">🇦🇲 HY</option>
            </select>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 p-3 rounded hover:bg-indigo-800 transition-colors" aria-label="Logout">
            <LogOut size={20} />
            <span className="text-sm">{t('nav.logout')}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'personalization' ? (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">{t('custom.title')}</h2>

            <div className="bg-white p-6 rounded-lg border mb-6">
              <h3 className="text-lg font-semibold mb-4">{t('custom.background')}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t('custom.currentBg')}</label>
                <div className="w-full h-48 rounded-lg border-2 border-gray-300" style={{ background: currentBackground, backgroundSize: 'cover', backgroundPosition: 'center' }} role="img" aria-label="Current background preview" />
              </div>
              <button onClick={() => handleFileUpload('background')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                <Upload size={20} /> {t('custom.uploadBg')}
              </button>
              <p className="text-sm text-gray-600 mt-2">{t('custom.bgSize')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg border mb-6">
              <h3 className="text-lg font-semibold mb-4">{t('custom.icon')}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t('custom.currentIcon')}</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                    {customization.iconImage === 'custom' && customization.customIconUrl ? (
                      <img src={customization.customIconUrl} alt="Custom icon preview" className="w-24 h-24 rounded-xl" />
                    ) : (
                      <BookOpen size={64} className="text-white" />
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => handleFileUpload('icon')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                <Upload size={20} /> {t('custom.uploadIcon')}
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <button onClick={applyCustomization} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-medium">
                <Save size={20} /> {t('custom.apply')}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {activeTab === 'dashboard' ? 'Панель управления' :
               activeTab === 'users' ? 'Пользователи' :
               activeTab === 'content' ? 'Управление контентом' :
               activeTab === 'settings' ? 'Настройки' : 'EduVerse'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center gap-3">
                  <Users size={32} className="text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Пользователей</p>
                    <p className="text-2xl font-bold">847</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center gap-3">
                  <BookOpen size={32} className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Тем</p>
                    <p className="text-2xl font-bold">1,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center gap-3">
                  <Edit size={32} className="text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Задач</p>
                    <p className="text-2xl font-bold">20,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center gap-3">
                  <Globe size={32} className="text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Языков</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-4">Системная информация</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('system.version')}:</span>
                  <span className="font-medium">EduVerse 1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('system.status')}:</span>
                  <span className="text-green-600 font-medium">● {t('system.online')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('system.ip')}:</span>
                  <span className="font-medium font-mono">192.168.1.100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('system.database')}:</span>
                  <span className="text-green-600 font-medium">{t('system.connected')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('system.connections')}:</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-gray-600">{t('system.resolution')}:</span>
                  <span className="font-medium">{screenResolution.width}×{screenResolution.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('system.displayMode')}:</span>
                  <span className="font-medium capitalize">{screenSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('system.scale')}:</span>
                  <span className="font-medium">{screenResolution.devicePixelRatio}x</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (appMode === 'select') {
    return (
      <>
        {renderModeSelect()}
        {renderNotification()}
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        {renderLoginScreen()}
        {renderPasswordChangeModal()}
        {renderNotification()}
      </>
    );
  }

  return (
    <>  
      {renderServerPanel()}
      {renderNotification()}
    </>
  );
};

export default EduVerseFinal;

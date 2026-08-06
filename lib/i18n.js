'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import koMessages from '../locales/ko.json';

const I18nContext = createContext();

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState('ko'); // 기본값은 한국어
  // 기본 언어(한국어) 메시지를 동기적으로 초기값으로 사용 → 정적 HTML·첫 페인트에서
  // t()가 폴백(키)을 노출하지 않는다. 다른 언어는 마운트 후 비동기로 교체.
  const [messages, setMessages] = useState(koMessages);

  useEffect(() => {
    // 브라우저에서 저장된 언어 설정을 읽어옴
    const savedLocale = localStorage.getItem('locale') || 'ko';
    setLocale(savedLocale);
    // 한국어는 이미 초기값으로 로드돼 있으므로 다른 언어일 때만 추가 로드
    if (savedLocale !== 'ko') {
      loadMessages(savedLocale);
    }
  }, []);

  const loadMessages = async (locale) => {
    try {
      const messages = await import(`../locales/${locale}.json`);
      setMessages(messages.default);
    } catch (error) {
      console.error(`Failed to load locale ${locale}:`, error);
      // 기본 언어로 폴백
      if (locale !== 'ko') {
        const fallbackMessages = await import('../locales/ko.json');
        setMessages(fallbackMessages.default);
      }
    }
  };

  const changeLanguage = async (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    await loadMessages(newLocale);
  };

  const t = (key, fallback) => {
    const keys = key.split('.');
    let value = messages;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value !== undefined ? value : (fallback || key);
  };

  return (
    <I18nContext.Provider value={{ locale, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("fr");

  useEffect(() => {
    const savedLocale = localStorage.getItem("hilytouch_locale");
    if (savedLocale && ["fr", "ar", "en"].includes(savedLocale)) {
      updateLocale(savedLocale);
    } else {
      updateLocale("fr");
    }
  }, []);

  const updateLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem("hilytouch_locale", newLocale);

    // Handle RTL
    if (newLocale === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = newLocale;
      document.body.classList.remove("rtl");
    }
  };

  const t = (key) => {
    return translations[locale]?.[key] || translations["fr"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: updateLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

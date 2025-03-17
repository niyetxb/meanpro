import React, { createContext, useState, useEffect } from "react";

// Создаем контекст темы
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Читаем тему из localStorage (если нет — устанавливаем "light")
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  // Функция для смены темы
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Сохраняем в localStorage
  };

  // Применяем класс к body для стилизации темы
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const HomePage = ({ products = [] }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const total = useMemo(() => {
    return products.reduce((acc, item) => acc + item.price, 0);
  }, [products]);

  return (
    <div>
      <h1>Тема: {theme}</h1>
      <button onClick={toggleTheme}>Сменить тему</button>
      <h2>Общая стоимость товаров: ${total}</h2>
    </div>
  );
};

export default HomePage;
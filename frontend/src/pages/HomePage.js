import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const HomePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h1>Текущая тема: {theme}</h1>
      <button onClick={toggleTheme}>Сменить тему</button>
    </div>
  );
};







export default HomePage;

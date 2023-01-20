import React, { useContext } from "react";
import Context from "../context/Context";
import flagTranslation from "../utils/flagTranslation";
import { ContextInterface } from "../interfaces/ContextInterface";

function LanguageButton() {
  const { language, setLanguage } = useContext(Context) as ContextInterface;
  
  const changeLanguage = (language: string) => {
    switch (language) {
      case "en-US":
        setLanguage("pt-BR");
        break;
      case "pt-BR":
        setLanguage("en-US");
        break;
      default:
        setLanguage("en-US");
    }
  };

  return (
    <div className="self-end text-3xl">
      <button
        onClick={() => changeLanguage(language)}
      >{flagTranslation[language].flag}</button>
    </div>
  );
}

export default LanguageButton;

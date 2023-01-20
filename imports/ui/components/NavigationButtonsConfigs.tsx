import React from 'react';
import { Link } from "react-router-dom";
import { navigationTranslate } from "../utils/navigationTranslation";

interface NavigationButtonsConfigsProps {
  to: string;
  item: string;
  language: string;
}

function NavigationButtonsConfigs(props: NavigationButtonsConfigsProps) {
  const { to, language, item } = props;
  const isSelected = window.location.pathname === `/${to}`;
  if (isSelected) 
    return <Link to={ `/${to}` } className="text-cyan p-4">{navigationTranslate[language][item]}</Link>

  return (
    <Link to={ `/${to}` } className="text-dark-blue hover:text-cyan p-4 font-sans">{navigationTranslate[language][item]}</Link>
  );
}

export default NavigationButtonsConfigs;
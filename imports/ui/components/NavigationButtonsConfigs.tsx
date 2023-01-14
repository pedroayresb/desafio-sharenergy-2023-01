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
    return <Link to={ `/${to}` } className="border border-dark-purple rounded-full bg-light-purple p-2 font-bold">{navigationTranslate[language][item]}</Link>

  return (
    <Link to={ `/${to}` } className="border border-dark-purple rounded-full bg-dark-purple p-2 hover:border-light-purple">{navigationTranslate[language][item]}</Link>
  );
}

export default NavigationButtonsConfigs;
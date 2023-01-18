import React from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import homepageTranslation from "../utils/homepageTranslation"; // arquivo com as traduções
import { ContextInterface } from "../interfaces/ContextInterface";

function RegisterButton() {
  const { language } = React.useContext(Context) as ContextInterface;

  return (
    <div className="p-20">
      <Link to="/register" className="border w-32 rounded-full px-20 py-5 bg-white border-light-cyan text-dark-blue font-medium hover:bg-dark-cyan hover:text-white" >{ homepageTranslation[language].register }</Link>
    </div>
  );
}

export default RegisterButton;
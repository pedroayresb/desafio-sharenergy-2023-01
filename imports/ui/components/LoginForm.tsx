import React, { useState, useContext } from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import { ContextInterface } from "../interfaces/ContextInterface";
import { formsTranslation } from "../utils/formsTranslation"; // arquivo com as traduções
import crypto from 'crypto';

function LoginForm() {
  const navigate = useNavigate();
  const { language } = useContext(Context) as ContextInterface;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hash = crypto.createHash('sha256').update(password).digest('base64').toString();;
    Meteor.loginWithPassword(name, hash, (err: any) => {
      if (err) {
        setError(err.reason);
      } else {
        localStorage.setItem("logged", "true");
        localStorage.setItem("remember", remember.toString());
        navigate("/");
      }
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={ handleSubmit } className="grid place-items-center content-center  bg-dark-offwhite">
      <div className="mt-4 grid place-items-center content-center text-dark-blue">
        <label htmlFor="name" className="justify-self-start">{ formsTranslation[language].username }: </label>
        <input
          type="text"
          name="name"
          className="border rounded-xl h-12 py-5 px-4  text-dark-blue"
          value={ name }
          onChange={ handleNameChange }
        />
      </div>
      <div className="mt-4 grid place-items-center content-center text-dark-blue">
        <label htmlFor="password" className="justify-self-start">{ formsTranslation[language].password }: </label>
        <input
          type="password"
          name="password"
          className="border rounded-xl h-12 py-5 px-4  text-dark-blue"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </div>
      <div className="text-dark-blue" >
        <label htmlFor="remember" className="justify-self-start">{ formsTranslation[language].rememberMe }: </label>
        <input
          type="checkbox"
          name="remember"
          defaultChecked={ remember }
          onChange={ () => setRemember(!remember) }
          />
      </div>
      <button 
        type="submit"
        className="border w-56 mt-12 rounded-full py-5 bg-dark-cyan border-light-cyan text-white font-medium text-center hover:bg-white hover:text-dark-cyan">{ formsTranslation[language].login }
      </button>
      { error && <p className="mt-5 text-red">{ error }</p> }
    </form>
  );
}

export default LoginForm;
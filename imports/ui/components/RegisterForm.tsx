import React, { useState, useContext } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Context from "../context/Context";
import { ContextInterface } from "../interfaces/ContextInterface";
import { formsTranslation } from "../utils/formsTranslation"; // arquivo com as traduções

function RegisterForm() {
  const navigate = useNavigate();
  const { language, setNameForLogin, setPasswordForLogin } = useContext(Context) as ContextInterface;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (remember) {
      try {
        Meteor.call('users.create', { name, password }, (error: any, result: any) => {
          if (error) {
            console.log(error);
          } else {
            setCookie('token', result, { maxAge: 999999999999999 }); // seta idade do cookie, porem por algum motivo so ta setando para um ano no maximo
            navigate('/');
          }
        });
      } catch (error: any) {
        setError(error.response.data.error);
      }
    } else {
      setNameForLogin(name); // caso a pessoa nao queria ser lembrada, seta somente no contexto para ser usado no useEffect do Homepage.tsx
      setPasswordForLogin(password);
      navigate('/');
    };
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={ handleSubmit } className="grid place-items-center content-center  bg-white">
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="name" className="justify-self-start">{ formsTranslation[language].username }: </label>
        <input
          type="text"
          name="name"
          className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
          value={ name }
          onChange={ handleNameChange }
        />
      </div>
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="password" className="justify-self-start">{ formsTranslation[language].password }: </label>
        <input
          type="password"
          name="password"
          className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </div>
      <div>
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
        className="border w-56 mt-12 rounded-full py-5 bg-dark-purple border-light-purple text-white font-medium text-center hover:bg-white hover:text-dark-purple">{ formsTranslation[language].login }
      </button>
      { error && <p className="mt-5 text-red">{ error }</p> }
    </form>
  );
}

export default RegisterForm;
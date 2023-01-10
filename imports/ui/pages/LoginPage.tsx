import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterButton from '../components/RegisterButton';

function LoginPage() {
  return (
    <div className="grid h-screen place-items-center content-center bg-offwhite">
      <div className="grid place-items-center content-center border border-gray-light rounded-xl bg-white">
        <LoginForm />
        <RegisterButton />
      </div>
    </div>
  );
}

export default LoginPage;
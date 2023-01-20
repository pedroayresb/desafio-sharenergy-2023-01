import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="grid h-screen place-items-center content-center bg-offwhite">
      <div className="grid place-items-center content-center border border-gray-light rounded-xl bg-dark-offwhite p-10">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
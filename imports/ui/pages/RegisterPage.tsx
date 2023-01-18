import React from 'react';
import RegisterForm from '../components/RegisterForm';
import GoBackButton from '../components/GoBackButton';

function LoginPage() {
  return (
    <div className="grid h-screen place-items-center content-center bg-offwhite">
      <div className="grid place-items-center content-center border border-gray-light rounded-xl bg-dark-offwhite p-10">
        <GoBackButton />
        <RegisterForm />
      </div>
    </div>
  );
}

export default LoginPage;
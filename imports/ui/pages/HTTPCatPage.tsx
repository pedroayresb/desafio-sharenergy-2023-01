import React, { useState } from 'react';
import NavigationButtons from '../components/NavigationButtons';
import statusCodes from '../utils/httpCat';
import CatSelect from '../components/CatSelect';

const random = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

function HTTPCatPage() {
  const [statusCode, setStatusCode] = useState(random(statusCodes));

  return (
    <div className="flex flex-col items-center justify-center">
      <NavigationButtons />
      <h1 className="text-3xl font-bold">HTTP Cat</h1>
      <div className="flex flex-col items-center justify-center">
        <CatSelect onSelect={(id) => setStatusCode(parseInt(id))} />
        <img src={`https://http.cat/${statusCode}`} alt="HTTP Cat" />
      </div>
    </div>
  );
}

export default HTTPCatPage;
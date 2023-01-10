import React, { useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';

function PageButton() {
  const { page, setPage, randomFilteredUsers } = useContext(Context) as ContextInterface;

  return (
    <div className="flex justify-center">
      <button
        onClick={() => {
          page > 1 && setPage(page - 1);
        }}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
        > - </button>
      <p
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
      > {page} </p>
      <button
        onClick={() => {
          (randomFilteredUsers!.length / 10 > page + 1) && setPage(page + 1);
        }}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
        > + </button>
    </div>
  );
}

export default PageButton;

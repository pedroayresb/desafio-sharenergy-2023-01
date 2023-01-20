import React, { useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import ClientsInterface from '../interfaces/ClientsInterface';
import ClientItem from './ClientItem';
import clientPageTranslation from '../utils/clientTranslation';

interface props {
  clients: ClientsInterface[]
}

function AddedClientsContainer(props: props) {
  const { language } = useContext(Context) as ContextInterface;
  return (
    <div className='overflow-x-scroll h-7/8 w-5/6 bg-dark-offwhite text-3xl self-center lg:text-sm lg:overflow-y-scroll'>
      <table className='flex flex-row lg:flex-col w-full'>
        <thead className='bg-dark-blue h-full text-white sticky left-0 lg:top-0 w-full'>
          <tr className='flex flex-col h-full lg:flex-row lg:h-28 w-full'>
            <th className='p-10 lg:w-[13%] lg:h-full'>{ clientPageTranslation[language].name }</th>
            <th className='p-10 lg:w-[13%] lg:h-full'>{ clientPageTranslation[language].cpf }</th>
            <th className='p-10 lg:w-[13%] lg:h-full'>{ clientPageTranslation[language].phone }</th>
            <th className='p-10 lg:w-[25%] lg:h-full'>{ clientPageTranslation[language].email }</th>
            <th className='p-10 lg:w-[25%] lg:h-full'>{ clientPageTranslation[language].address }</th>
            <th className='p-10 lg:w-[5%] lg:h-full'>{ clientPageTranslation[language].editClient }</th>
            <th className='p-10 lg:w-[5%] lg:h-full'>{ clientPageTranslation[language].remove }</th>
          </tr>
        </thead>
        <tbody className='flex flex-row h-fulll lg:flex-col'>
          {props.clients.map((client, index) => 
              <ClientItem
                client={ client }
                index={ index }
                key={ index }
              />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddedClientsContainer;
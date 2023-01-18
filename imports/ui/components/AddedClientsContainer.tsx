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
    <div>
      <table>
        <thead>
          <tr>
            <th className='p-10'>{ clientPageTranslation[language].name }</th>
            <th className='p-10'>{ clientPageTranslation[language].cpf }</th>
            <th className='p-10'>{ clientPageTranslation[language].email }</th>
            <th className='p-10'>{ clientPageTranslation[language].phone }</th>
            <th className='p-10'>{ clientPageTranslation[language].address }</th>
            <th className='p-10'>{ clientPageTranslation[language].editClient }</th>
            <th className='p-10'>{ clientPageTranslation[language].remove }</th>
          </tr>
        </thead>
        <tbody>
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
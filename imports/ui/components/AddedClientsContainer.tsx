import React from 'react';
import ClientsInterface from '../interfaces/ClientsInterface';
import ClientItem from './ClientItem';

interface props {
  clients: ClientsInterface[]
  setClients: (e: any) => void
}

function AddedClientsContainer(props: props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className='p-10'>Client Name</th>
            <th className='p-10'>Client CPF</th>
            <th className='p-10'>Client Email</th>
            <th className='p-10'>Client Phone</th>
            <th className='p-10'>Client Address</th>
            <th className='p-10'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {props.clients.map((client, index) => 
              <ClientItem
                client={ client }
                index={ index }
                setClients={ props.setClients }
              />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddedClientsContainer;
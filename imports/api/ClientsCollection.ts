import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

interface ClientsInterface {
  _id?: string;
  name: string;
  email: string[];
  phone: string[];
  address: string[];
  cpf: string;
};

interface withAttachSchema extends Mongo.Collection<ClientsInterface> {
  attachSchema: (schema: SimpleSchema) => void;
};

const Schemas = {
  client: new SimpleSchema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: Array,
      minCount: 1,
      maxCount: 3,
    },
    'email.$': {
      type: String,
    },
    phone: {
      type: Array,
      minCount: 1,
      maxCount: 3,
    },
    'phone.$': {
      type: String,
    },
    address: {
      type: Array,
      minCount: 1,
      maxCount: 3,
    },
    'address.$': {
      type: String,
    },
    cpf: String,
  }),
};

const ClientsCollection = new Mongo.Collection('clients') as withAttachSchema;
ClientsCollection.attachSchema(Schemas.client);

export default ClientsCollection;
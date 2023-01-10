import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

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

const ClientsCollection = new Mongo.Collection('clients') as any;
ClientsCollection.attachSchema(Schemas.client);

export default ClientsCollection;
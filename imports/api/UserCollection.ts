import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Schemas = {
  user: new SimpleSchema({
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }),
};

const UserCollection = new Mongo.Collection('users') as any;

UserCollection.attachSchema(Schemas.user);

export default UserCollection;
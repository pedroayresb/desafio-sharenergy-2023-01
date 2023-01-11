import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

interface UserInterface {
  _id?: string;
  name: string;
  password: string;
};

interface withAttachSchema extends Mongo.Collection<UserInterface> {
  attachSchema: (schema: SimpleSchema) => void;
};


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

const UserCollection = new Mongo.Collection('users') as withAttachSchema;
UserCollection.attachSchema(Schemas.user);

export default UserCollection;
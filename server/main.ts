import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/ClientsCollection';
import '/imports/api/ClientsMethods';
import '/imports/api/ClientsPublications';

import crypto from 'crypto';

const SEED_USERNAME = 'desafiosharenergy';
const SEED_PASSWORD = crypto.createHash('sha256').update('sh@r3n3rgy').digest('base64').toString();

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});

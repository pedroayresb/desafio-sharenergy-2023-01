import { Meteor } from 'meteor/meteor';
import UserCollection from './UserCollection';

Meteor.publish('users', function() {
  return UserCollection.find();
});

Meteor.publish('user', function(id: string) {
  return UserCollection.find({ _id: id });
});

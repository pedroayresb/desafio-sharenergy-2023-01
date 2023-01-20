import { Meteor } from 'meteor/meteor';
import ClientsCollection from './ClientsCollection';

Meteor.publish('clients', function() {
  return ClientsCollection.find();
});

Meteor.publish('client', function(id: string) {
  return ClientsCollection.find({ _id: id });
});
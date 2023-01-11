import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ClientsCollection from "./ClientsCollection";
Meteor.methods({
  "clients.create"({ name, email, phone, address, cpf }) {
    check(name, String);
    if (!name) {
      throw new Meteor.Error("Invalid arguments");
    };
    const id = ClientsCollection.insert({ name, email, phone, address, cpf });
    return id;
  },
  "clients.read"() {
    const clients = ClientsCollection.find({}).fetch();
    return clients;
  },
  "clients.update"({ id, name, email, phone, address, cpf }) {
    check(id, String);
    const client = ClientsCollection.findOne({ _id: id });
    if (!client) {
      throw new Meteor.Error("Client does not exist");
    };
    ClientsCollection.update({ _id: client._id }, { $set: { name, email, phone, address, cpf } });
  },
  "clients.delete"({ id }) {
    check(id, String);
    const client = ClientsCollection.findOne({ _id: id });
    if (!client) {
      throw new Meteor.Error("Client does not exist");
    };
    ClientsCollection.remove({ _id: client._id });
  },
});
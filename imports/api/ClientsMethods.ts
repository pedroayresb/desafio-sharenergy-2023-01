import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ClientsCollection from "./ClientsCollection";
import jwt from 'jsonwebtoken';

const secret = "secret";

type decoded = {
  id?: string;
  iat?: string;
};

Meteor.methods({
  "clients.create"({ name, email, phone, address, cpf }) {
    check(name, String);
    if (!name) {
      throw new Meteor.Error("Invalid arguments");
    };
    const id = ClientsCollection.insert({ name, email, phone, address, cpf });
    return id;
  },
  "clients.read"({ token }) {
    if (!token) {
      throw new Meteor.Error("Not logged");
    }
    try {
      jwt.verify(token, secret) as decoded;
      const clients = ClientsCollection.find({}).fetch();
      return clients;
    } catch (err) {
      throw new Meteor.Error("Invalid token");
    }
  },
  "clients.update"({ name, email, phone, address, cpf }) {
    check(name, String);
    if (!name) {
      throw new Meteor.Error("Invalid arguments");
    };
    const client = ClientsCollection.findOne({ name })
    ClientsCollection.update({ _id: client._id }, { $set: { name, email, phone, address, cpf } });
  },
  "clients.delete"({ name }) {
    check(name, String);
    if (!name) {
      throw new Meteor.Error("Invalid arguments");
    };
    const client = ClientsCollection.findOne({ name });
    ClientsCollection.remove({ _id: client._id });
  },
});
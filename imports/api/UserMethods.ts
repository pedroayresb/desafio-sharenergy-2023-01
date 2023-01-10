import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import UserCollection from "./UserCollection";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

type decoded = {
  id?: string;
  iat?: string;
};

const secret = "secret";

Meteor.methods({
  "users.create"({name, password}) {
    check(name, String);
    check(password, String);
    if(!name || !password) {
      throw new Meteor.Error("Invalid arguments");
    };
    const user = UserCollection.findOne({ name });
    if(user) {
      throw new Meteor.Error("User already exists");
    };
    const encryptedPassword = crypto.createHash('sha256').update(password).digest('base64').toString();
    console.log(encryptedPassword);
    const id = UserCollection.insert({ name, password: encryptedPassword });
    const token = jwt.sign({ id }, secret);
    return token;
  },
  "users.login"({name, password}) {
    check(name, String);
    check(password, String);
    if(!name || !password) {
      throw new Meteor.Error("Invalid arguments");
    };
    const user = UserCollection.findOne({ name });
    if(!user) {
      throw new Meteor.Error("User does not exist");
    };
    const encryptedPassword = crypto.createHash('sha256').update(password).digest('base64');
    if(user.password !== encryptedPassword) {
      throw new Meteor.Error("Incorrect password");
    };
    const token = jwt.sign({ id: user._id }, secret);
    return token;
  },
  "users.loginWithToken"({token}) {
    if (!token) {
      throw new Meteor.Error("Not logged");
    }
    try {
      const decoded = jwt.verify(token, secret) as decoded;
      const user = UserCollection.findOne({ _id: decoded.id });
      delete user.password;
      return user;
    } catch (err) {
      throw new Meteor.Error("Invalid token");
    }
  },
  "users.update"({token, name, password}) {
    if (!token) {
      throw new Meteor.Error("Not logged");
    }
    try {
      jwt.verify(token, secret);
    } catch (err) {
      throw new Meteor.Error("Invalid token");
    }
    check(name, String);
    check(password, String);
    if(!name || !password) {
      throw new Meteor.Error("Invalid arguments");
    };
    const user = UserCollection.findOne({ name });
    if(!user) {
      throw new Meteor.Error("User does not exist");
    };
    const encryptedPassword = crypto.createHash('sha256').update(password).digest('base64');
    if(user.password !== encryptedPassword) {
      throw new Meteor.Error("Incorrect password");
    };
    return UserCollection.update({ name }, { $set: { password } });    
  },
  "users.delete"({token, name, password}) {
    if (!token) {
      throw new Meteor.Error("Not logged");
    }
    try {
      jwt.verify(token, secret);
    } catch (err) {
      throw new Meteor.Error("Invalid token");
    }
    check(name, String);
    check(password, String);
    if(!name || !password) {
      throw new Meteor.Error("Invalid arguments");
    };
    const user = UserCollection.findOne({ name });
    if(!user) {
      throw new Meteor.Error("User does not exist");
    };
    const encryptedPassword = crypto.createHash('sha256').update(password).digest('base64');
    if(user.password !== encryptedPassword) {
      throw new Meteor.Error("Incorrect password");
    };
    return UserCollection.remove({ name });
  },
});

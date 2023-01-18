import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import App from '/imports/ui/App';
import '../imports/api/UserMethods';
import '../imports/api/ClientsMethods';

const container = document.getElementById('react-target');
const root = createRoot(container!);

Meteor.startup(() => {
  root.render(<App />);
});

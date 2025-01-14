import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import App from '/imports/ui/App';
import '../imports/api/ClientsMethods';

const container = document.getElementById('react-target');
container?.classList.add('h-full', 'w-full', 'bg-offwhite', 'text-dark-blue', 'text-4xl', 'lg:text-sm' );
const root = createRoot(container!);

Meteor.startup(() => {
  root.render(<App />);
});
 
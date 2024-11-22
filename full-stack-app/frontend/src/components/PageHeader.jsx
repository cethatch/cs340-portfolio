/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from 'react';
import Navigation from './Navigation.jsx';

// Change the function names and links
// to fit your portfolio topic.

function PageHeader() {
  return (
    <header>
        <h1 id="navigation-title">
            <img src="./favicons/android-chrome-192x192.png" class="logo"/>
            GigaBite Culinary Classes Internal Database
        </h1>
        <Navigation /> 
    </header>
  );
}

export default PageHeader;
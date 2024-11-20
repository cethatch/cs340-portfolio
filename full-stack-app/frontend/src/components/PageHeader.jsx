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
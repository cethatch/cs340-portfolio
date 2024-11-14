// Import dependencies
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components, styles, media
import PageHeader from './components/PageHeader.js';
import Navigation from './components/Navigation.js';
import './App.css';

// Import pages:
import HomePage from './pages/HomePage.js'
import ClassesPage from './pages/ClassesPage.js'
import KitchensPage from './pages/KitchensPage.js'
import ClassInstancesPage from './pages/ClassInstancesPage.js'
import InstructorsPage from './pages/InstructorsPage.js'
import SpecialtiesPage from './pages/SpecialtiesPage.js'
import StudentsPage from './pages/StudentsPage.js'
import RegistrationsPage from './pages/RegistrationsPage.js'
import InvoicesPage from './pages/InvoicesPage.js'

// Define the function that renders the content in Routes, using State.
function App() {

  return (
    <>
      <BrowserRouter>

          <PageHeader />
          <main>
            <section>
                <Routes> 
                    <Route path='/' element={ <HomePage />} />
                    <Route path="/classes/*" element={ <ClassesPage />} /> 
                    <Route path="/kitchens/*" element={<KitchensPage />} />                 
                    <Route path="/schedule/*" element={<ClassInstancesPage />} /> 
                    <Route path="/instructors/*" element={<InstructorsPage/>} />
                    <Route path="/specialties/*" element={<SpecialtiesPage/>} />
                    <Route path="/students/*" element={<StudentsPage/>} />
                    <Route path="/registrations/*" element={<RegistrationsPage/>} />
                    <Route path="/invoices/*" element={<InvoicesPage/>} />

                </Routes>
              </section>
          </main>

          <footer>
            <p>&copy; 2024 Christine Thatcher & Ingrid Gunderson Thomas</p>
          </footer>

      </BrowserRouter>
    </>
  );
}

export default App;
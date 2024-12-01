/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

// Import dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Components, styles, media
import PageHeader from './components/PageHeader.jsx';
import './App.css';

// Import pages:
import HomePage from './pages/HomePage.jsx';
import ClassesPage from './pages/ClassesPage.jsx';
import KitchensPage from './pages/KitchensPage.jsx';
import ClassInstancesPage from './pages/ClassInstancesPage.jsx';
import InstructorsPage from './pages/InstructorsPage.jsx';
import InstructorAssignmentsPage from './pages/InstructorAssignmentsPage.jsx';
import SpecialtiesPage from './pages/SpecialtiesPage.jsx';
import StudentsPage from './pages/StudentsPage.jsx';
import RegistrationsPage from './pages/RegistrationsPage.jsx';
import InvoicesPage from './pages/InvoicesPage.jsx';

function App() {

  return (
    <>
      <PageHeader />
      <main>
        <section>
            <Routes> 
                <Route path='/' element={ <HomePage />} />
                <Route path="/classes/*" element={ <ClassesPage />} /> 
                <Route path="/kitchens/*" element={<KitchensPage />} />                 
                <Route path="/schedule/*" element={<ClassInstancesPage />} /> 
                <Route path="/instructors/*" element={<InstructorsPage/>} />
                <Route path="/instructor_assignments/*" element={<InstructorAssignmentsPage />} />
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

    </>
  );
}

export default App;
// Import dependencies
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components, styles, media
import PageHeader from './components/PageHeader.js';
import './App.css';

// Import pages:

import HomePage from './pages/HomePage.js'

// Define the function that renders the content in Routes, using State.
function App() {

  const [expense, setExpenseToEdit] = useState([])

  return (
    <>
      <BrowserRouter>

          <PageHeader />
          <main>
            <section>
                <Routes> 
                    <Route path='/' element={ <HomePage />} />
                    {/* <Route path="/classes" element={ <ClassesPage />} /> 
                    <Route path="/kitchens" element={<KitchensPage/>} />                 
                    <Route path="/schedule" element={<ClassInstancesPage />} /> 
                    <Route path="/instructors" element={<InstructorsPage/>} />
                    <Route path="/specialties" element={<SpecialtiesPage/>} />
                    <Route path="/students" element={<StudentsPage/>} />
                    <Route path="/registrations" element={<RegistrationsPage/>} />
                    <Route path="/invoices" element={<InvoicesPage/>} /> */}
                </Routes>
              </section>
          </main>

          <footer>
            <p>&copy; 2024 Christine Thatcher</p>
          </footer>

      </BrowserRouter>
    </>
  );
}

export default App;
/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";
import RegistrationsTable from "../components/registrations/RegistrationsTable";
import CreateRegistration from "../components/registrations/CreateRegistration";
import UpdateRegistration from "../components/registrations/UpdateRegistration";
import DeleteRegistration from "../components/registrations/DeleteRegistration";
import { Link, Routes, Route } from 'react-router-dom';


function RegistrationsPage() {
    return (
        <>
        <main>
            <h2>Class Registrations</h2>
            <nav>
                <p><Link to="/registrations">Registrations Table</Link></p>
                <p><Link to="create">Add a Registration</Link></p>
            </nav> 
            <Routes>
                <Route path="/" element={<RegistrationsTable />} />
                <Route path="create" element={<CreateRegistration />} />
                <Route path="update/:registrationID" element={<UpdateRegistration />} />
                <Route path="delete/:registrationID" element={<DeleteRegistration />} />
            </Routes>
        </main>
        </>
    );
}

export default RegistrationsPage;
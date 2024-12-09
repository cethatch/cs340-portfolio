/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";
import SpecialtiesTable from "../components/specialties/SpecialtiesTable";
import CreateSpecialty from "../components/specialties/CreateSpecialty";
import UpdateSpecialty from "../components/specialties/UpdateSpecialty";
import DeleteSpecialty from "../components/specialties/DeleteSpecialty";
import { Link, Routes, Route } from 'react-router-dom';


function SpecialtiesPage() {
    return (
        <>
        <main>
            <h2>Specialties</h2>
            <nav>
                <p><Link to="/specialties">Specialties Table</Link></p>
                <p><Link to="create">Add a Specialty</Link></p>
            </nav> 
            <Routes>
                <Route path="/" element={<SpecialtiesTable />} />
                <Route path="create" element={<CreateSpecialty />} />
                <Route path="update/:specialtyID" element={<UpdateSpecialty />} />
                <Route path="delete/:specialtyID" element={<DeleteSpecialty />} />
            </Routes>
        </main>
        </>
    );
}

export default SpecialtiesPage;
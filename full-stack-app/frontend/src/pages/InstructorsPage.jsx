/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";
import InstructorsTable from "../components/instructors/InstructorsTable";
import CreateInstructor from "../components/instructors/CreateInstructor";
import UpdateInstructor from "../components/instructors/UpdateInstructor";
import DeleteInstructor from "../components/instructors/DeleteInstructor";
import { Link, Routes, Route } from 'react-router-dom';


function InstructorsPage() {
    return (
        <>
        <main>
            <h2>Instructors</h2>
            <nav>
                <p><Link to="/instructors">Instructors Table</Link></p>
                <p><Link to="create">Add an Instructor</Link></p>
            </nav> 
            <Routes>
                <Route path="/" element={<InstructorsTable />} />
                <Route path="create" element={<CreateInstructor />} />
                <Route path="update/:instructorID" element={<UpdateInstructor />} />
                <Route path="delete/:instructorID" element={<DeleteInstructor />} />
            </Routes>
        </main>
        </>
    );
}

export default InstructorsPage;
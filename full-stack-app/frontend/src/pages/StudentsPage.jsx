/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";
import StudentsTable from "../components/students/StudentsTable";
import CreateStudent from "../components/students/CreateStudent";
import UpdateStudent from "../components/students/UpdateStudent";
import DeleteStudent from "../components/students/DeleteStudent";
import { Link, Routes, Route } from 'react-router-dom';


function StudentsPage() {
    return (
        <>
        <main>
            <h2>Students</h2>
            <nav>
                <p><Link to="/students">Students Table</Link></p>
                <p><Link to="create">Add a Student</Link></p>
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<StudentsTable />} />
                <Route path="create" element={<CreateStudent />} />
                {/* <Route path="update/:id" element={<UpdateClass />} /> */}
                <Route path="update" element={<UpdateStudent />} />
                <Route path="delete" element={<DeleteStudent />} />
            </Routes>
        </main>
        </>
    );
}

export default StudentsPage;
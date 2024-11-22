/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";
import InstructorAssignmentsTable from "../components/instructor_assignments/InstructorAssignmentsTable";
import CreateInstructorAssignment from "../components/instructor_assignments/CreateInstructorAssignment";
import UpdateInstructorAssignment from "../components/instructor_assignments/UpdateInstructorAssignment";
import DeleteInstructorAssignment from "../components/instructor_assignments/DeleteInstructorAssignment";
import { Link, Routes, Route } from 'react-router-dom';


function InstructorAssignmentsPage() {
    return (
        <>

        <main>
            <h2>Instructor Assignments</h2>
            <nav>
                <p><Link to="/instructor_assignments">Instructor Assignments Table</Link></p>
                <p><Link to="create">Add an assignment</Link></p>
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<InstructorAssignmentsTable />} />
                <Route path="create" element={<CreateInstructorAssignment />} />
                {/* <Route path="update/:id" element={<UpdateInstructor />} /> */}
                <Route path="update/" element={<UpdateInstructorAssignment />} />
                <Route path="delete/" element={<DeleteInstructorAssignment />} />
            </Routes>
        </main>
        </>
    );
}

export default InstructorAssignmentsPage;
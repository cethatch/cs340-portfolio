/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";
import ClassInstancesTable from "../components/classInstances/ClassInstancesTable";
import CreateClassInstance from "../components/classInstances/CreateClassInstance";
import UpdateClassInstance from "../components/classInstances/UpdateClassInstance";
import { Link, Routes, Route } from 'react-router-dom';


function ClassInstancesPage() {
    return (
        <>
        <main>
            <h2>Class Schedule</h2>
            <nav>
                <p><Link to="/schedule">Class Schedule Table</Link></p>
                <p><Link to="create">Schedule a Class</Link></p>
\            </nav> 
            <Routes>
                <Route path="/" element={<ClassInstancesTable />} />
                <Route path="create" element={<CreateClassInstance />} />
                <Route path="update/:classInstanceID" element={<UpdateClassInstance />} />
            </Routes>
        </main>
        </>
    );
}

export default ClassInstancesPage;
/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";
import ClassesTable from "../components/classes/ClassesTable";
import CreateClass from "../components/classes/CreateClass";
import UpdateClass from "../components/classes/UpdateClass";
import { Link, Routes, Route } from 'react-router-dom';


function ClassesPage() {
    return (
        <>
        <main>
            <h2>Culinary Classes</h2>
            <nav>
                <p><Link to="/classes">Classes Table</Link></p>
                <p><Link to="create">Add a Class</Link></p>
            </nav> 
            <Routes>
                <Route path="/" element={<ClassesTable />} />
                <Route path="create" element={<CreateClass />} />
                <Route path="update/:classID" element={<UpdateClass />} />
            </Routes>
        </main>
        </>
    );
}

export default ClassesPage;
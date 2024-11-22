/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";
import KitchensTable from "../components/kitchens/KitchensTable";
import CreateKitchen from "../components/kitchens/CreateKitchen";
import UpdateKitchen from "../components/kitchens/UpdateKitchen";
import DeleteKitchen from "../components/kitchens/DeleteKitchen";
import { Link, Routes, Route } from 'react-router-dom';


function KitchensPage() {
    return (
        <>
        <main>
            <h2>Teaching Kitchens</h2>
            <nav>
                <p><Link to="/kitchens">Kitchens Table</Link></p>
                <p><Link to="create">Add a Kitchen</Link></p>
            </nav> 
            <Routes>
                <Route path="/" element={<KitchensTable />} />
                <Route path="create" element={<CreateKitchen />} />
                <Route path="update/:kitchenID" element={<UpdateKitchen />} />
                <Route path="delete/:kitchenID" element={<DeleteKitchen />} />
            </Routes>
        </main>
        </>
    );
}

export default KitchensPage;
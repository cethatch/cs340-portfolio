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
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<KitchensTable />} />
                <Route path="create" element={<CreateKitchen />} />
                {/* <Route path="update/:id" element={<UpdateClass />} /> */}
                <Route path="update" element={<UpdateKitchen />} />
                <Route path="delete" element={<DeleteKitchen />} />
            </Routes>
        </main>
        </>
    );
}

export default KitchensPage;
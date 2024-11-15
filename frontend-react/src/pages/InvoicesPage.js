import React from "react";
import InvoicesTable from "../components/invoices/InvoicesTable";
import CreateInvoice from "../components/invoices/CreateInvoice";
import UpdateInvoice from "../components/invoices/UpdateInvoice";
import DeleteInvoice from "../components/invoices/DeleteInvoice";
import { Link, Routes, Route } from 'react-router-dom';


function InvoicesPage() {
    return (
        <>

        <main>
            <h2>Invoices</h2>
            <nav>
                <p><Link to="/invoices">Invoices Table</Link></p>
                <p><Link to="create">Add an Invoice</Link></p>
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<InvoicesTable />} />
                <Route path="create" element={<CreateInvoice />} />
                {/* <Route path="update/:id" element={<UpdateClass />} /> */}
                <Route path="update/" element={<UpdateInvoice />} />
                <Route path="delete/" element={<DeleteInvoice />} />
            </Routes>
        </main>
        </>
    );
}

export default InvoicesPage;
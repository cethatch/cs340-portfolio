/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";
import InvoicesTable from "../components/invoices/InvoicesTable";
import CreateInvoice from "../components/invoices/CreateInvoice";
import UpdateInvoice from "../components/invoices/UpdateInvoice";
import { Link, Routes, Route } from 'react-router-dom';


function InvoicesPage() {
    return (
        <>

        <main>
            <h2>Invoices</h2>
            <nav>
                <p><Link to="/invoices">Invoices Table</Link></p>
                <p><Link to="create">Add an Invoice</Link></p>
            </nav> 
            <Routes>
                <Route path="/" element={<InvoicesTable />} />
                <Route path="create" element={<CreateInvoice />} />
                <Route path="update/:invoiceID" element={<UpdateInvoice />} />
            </Routes>
        </main>
        </>
    );
}

export default InvoicesPage;
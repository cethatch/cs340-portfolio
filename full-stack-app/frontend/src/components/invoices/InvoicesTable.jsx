/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./InvoicesTableRow";
import axios from "axios";

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState([]);
  
  // Fetch invoices for table from backend
  const fetchInvoices = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "invoices";
      const response = await axios.get(URL);
      setInvoices(response.data);
    } catch (error) {
      alert("Error fetching invoices from the server.");
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div>

      <h3>Invoices Table</h3>
      {invoices.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No invoices found.</p>
        </div>
      ) : (
      <>
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Invoice Date</th>
              <th>Invoice Total</th>
              <th>Paid?</th>
              <th>Comments</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoiceID} invoice={invoice} fetchInvoices={fetchInvoices} />
            ))}        
          </tbody>
        </table>
        <p><em className="alertFont">Note: Invoice entries may not be deleted.</em></p>
      </>

      )}
    </div>
  );
};

export default InvoicesTable;
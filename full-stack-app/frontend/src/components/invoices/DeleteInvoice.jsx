/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import TableRow from "./InvoicesTableRow";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

// import axios from "axios";

const DeleteInvoice = () => {
  // const [classes, setClasses] = useState([]);
  const navigate = useNavigate();


  // const fetchClasses = async () => {
  //   try {
  //     const URL = import.meta.env.VITE_API_URL + "classes";
  //     const response = await axios.get(URL);
  //     setClasses(response.data);
  //   } catch (error) {
  //     alert("Error fetching classes from the server.");
  //     console.error("Error fetching classes:", error);
  //   }
  // };

  // useEffect(() => {
  //   // fetchClasses();
  // }, []);

  const handleSubmit = () => {
    navigate("/invoices");
  }

  return (
    <div>
      <h3>Delete Invoice</h3>
      <p style={{color:"red", fontWeight:"bold"}}>Are you sure you would like to delete the following entry?</p>
      {/* {classes.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No classes found.</p>
        </div>
      ) : ( */}

      {/* {classes.map((class) => (
              <TableRow key={class.id} class={class} fetchClasses={fetchClasses} />
            ))} */}
    
    <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>

        <table>
          <tbody>
            <tr>
              <td>Invoice ID</td>
              <td></td>
            </tr>
            <tr>
              <td>Student ID</td>
              <td></td>
            </tr>
            <tr>
              <td>Student First</td>
              <td></td>
            </tr>
            <tr>
              <td>Student Last</td>
              <td></td>
            </tr>
            <tr>
              <td>Invoice Date</td>
              <td></td>
            </tr>
            <tr>
              <td>Invoice Total</td>
              <td></td>
            </tr>
            <tr>
              <td>Paid?</td>
              <td></td>
            </tr>
            <tr>
              <td>Comments</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
        <button type="submit" className="submitButton">Delete Invoice</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/invoices")}>
          Cancel
        </button>
      {/* )} */}
      </form>
    </div>
    
  );
};

export default DeleteInvoice;
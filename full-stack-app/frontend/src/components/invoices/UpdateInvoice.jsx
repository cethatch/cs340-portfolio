/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevInvoice = location.state.invoice;
  const [studentOptions, setStudentOptions] = useState([]);

  // Fetch students options for dropdown from the backend
  useEffect (() => {
    const fetchStudents = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "students";
            const response = await axios.get(URL);
            setStudentOptions(response.data);
        } catch (error) {
            console.log("Error fetching student options:", error);
            alert("Could not load student options");
        }
    };

    fetchStudents();
  }, []);

  const [formData, setFormData] = useState({
    studentID: prevInvoice.studentID || '',
    invoiceDate: prevInvoice.invoiceDate || '',
    invoiceTotal: prevInvoice.invoiceTotal || '',
    invoicePaid: prevInvoice.invoicePaid || '',
    comments: prevInvoice.comments || ''
  });

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type==="checkbox" ? checked : value,
    }));
  };

  const handleSelect = (event) => {
    event.target.select();
  };

  function isUpdate(){
    // Check if formData is equal to prevPerson
    if (JSON.stringify(formData) === JSON.stringify({
        studentID: prevInvoice.studentID || '',
        invoiceDate: prevInvoice.invoiceDate || '',
        invoiceTotal: prevInvoice.invoiceTotal || '',
        invoicePaid: prevInvoice.invoicePaid || '',
        comments: prevInvoice.comments || ''
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevInvoice
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "invoices/" + prevInvoice.invoiceID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating invoice");
        } else {
          alert(response.data.message);
          // Redirect to invoices page
          navigate("/invoices");
        }
      } catch (err) {
        console.log("Error updating invoices:", err);
      }
    }
  };

  return (
    <div>
      <h3>Update invoice:</h3>
      <p><span className='req'>* </span> - Required field.</p>
      
      <form onSubmit={handleSubmit} className="form-container" id="addNewForm">
        <table>
            <tbody>
            <tr>
                <td><label htmlFor="invoiceID">Invoice ID</label></td>
                <td> {prevInvoice.invoiceID} </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="studentName">Student name:</label>
                </td>
                <td>
                    <select id="studentID" 
                    name="studentID" 
                    value={formData.studentID}
                    onChange={handleInputChange}
                    style={{width: 375, height: 40, padding: 10}} 
                    >
                    <option value={""}>Select a student</option>
                    {studentOptions.map((student) => (
                    <option key={student.studentID} value={student.studentID}>
                    {student.firstName + " " + student.lastName}
                    </option>
                    ))}
                    </select>
                </td>
            </tr>

            <tr>
                <td>
                    <label htmlFor="invoiceDate">Invoice date:<span className='req'> * </span></label>
                </td>
                <td>
                    <input
                    type="date"
                    name="invoiceDate"
                    required
                    defaultValue={new Date(formData.invoiceDate).toISOString().split("T")[0]}
                    onChange={handleInputChange}
                    />
                </td>
            </tr>

            <tr>
                <td>
                    <label htmlFor="invoiceTotal">Total Due:<span className='req'> * </span></label>
                </td>
                <td>
                    <input
                    type="number"
                    name="invoiceTotal"
                    required
                    max={9999.99}
                    defaultValue={formData.invoiceTotal}
                    onChange={handleInputChange}
                    onFocus={handleSelect}
                    />
                </td>
            </tr>

            <tr>
                <td>
                    <label htmlFor="invoicePaid">Payment complete?</label>
                </td>
                <td>
                    <input
                    type="checkbox"
                    name="invoicePaid"
                    checked={formData.invoicePaid}
                    onChange={handleInputChange}
                    />
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="comments">Comments: </label>
                </td>
                <td>
                    <textarea id="comments" 
                    name="comments"
                    wrap="hard"
                    defaultValue={formData.comments}
                    onChange={handleInputChange}
                    onFocus={handleSelect}
                    style={{width: 300, height: 100}} 
                    ></textarea>
                </td>
            </tr>

        </tbody>
        </table>
        
        <button type="submit" className="submitButton">Update</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/invoices")}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default UpdateInvoice;
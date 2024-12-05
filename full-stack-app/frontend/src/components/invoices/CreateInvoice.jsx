/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateInvoice() {
  const navigate = useNavigate();
  const [studentOptions, setStudentOptions] = useState([]);

  const [formData, setFormData] = useState({
    studentID: "",
    invoiceDate: "",
    invoiceTotal: "",
    invoicePaid: "",
    comments: ""
  });

  // Fetch students options from the backend
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
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new invoice object from the formData
    const newInvoice = {
        studentID: formData.studentID,
        invoiceDate: formData.invoiceDate,
        invoiceTotal: formData.invoiceTotal,
        invoicePaid: formData.invoicePaid ? 1 : 0,
        comments: formData.comments
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "invoices";
      const response = await axios.post(URL, newInvoice);
      if (response.status === 201) {
        navigate("/invoices");
      } else {
        alert("Error creating invoices.");
      }
    } catch (error) {
      alert("Error creating invoice.");
      console.error("Error creating invoice:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
        studentID: "",
        invoiceDate: "",
        invoiceTotal: "",
        invoicePaid: "",
        comments: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type==="checkbox" ? checked : value,
    }));
  };

  return (
    <>
        <h3>Add a new invoice:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="studentName">Student name:<span className='req'> * </span></label>
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
                            value={formData.invoiceDate}
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
                            step='0.01'
                            placeholder="$0.00"
                            min={0}
                            required
                            defaultValue={formData.invoiceTotal}
                            onChange={handleInputChange}
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
                            style={{width: 300, height: 100}} 
                            ></textarea>
                            
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            <button type="submit" className="submitButton">Create Invoice</button>
            <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/invoices")}>
          Cancel
        </button>
        </form>
    </>
  );
}

export default CreateInvoice;
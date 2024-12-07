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

function CreateInstructor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    instFirstName: "",
    instLastName: "",
    phoneNumber: "",
    email: "",
    hireDate: "",
    specialty: "",
    hourlyRate: ""
  });

  const [specialtyOptions, setSpecialtyOptions] = useState([]);

  // Fetch specialty options from the backend
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "specialties";
        const response = await axios.get(URL);
        setSpecialtyOptions(response.data);
      } catch (error) {
        console.error("Error fetching specialty options:", error);
        alert("Could not load specialty options");
      }
    };

    fetchSpecialties();
  }, []);

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new person object from the formData
    const newInstructor = {
        instFirstName: formData.instFirstName,
        instLastName: formData.instLastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        hireDate: formData.hireDate,
        specialtyID: formData.specialty,
        hourlyRate: formData.hourlyRate
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "instructors";
      const response = await axios.post(URL, newInstructor);
      if (response.status === 201) {
        navigate("/instructors");
      } else {
        alert("Error creating instructor.");
      }
    } catch (error) {
      alert("Error creating instructor.");
      console.error("Error creating instructor:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
        instFirstName: "",
        instLastName: "",
        phoneNumber: "",
        email: "",
        hireDate: "",
        specialty: "",
        hourlyRate: ""
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
        <h3>Add a new instructor:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="instFirstName">First name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="instFirstName"
                            maxLength={50}
                            required
                            defaultValue={formData.instFirstName}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="instLastName">Last name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="instLastName"
                            maxLength={50}
                            required
                            defaultValue={formData.instLastName}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="phoneNumber">Phone number:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="phoneNumber"
                            maxLength={15}
                            required
                            defaultValue={formData.phoneNumber}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="email">Email: </label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="email"
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            maxLength={100}
                            defaultValue={formData.email}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="hireDate">Hire date:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="date"
                            name="hireDate"
                            required
                            defaultValue={formData.hireDate}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="specialty">Specialty: </label>
                        </td>
                        <td>
                            <select id="specialty" 
                            name="specialty" 
                            
                            value={formData.specialty}
                            onChange={handleInputChange}
                            defaultValue={formData.specialty}
                            style={{width: 300, height: 30}} 
                            >
                                <option value={""}> Select a specialty </option>
                                {specialtyOptions.map((specialty) => (
                                    <option key={specialty.specialtyID} value={specialty.specialtyID}>
                                    {specialty.specialtyName}
                                    </option>
                                    ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="hourlyRate">Hourly rate: </label>
                        </td>
                        <td>
                            <input
                            type="number"
                            name="hourlyRate"
                            placeholder="$0.00"
                            step='0.01'
                            min={0}
                            max={999.99}
                            defaultValue={formData.hourlyRate}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="submitButton">Create Instructor</button>
            <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/instructors")}>
          Cancel
        </button>
        </form>
    </>
  );
}

export default CreateInstructor;
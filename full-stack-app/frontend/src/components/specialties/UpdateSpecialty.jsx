/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateSpecialty = () => {
  const { specialtyID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevSpecialty = location.state.specialty;

  const [formData, setFormData] = useState({
    specialtyName: prevSpecialty.specialtyName || ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelect = (event) => {
    event.target.select();
  };

  function isUpdate(){
    // Check if formData is equal to prevPerson
    if (JSON.stringify(formData) === JSON.stringify({
      specialtyName: prevSpecialty.specialtyName || ''
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevSpecialty
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "specialties/" + specialtyID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating specialty");
        } else {
          alert(response.data.message);
          // Redirect to specialties page
          navigate("/specialties");
        }
      } catch (err) {
        console.log("Error updating specialty:", err);
      }
    }
  };

  return (
    <div>
      <h3>Update specialty:</h3>
      <p><span className='req'>* </span> - Required field.</p>
      
      <form onSubmit={handleSubmit} className="form-container" id="addNewForm">
        <table>
            <tbody>
            <tr>
              <td><label htmlFor="specialtyID">Specialty ID:</label></td>
              <td>{prevSpecialty.specialtyID}</td>
          </tr>
          <tr>
              <td><label htmlFor="specialtyName">Specialty Name:<span className='req'> * </span></label></td>
              <td>
                  <input
                    type="text"
                    name="specialtyName"
                    onChange={handleInputChange}
                    onFocus={handleSelect}
                    maxLength={100}
                    required
                    defaultValue={prevSpecialty.specialtyName}
                  />
              </td>
          </tr>
        
        </tbody>
        </table>
        
        <button type="submit" className="submitButton">Update Specialty</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/specialties")}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default UpdateSpecialty;
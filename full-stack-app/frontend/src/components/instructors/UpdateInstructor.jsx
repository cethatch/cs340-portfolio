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

const UpdateInstructor = () => {
  const { instructorID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevInstructor = location.state.instructor;

  const [formData, setFormData] = useState({
    instFirstName: prevInstructor.instFirstName,
    instLastName: prevInstructor.instLastName,
    phoneNumber: prevInstructor.phoneNumber,
    email: prevInstructor.email || '',
    hireDate: prevInstructor.hireDate, 
    specialtyID: prevInstructor.specialtyID || '',
    hourlyRate: prevInstructor.hourlyRate || '',
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
    // Check if formData is equal to prevInstructor
    if (JSON.stringify(formData) === JSON.stringify({
      instFirstName: prevInstructor.instFirstName || '',
      instLastName: prevInstructor.instLastName || '',
      phoneNumber: prevInstructor.phoneNumber || '',
      email: prevInstructor.email || '',
      hireDate: prevInstructor.hireDate || '',
      specialtyID: prevInstructor.specialtyID || '',
      hourlyRate: prevInstructor.hourlyRate || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevPerson
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "instructors/" + instructorID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating instructor");
        } else {
          alert(response.data.message);
          // Redirect to instructor page
          navigate("/instructors");
        }
      } catch (err) {
        console.log("Error updating instructor:", err);
      }
    }
  };

  return (
    <div>
      <h3>Update Instructor:</h3>
      <p><span className='req'>* </span> - Required field.</p>
      
      <form onSubmit={handleSubmit} className="form-container" id="addNewForm">
        <table>
            <tbody>
            
            <tr>
              <td><label htmlFor="instructorID">Instructor ID:</label></td>
              <td>
                  {instructorID}
              </td>
          </tr>
          <tr>
              <td><label htmlFor="instFirstName">First Name:<span className='req'> * </span></label></td>
              <td>
                  <input
                    type="text"
                    name="instFirstName"
                    maxLength={50}
                    onChange={handleInputChange}
                    required
                    defaultValue={prevInstructor.instFirstName}
                    onFocus={handleSelect}
                  />
              </td>
          </tr>
          <tr>
              <td><label htmlFor="instLastName">Last Name:<span className='req'> * </span></label></td>
              <td>
                  <input
                    type="text"
                    name="instLastName"
                    maxLength={50}
                    onChange={handleInputChange}
                    onFocus={handleSelect}
                    required
                    defaultValue={prevInstructor.instLastName}
                  />
              </td>
          </tr>
        
        <tr>
          <td><label htmlFor="phoneNumber">Phone number: <span className='req'> * </span></label></td>
          <td>
              <input
                type="text"
                name="phoneNumber"
                maxLength={15}
                required
                onChange={handleInputChange}
                onFocus={handleSelect}
                defaultValue={prevInstructor.phoneNumber}
              />
          </td>
        </tr>
        <tr>
              <td><label htmlFor="email">Email:</label></td>
              <td>
                  <input
                    type="text"
                    name="email"
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    maxLength={100}
                    onChange={handleInputChange}
                    onFocus={handleSelect}
                    defaultValue={prevInstructor.email}
                  />
              </td>
          </tr>
          <tr>
              <td><label htmlFor="hireDate">Hire date: <span className='req'> * </span></label></td>
              <td>
                  <input
                    type="date"
                    name="hireDate"
                    required
                    onChange={handleInputChange}
                    defaultValue={prevInstructor.hireDate ? new Date(prevInstructor.hireDate).toISOString().split('T')[0] : ""}
                    />
              </td>
          </tr>
          <tr>
            <td>
                <label htmlFor="specialtyID">Specialty: </label>
            </td>
            <td>
            <select
                  id="specialtyID"
                  name="specialtyID"
                  value={formData.specialtyID}
                  onChange={handleInputChange}
                  style={{ width: 300, height: 30 }}
                >
                  <option value={""}>Select a specialty</option>
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
                  step='0.01'
                  min={0}
                  max={999.99}
                  onFocus={handleSelect}
                  defaultValue={prevInstructor.hourlyRate}
                  onChange={handleInputChange}
                  />
              </td>
          </tr>
        </tbody>
        </table>
        
        <button type="submit" className="submitButton">Update</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/instructors")}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default UpdateInstructor;
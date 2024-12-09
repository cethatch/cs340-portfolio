/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
Citation is relevant to all code except that which pertains to the filters 
*/

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";

const UpdateRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevRegistration = location.state.registration;

  // Define state variables for filters, dropdowns, and table
  const [classOptions, setClassOptions] = useState([]);
  const [classInstances, setClassInstances] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [filters, setFilters] = useState({ className: "", classDate: "", classTime: "", kitchenLocation: "" });
  const [selectedClassInstance, setSelectedClassInstance] = useState(prevRegistration.classInstanceID);

  const [formData, setFormData] = useState({
    studentID: prevRegistration.studentID || '',
    classInstanceID: prevRegistration.classInstanceID || ''
  });

  // Fetch Students name options for dropdown
  useEffect(() => {
    const fetchStudents = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "students";
            const response = await axios.get(URL);
            setStudentOptions(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
            alert("Could not load students");
        }
    };

    fetchStudents();
  }, []);

  // Fetch class name options from the backend to use in filter
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "classes";
        const response = await axios.get(URL);
        setClassOptions(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
        alert("Could not load classes");
      }
    };

    fetchClasses();
  }, []);

  // Fetch scheduled classInstance options from the backend
  useEffect(() => {
    const fetchClassInstances = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "schedule";
        const response = await axios.get(URL);
        setClassInstances(response.data);
      } catch (error) {
        console.error("Error fetching scheduled classes:", error);
        alert("Could not load scheduled classes");
      }
    };

    fetchClassInstances();
  }, []);

  // check if the form data has been modified
  function isUpdate() {
      if (
          formData.studentID === prevRegistration.studentID &&
          selectedClassInstance.classInstanceID === prevRegistration.classInstanceID
      ) {
          alert("No changes made.");
          return false;
      }
      return true;
    }

    // Update filters when changed by user
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
      };
    
    // Filter class instances based on selected filters
    const filteredClassInstances = classInstances.filter((instance) => {
      const instanceDate = new Date(instance.classDate).toISOString().split("T")[0];
      const instanceTime = instance.classTime.slice(0, 5);
      return (
        (!filters.className || instance.className === filters.className) &&
        (!filters.classDate || instanceDate === filters.classDate) &&
        (!filters.classTime || instanceTime === filters.classTime) 
      );
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };

    const handleCheckboxChange = (classInstanceID) => {
        setSelectedClassInstance((prev) =>
          prev === classInstanceID ? null : classInstanceID 
        );
      };

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new person object from the formData
    const newRegistration = {
        studentID: formData.studentID,
        classInstanceID: selectedClassInstance
    };

    if (isUpdate()){
        try {
        const URL = import.meta.env.VITE_API_URL + "registrations/" + prevRegistration.registrationID;
        const response = await axios.put(URL, newRegistration);
        if (response.status === 200) {
            navigate("/registrations");
        } else {
            alert("Error updating instructor assignment.");
        }
        } catch (error) {
        alert("Error updating instructor assignment.");
        console.error("Error updating instructor assignment:", error);
        }
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
        studentID: "",
        classInstanceID: ""
    });
  };

  return (
    <>
      <h3>Update registration:</h3>
      <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <h4>Select a student: <span className='req'> * </span></h4>
              <select id="studentID" 
              name="studentID" 
              value={formData.studentID || ""}
              onChange={handleInputChange}
              style={{width: 375, height: 40, marginLeft: 15, padding: 10}} 
              >
                <option value={""}>Select a student</option>
                {studentOptions.map((student) => (
                  <option key={student.studentID} value={student.studentID}>
                  {student.firstName + " " + student.lastName}
                  </option>
                  ))}
              </select>
            
            <h4>Select a scheduled class: <span className='req'> * </span></h4>
            <div className="filterContainer">
              <FaFilter/>
                      <select id="className" 
                        name="className" 
                        onChange={handleFilterChange}
                        style={{width: 200, height: 30}} 
                        >
                              <option value={""}>Select a class</option>
                              {classOptions.map((class_entry) => (
                                <option key={class_entry.className} value={class_entry.className}>
                                {class_entry.className}
                                </option>
                                ))}
                                
                      </select>

                      <input
                        type="date"
                        name="classDate"
                        onChange={handleFilterChange}
                        />

                      <input
                        type="time"
                        name="classTime"
                        onChange={handleFilterChange}
                        />
            </div>

          
          {filteredClassInstances.length === 0 ? (
              <div>
                <p>No scheduled classes found with given filters.</p>
                <RiCreativeCommonsZeroFill size={100} color="pink" />
              </div>
            
          ) : (
            <table style={{width: 1000}}>
              <thead>
                <tr>
                  <th>Select a Class Instance:</th>
                  <th>ClassInstance ID</th>
                  <th>Class Name</th>
                  <th>Class Date</th>
                  <th>Class Time</th>
                  <th>Kitchen Address</th>
                </tr>
              </thead>
              <tbody>
              {filteredClassInstances.map((instance) => (
                        <tr key={instance.classInstanceID}>
                            <td>
                            {instance.classInstanceID === prevRegistration.classInstanceID ? (
                                <span>Previous</span>
                            ) : (
                                <input
                                type="checkbox"
                                name="selectedClassInstance"
                                style={{ cursor: "pointer" }}
                                checked={selectedClassInstance === instance.classInstanceID}
                                onChange={() => handleCheckboxChange(instance.classInstanceID)}
                                />
                            )}
                            </td>
                            <td>{instance.classInstanceID}</td>
                            <td>{instance.className}</td>
                            <td>{new Date(instance.classDate).toLocaleDateString()}</td>
                            <td>{new Date(`1970-01-01T${instance.classTime}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })}</td>
                            <td>{instance.kitchenLocation}</td>
                          </tr>
              ))}
              </tbody>
            </table>
          )}
        
      <button type="submit" className="submitButton">Update Assignment</button>
      <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/registrations")}> Cancel </button>
      </form>
      
    </>
  );
};

export default UpdateRegistration;
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
import { FaFilter } from "react-icons/fa";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";


function CreateRegistration() {
  const navigate = useNavigate();

  const [classOptions, setClassOptions] = useState([]);
  const [classInstances, setClassInstances] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [filters, setFilters] = useState({ className: "", classDate: "", classTime: "", kitchenLocation: "" });
  const [selectedClassInstance, setSelectedClassInstance] = useState(null);

  // Fetch class name options from the backend
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

  const [formData, setFormData] = useState({
    studentID: "",
    classID: "",
    classDate: "",
    classTime: "",
    kitchenLocation: "",
    generateInvoice: 0
  });

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
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Ensure there is a classInstance selected
    if (!selectedClassInstance) {
      alert("Please select a scheduled class before submitting.");
      return;
    }
    // Create a new Registration object from the formData
    const newRegistration = {
        studentID: formData.studentID,
        classInstanceID: selectedClassInstance.classInstanceID,
        generateInvoice: formData.generateInvoice,
        invoiceID: null
    };

    if (
      newRegistration.studentID == "" || 
      newRegistration.classInstanceID == ""
    ) {
      alert("Error: Please ensure you've selected both a student and a scheduled class.");
      return;
    }

    try {
      // Generate Invoice if requested. If this fails, the whole request will be terminated.
      const amount = selectedClassInstance.registrationCost;
      if (formData.generateInvoice) {
        const newInvoice = {
          studentID: formData.studentID,
          invoiceDate: new Date(),
          invoiceTotal: amount,
          invoicePaid: 0,
          comments: ""
        };
        
        // Send POST request to create Invoice entry
        try {
          const URL = import.meta.env.VITE_API_URL + "invoices";
          const invoice_response = await axios.post(URL, newInvoice);
          if (invoice_response.status === 201) {
            alert("New invoice auto-generated successfully.");
          } else {
            alert("Error auto-generating invoice. Request terminated. Please try again.")
          }
        } catch (error) {
          alert("Error auto-generating invoice. Request terminated. Please try again.");
          navigate("/registrations");
        }

        // Fetch the new Invoices entry and assign the invoiceID to the newRegistration obj
        try {
          const URL = import.meta.env.VITE_API_URL + "invoices/latestInvoice";
          const fetch_invoice_response = await axios.get(URL);
          if (fetch_invoice_response.status === 200) {
            newRegistration.invoiceID = fetch_invoice_response.data.invoiceID;
          }
        } catch (error) {
          alert("Error fetching the auto-generated invoice.");
          navigate("/registrations");
        }
      }
      console.log(JSON.stringify(newRegistration));
      // Now we can create the new Registration entry
      const URL = import.meta.env.VITE_API_URL + "registrations";
      const response = await axios.post(URL, newRegistration);
      if (response.status === 201) {
        navigate("/registrations");
      } else {
        alert("Error creating registration.");
      }
    } catch (error) {
      alert("Error creating registration.");
      console.error("Error creating registration:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      studentID: "",
      classID: "",
      classDate: "",
      classTime: "",
      kitchenLocation: "",
      generateInvoice: 0
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClassInstanceCheckboxChange = (classInstance) => {
    setSelectedClassInstance((prev) =>
      prev === classInstance ? null : classInstance 
    );
  };

  return (
    <>
        <h3>Add a new student registration:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <h4>Select a student: <span className='req'> * </span></h4>
              <select id="studentID" 
              name="studentID" 
              value={formData.studentID}
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
                        value={formData.className}
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
                        value={filters.classDate}
                        onChange={handleFilterChange}
                        />

                      <input
                        type="time"
                        name="classTime"
                        value={filters.classTime}
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
                              <input
                                type="checkbox"
                                name="selectedClassInstance"
                                style={{cursor: "pointer"}}
                                checked={selectedClassInstance === instance} 
                                onChange={() => handleClassInstanceCheckboxChange(instance)} 
                              />
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
            <div className="genInvoiceField">
              <h4>Automatically generate invoice? </h4>
              <input 
                type="checkbox"
                name="generateInvoice"
                style={{cursor: "pointer", scale: 150}}
                onChange={handleInputChange}
              />
            </div>
        
      <button type="submit" className="submitButton">Create Registration</button>
      <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/registrations")}> Cancel </button>
      </form>
            
    </>
  );
}

export default CreateRegistration;
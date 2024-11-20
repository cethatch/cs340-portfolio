import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./ClassesTableRow";


import axios from "axios";

const ClassesTable = () => {
  const [classes, setClasses] = useState([]);


  const fetchClasses = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "classes";
      const response = await axios.get(URL);
      setClasses(response.data);
    } catch (error) {
      alert("Error fetching classes from the server.");
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <h3>Classes Table</h3>
      {classes.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No classes found.</p>
        </div>
      ) : (
      <div>
        <table>
          <thead>
            <tr>
              <th>Class ID</th>
              <th>Class Name</th>
              <th>Duration (minutes)</th>
              <th>Registration Cost (USD)</th>
              <th>Description</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((class_entry) => (
              <TableRow key={class_entry.classID} class_entry={class_entry} fetchClasses={fetchClasses}/>
            ))}
          </tbody>
        </table>
        <p><em className="alertFont">Note: Class entries may not be deleted.</em></p>
        </div>
      )} 
    </div>
  );
};

export default ClassesTable;
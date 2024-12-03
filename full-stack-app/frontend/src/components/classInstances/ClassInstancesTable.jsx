/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./ClassInstancesTableRow";
import axios from "axios";

const ClassInstancesTable = () => {
  const [classInstances, setClassInstances] = useState([]);

  const fetchClassInstances = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "schedule";
      const response = await axios.get(URL);
      setClassInstances(response.data);
    } catch (error) {
      alert("Error fetching scheduled classes from the server.");
      console.error("Error fetching scheduled classes:", error);
    }
  };

  useEffect(() => {
    fetchClassInstances();
  }, []);

  return (
    <>
      <h3>Class Schedule Table</h3>
      {classInstances.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No scheduled classes found.</p>
        </div>
      ) : (
        <>
        <table>
          <thead>
            <tr>
              <th>ClassInstance ID</th>
              <th>Class Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Kitchen Address</th>
              <th>Private Event?</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {classInstances.map((classInstance) => (
              <TableRow key={classInstance.classInstanceID} classInstance={classInstance} fetchClassInstances={fetchClassInstances} />
            ))}
          </tbody>
        </table>
        <p><em className="alertFont">Note: ClassInstance/Schedule table entries may not be deleted.</em></p>
        </>
     )}
    </>
  );
};

export default ClassInstancesTable;
/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./KitchensTableRow";
import axios from "axios";

const KitchensTable = () => {
  const [kitchens, setKitchens] = useState([]);

  const fetchKitchens = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "kitchens";
      const response = await axios.get(URL);
      setKitchens(response.data);
    } catch (error) {
      alert("Error fetching kitchens from the server.");
      console.error("Error fetching kitchens:", error);
    }
  };

  useEffect(() => {
    fetchKitchens();
  }, []);

  return (
    <>
      <h2>Kitchens Table</h2>
      {kitchens.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No kitchens found.</p>
        </div>
      ) : (
        <div>
        <table>
          <thead>
            <tr>
              <th>Kitchen ID</th>
              <th>Kitchen Address</th>
              <th>Room Capacity (persons)</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {kitchens.map((kitchen) => (
              <TableRow key={kitchen.kitchenID} kitchen={kitchen} fetchKitchens={fetchKitchens} />
            ))}
          </tbody>
        </table></div>
     )} 
    </> 
    
  );
};

export default KitchensTable;
import React from "react";
import { FaRegEdit } from "react-icons/fa";

function ClassesPage() {
    return (
        <>
        <main>
            <section>
                <h2>Culinary Classes</h2>
                
                <article>
                    <table>
                        <tbody>
                            <tr>
                                <th>Class ID</th>
                                <th>Class Name</th>
                                <th>Duration (Minutes)</th>
                                <th>Registration Cost (USD)</th>
                                <th>Description</th>
                                <th>Edit</th>
                            </tr>
                            <tr>
                                
                                <td>1</td>
                                <td>Sushi Rolling Basics</td>
                                <td>90</td>
                                <td>$65.00</td>
                                <td>Learn how to prepare and roll sushi from scratch.</td>
                                <td class="editButton"><FaRegEdit /></td>

                            </tr>
                            
                        </tbody>
                    </table>

                    <p><em>Note: Class entries may not be deleted.</em></p>

                </article>
                
                <article id="addNewForm">
                <h3>Add a new class:</h3>
                <p><span class='req'>* </span> - Required field.</p>
                    <div class="form-container">
                        <table>
                            <tbody>
                                <tr>
                                    <td><label for="name">New class name: </label><span class="req">* </span></td>
                                    <td><input type="text" height="50" maxlength="100" required></input></td>
                                </tr>

                                <tr>
                                    <td><label for="duration">Class duration (minutes): </label></td>
                                    <td><input type="number" id="duration" name="duration"></input></td>
                                </tr>

                                <tr>
                                    <td><label for="cost">Cost (USD): </label></td>
                                    <td><input type="number" id="cost" name="cost" placeholder="$0.00"></input></td>
                                </tr>

                                <tr>
                                    <td><label for="description">Class description: </label></td>
                                    <td><input type="text" id="description" name="description"></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="submitButton">Submit</button>
                    </div>
                    
                </article>    
           
            </section>


        </main>
        </>
    );
}

export default ClassesPage
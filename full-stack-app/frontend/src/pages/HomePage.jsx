/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";

function HomePage() {
    return (
        <>
        <main>
        <section>
            <h2>Home Page</h2>
            
            <article id="aboutDB">
                <h3>Project Description</h3>
                <p> 
                    GigaBite Culinary Classes is a unique, casual cooking school 
                    designed for food lovers of all skill levels. Across both locations 
                    in Seattle and San Francisco, the company welcomes 5,000 new and 
                    returning students each year for a fun, social environment to explore 
                    their culinary creativity. Each location hosts 250 classes annually, 
                    or about 5 classes per week, in various teaching kitchens. Students 
                    may register for multiple classes, and each class may have one or more 
                    instructors. Each location employs approximately 10 instructors. 
                    Combined with two administrative personnel, one for each geographical 
                    location, the company has a total of 23 employees. This project’s 
                    goal is to design and implement a database driven website to track 
                    student, instructor, and class data for GigaBite Culinary Classes. The 
                    completed tool will facilitate administrative tasks such as scheduling 
                    upcoming classes, student registration, tracking enrollment, and collecting 
                    billing information. The billing and payroll will be handled by a separate 
                    external system but will rely on information collected by the database 
                    that will make the processes run smoothly. By centralizing this 
                    information, the database-driven website will streamline operations, and 
                    provide the foundation for efficient growth while ensuring that GigaBite 
                    Culinary Classes can continue offering exceptional culinary experiences.

                </p>
                <h3>Database Entity Tables</h3>
                <p>
                    The database we have designed includes the tables described below. Many-to-many relationships are resolved using two intersection tables: 
                     ClassInstructors and Registrations. 
                </p>
                <table className="tableDescriptions">
                    <tbody>
                        <tr>
                            <th>Table Name</th>
                            <th>Table Description</th>
                            <th>CRUD Operations Supported</th>
                        </tr>
                        <tr>
                            <td><strong>Classes</strong></td>
                            <td>This table stores information about class types. The class names in this table are all unique. Other information stored in this table
                                includes the duration, registration cost, and description of a class type. Entries in this table may <em>not</em> be deleted. They may, 
                                however, be updated. 
                            </td>
                            <td>
                                <p>Create</p>
                                <p>Read</p>
                                <p>Update</p>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Kitchens</strong></td>
                            <td>The Kitchens table stores information about instructional kitchens where classes are hosted. Attributes in this table include 
                                the kitchen's address and persons capacity. Entries in this table may be updated and deleted following their creation. 
                            </td>
                            <td>
                                <p>Create</p>
                                <p>Read</p>
                                <p>Update</p>
                                <p>Delete</p>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>ClassInstances</strong></td>
                            <td>ClassInstances, called schedule on the website, is used to store information about individual occurances of a class. Because the school 
                                may have many scheduled classes of the same type, we've introduced this table to reduce redundant data and to eliminate dependencies. 
                            </td>
                            <td>
                                <p>Create</p>
                                <p>Read</p>
                                <p>Update</p>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Instructors</strong></td>
                            <td>The Instructors table stores information about the school's instructors. Attributes include: name, phone number, email, date hired, 
                                specialty, and their pay rate. Entries in this table may be updated or deleted.
                            </td>
                            <td>
                                <p>Create</p>
                                <p>Read</p>
                                <p>Update</p>
                                <p>Delete</p>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>ClassInstructors</strong></td>
                            <td>ClassInstructors, called "Instructor Assignments" on the website, is an <strong>intersection table</strong> that facilitates 
                                the relationship between <strong>ClassInstances</strong> (a scheduled class) and <strong>Instructors</strong>. This table enables our database 
                                to accomodate a scheduled class having one or more instructors, and an instructor having  
                                zero or many ClassInstances.
                            </td>
                            <td>
                                <p>Create</p>
                                <p>Read</p>
                                <p>Update</p>
                                <p>Delete</p>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Specialties</strong></td>
                            <td>The Specialties table stores a specialties which may be held by instructors. The specialty's name is unique in the Specialties table. 
                                This table was introduced to eliminate redundant data where many instructors have the same specialty name. Entries may be updated or deleted. 
                            </td>
                            <td>
                                <p>Create</p>
                                <p>Read</p>
                                <p>Update</p>
                                <p>Delete</p>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Students</strong></td>
                            <td>The Students table stores information about students registered with the school. Attributes include: name, phone number, and email. 
                                Students entries may be updated or deleted.
                            </td>
                            <td>
                                <p>Create</p>
                                <p>Read</p>
                                <p>Update</p>
                                <p>Delete</p>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Registrations</strong></td>
                            <td>Registrations is an <strong>intersection table</strong> that's purpose is to resolve the many-to-many relationship between Students 
                            and ClassInstances. A student may register for zero or many class instances, and a class instance may have zero or many students. Entries 
                            in this table may be updated or deleted after creation. In addition to offering users the ability to create single entry in the Registrations 
                            table, we have also added the ability to auto-generate an entry in the Invoices table which the registration entry would point to using the 
                            invoiceID foreign key. The user may also opt against this option.  
                            </td>
                            <td>
                                <p>Create</p>
                                <p>Read</p>
                                <p>Update</p>
                                <p>Delete</p>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Invoices</strong></td>
                            <td>The Invoices table manages data relating to the amount due for registering for a class. Each invoice entry is tied to an individual 
                                student, and contains attributes for the invoice date, amount, pay status, and a comments field. Invoices may not be deleted, but they may 
                                be updated following creation.
                            </td>
                            <td>
                                <p>Create</p>
                                <p>Read</p>
                                <p>Update</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </article>

            </section>
        </main>
        </>
    );
}

export default HomePage
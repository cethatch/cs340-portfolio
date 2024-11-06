import React from "react";

function InstructorsPage() {
    return (
        <>
        <main>
        <section>
            <h2>Instructors</h2>
            
            <article>
                <table>
                    <tbody>
                        <tr>
                            <th>Instructor ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Hire Date</th>
                            <th>Specialty ID</th>
                            <th>Hourly Rate</th>
                            <th>Delete Entry</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Olivia</td>
                            <td>Garcia</td>
                            <td>212-555-1234</td>
                            <td>olivia.garcia@email.com</td>
                            <td>2021-04-15</td>
                            <td>4</td>
                            <td>$61.00</td>
                            <td>
                                <div class="deleteButton">
                                    <button>
                                        Delete
                                    </button>
                                </div>
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

export default InstructorsPage
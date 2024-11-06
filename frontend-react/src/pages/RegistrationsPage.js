import React from "react";

function RegistrationsPage() {
    return (
        <>
        <main>
        <section>
            <h2>Registrations</h2>
            
            <article>
                <table>
                    <tbody>
                        <tr>
                            <th>Registration ID</th>
                            <th>Student ID</th>
                            <th>Class Instance ID</th>
                            <th>Invoice ID</th>
                            <th>Delete Entry</th>
                        </tr>
                        <tr>
                            
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
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

export default RegistrationsPage
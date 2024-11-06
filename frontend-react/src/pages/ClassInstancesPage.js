import React from "react";

function ClassInstancesPage() {
    return (
        <>
        <main>
        <section>
            <h2>Schedule of Classes</h2>
            
            <article>
                <table>
                    <tbody>
                        <tr>
                            <th>ClassInstance ID</th>
                            <th>Class ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Kitchen ID</th>
                            <th>Private Event?</th>
                            <th>Delete Entry</th>
                        </tr>
                        <tr>
                            
                            <td>1</td>
                            <td>1</td>
                            <td>2024-11-15</td>
                            <td>5:30PM PST</td>
                            <td>2</td>
                            <td>No</td>
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

export default ClassInstancesPage
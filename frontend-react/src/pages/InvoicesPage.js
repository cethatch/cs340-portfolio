import React from "react";

function InvoicesPage() {
    return (
        <>
        <main>
        <section>
            <h2>Invoices</h2>
            
            <article>
                <table>
                    <tbody>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Student ID</th>
                            <th>Invoice Date</th>
                            <th>Invoice Total</th>
                            <th>Paid?</th>
                            <th>Comments</th>
                            <th>Delete Entry</th>
                        </tr>
                        <tr>
                            
                            <td>1</td>
                            <td>1</td>
                            <td>2024-11-30</td>
                            <td>$145.00</td>
                            <td>TRUE</td>
                            <td>None</td>
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

export default InvoicesPage
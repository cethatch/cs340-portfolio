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

                        </tr>
                        <tr>
                            
                            <td>1</td>
                            <td>1</td>
                            <td>2024-11-30</td>
                            <td>$145.00</td>
                            <td>TRUE</td>
                            <td>None</td>
                        </tr>
                        
                    </tbody>
                </table>

                <p><em>Note: Invoice entries may not be deleted.</em></p>

            </article>

        </section>
        </main>
        </>
    );
}

export default InvoicesPage
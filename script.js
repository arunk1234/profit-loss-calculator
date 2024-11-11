// Feature flag for enabling/disabling the feedback feature
const ENABLE_FEEDBACK_FEATURE = false; // Set to false to disable the feedback functionality

// Fetch IP address using ipify API
let userIP = "Unknown"; // Default if IP fetch fails

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        userIP = data.ip;
    })
    .catch(error => {
        console.error("Error fetching IP:", error);
    });

// Function to submit feedback
function submitFeedback() {
    if (!ENABLE_FEEDBACK_FEATURE) {
        return; // Skip the feedback functionality if the feature is disabled
    }

    const name = document.getElementById('name').value || "Anonymous";
    const feedbackText = document.getElementById('feedbackText').value;
    if (!feedbackText) {
        alert("Please enter feedback before submitting.");
        return;
    }

    // Updated URL with the new deployment
    const url = "https://script.google.com/macros/s/AKfycbyy-fsy52HAD2TL0DXBV1ufseinELdu13d4VfVe2qv-p_foPn9tSJzJc-47L_ktpctFBw/exec"; // Replace with your new Google Apps Script Web App URL

    // Create JSON data to send
    const jsonData = {
        ip: userIP,
        name: name,
        feedback: feedbackText
    };

    // Create an HTTP POST request with JSON content type
    fetch(url, {
        method: 'POST',
        mode: "cors", // Important for cross-origin requests
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(jsonData) // Convert JSON data to string format
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            alert("Thank you for your feedback!");
            document.getElementById('name').value = "";         // Clear name
            document.getElementById('feedbackText').value = ""; // Clear feedback
            toggleFeedback();                                  // Close the form
        } else {
            alert("Error submitting feedback. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error submitting feedback. Please try again.");
    });
}

// Function to generate the profit table
function generateProfitTable() {
    const priceAtInvestment = parseFloat(document.getElementById("priceAtInvestment").value);
    const amountInvested = parseFloat(document.getElementById("amountInvested").value);
    const targetPrice = parseFloat(document.getElementById("targetPrice").value);
    const targetProfit = parseFloat(document.getElementById("targetProfit").value);

    if (isNaN(priceAtInvestment) || isNaN(amountInvested) || priceAtInvestment <= 0 || amountInvested <= 0) {
        document.getElementById("result").innerText = "Please enter valid positive numbers for price at investment and amount invested.";
        return;
    }

    const quantity = amountInvested / priceAtInvestment;

    function formatDollar(amount) {
        return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    let resultHTML = "";

    if (!isNaN(targetProfit) && targetProfit > 0) {
        const requiredPrice = priceAtInvestment + (targetProfit / quantity);
        resultHTML += `
            <table>
                <tr>
                    <th>Target Profit</th>
                    <th>Target Price Required</th>
                </tr>
                <tr style="background-color: #c8e6c9; font-weight: bold;">
                    <td>$${formatDollar(targetProfit)}</td>
                    <td>$${formatDollar(requiredPrice)}</td>
                </tr>
            </table>
        `;
    } else if (!isNaN(targetPrice) && targetPrice > 0) {
        const profitOrLoss = quantity * (targetPrice - priceAtInvestment);
        resultHTML += `
            <table>
                <tr>
                    <th>Target Price</th>
                    <th>Profit/Loss</th>
                </tr>
                <tr style="background-color: #c8e6c9; font-weight: bold;">
                    <td>$${formatDollar(targetPrice)}</td>
                    <td>${profitOrLoss >= 0 ? '$' : '-$'}${formatDollar(Math.abs(profitOrLoss))}</td>
                </tr>
            </table>
        `;
    } else {
        resultHTML += `
            <table>
                <tr>
                    <th>Price Increase (0.1 cents)</th>
                    <th>New Price</th>
                    <th>Profit</th>
                </tr>
        `;

        for (let i = 1; i <= 20; i++) {
            const increaseInDollars = i * 0.001;
            const newPrice = priceAtInvestment + increaseInDollars;
            const profit = quantity * increaseInDollars;

            const rowClass = (i % 5 === 0) ? "highlight" : "";

            resultHTML += `
                <tr class="${rowClass}">
                    <td>${(i * 0.1).toFixed(1)} cent(s)</td>
                    <td>$${formatDollar(newPrice)}</td>
                    <td>$${formatDollar(profit)}</td>
                </tr>
            `;
        }

        resultHTML += "</table>";
    }

    document.getElementById("result").innerHTML = resultHTML;
}

// Function to toggle feedback form visibility
function toggleFeedback() {
    if (!ENABLE_FEEDBACK_FEATURE) {
        return; // Do nothing if the feedback feature is disabled
    }
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.style.display = feedbackForm.style.display === 'none' || feedbackForm.style.display === '' ? 'block' : 'none';
}

// On page load, show or hide the feedback section based on the feature flag
window.onload = function() {
    if (ENABLE_FEEDBACK_FEATURE) {
        document.getElementById('feedbackContainer').style.display = 'block';
    }
};

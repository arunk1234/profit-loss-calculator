document.getElementById('profitForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const purchase = parseFloat(document.getElementById('purchase').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    if (isNaN(purchase) || isNaN(quantity) || purchase <= 0 || quantity <= 0) {
        document.getElementById('result').innerHTML = '<p style="color:red">Please enter valid values.</p>';
        return;
    }
    let html = '<table><tr><th>Sell Price</th><th>Profit</th></tr>';
    for (let i = 1; i <= 10; i++) {
        let sell = (purchase + i * 0.01).toFixed(3);
        let profit = ((sell - purchase) * quantity).toFixed(2);
        let rowClass = i % 2 === 0 ? 'even-row' : 'odd-row';
        html += `<tr class="${rowClass}"><td>$${sell}</td><td>$${profit}</td></tr>`;
    }
    html += '</table>';
    document.getElementById('result').innerHTML = html;
});

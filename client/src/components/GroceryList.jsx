import { useState } from 'react';

export default function GroceryList({ groceryList }) {
  const [copied, setCopied] = useState(false);

  const total = groceryList.reduce((sum, item) => sum + (item.estimatedCostINR || 0), 0);

  function copyToClipboard() {
    const text = groceryList
      .map((item) => `${item.item} — ${item.quantity} (~₹${item.estimatedCostINR})`)
      .join('\n');
    navigator.clipboard.writeText(text + `\n\nTotal: ₹${total}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <table className="grocery-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th className="cost-cell">Est. Cost</th>
          </tr>
        </thead>
        <tbody>
          {groceryList.map((item, i) => (
            <tr key={i}>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td className="cost-cell">₹{item.estimatedCostINR}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grocery-total">
        <span>Total Estimated Cost</span>
        <span>₹{total}</span>
      </div>

      <button className="btn-copy" onClick={copyToClipboard}>
        {copied ? 'Copied!' : 'Copy List'}
      </button>
    </div>
  );
}

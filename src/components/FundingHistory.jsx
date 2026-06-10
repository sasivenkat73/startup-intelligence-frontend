import "./FundingHistory.css";

function FundingHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="funding-history">
        <h2>Funding History</h2>
        <p>No funding history available.</p>
      </div>
    );
  }

  return (
    <div className="funding-history">
      <h2>Funding History</h2>

      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Amount</th>
            <th>Investors</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.fundingStage}</td>

              <td>{item.fundingAmount}</td>

              <td>{item.investors}</td>

              <td>{item.fundingDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FundingHistory;

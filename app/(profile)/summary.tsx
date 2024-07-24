//Summary View that- Displays a summary of journal entries over a selected period i.e. daily,weekly, monthly?
import React from 'react';

interface SummaryViewProps {
  journalEntries: any[];
  selectedPeriod: string; // 'daily', 'weekly', or 'monthly'
}

const SummaryView: React.FC<SummaryViewProps> = ({
  journalEntries,
  selectedPeriod,
}) => {
  const summary = journalEntries.reduce((acc, entry) => {
    // logic to summarize journal entries based on selected period
    // ...
    //selectedPeriod='2024-07-15';
    return acc;
  }, {});

  return (
    <div>
      <h2>Summary View</h2>
      <p>Selected Period: {selectedPeriod}</p>
      <ul>
        {Object.keys(summary).map((key) => (
          <li key={key}>
            {key}: {summary[key]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryView;
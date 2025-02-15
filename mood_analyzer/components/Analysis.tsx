'use client';

import { useState, useEffect } from 'react';

const Analysis = (entry) => {
  const [analysis, setAnalysis] = useState(entry);
  // // const [analysisData, setAnalysisData] = useSt

  // // const { mood, summary, color, subject, negative } = analysis;
  console.log('ETNRY IN ANALYSIS', entry);

  useEffect(() => {
    setAnalysis(entry);
  }, [entry]);
  const analysisData = [
    {
      name: 'Summary',
      value: analysis.analysis ? analysis.analysis.summary : null,
    },
    {
      name: 'Subject',
      value: analysis.analysis ? analysis.analysis.subject : null,
    },
    { name: 'Mood', value: analysis.analysis ? analysis.analysis.mood : null },
    {
      name: 'Negative',
      value: analysis.analysis
        ? analysis.analysis.negative
          ? 'True'
          : 'False'
        : null,
    },
  ];

  return (
    <div className="border-l border-black/10">
      <div
        className="px-6 py-10"
        style={{
          backgroundColor: analysis ? analysis?.analysis?.color : null,
        }}
      >
        <h2 className="text-2xl">Analysis</h2>
      </div>
      <div>
        <ul>
          {analysisData.map((item) => (
            <li
              key={item.name}
              className="px-2 py-4 flex items-center justify-between border-b
                border-t border-black/10"
            >
              <span className="text-lg font-semibold">{item.name}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analysis;

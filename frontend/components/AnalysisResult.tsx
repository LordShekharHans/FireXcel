'use client';

import { parseAnalysis, ParsedAnalysisItem } from '@/lib/analysis/parser';
import { useState, useEffect } from 'react';



interface AnalysisResultProps {
  analysis: string;
}

interface AnalysisItem extends ParsedAnalysisItem {
  checked: boolean;
  detailsChecked: boolean[];
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  const [items, setItems] = useState<AnalysisItem[]>(() => {
    const parsedItems = parseAnalysis(analysis);
    return parsedItems.map(item => ({
      ...item,
      checked: item.status === 'pass',
      detailsChecked: new Array(item.details.length).fill(item.status === 'pass')
    }));
  });

  useEffect(() => {
    const parsedItems = parseAnalysis(analysis);
    setItems(parsedItems.map(item => ({
      ...item,
      checked: item.status === 'pass',
      detailsChecked: new Array(item.details.length).fill(item.status === 'pass')
    })));
  }, [analysis]);

  const toggleMainCheckbox = (index: number) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const newChecked = !newItems[index].checked;
      newItems[index] = {
        ...newItems[index],
        checked: newChecked,
        detailsChecked: newItems[index].detailsChecked.map(() => newChecked),
        status: newChecked ? 'pass' : 'warning'
      };
      return newItems;
    });
  };

  const toggleDetailCheckbox = (itemIndex: number, detailIndex: number) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const newDetailsChecked = [...newItems[itemIndex].detailsChecked];
      newDetailsChecked[detailIndex] = !newDetailsChecked[detailIndex];
      
      const allChecked = newDetailsChecked.every(checked => checked);
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        detailsChecked: newDetailsChecked,
        checked: allChecked,
        status: allChecked ? 'pass' : 'warning'
      };
      
      return newItems;
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-6">Safety Analysis Results</h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleMainCheckbox(index)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                  {item.category}
                  <StatusBadge status={item.status} />
                </h4>
                <ul className="mt-2 space-y-2 text-black">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={item.detailsChecked[idx]}
                        onChange={() => toggleDetailCheckbox(index, idx)}
                        className="mt-1 h-3 w-3 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-gray-600 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'pass' | 'fail' | 'warning' }) {
  const styles = {
    pass: 'bg-green-100 text-green-800',
    fail: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800'
  };

  const labels = {
    pass: 'Compliant',
    fail: 'Non-Compliant',
    warning: 'Needs Review'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
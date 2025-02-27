'use client';

import { useState } from 'react';

interface PracticeDetail {
  text: string;
  checked: boolean;
}

interface Practice {
  id: string;
  title: string;
  description: string;
  category: string;
  checked: boolean;
  details: PracticeDetail[];
}

const initialPractices: Practice[] = [
  {
    id: 'emergency-lighting',
    title: 'Emergency Lighting',
    description: 'Essential for safe evacuation during power outages',
    category: 'Fire Safety',
    checked: false,
    details: [
      { text: 'Strategic placement along escape routes for safe evacuation', checked: false },
      { text: 'Adequate illumination of escape routes', checked: false },
      { text: 'Clear indication of emergency light locations', checked: false },
      { text: 'Proper placement of exit signs', checked: false },
      { text: 'Backup power systems for emergency lighting', checked: false },
      { text: 'Regular testing and maintenance schedule', checked: false },
      { text: 'Photoluminescent markings for low-level lighting', checked: false },
      { text: 'Emergency lighting control systems', checked: false },
      { text: 'Battery backup duration compliance', checked: false }
    ]
  },
  {
    id: 'building-code-compliance',
    title: 'Building Code Compliance',
    description: 'Comprehensive compliance with building safety regulations',
    category: 'Fire Safety',
    checked: false,
    details: [
      { text: 'Occupancy Load Calculations must be documented', checked: false },
      { text: 'Travel Distances within acceptable limits', checked: false },
      { text: 'Fire Resistance Ratings for walls, floors, and doors', checked: false },
      { text: 'Specific Fire Codes (NFPA, IBC) must be specified', checked: false },
      { text: 'ADA compliance for emergency exits', checked: false },
      { text: 'Minimum corridor widths maintained', checked: false },
      { text: 'Fire separation requirements met', checked: false },
      { text: 'Stairwell pressurization systems', checked: false },
      { text: 'Fire door specifications and ratings', checked: false },
      { text: 'Emergency power systems compliance', checked: false }
    ]
  },
  {
    id: 'fire-protection-systems',
    title: 'Fire Protection Systems',
    description: 'Comprehensive fire detection and suppression systems',
    category: 'Fire Safety',
    checked: false,
    details: [
      { text: 'Automatic sprinkler system coverage', checked: false },
      { text: 'Fire alarm system placement and coverage', checked: false },
      { text: 'Smoke detector locations and spacing', checked: false },
      { text: 'Fire extinguisher types and placement', checked: false },
      { text: 'Manual pull station locations', checked: false },
      { text: 'Fire department connection points', checked: false },
      { text: 'Standpipe system requirements', checked: false },
      { text: 'Fire pump specifications', checked: false },
      { text: 'Water supply calculations', checked: false },
      { text: 'Smoke control systems', checked: false }
    ]
  },
  {
    id: 'emergency-planning',
    title: 'Emergency Planning',
    description: 'Comprehensive emergency response procedures',
    category: 'Fire Safety',
    checked: false,
    details: [
      { text: 'Evacuation route planning and signage', checked: false },
      { text: 'Emergency response procedures documented', checked: false },
      { text: 'Assembly point designations', checked: false },
      { text: 'Communication systems for emergency situations', checked: false },
      { text: 'Regular fire drills scheduled', checked: false },
      { text: 'Emergency responder access routes', checked: false },
      { text: 'Occupant notification systems', checked: false },
      { text: 'Emergency operations center location', checked: false },
      { text: 'Evacuation assistance plans for disabled occupants', checked: false }
    ]
  },
  {
    id: 'hazardous-materials',
    title: 'Hazardous Materials Management',
    description: 'Proper handling and storage of hazardous materials',
    category: 'Fire Safety',
    checked: false,
    details: [
      { text: 'Hazardous material storage locations', checked: false },
      { text: 'Ventilation systems for hazardous areas', checked: false },
      { text: 'Secondary containment systems', checked: false },
      { text: 'Emergency shower and eyewash stations', checked: false },
      { text: 'Chemical inventory management', checked: false },
      { text: 'Proper labeling and signage', checked: false },
      { text: 'Spill response equipment locations', checked: false }
    ]
  },
  {
    id: 'electrical-safety',
    title: 'Electrical Safety Systems',
    description: 'Electrical system safety and compliance',
    category: 'Fire Safety',
    checked: false,
    details: [
      { text: 'Electrical panel clearances', checked: false },
      { text: 'Emergency power shutdown locations', checked: false },
      { text: 'Arc flash protection requirements', checked: false },
      { text: 'Electrical room fire ratings', checked: false },
      { text: 'Lightning protection systems', checked: false },
      { text: 'Grounding and bonding systems', checked: false },
      { text: 'Emergency generator locations', checked: false }
    ]
  }
];

export default function CodingPractices() {
  const [practices, setPractices] = useState<Practice[]>(initialPractices);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleMainCheckbox = (practiceId: string) => {
    setPractices(prevPractices => {
      return prevPractices.map(practice => {
        if (practice.id === practiceId) {
          const newChecked = !practice.checked;
          return {
            ...practice,
            checked: newChecked,
            details: practice.details.map(detail => ({
              ...detail,
              checked: newChecked
            }))
          };
        }
        return practice;
      });
    });
  };

  const toggleDetailCheckbox = (practiceId: string, detailIndex: number) => {
    setPractices(prevPractices => {
      return prevPractices.map(practice => {
        if (practice.id === practiceId) {
          const newDetails = practice.details.map((detail, idx) =>
            idx === detailIndex ? { ...detail, checked: !detail.checked } : detail
          );
          const allChecked = newDetails.every(detail => detail.checked);
          return {
            ...practice,
            checked: allChecked,
            details: newDetails
          };
        }
        return practice;
      });
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Fire Safety Compliance Checklist</h2>
      <div className="space-y-6">
        {practices.map(practice => (
          <div key={practice.id} className="border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              {/* <input
                type="checkbox"
                checked={practice.checked}
                onChange={() => toggleMainCheckbox(practice.id)}
                className="mt-1.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              /> */}
              <div className="flex-1">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(practice.id)}
                >
                  <div>
                    <div className="font-medium text-gray-900">{practice.title}</div>
                    <div className="text-sm text-gray-500">{practice.description}</div>
                  </div>
                  <button className="ml-2 text-gray-400 hover:text-gray-600">
                    {expandedItems[practice.id] ? '−' : '+'}
                  </button>
                </div>
                {expandedItems[practice.id] && (
                  <ul className="mt-3 space-y-2 ml-6">
                    {practice.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={detail.checked}
                          onChange={() => toggleDetailCheckbox(practice.id, index)}
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">{detail.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
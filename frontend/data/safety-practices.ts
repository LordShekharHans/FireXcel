import { Practice } from "@/types/safety";

export const initialPractices: Practice[] = [
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
      { text: 'Fire separation requirements met', checked: false }
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
      { text: 'Fire department connection points', checked: false }
    ]
  }
];
export interface ParsedAnalysisItem {
    category: string;
    details: string[];
    status: 'pass' | 'fail' | 'warning';
  }
  
  export function parseAnalysis(analysis: string): ParsedAnalysisItem[] {
    const sections = analysis.split(/\d+\.\s+/).filter(Boolean);
    const categories = [
      'Fire exits and emergency routes',
      'Fire extinguisher locations',
      'Smoke detector placement',
      'Sprinkler system coverage',
      'Emergency lighting',
      'Building code compliance'
    ];
  
    return categories.map((category, index) => {
      const section = sections[index] || '';
      const lines = section
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('*'))
        .map(line => line.replace(/^[•-]\s*/, ''));
  
      let status: 'pass' | 'fail' | 'warning' = 'warning';
      const contentLower = section.toLowerCase();
      
      if (contentLower.includes('compliant') || contentLower.includes('adequate')) {
        status = 'pass';
      } else if (contentLower.includes('missing') || contentLower.includes('non-compliant')) {
        status = 'fail';
      }
  
      return {
        category,
        details: lines.length ? lines : ['No specific details provided'],
        status
      };
    });
  }
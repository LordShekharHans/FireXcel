import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { Inspection } from '@/types/inspection';
import './Gantt.css';

interface GanttProps {
  inspections: Inspection[];
}

const Gantt: React.FC<GanttProps> = ({ inspections }) => {
  const ganttContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ganttContainer.current) return;

    // Configure gantt
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.scale_height = 50;
    gantt.config.row_height = 40;
    gantt.config.task_height = 30;
    gantt.config.readonly = true;
    gantt.config.drag_links = false;
    gantt.config.drag_progress = false;
    gantt.config.drag_resize = false;
    gantt.config.drag_move = false;

    // Configure scales
    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F %Y" },
      { unit: "day", step: 1, format: "%j" }
    ];

    // Configure columns
    gantt.config.columns = [
      { name: "text", label: "Application", tree: true, width: 200 },
      { name: "start_date", label: "Date", align: "center", width: 100 },
      { name: "status", label: "Status", align: "center", width: 100 }
    ];

    // Custom task background colors
    gantt.templates.task_class = (start, end, task) => {
      switch (task.status) {
        case 'FSC APPLIED': return 'task-blue';
        case 'FSC REJECTED': return 'task-red';
        case 'INSPECTION COMPLETED': return 'task-green';
        default: return 'task-gray';
      }
    };

    // Initialize gantt
    gantt.init(ganttContainer.current);

    // Convert inspections to gantt data format
    const tasks = {
      data: inspections.map(inspection => ({
        id: inspection.inspectionId,
        text: `Application #${inspection.applicationId}`,
        start_date: new Date(inspection.inspectionDate).toISOString().split('T')[0],
        duration: 1,
        status: inspection.result,
        progress: 1,
        comments: inspection.comments
      })),
      links: []
    };

    gantt.parse(tasks);

    return () => {
      gantt.clearAll();
    };
  }, [inspections]);

  return (
    <div 
      ref={ganttContainer}
      style={{ width: '100%', height: '600px' }}
      className="gantt-chart"
    />
  );
};

export default Gantt;
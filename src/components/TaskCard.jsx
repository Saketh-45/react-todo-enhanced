
import React from "react";
import PriorityBadge from "./PriorityBadge";
import { formatDateShort } from "../utils/dateUtils";

export default function TaskCard({task, onToggle, onDelete, onSetPriority}){
  return (
    <div className="task-card">
      <div className="task-left">
        <button className="checkbox" onClick={()=>onToggle(task.id)}>
          {task.completed ? "✓" : ""}
        </button>
        <div style={{minWidth:0}}>
          <div className="task-title" style={{textDecoration:task.completed?"line-through":"none"}}>
            {task.title}
          </div>
          <div className="task-meta">
            {task.dueDate ? `Due: ${formatDateShort(task.dueDate)}` : "No due date"} · {task.notes || "No notes"}
          </div>
        </div>
      </div>
      <div className="controls">
        <PriorityBadge priority={task.priority} />
        <select className="select" value={task.priority || ""} onChange={(e)=>onSetPriority(task.id, e.target.value)}>
          <option value="">Set priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className="small-btn" onClick={()=>onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

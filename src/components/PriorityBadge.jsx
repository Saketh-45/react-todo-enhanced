
import React from "react";

export default function PriorityBadge({priority}){
  if(!priority) return null;
  const cls = {
    High: "priority-badge priority-high",
    Medium: "priority-badge priority-med",
    Low: "priority-badge priority-low"
  }[priority] || "priority-badge";
  return <span className={cls}>{priority}</span>;
}

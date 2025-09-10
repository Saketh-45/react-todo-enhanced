
import React, {useState} from "react";

export default function TaskForm({onAdd}){
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");

  function submit(e){
    e.preventDefault();
    if(!title.trim()) return;
    onAdd({
      id: String(Date.now()),
      title: title.trim(),
      dueDate: dueDate || null,
      priority: priority || null,
      notes: notes || "",
      completed: false,
      createdAt: new Date().toISOString()
    });
    setTitle(""); setDueDate(""); setPriority(""); setNotes("");
  }

  return (
    <form className="card" onSubmit={submit}>
      <div className="form-row">
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" required />
      </div>
      <div className="form-row">
        <input className="date" type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        <select className="select" value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value="">Priority (optional)</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="form-row">
        <input className="input" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes (optional)" />
      </div>
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button className="btn" type="submit">Add Task</button>
      </div>
    </form>
  );
}

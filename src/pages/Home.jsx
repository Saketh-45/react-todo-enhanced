
import React, {useMemo, useState} from "react";
import { useTasks, useTaskDispatch } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import { isToday, isOverdue, isUpcoming, parseDateISO } from "../utils/dateUtils";

export default function Home(){
  const tasks = useTasks();
  const dispatch = useTaskDispatch();

  const [filter, setFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  function addTask(task){ dispatch({type:"add", payload:task}); }
  function toggle(id){ dispatch({type:"toggle", id}); }
  function remove(id){ dispatch({type:"delete", id}); }
  function setPriority(id, priority){ dispatch({type:"update", payload:{id, priority: priority || null}}); }

  const visible = useMemo(()=> {
    let out = [...tasks];
    if(filter === "Today") out = out.filter(t => isToday(parseDateISO(t.dueDate)));
    if(filter === "Overdue") out = out.filter(t => isOverdue(parseDateISO(t.dueDate)) && !t.completed);
    if(filter === "Upcoming") out = out.filter(t => isUpcoming(parseDateISO(t.dueDate)));
    if(priorityFilter) out = out.filter(t => t.priority === priorityFilter);
    if(search) out = out.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    if(sort === "newest") out.sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
    if(sort === "oldest") out.sort((a,b)=> new Date(a.createdAt)-new Date(b.createdAt));
    if(sort === "priority"){
      const rank = {High:0, Medium:1, Low:2};
      out.sort((a,b)=>(rank[a.priority]??3)-(rank[b.priority]??3));
    }
    if(sort === "due"){
      out.sort((a,b)=>{
        const da=a.dueDate?new Date(a.dueDate):null;
        const db=b.dueDate?new Date(b.dueDate):null;
        if(!da&&!db)return 0;
        if(!da)return 1;
        if(!db)return -1;
        return da-db;
      });
    }
    return out;
  },[tasks,filter,priorityFilter,search,sort]);

  return (
    <div className="container">
      <div className="header">
        <div>
          <div className="title">React Todo — Enhanced</div>
          <div style={{color:"var(--muted)",fontSize:13}}>Date filters, priority management & persistence</div>
        </div>
      </div>
      <div className="grid">
        <div>
          <div style={{marginBottom:12}}>
            <div className="search">
              <FilterBar filter={filter} setFilter={setFilter}
                priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
                search={search} setSearch={setSearch}
                sort={sort} setSort={setSort} />
              <div className="count">{visible.length} tasks</div>
            </div>
          </div>
          <div className="card">
            <div className="task-list">
              {visible.length===0?(
                <div className="empty">No tasks. Add one or change filters.</div>
              ):visible.map(t=>(
                <TaskCard key={t.id} task={t} onToggle={toggle} onDelete={remove} onSetPriority={setPriority}/>
              ))}
            </div>
          </div>
        </div>
        <aside>
          <TaskForm onAdd={addTask}/>
        </aside>
      </div>
    </div>
  );
}

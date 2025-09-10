
import React from "react";

export default function FilterBar({filter, setFilter, priorityFilter, setPriorityFilter, search, setSearch, sort, setSort}){
  const filters = ["All","Today","Overdue","Upcoming"];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div className="filters">
        {filters.map(f => (
          <button key={f} onClick={()=>setFilter(f)} className={`filter-pill ${filter===f ? "active":""}`}>{f}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:8}}>
        <select className="select" value={priorityFilter} onChange={e=>setPriorityFilter(e.target.value)}>
          <option value="">All priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select className="select" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priority">By Priority</option>
          <option value="due">By Due Date</option>
        </select>
        <input className="input" placeholder="Search task title" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
    </div>
  );
}

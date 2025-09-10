
import React, { createContext, useContext, useEffect, useReducer } from "react";

const TaskStateContext = createContext();
const TaskDispatchContext = createContext();

const LOCAL_KEY = "rtodo_tasks_v1";

function loadInitial(){
  try{
    const raw = localStorage.getItem(LOCAL_KEY);
    if(!raw) return [];
    return JSON.parse(raw);
  }catch(e){ return []; }
}

function reducer(state, action){
  switch(action.type){
    case "add":
      return [{...action.payload}, ...state];
    case "toggle":
      return state.map(t => t.id === action.id ? {...t, completed: !t.completed} : t);
    case "delete":
      return state.filter(t => t.id !== action.id);
    case "update":
      return state.map(t => t.id === action.payload.id ? {...t, ...action.payload} : t);
    case "set":
      return action.tasks;
    default: return state;
  }
}

export function TaskProvider({children}){
  const [state, dispatch] = useReducer(reducer, [], loadInitial);

  useEffect(()=> {
    try{ localStorage.setItem(LOCAL_KEY, JSON.stringify(state)); }catch(e){}
  }, [state]);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTasks(){ return useContext(TaskStateContext); }
export function useTaskDispatch(){ return useContext(TaskDispatchContext); }

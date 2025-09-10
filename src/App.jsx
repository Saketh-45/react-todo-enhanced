
import React from "react";
import { TaskProvider } from "./context/TaskContext";
import Home from "./pages/Home";
import "./index.css";

export default function App(){
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  );
}

import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import CanvasIndex from "./canvas";
import Resizer from "./pages/Resizer";

function App() {
  return (
    <main className="app transition-all ease-in">
     <Home/>
     <CanvasIndex/>
     <Resizer/>
    </main>
  );
}

export default App;

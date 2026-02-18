import React from "react";
import Signup from "./pages/Signup";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
   <Routes>


    <Route path='/signup' element={<Signup/>}/>
   </Routes>
   
   </BrowserRouter>
  );
}

export default App;

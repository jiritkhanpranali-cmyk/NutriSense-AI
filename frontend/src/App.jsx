import {BrowserRouter,Routes,Route} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import Profile from "./pages/Profile";


function App(){


return(

<BrowserRouter>


<Navbar/>


<Routes>


<Route path="/" element={<Home/>}/>


<Route path="/dashboard" element={<Dashboard/>}/>


<Route path="/analyzer" element={<Analyzer/>}/>


<Route path="/profile" element={<Profile/>}/>


</Routes>


</BrowserRouter>

)

}


export default App;
import {Link} from "react-router-dom";


export default function Navbar(){


return(

<nav className="
flex
justify-between
items-center
px-10
py-5
bg-white/80
backdrop-blur-xl
shadow-lg
sticky
top-0
z-50
">


<h2 className="
text-2xl
font-bold
text-green-600
">

🥗 NutriSense AI

</h2>



<div className="space-x-6">


<Link to="/">
Home
</Link>


<Link to="/dashboard">
Dashboard
</Link>


<Link to="/analyzer">
Analyzer
</Link>


<Link to="/profile">
Profile
</Link>


</div>


</nav>


)

}
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


import {
Flame,
HeartPulse,
Scale,
Activity
} from "lucide-react";


import {motion} from "framer-motion";

import {useEffect,useState} from "react";

import axios from "axios";



export default function Dashboard(){


const [data,setData]=useState(null);



useEffect(()=>{


loadDashboard();


},[]);





async function loadDashboard(){


try{


let res=
await axios.get(
"http://localhost:5000/dashboard"
);


setData(res.data);



}

catch(error){

console.log(error);

}


}





if(!data){


return(

<h1 className="p-10 text-2xl">

Loading Dashboard...

</h1>

)

}






return(


<div className="
min-h-screen
p-12
bg-gradient-to-br
from-green-100
to-blue-100
">



<h1 className="
text-4xl
font-bold
">

Welcome {data.name} 👋

</h1>



<p>

Your AI Health Progress Dashboard

</p>




<div className="
grid
md:grid-cols-4
gap-6
mt-10
">



<StatCard

icon={<Flame/>}

title="Calories"

value={data.calories+" kcal"}

/>



<StatCard

icon={<Scale/>}

title="BMI"

value={data.bmi}

/>




<StatCard

icon={<HeartPulse/>}

title="Health Score"

value={data.healthScore+"%"}

/>




<StatCard

icon={<Activity/>}

title="Activity"

value={data.activity}

/>




</div>






<div className="
bg-white
rounded-3xl
shadow-xl
p-8
mt-10
">


<h2 className="
text-2xl
font-bold
">

Weekly Calories

</h2>




<ResponsiveContainer
width="100%"
height={300}
>


<LineChart data={data.weekly}>


<XAxis dataKey="day"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="calories"

/>


</LineChart>


</ResponsiveContainer>


</div>





<div className="
bg-green-50
p-8
rounded-3xl
mt-10
">


<h2 className="
text-xl
font-bold
">

AI Health Advice 🤖

</h2>



<p className="mt-3">


{

data.status==="Overweight"

?

"Focus on calorie control, protein intake and regular activity."

:

"Your health progress looks good. Maintain your routine."

}


</p>


</div>





</div>


)

}








function StatCard({icon,title,value}){


return(


<motion.div

whileHover={{
scale:1.05
}}

className="
bg-white
rounded-3xl
shadow-lg
p-6
">


<div className="
text-green-600
">

{icon}

</div>


<p>

{title}

</p>


<h2 className="
text-3xl
font-bold
">

{value}

</h2>


</motion.div>


)


}
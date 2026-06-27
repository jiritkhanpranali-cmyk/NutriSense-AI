import {useEffect,useState} from "react";
import axios from "axios";

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




export default function Dashboard(){


const [data,setData]=useState(null);



useEffect(()=>{


async function fetchDashboard(){


try{


const res = await axios.get(
"http://localhost:5000/dashboard"
);


console.log("Dashboard Data:",res.data);


setData(res.data);



}

catch(error){


console.log(error);


}


}



fetchDashboard();



},[]);






if(!data){


return(

<div className="p-10 text-2xl">

Loading Dashboard...

</div>

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
text-gray-800
">


Welcome {data.name} 👋


</h1>




<p className="mt-2 text-gray-600">

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

value={`${data.calories} kcal`}

/>





<StatCard

icon={<Scale/>}

title="BMI"

value={data.bmi}

/>






<StatCard

icon={<HeartPulse/>}

title="Health Score"

value={`${data.healthScore}%`}

/>







<StatCard

icon={<Activity/>}

title="Goal"

value={data.goal}

/>






</div>









<div className="
bg-white
rounded-3xl
shadow-xl
p-8
mt-12
">



<h2 className="
text-2xl
font-bold
mb-5
">

Weekly Calories

</h2>






<div className="w-full h-[350px]">


<ResponsiveContainer
width="100%"
height="100%"
>


<LineChart
data={data.weekly}
>


<XAxis
dataKey="day"
/>


<YAxis/>


<Tooltip/>




<Line

type="monotone"

dataKey="calories"

/>



</LineChart>


</ResponsiveContainer>


</div>



</div>









<div className="
bg-green-50
rounded-3xl
p-8
mt-10
">


<h2 className="
text-xl
font-bold
">


AI Health Advice 🤖


</h2>




<p className="mt-4 text-gray-700">


{

data.status==="Overweight"

?

"Your BMI shows overweight. Focus on balanced meals, protein intake and regular exercise."

:

data.status==="Underweight"

?

"Your BMI is low. Increase healthy calories and protein sources."

:

"Your health condition looks balanced. Continue your healthy routine."

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
"


>



<div className="
text-green-600
mb-3
">

{icon}

</div>



<p className="
text-gray-500
">


{title}


</p>



<h2 className="
text-3xl
font-bold
mt-2
">


{value}


</h2>




</motion.div>



)


}
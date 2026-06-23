import {motion} from "framer-motion";

import {
Apple,
HeartPulse,
Activity,
ScanLine,
Brain,
Utensils
} from "lucide-react";


import {useNavigate} from "react-router-dom";



export default function Home(){


const navigate = useNavigate();



return (

<div className="
min-h-screen
px-16
py-20
">


{/* HERO SECTION */}

<div className="
grid
md:grid-cols-2
gap-12
items-center
">


<motion.div

initial={{opacity:0,x:-50}}

animate={{opacity:1,x:0}}

transition={{duration:0.8}}

>


<h1 className="
text-6xl
font-extrabold
leading-tight
text-gray-800
">


Your Personal

<span className="
text-green-600">

 AI Nutrition

</span>

 Assistant


</h1>



<p className="
mt-6
text-xl
text-gray-600
">


Analyze food calories,
understand health impact,
and get AI based diet suggestions.


</p>



<button 

onClick={()=>navigate("/profile")}


className="
mt-8
px-10
py-4
rounded-full
bg-green-600
text-white
text-lg
shadow-xl
hover:scale-105
transition">


Start Analysis


</button>



</motion.div>





{/* RIGHT SIDE CARDS */}


<div className="
grid
gap-6
">


<Card

icon={<Apple/>}

title="Food Analysis"

text="Calories, nutrients & ingredients"

/>


<Card

icon={<HeartPulse/>}

title="Health AI"

text="Personalized health advice"

/>



<Card

icon={<Brain/>}

title="Smart Recommendations"

text="AI diet suggestions"

/>


<Card

icon={<ScanLine/>}

title="Food Recognition"

text="Image based food detection"

/>


</div>



</div>





{/* FEATURES SECTION */}


<div className="
mt-24
">


<h2 className="
text-4xl
font-bold
text-center
text-gray-800
">

Why Choose NutriSense AI?

</h2>



<div className="
grid
md:grid-cols-3
gap-8
mt-10
">



<Feature

icon={<Activity/>}

title="Track Health"

text="Monitor BMI, calories and progress"

/>


<Feature

icon={<Utensils/>}

title="Smart Diet"

text="Get personalized meal plans"

/>



<Feature

icon={<HeartPulse/>}

title="Healthy Lifestyle"

text="Improve daily food choices"

/>



</div>


</div>



</div>


)

}




function Card({icon,title,text}){


return(


<motion.div

whileHover={{scale:1.05}}

className="
bg-white
p-6
rounded-3xl
shadow-xl
flex
gap-5
items-center
border
border-gray-100
">


<div className="
p-4
rounded-full
bg-green-100
text-green-600
">


{icon}


</div>


<div>


<h3 className="
font-bold
text-xl
">


{title}


</h3>


<p className="
text-gray-500
">


{text}


</p>


</div>


</motion.div>


)

}





function Feature({icon,title,text}){


return(


<div className="
bg-white
rounded-3xl
shadow-lg
p-8
text-center
hover:-translate-y-2
transition
">


<div className="
flex
justify-center
text-green-600
mb-4
">


{icon}


</div>



<h3 className="
text-xl
font-bold
">


{title}


</h3>



<p className="
text-gray-500
mt-3
">


{text}


</p>



</div>


)


}
import {useState} from "react";
import axios from "axios";


export default function Profile(){


const [saved,setSaved]=useState(false);


const [user,setUser]=useState({

name:"",
gender:"",
age:"",
weight:"",
height:"",
goal:"",
diabetes:"",
activity:""

});



function handle(e){

setUser({

...user,

[e.target.name]:e.target.value

})

}




async function save(){


await axios.post(
"http://localhost:5000/profile",
user
);



localStorage.setItem(
"user",
JSON.stringify(user)
);


setSaved(true);


}



if(saved){


return(

<div className="
min-h-screen
bg-gradient-to-br
from-green-100
to-blue-100
p-12
">


<div className="
max-w-3xl
mx-auto
bg-white
rounded-3xl
shadow-2xl
p-10
text-center
">


<h1 className="
text-4xl
font-bold
text-green-600
">

Welcome {user.name} 👋

</h1>


<p className="
mt-5
text-lg
">

Your NutriSense AI profile is ready.

</p>



<div className="
grid
grid-cols-2
gap-5
mt-8
">


<div className="bg-green-50 p-5 rounded-xl">

BMI tracking

</div>


<div className="bg-blue-50 p-5 rounded-xl">

Personalized food advice

</div>


<div className="bg-purple-50 p-5 rounded-xl">

Health goal analysis

</div>


<div className="bg-yellow-50 p-5 rounded-xl">

AI nutrition suggestions

</div>


</div>



<a

href="/analyzer"

className="
inline-block
mt-10
bg-green-600
text-white
px-8
py-3
rounded-full
hover:scale-105
transition
"

>

Start Food Analyzer →

</a>



</div>


</div>


)

}




return(


<div className="
min-h-screen
bg-gradient-to-br
from-green-100
to-blue-100
p-10
">



<div className="
max-w-xl
mx-auto
bg-white
rounded-3xl
shadow-2xl
p-10
">



<h1 className="
text-4xl
font-bold
text-green-600
">

Create Health Profile

</h1>


<p className="
mt-3
text-gray-600
">

Help NutriSense AI understand your health.

</p>




<input

className="input mt-6"

name="name"

placeholder="Full Name"

onChange={handle}

/>




<select

className="input"

name="gender"

onChange={handle}

>


<option value="">

Select Gender

</option>

<option>

Male

</option>


<option>

Female

</option>


<option>

Other

</option>


</select>




<input

className="input"

name="age"

placeholder="Age"

type="number"

onChange={handle}

/>




<input

className="input"

name="weight"

placeholder="Weight (kg)"

type="number"

onChange={handle}

/>




<input

className="input"

name="height"

placeholder="Height (cm)"

type="number"

onChange={handle}

/>





<select

className="input"

name="goal"

onChange={handle}

>


<option>

Select Health Goal

</option>


<option>

Weight Loss

</option>


<option>

Muscle Gain

</option>


<option>

Healthy Lifestyle

</option>


<option>

Maintain Weight

</option>


<option>

Improve Fitness

</option>


</select>





<select

className="input"

name="diabetes"

onChange={handle}

>


<option>

Do you have Diabetes?

</option>


<option value="No">

No

</option>


<option value="Yes">

Yes

</option>


</select>





<select

className="input"

name="activity"

onChange={handle}

>


<option>

Activity Level

</option>


<option>

Low

</option>


<option>

Moderate

</option>


<option>

High

</option>


</select>




<button

onClick={save}

className="
mt-6
w-full
bg-green-600
text-white
py-3
rounded-full
text-lg
hover:bg-green-700
"

>

Save Profile

</button>




</div>


</div>


)


}
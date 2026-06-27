import {useState,useEffect} from "react";
import axios from "axios";


export default function Analyzer(){


const [food,setFood]=useState("");

const [result,setResult]=useState(null);

const [user,setUser]=useState(null);




// Load user from database

useEffect(()=>{


axios.get(
"http://localhost:5000/user"
)

.then(res=>{

setUser(res.data);

})


.catch(err=>{

console.log(err);

})


},[]);







async function analyze(){


try{


if(!user){

alert("Please create profile first");

return;

}



if(!food){

alert("Enter food name");

return;

}




// Food details

let foodData =
await axios.get(

`http://localhost:5000/food/${food.trim()}`

);




// AI Recommendation

let recommendation =
await axios.get(

`http://localhost:5000/recommend/${food.trim()}`

);




// BMI

let bmi =
await axios.get(

`http://localhost:5000/bmi/${user.weight}/${user.height}`

);






setResult({


food:foodData.data,


recommendation:recommendation.data,


bmi:bmi.data



});





}

catch(error){


console.log(error);


alert("Food not found or server error");


}



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
max-w-4xl
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

Hi {user?.name} 👋

</h1>




<p className="
mt-2
text-gray-600
">

AI Food Analyzer - Personalized Nutrition Advice

</p>








<div className="
flex
mt-8
">


<input


className="
flex-1
border
p-4
rounded-l-xl
"


placeholder="Search food like Paneer, Pizza, Apple"


value={food}



onChange={(e)=>

setFood(e.target.value)

}


/>




<button


onClick={analyze}



className="
bg-green-600
text-white
px-8
rounded-r-xl
hover:bg-green-700
"

>

Analyze

</button>




</div>









{
result &&



<div className="mt-10">





<h2 className="
text-3xl
font-bold
text-green-600
">

{result.food.name}

</h2>









<div className="
grid
grid-cols-4
gap-5
mt-6
">





<Card

title="Calories"

value={result.food.calories+" kcal"}

/>





<Card

title="Protein"

value={result.food.protein+" g"}

/>






<Card

title="Fat"

value={result.food.fat+" g"}

/>






<Card

title="Sugar"

value={result.food.sugar+" g"}

/>






</div>









<div className="
bg-green-50
p-6
rounded-2xl
mt-6
">


<h2 className="
font-bold
text-xl
">

Health Analysis 🩺

</h2>




<p className="mt-3">

BMI :
{result.bmi.bmi}

</p>



<p>

Health Status :

{result.bmi.status}

</p>




<p>

Goal :

{user.goal}

</p>




</div>









<div className="
bg-blue-50
p-6
rounded-2xl
mt-6
">


<h2 className="
font-bold
text-xl
">

AI Recommendation 🤖

</h2>





<p className="
mt-5
whitespace-pre-line
text-gray-700
leading-7
">


{

result.recommendation.recommendation

}


</p>







{
result.recommendation.health_category &&


<p className="
mt-4
font-bold
text-green-700
">


AI Health Category :

{result.recommendation.health_category}


</p>


}



</div>









<div className="
grid
grid-cols-2
gap-5
mt-6
">






<div className="
bg-purple-50
p-5
rounded-xl
">


<h3 className="font-bold">

Benefits

</h3>


<p className="mt-2">

{result.food.benefits}

</p>



</div>









<div className="
bg-red-50
p-5
rounded-xl
">


<h3 className="font-bold">

Things to consider

</h3>


<p className="mt-2">

{result.food.cons}

</p>



</div>








</div>








</div>



}




</div>


</div>


)



}







function Card({title,value}){


return(


<div className="
bg-green-50
rounded-xl
p-5
text-center
">


<p className="text-gray-600">

{title}

</p>



<h2 className="
font-bold
text-xl
mt-2
">

{value}

</h2>



</div>



)


}
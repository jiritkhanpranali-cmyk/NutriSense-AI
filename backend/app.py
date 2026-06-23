from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import json
import joblib


app = Flask(__name__)

CORS(app)



food = pd.read_csv("food_data.csv")

food.fillna(0,inplace=True)



# Load ML Model

try:

    model = joblib.load("nutrition_model.pkl")

    print("ML Model Loaded")


except:


    model = None

    print("ML Model not found")





# Home

@app.route("/")
def home():

    return "NutriSense AI Running"





# Food Search

@app.route("/food/<name>")
def get_food(name):


    result = food[

        food["name"]
        .astype(str)
        .str.lower()
        .str.contains(name.lower())

    ]



    if result.empty:


        return jsonify({

            "error":"Food not found"

        })



    item=result.iloc[0]



    return jsonify({


        "name":str(item["name"]),

        "calories":float(item["calories"]),

        "protein":float(item["protein"]),

        "carbs":float(item["carbs"]),

        "fat":float(item["fat"]),

        "sugar":float(item["sugar"]),


        "benefits":str(item["benefits"]),

        "cons":str(item["cons"]),

        "advice":str(item["advice"])


    })






# Save Profile


@app.route("/profile",methods=["POST"])
def profile():


    data=request.json



    with open("user_data.json","w") as f:

        json.dump(data,f)



    return jsonify({

        "message":"Profile Saved"

    })






# BMI


@app.route("/bmi/<weight>/<height>")
def bmi(weight,height):


    bmi_value=float(weight)/((float(height)/100)**2)



    if bmi_value <18.5:

        status="Underweight"


    elif bmi_value <25:

        status="Normal"


    elif bmi_value <30:

        status="Overweight"


    else:

        status="Obese"




    return jsonify({

        "bmi":round(bmi_value,2),

        "status":status

    })









# AI + ML Recommendation


@app.route("/recommend/<name>")
def recommend(name):



    try:


        with open("user_data.json") as f:

            user=json.load(f)


    except:


        user={

            "goal":"Healthy Lifestyle",

            "diabetes":"No"

        }





    item=food[

        food["name"]
        .astype(str)
        .str.lower()
        .str.contains(name.lower())

    ]



    if item.empty:


        return jsonify({

            "error":"Food not found"

        })




    item=item.iloc[0]




    calories=float(item["calories"])

    protein=float(item["protein"])

    carbs=float(item["carbs"])

    fat=float(item["fat"])

    sugar=float(item["sugar"])





    # ML Prediction


    ml_result="Not Available"



    if model:


        prediction=model.predict([

        [

        calories,

        protein,

        carbs,

        fat,

        sugar

        ]

        ])



        ml_result=prediction[0]







    # Human Recommendation


    goal=user.get(
        "goal",
        "Healthy Lifestyle"
    )



    message=f"{item['name']} can be included in your diet. "



    if goal=="Weight Loss":



        if calories>300:


            message += (

            "It contains higher calories, "
            "so consume it occasionally and control portion size."

            )


        else:


            message += (

            "It is suitable for weight management "
            "because calories are moderate."

            )




    elif goal=="Muscle Gain":


        message += (

        "It can support muscle growth because "
        "it provides useful nutrients."

        )



    else:


        message += (

        "It can be part of a balanced healthy lifestyle "
        "when eaten in proper quantity."

        )






    if protein>=15:


        message += (

        f" It is rich in protein ({protein}g) "
        "which helps muscle maintenance."

        )



    if fat>20:


        message += (

        " It has higher fat, so avoid overeating."

        )



    if sugar>15:


        message += (

        " Sugar level is high, consume carefully."

        )


    else:


        message += (

        " Sugar level is low."

        )






    return jsonify({

        "recommendation":message,

        "ml_prediction":ml_result

    })









# Dashboard


@app.route("/dashboard")
def dashboard():


    try:


        with open("user_data.json") as f:

            user=json.load(f)


    except:


        return jsonify({

            "error":"Profile not found"

        })




    weight=float(user["weight"])

    height=float(user["height"])



    bmi_value=weight/((height/100)**2)



    if bmi_value<25:

        status="Normal"


    elif bmi_value<30:

        status="Overweight"


    else:

        status="Obese"




    score=100



    if status=="Overweight":

        score-=15


    if user.get("activity")=="Low":

        score-=10





    return jsonify({


        "name":user.get("name"),

        "bmi":round(bmi_value,2),

        "status":status,

        "healthScore":score,

        "activity":user.get("activity"),


        "calories":1800,


        "weekly":[

            {
                "day":"Mon",
                "calories":1600
            },

            {
                "day":"Tue",
                "calories":1900
            },

            {
                "day":"Wed",
                "calories":1700
            },

            {
                "day":"Thu",
                "calories":2100
            },

            {
                "day":"Fri",
                "calories":1800
            }

        ]

    })







if __name__=="__main__":


    app.run(debug=True)
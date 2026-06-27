from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib

from database import db
from models import User


app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///nutrisense.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db.init_app(app)

CORS(app)



# ---------------- FOOD DATA ----------------

food = pd.read_csv("food_data.csv")

food.fillna(0,inplace=True)




# ---------------- ML MODEL ----------------


try:

    model = joblib.load("nutrition_model.pkl")

    print("ML Model Loaded")


except:

    model=None

    print("ML Model not found")





# HOME

@app.route("/")
def home():

    return "NutriSense AI Running"





# ---------------- GET USER ----------------


@app.route("/user")
def get_user():


    user = User.query.order_by(
        User.id.desc()
    ).first()



    if not user:

        return jsonify({

            "error":"No profile found"

        })



    return jsonify({

        "name":user.name,
        "age":user.age,
        "gender":user.gender,
        "weight":user.weight,
        "height":user.height,
        "goal":user.goal,
        "diabetes":user.diabetes

    })








# ---------------- FOOD SEARCH ----------------


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

        "cons":str(item["cons"])

    })







# ---------------- SAVE PROFILE ----------------


@app.route("/profile",methods=["POST"])
def profile():


    data=request.json



    user=User(

        name=data["name"],

        age=int(data["age"]),

        gender=data["gender"],

        weight=float(data["weight"]),

        height=float(data["height"]),

        goal=data["goal"],

        diabetes=data["diabetes"]

    )



    db.session.add(user)

    db.session.commit()



    return jsonify({

        "message":"Profile Saved"

    })










# ---------------- BMI ----------------


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









# ---------------- AI RECOMMENDATION ----------------


@app.route("/recommend/<name>")
def recommend(name):


    user = User.query.order_by(
        User.id.desc()
    ).first()



    if not user:

        return jsonify({

            "recommendation":
            "Please create profile first",

            "health_category":"Not Available"

        })





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

    health_category="Not Available"



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


        health_category=prediction[0]







    message=f"{item['name']} analysis:\n\n"



    if calories>350:

        message += (
        "This food contains high calories. "
        "Enjoy it in limited quantity.\n\n"
        )


    else:

        message += (
        "This food provides a balanced energy amount "
        "for daily diet.\n\n"
        )




    if protein>=15:

        message += (
        f"It is a good protein source ({protein}g). "
        "Protein helps maintain muscles and keeps you full.\n\n"
        )


    else:

        message += (
        "Protein content is low. "
        "Combine it with protein rich foods.\n\n"
        )





    if fat>25:

        message += (
        "Fat content is high, so avoid overeating.\n\n"
        )

    else:

        message += (
        "Fat level is acceptable with proper portion control.\n\n"
        )




    if sugar>15:

        message += (
        "Sugar level is high, consume carefully."
        )

    else:

        message += (
        "Sugar level is moderate."
        )




    return jsonify({

        "recommendation":message,

        "health_category":health_category

    })









# ---------------- DASHBOARD ----------------


@app.route("/dashboard")
def dashboard():


    user=User.query.order_by(
        User.id.desc()
    ).first()



    if not user:


        return jsonify({

            "error":"No user"

        })



    bmi_value=user.weight/((user.height/100)**2)



    if bmi_value<18.5:

        status="Underweight"

    elif bmi_value<25:

        status="Normal"

    elif bmi_value<30:

        status="Overweight"

    else:

        status="Obese"




    score=100



    if status=="Overweight":

        score-=15



    return jsonify({

    "name": user.name,

    "goal": user.goal,

    "bmi": round(bmi_value,2),

    "status": status,


    "healthScore": score,


    "activity":"Good",


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


    with app.app_context():

        db.create_all()


    app.run(debug=True)
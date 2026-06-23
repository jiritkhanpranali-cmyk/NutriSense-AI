import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

import joblib



data=pd.read_csv("food_data.csv")



# Create labels

def label(row):


    if row["calories"]>350 or row["fat"]>25:

        return "Avoid"


    elif row["protein"]>=15:

        return "Healthy"


    else:

        return "Moderate"




data["category"]=data.apply(label,axis=1)




X=data[

[
"calories",
"protein",
"carbs",
"fat",
"sugar"
]

]


y=data["category"]




X_train,X_test,y_train,y_test=train_test_split(

X,
y,
test_size=0.2,
random_state=42

)




model=RandomForestClassifier()



model.fit(

X_train,
y_train

)




print(

"Accuracy:",
model.score(X_test,y_test)

)




joblib.dump(

model,

"nutrition_model.pkl"

)


print("Model saved")
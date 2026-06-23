import pandas as pd
import glob


files = glob.glob("datasets/FOOD-DATA-GROUP*.csv")


all_data=[]


for file in files:

    df=pd.read_csv(file)

    all_data.append(df)



data=pd.concat(all_data)



data=data.rename(columns={

    "food":"name",

    "Caloric Value":"calories",

    "Protein":"protein",

    "Carbohydrates":"carbs",

    "Fat":"fat",

    "Sugars":"sugar"

})



# keep only required columns

data=data[[
    "name",
    "calories",
    "protein",
    "carbs",
    "fat",
    "sugar"
]]



# add AI columns

data["benefits"]="Contains nutrition"

data["cons"]="Depends on quantity"

data["advice"]="Maintain balanced diet"



data.to_csv(

    "food_data.csv",

    index=False

)



print("Food dataset created successfully")


from flask import Flask, request, abort
import json
from mock_data import mock_catalog
from config import db 
from bson import ObjectId

from flask_cors import CORS

app = Flask('Server')
CORS(app) #disable CORS policy

# endpoints


@app.route("/")
def root():
    return "Welcome to our Server"

########################
########### API Catalog ###############
# defaults to get route unless specified


@app.route("/api/about", methods=["POST"])
def about():
    me = {
        "first": "Albert",
        "last": "Lara"

    }
    return json.dumps(me)  # parse into json then return


@app.route("/api/catalog")
def get_catalog():
    cursor = db.products.find({}) #get all, cursor
    all_products = []

    for prod in cursor:
        prod["_id"] = str(prod["_id"])
        all_products.append(prod)

    return json.dumps(all_products)

@app.route("/api/catalog", methods=["POST"]) #receive post, and use data to create product
def save_product():
    product = request.get_json()
    db.products.insert_one(product)

    #validations. return 400 status, bad request. Should have a title, title should be longer than 5 character product must have a rpice, price must have a number greater than 0 must have an image, category 

    if not "title" in product or len(product["title"]) < 4:
         return abort(400, "Title required, needs 5 characters")

    if not "price" in product:
        return abort(400, "Need to enter price")
        
    if type(product["price"]) != float  and type(product["price"]) != int: 
        return abort(400, "Price must be a valid number")

    if product["price"] <= 0:
        return abort(400, "price must be greater than zero")
    
    if not "category" in product or len(product["category"]) < 1:
         return abort(400, "Category required, needs 5 characters")

    if not "image" in product or len(product["image"]) < 1:
         return abort(400, "Image required,")

    product["_id"] = str(product["_id"])
    return json.dumps(product)  #this will crash the




#/api/catalog/cheapest
# returns the cheapest product in the catalog

@app.route("/api/catalog/cheapest")
def get_cheapest():
    cursor = db.products.find({})
    solution = cursor[0]
    for prod in cursor:
        if prod["price"] < solution["price"]:
            solution = prod
    solution["_id"] = str(solution["_id"])
    return json.dumps(solution)

@app.route("/api/catalog/total")
def get_sum():
    cursor = db.products.find({})
    total = 0
    for prod in cursor:
        total += prod["price"]

    
    return json.dumps(total)
    

#find a product based off the unique ID, the id tag at the end will catch any ID 
@app.route("/api/products/<id>")
def find_product(id):

    if not ObjectId.is_valid(id):
        return abort("product must have valid ObjectId value")
    prod = db.products.find_one({"_id": ObjectId (id) })
    prod["_id"] = str(prod["_id"])

    return json.dumps(prod)
    

@app.route("/api/products/categories")
def get_categories():
    categories = []
    cursor = db.products.find({})

    for prod in cursor:
        cat = prod["category"]
        if cat not in categories:
            categories.append(cat)
    return json.dumps(categories)
    

@app.route("/api/products/category/<cat_name>")
def get_by_category(cat_name):
    results = []
    cursor = db.products.find({"category": cat_name}) #getting products from cursor, fix id

    for prod in cursor:
        prod["_id"] = str(prod["_id"])   #to make the search case in-sensitive
        results.append(prod)



    return json.dumps(results)


@app.route("/api/products/search/<text>")
def search_by_text(text):
    results = []

    for prod in mock_catalog:
        title = prod["title"].lower()
        if text.lower() in title:
            results.append(prod)        

    return json.dumps(results)

#######################################
#########   Coupon Codes   ############
#######################################

#get
@app.get("/api/couponCodes")
def coupon_codes():
    cursor = db.couponCodes.find({}) #get all, cursor
    results = []

    for coupon in cursor:
        coupon["_id"] = str(coupon["_id"])
        results.append(coupon)

    return json.dumps(results)

@app.get("/api/couponCodes/<code>")
def get_by_code(code):
    coupon = db.couponCodes.find_one({"code": code})
    if not coupon:
        return abort(400, "Invalid coupon code")
    coupon["_id"] = str(coupon["_id"])

    return json.dumps(coupon)

    

#post
@app.post("/api/couponCodes") #receive post, and use data to create product
def save_coupon():
    coupon = request.get_json()
    

    if not "code" in coupon or len(coupon["code"]) < 5:
         return abort(400, "Code required, needs 5 characters")


    if not "discount" in coupon:
        return abort(400, "coupon required")
        
    if type(coupon["discount"]) != int and type(coupon["discount"]) != float: 
        return abort(400, "discount required and discount lower than 31 and a real number")

    if coupon["discount"] < 0 or coupon["discount"] > 31:
         return abort(400, "Discount should be between 0 and 31")


   
    db.couponCodes.insert_one(coupon)
    coupon["_id"] = str(coupon["_id"])

    return json.dumps(coupon)  #this will crash the






app.run(debug=True)


# exercise createa a new script file 
# 1 call a function named, numbers
# numbers fn will print 1-20 except 11/13
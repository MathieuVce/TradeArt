import sqlite3
from sqlite3.dbapi2 import SQLITE_CREATE_TEMP_VIEW
from fastapi import FastAPI, Request
import uvicorn
from starlette.middleware.cors import CORSMiddleware
import calendar
from datetime import date, datetime
import requests

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://192.168.0.114:3000",
    "http://192.168.0.114"
] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/")
async def root():
  return {"message": "Trade Art Platform"}


@app.post("/register_artist")
async def register_artist(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    artist = dbase.execute('''SELECT * FROM artist WHERE email = "{email}"'''.format(email=str(values_dict["email"]).lower())).fetchall()
    
    if len(artist)==0 : 
        dbase.execute('''INSERT INTO artist(firstname,lastname,birthdate,bank_account_number,address,email,phonenumber,institution,cursus,description,photo,password,is_logged) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)''', (str(values_dict['firstname']).capitalize(), str(values_dict['lastname']).capitalize(), str(values_dict['birthdate']).upper(), str(values_dict['bank_account_number']).upper(), str(values_dict['address']), str(values_dict['email']).lower(), str(values_dict['phonenumber']),str(values_dict['institution']),str(values_dict['cursus']),str(values_dict['description']),str(values_dict['photo']), str(values_dict['password']),int(0)))
        message = 'Inscription réussie'
        status = 'success'
    else :
        message = 'Email déjà existant.'
        status = 'error'
    dbase.close()
    return {'message':message,"status": status }

@app.post("/register_customer")
async def register_customer(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    customer = dbase.execute('''SELECT * FROM customer WHERE email = "{email}"'''.format(email=str(values_dict["email"]).lower())).fetchall()

    if len(customer)==0:
        dbase.execute('''INSERT INTO customer(firstname,lastname,username,address,birthdate,credit_card_number,email,phonenumber,password,is_logged) VALUES(?,?,?,?,?,?,?,?,?,?)''', (str(values_dict["firstname"]).capitalize(), str(values_dict["lastname"]).capitalize(), str(values_dict['username']), str(values_dict["address"]), str(values_dict["birthdate"]), str(values_dict["credit_card_number"]), str(values_dict["email"]).lower(), str(values_dict["phonenumber"]), str(values_dict["password"]), int(0)) )
        message = 'Inscription réussie'
        status = 'success'
    else: 
        message = 'Email déjà existant'
        status ='error'
    dbase.close()
    return {'message':message, "status": status}

###########

@app.put("/artist_log_in")
async def artist_log_in(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    passverif=dbase.execute('''SELECT password from artist WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower())).fetchall()
    message = 'Email ou mot de passe incorrect'
    status = 'error'
    artist = []

    try:
        if (str(passverif[0][0]) == str(values_dict['password'])):
            dbase.execute('''UPDATE artist SET is_logged = 1  WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower()))
            artist = dbase.execute('''SELECT * from artist WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower())).fetchall()[0]
            message = 'Connexion réussie'
            status = 'success'
    except:
        message='Email non existant'
        return {'message': message,'status': status, 'data': artist}

    dbase.close()
    return {'message': message,'status': status, 'data': artist}

@app.put("/customer_log_in")
async def customer_log_in(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    passverif=dbase.execute('''SELECT password from customer WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower())).fetchall()

    message = 'Email ou mot de passe incorrect'
    status = 'error'
    customer = []

    try:
        if (str(passverif[0][0]) == str(values_dict['password'])):
            dbase.execute('''UPDATE customer SET is_logged = 1  WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower()))
            customer = dbase.execute('''SELECT * FROM customer WHERE email ="{email}" '''. format(email=str(values_dict['email']).lower())).fetchall()[0]
            message = 'Connexion réussie'
            status = 'success'
    except:
        message='Email non existant'
        return {'message': message,'status': status, 'data': customer}


    dbase.close()
    return {'message': message,'status': status, 'data': customer}

@app.put("/artist_log_out")
async def artist_log_out(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    dbase.execute('''UPDATE artist SET is_logged = 0  WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower()))
    message = 'À bientot chez TradeArt !'
    status = 'success'

    dbase.close()    
    return {'message': message, "status" : status }

@app.put("/customer_log_out")
async def customer_log_out(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    dbase.execute('''UPDATE customer SET is_logged = 0  WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower()))
    message = 'Utilisateur déconnecté'
    status = 'success'

    dbase.close()    
    return {'message':message , 'status': status }


@app.put('/password_artist')
async def password_artist(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    artist = dbase.execute('''SELECT * FROM artist WHERE email = "{email}"'''.format(email=str(values_dict["email"]).lower())).fetchall()

    if len(artist)==0:
        message = 'Email non existant'
        status = 'warning'
    else: 
        dbase.execute('''UPDATE artist SET password ="{password}" WHERE email = "{email}"'''.format(password=str(values_dict['password']), email =str(values_dict['email']).lower()))
        message = 'Mot de passe réinitialisé'
        status ='success'
    dbase.close()
    return{'message':message, 'status':status}

@app.put('/password_customer')
async def password_customer(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    customer = dbase.execute('''SELECT * FROM customer WHERE email = "{email}"'''.format(email=str(values_dict["email"]).lower())).fetchall()

    if len(customer)==0:
        message = 'Email non existant'
        status = 'warning'
    else: 
        dbase.execute('''UPDATE customer SET password ="{password}" WHERE email = "{email}"'''.format(password=str(values_dict['password']), email =str(values_dict['email']).lower()))
        message = 'Mot de passe réinitialisé'
        status ='success'
    dbase.close()
    return{'message':message, 'status':status}

#####################

@app.put('/update_artist')
async def update_artist(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    logverif=dbase.execute('''SELECT is_logged from artist WHERE artist_id = "{artist_id}" '''.format(artist_id= int(values_dict['artist_id']))).fetchall()
    message = ''
    status =''
    
    if int(logverif[0][0]) == 0:
        message = "Utilisateur non connecté"
        status ='error'
        artist=[]
    else:
        list= dbase.execute('''SELECT * FROM artist WHERE email = "{email}"'''.format(email=str(values_dict['email']).lower())).fetchall()
        if len(list)==0:  
            dbase.execute('''UPDATE artist SET firstname = "{firstname}", lastname = "{lastname}" , birthdate ="{birthdate}" , bank_account_number= "{bank_account_number}", address = "{address}", email = "{email}", phonenumber="{phonenumber}", institution = "{institution}", cursus = "{cursus}", description = "{description}", photo = "{photo}" ,password ="{password}" WHERE artist_id = "{artist_id}"'''.format(firtname=str(values_dict['firstname']).capitalize(),lastname = str(values_dict['lastname']).capitalize(), birthdate=date(values_dict['birthdate']),bank_account_number=str(values_dict['bank_account_number']).upper(),address=str(values_dict['address']),email=str(values_dict['email']).lower(),phonenumber=str(values_dict['phonenumber']),institution=str(values_dict['institution']), cursus=str(values_dict['cursus']), description = str(values_dict['description'], photo = str(values_dict['photo']), password=str(values_dict['password']), artist_id=int(values_dict['artist_id']))))
            artist=dbase.execute('''SELECT * FROM artist WHERE email = "{email}"'''.format(email=str(values_dict['email']).lower()))
            message= "Données mises à jour"
            status='success'
        else : 
            message ='Email déjà existant'
            status = 'error'
    dbase.close()
    return {'message':message,'status':status, 'data':artist}

@app.put('/update_customer')
async def update_customer(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    logverif=dbase.execute('''SELECT is_logged from customer WHERE customer_id = "{customer_id}" '''.format(customer_id= int(values_dict['customer_id']))).fetchall()
    message = ''
    status =''
    user = []
    
    if int(logverif[0][0]) == 0:
        message = "Utilisateur non connecté"
        status = 'error'

    else:
        list = dbase.execute('''SELECT * FROM customer WHERE email ="{email}"'''.format(email=str(values_dict['email']).lower())).fetchall()
        if len(list)==0:
            dbase.execute('''UPDATE customer SET firstname = "{firstname}" , lastname ="{lastname}" , username = "{username}", address = "{address}", birthdate = "{birthdate}" , credit_card_number = "{credit_card_number}", email = "{email}", phonenumber="{phonenumber}" ,password ="{password}" WHERE customer_id = "{customer_id}"'''.format(firstname=str(values_dict['firstname']).capitalize(),lastname=str(values_dict['lastname']).capitalize(),username=str(values_dict['username']),address=str(values_dict['address']),birthdate=str(values_dict['birthdate']),credit_card_number=str(values_dict['credit_card_number']),email=str(values_dict['email']).lower(), phonenumber=str(values_dict['phonenumber']), password=str(values_dict["password"]), customer_id=int(values_dict["customer_id"])))
            message= "Données mises à jour"
            status = 'success'
            user = dbase.execute('''SELECT * FROM customer WHERE email = "{email}"'''.format(email=str(values_dict['email']).lower()))
        else : 
            message = 'Email déjà existant'
            status = 'error'
    dbase.close()
    return {'message': message, 'status': status, 'data':user}

###########

@app.post("/register_work")
async def register_work(payload: Request): 
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    logverif=dbase.execute('''SELECT is_logged from artist WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower())).fetchall()
    message = ''
    status = ''
    artist = []
    
    if int(logverif[0][0]) == 0:
        message = "Utilisateur non connecté"
        status ='error'

    else: 
        artist_id= dbase.execute('''SELECT artist_id FROM artist WHERE email = "{email}" '''.format(name= str(values_dict['email']).lower())).fetchall()[0][0]
        artist = dbase.execute('''SELECT * FROM artist WHERE email = "{email}" '''.format(name= str(values_dict['email']).lower())).fetchall()
        dbase.execute('''INSERT INTO artwork(title,price,description,evaluation,picture,sold,artist_id) VALUES(?,?,?,?,?,?,?) ''', (str(values_dict['title']), float(values_dict['price']), str(values_dict['description']),str(values_dict['evaluation']), str(values_dict['picture']),int(0),int(artist_id)))
        message = "Oeuvre publiée."
        status ='success'

    dbase.close()
    return {'message':message,'status':status,'data':artist}

@app.get("/all_work")
async def all_work(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    data = dbase.execute('''SELECT * FROM artwork''').fetchall()
    status = 'success'

    dbase.close()
    return {'status':status, 'data':data}

@app.post("/check_yourwork")
async def check_yourwork(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    logverif=dbase.execute('''SELECT is_logged from artist WHERE artist_id = "{artist_id}" '''.format(artist_id= int(values_dict['artist_id']))).fetchall()
    status = ''
    data=[]

    
    if int(logverif[0][0]) == 0:
        status ='error'
        message = 'Vous devez être connecté pour voir vos oeuvres'
    else:
        try: 
            data = dbase.execute('''SELECT * FROM artwork WHERE artist_id = "{artist_id}"'''.format(artist_id=int(values_dict['artist_id']))).fetchall()[0]
            status = 'success'
            message: ''
        except:
            status = 'warning'
            message = 'Vous n\'avez pas encore d\'oeuvres'

    dbase.close()
    return {'status': status,'data': data, 'message': message}

##########################

@app.post("/create_order")
async def create_order(payload: Request): 
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    logverif=dbase.execute('''SELECT is_logged from customer WHERE email = "{email}" '''.format(email=str(values_dict['email']).lower())).fetchall()
    message = ''
    status =''
    data=[]

    if int(logverif[0][0]) == 0:
        message = "Utilisateur non connecté"
        status ='error'

    else: 
        paymentdate = datetime.now()
        customer_id= dbase.execute('''SELECT customer_id FROM customer WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower())).fetchall()[0][0]
        dbase.execute('''INSERT INTO command(orderdate,orderlocation,work_id,customer_id) VALUES(?,?,?,?) ''', (date(paymentdate), str(values_dict['orderlocation']), int(values_dict['work_id']), int(customer_id)))
        dbase.execute(''' UPDATE artwork SET sold = 1  WHERE work_id = "{work_id}" '''.format(work_id= int(values_dict['work_id'])))
        message = "Commande confirmée"
        status = 'success'

        price= dbase.execute('''SELECT price FROM artwork WHERE work_id ="{work_id}"'''.format(work_id=str(values_dict['work_id']))).fetchall()[0][0]
        orderid = dbase.execute('''SELECT order_id FROM command WHERE work_id="{work_id}"'''.format(work_id=str(values_dict['work_id']))).fetchall()[0][0]
        artistid = dbase.execute('''SELECT artist_id FROM artist LEFT JOIN artwork ON artist.artist_id = artwork.artist_id WHERE work_id ="{work_id}"'''.format(work_id=str(values_dict['work_id']))).fetchall()[0][0]
    
        pay_order(paymentdate,customer_id,artistid,orderid)

    dbase.close()
    return {'message':message,'status':status,'data':data}

async def pay_order(paymentdate,customerid,artistid,orderid):

    dbase=sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    dbase.execute('''INSERT INTO payment(payment_date,customer_id,artist_id,order_id) VALUES (?,?,?,?)''', ( date(paymentdate), int(customerid), int(artistid), int(orderid)))
    dbase.close()

@app.get("/received_payment")
async def received_payment(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    logverif=dbase.execute('''SELECT is_logged FROM artist WHERE artist_id = "{artist_id}" '''.format(artist_id=int(values_dict['artist_id']))).fetchall()
    newdict = []

    if int(logverif[0][0]) == 0:
        newdict.append("Utilisateur non connecté")

    else:
        paymentdone=dbase.execute('''SELECT * FROM payment WHERE artist_id = "{artist_id}"'''.format(artist_id=int(values_dict['artist_id'])))
        for pay in paymentdone :
            amount=dbase.exevcute('''SELECT price FROM artwork LEFT JOIN command ON artwork.work_id = command.work_id LEFT JOIN payment ON command.order_id = payment.order_id WHERE payment.artist_id = "{artist_id}"'''.format(artist_id=int(values_dict['artist_id'])))
            newdict.append("Order_ID: "+str(paymentdone[4]))
            newdict.append("Payment date: " + str(paymentdone[1])) 
            newdict.append("Amount: " + str(amount))
            total= 0
            for paid in amount : 
                total += float(amount)
            newdict.insert(0, 'Total revenue : '+ str(total) +'€' )
  
        if len(newdict) ==0 : 
            newdict.append("No payments received")
    
    dbase.close()
    return newdict

#######################
@app.on_event("shutdown")
def logout_all():
    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    artist=dbase.execute('''SELECT artist_id FROM artist''').fetchall()
    for iid in artist :
        dbase.execute('''UPDATE artist SET is_logged = 0 WHERE  artist_id = "{artistid}" '''.format(artistid=int(iid[0])))
    customers=dbase.execute(''' SELECT customer_id FROM customer ''').fetchall()
    for iid in customers:
        dbase.execute('''UPDATE customer SET is_logged = 0 WHERE customer_id = "{customerid}"'''.format(customerid=int(iid[0])))
    dbase.close()
    

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0',port=8000)
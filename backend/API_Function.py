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
        dbase.execute('''INSERT INTO customer(firstname,lastname,username,address,birthdate,email,phonenumber,password,is_logged) VALUES(?,?,?,?,?,?,?,?,?)''', (str(values_dict["firstname"]).capitalize(), str(values_dict["lastname"]).capitalize(), str(values_dict['username']), str(values_dict["address"]), str(values_dict["birthdate"]), str(values_dict["email"]).lower(), str(values_dict["phonenumber"]), str(values_dict["password"]), int(0)) )
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
    status = 'info'

    dbase.close()    
    return {'message': message, "status" : status }

@app.put("/customer_log_out")
async def customer_log_out(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    dbase.execute('''UPDATE customer SET is_logged = 0  WHERE email = "{email}" '''.format(email= str(values_dict['email']).lower()))
    message = 'À bientot chez TradeArt !'
    status = 'info'

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
    else:
        try:
            dbase.execute('''UPDATE artist SET firstname = "{firstname}", lastname = "{lastname}" , birthdate ="{birthdate}" , bank_account_number= "{bank_account_number}", address = "{address}", email = "{email}", phonenumber="{phonenumber}", institution = "{institution}", cursus = "{cursus}", description = "{description}", photo = "{photo}" WHERE artist_id = "{artist_id}"'''.format(firstname=str(values_dict['firstname']).capitalize(),lastname = str(values_dict['lastname']).capitalize(), birthdate=str(values_dict['birthdate']),bank_account_number=str(values_dict['bank_account_number']).upper(),address=str(values_dict['address']),email=str(values_dict['email']).lower(),phonenumber=str(values_dict['phonenumber']),institution=str(values_dict['institution']), cursus=str(values_dict['cursus']), description = str(values_dict['description']), photo = str(values_dict['photo']), artist_id=int(values_dict['artist_id'])))
            message= "Données mises à jour"
            status='success'
        except:
            message= "Erreur lors de la mise à jour du profil."
            status='error'
    dbase.close()
    return {'message':message,'status':status}

@app.put('/update_customer')
async def update_customer(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    logverif=dbase.execute('''SELECT is_logged from customer WHERE customer_id = "{customer_id}" '''.format(customer_id= int(values_dict['customer_id']))).fetchall()
    message = ''
    status =''
    
    if int(logverif[0][0]) == 0:
        message = "Utilisateur non connecté"
        status = 'error'
    else:
        try:
            dbase.execute('''UPDATE customer SET firstname = "{firstname}" , lastname ="{lastname}" , username = "{username}", address = "{address}", birthdate = "{birthdate}" , email = "{email}", phonenumber="{phonenumber}" WHERE customer_id = "{customer_id}"'''.format(firstname=str(values_dict['firstname']).capitalize(),lastname=str(values_dict['lastname']).capitalize(),username=str(values_dict['username']),address=str(values_dict['address']),birthdate=str(values_dict['birthdate']),email=str(values_dict['email']).lower(), phonenumber=str(values_dict['phonenumber']), customer_id=int(values_dict["customer_id"])))
            message= "Données mises à jour"
            status = 'success'
        except:
            message= "Erreur lors de la mise à jour du profil."
            status='error'
    dbase.close()
    return {'message': message, 'status': status}

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
        try: 
            dbase.execute('''INSERT INTO artwork(title,price,description,evaluation,picture,sold,info,artist_id) VALUES(?,?,?,?,?,?,?,?) ''', (str(values_dict['title']), float(values_dict['price']), str(values_dict['description']),str(values_dict['evaluation']), str(values_dict['picture']),int(0),int(values_dict['info']),int(values_dict['artist_id'])))
            message = "Oeuvre publiée."
            status ='success'
        except:
            message = "Une erreur est survenue... Veuillez réessayer."
            status = 'error'

    dbase.close()
    return {'message':message,'status':status}

@app.post("/delete_work") #AJOUTER DELETE EVERYTHING LINKED TO ARTWORK (COMMAND PAYMENT ETC..._)
async def delete_work(payload: Request): 
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    message = ""
    status =''

    try:
        dbase.execute('''DELETE from artwork  WHERE work_id = "{work_id}" '''.format(work_id= int(values_dict['work_id'])))
        message = "Oeuvre correctement supprimée !"
        status ='success'
    except:
        message = "Une erreur est survenue..."
        status ='error'

    dbase.close()
    return {'message':message,'status':status}

@app.get("/all_work")
async def all_work():
    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    data=[]

    try:
        data = dbase.execute('''SELECT * FROM artwork LEFT JOIN artist ON artist.artist_id = artwork.artist_id ORDER BY sold ASC ''').fetchall()
        status = 'success'
    except:
        status = 'error'

    dbase.close()
    return {'status':status, 'data':data}

@app.post("/check_yourwork")
async def check_yourwork(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    logverif=dbase.execute('''SELECT is_logged from artist WHERE artist_id = "{artist_id}" '''.format(artist_id= int(values_dict['artist_id']))).fetchall()
    status = ''
    message = ''
    data=[]

    
    if int(logverif[0][0]) == 0:
        status ='error'
        message = 'Vous devez être connecté pour voir vos oeuvres'
    else:
        data = dbase.execute('''SELECT * FROM artwork WHERE artist_id = "{artist_id}" ORDER BY sold ASC'''.format(artist_id=int(values_dict['artist_id']))).fetchall()
        status = 'success'
        message= ''
        if len(data) == 0:
            status = 'warning'
            message = 'Vous n\'avez pas encore d\'oeuvres'

    dbase.close()
    return {'status': status,'data': data, 'message': message}

##########################

def testCard(creditnumber):
    cardnumber=str(creditnumber)[:-1]
    cardnumberindices = list(cardnumber)
    cardnumberindices.reverse()
    evenindices= cardnumberindices[0::2]
    oddindices= cardnumberindices[1::2]

    sumnb = 0 

    for digit in oddindices:
        sumnb += int(digit)

    for digit in evenindices : 
        double = int(digit)*2 
        if double > 9 : 
            double -= 9 
        sumnb += double

    sumnb += int(str(creditnumber[-1:]))

    return sumnb % 10 == 0


@app.post("/create_order")
async def create_order(payload: Request): 
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    logverif=dbase.execute('''SELECT is_logged from customer WHERE customer_id = "{id}" '''.format(id=int(values_dict['customer_id']))).fetchall()
    message = ''
    status =''
    data=[]

    if int(logverif[0][0]) == 0:
        message = "Utilisateur non connecté"
        status ='error'
    else: 
        try:
            work= int(values_dict['work_id'])
            customer=int(values_dict['customer_id'])
            location = str(values_dict['orderlocation'])
            price=float(values_dict['price'])
            paymentdate=datetime.now()

            cardinfo=str(values_dict['credit_card_number'])  
            creditnumber=str(cardinfo).split('&')[0]
            
            isValidCreditCard = testCard(creditnumber)
            
            if isValidCreditCard:

                if int(values_dict['save']) == 1:
                    await register_credit_card(cardinfo,customer)

                dbase.execute('''INSERT INTO command(orderdate,orderlocation,work_id,customer_id) VALUES(?,?,?,?) ''', (str(paymentdate), location, work, customer))
                dbase.execute(''' UPDATE artwork SET sold = 1  WHERE work_id = "{work_id}" '''.format(work_id= work))

                orderid = dbase.execute('''SELECT order_id FROM command WHERE work_id="{work_id}"'''.format(work_id=work)).fetchall()[0][0]
        
                await pay_order(price,paymentdate,customer,int(values_dict['customer_id']),orderid)

                message = "Commande confirmée"
                status = 'success'

            else: 
                message='Carte de crédit invalide'
                status = 'warning'
        except:
            message ='Commande erronée'
            status ='error'

    dbase.close()
    return {'message':message,'status':status}

async def pay_order(price,paymentdate,customerid,artistid,orderid):

    dbase=sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

    dbase.execute('''INSERT INTO payment(amount,payment_date,customer_id,artist_id,order_id) VALUES (?,?,?,?,?)''', ( float(price),str(paymentdate), int(customerid), int(artistid), int(orderid)))
    dbase.close()
    
###############################################################
@app.get("/my_purchase")
async def my_purchase(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    try:
        data = dbase.execute('''SELECT * FROM artwork LEFT JOIN command ON artwork.work_id = command.work_id WHERE customer_id= "{customer_id}"'''.format(customer_id=int(values_dict['customer_id']))).fetchall()
        status = 'success'
        message = 'Mes achats'
    except:
        status ='error'
        message='Aucun achat'
    dbase.close()
    
 ##########################################"
    


async def register_credit_card(cardinfo,customer): 

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    dbase.execute('''UPDATE customer SET credit_card_number = '{credit_card}' WHERE customer_id = '{customer_id}' '''.format(credit_card= cardinfo, customer_id = customer))
    dbase.close()


@app.post("/my_purchases")
async def my_purchases(payload: Request):
    values_dict = await payload.json()
    message = ''
    status = ''

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    try:
        data = dbase.execute('''SELECT * FROM artwork LEFT JOIN command ON artwork.work_id = command.work_id WHERE customer_id= "{customer_id}"'''.format(customer_id=int(values_dict['customer_id']))).fetchall()
        if len(data)==0 :  
            message ="Vous n'avez aucun achat"
            status = 'warning'
        else:
            status = 'success'
            message = 'Mes achats'
    except:
        status ='error'
    dbase.close()

    return {'message': message , 'status' : status, 'data' : data}


@app.post("/received_payment")
async def received_payment(payload: Request):
    values_dict = await payload.json()

    dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)
    logverif=dbase.execute('''SELECT is_logged FROM artist WHERE artist_id = "{artist_id}" '''.format(artist_id=int(values_dict['artist_id']))).fetchall()
    message = ''
    data =[]

    if int(logverif[0][0]) == 0:
        message="Utilisateur non connecté"
        status='warning'

    else:
        try:
            data=dbase.execute('''SELECT * FROM payment LEFT JOIN command ON command.order_id = payment.order_id LEFT JOIN artwork ON artwork.work_id = command.work_id  WHERE artwork.artist_id = "{artist_id}"'''.format(artist_id=int(values_dict['artist_id']))).fetchall()
            if len(data)==0 :  
                message ="Vous n'avez aucune vente"
                status = 'warning'
            else:
                message ='Vos payements'
                status = 'success'
        except:
            message = 'Aucun payement reçu' 
            status ='error'

    dbase.close()
    return {'message': message , 'status' : status, 'data' : data}
    

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

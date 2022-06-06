import sqlite3

dbase = sqlite3.connect('Trade_Art_Platform.db', isolation_level=None)

dbase.execute("PRAGMA foreign_keys = 1")

dbase.execute(''' 
    CREATE TABLE IF NOT EXISTS artist (
        artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        birthdate TEXT NOT NULL, 
        bank_account_number TEXT NOT NULL,
        address TEXT NOT NULL,
        email TEXT NOT NULL,
        phonenumber TEXT NOT NULL,
        institution TEXT NOT NULL,
        cursus TEXT NOT NULL,
        description TEXT NOT NULL, 
        photo TEXT NOT NULL, 
        password TEXT NOT NULL,
        is_logged INTEGER NOT NULL
    ) ''')

dbase.execute('''
    CREATE TABLE IF NOT EXISTS customer (
        customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        username TEXT NOT NULL, 
        address TEXT NOT NULL,
        birthdate DATE NOT NULL,
        credit_card_number TEXT, 
        email TEXT NOT NULL,
        phonenumber TEXT NOT NULL,
        password TEXT NOT NULL, 
        is_logged INTEGER NOT NULL 
    ) ''')

dbase.execute('''
    CREATE TABLE IF NOT EXISTS artwork (
        work_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT NOT NULL,
        price FLOAT NOT NULL,
        description TEXT NOT NULL,
        evaluation TEXT NOT NULL,
        picture TEXT NOT NULL, 
        sold INTEGER NOT NULL,
        info INTEGER NOT NULL,
        artist_id INTEGER NOT NULL,
        FOREIGN KEY(artist_id) REFERENCES artist(artist_id)
    ) ''')


dbase.execute('''
    CREATE TABLE IF NOT EXISTS command (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderdate TEXT NOT NULL,
        orderlocation TEXT NOT NULL,
        work_id INTEGER NOT NULL,
        customer_id INTEGER NOT NULL,
        FOREIGN KEY(work_id) REFERENCES artwork(work_id),
        FOREIGN KEY(customer_id) REFERENCES customer(customer_id)
    ) ''')


dbase.execute('''
    CREATE TABLE IF NOT EXISTS payment (
        payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount FLOAT NOT NULL,  
        payment_date TEXT NOT NULL,
        customer_id INTEGER NOT NULL,
        artist_id INTEGER NOT NULL,
        order_id INTEGER NOT NULL,
        FOREIGN KEY(customer_id) REFERENCES customer(customer_id),
        FOREIGN KEY(artist_id) REFERENCES artist(artist_id),
        FOREIGN KEY(order_id) REFERENCES command(order_id)
    ) ''')

dbase.close()
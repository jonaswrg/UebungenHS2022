import uvicorn
import sqlalchemy
import databases

from fastapi import FastAPI, Depends, status, Request, Form
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi.templating import Jinja2Templates

space = [""]
app = FastAPI()
templates = Jinja2Templates(directory="templates/")

SECRET = "secret-key"

manager = LoginManager(SECRET, token_url="/auth/login", use_cookie=True)
manager.cookie_name = "cookie-name"


database = databases.Database("sqlite:///database.db")
engine = sqlalchemy.create_engine("sqlite:///database.db", connect_args= {"check_same_thread": False})
metadata = sqlalchemy.MetaData()

notes = sqlalchemy.Table(
    "notes", metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key= True),
    sqlalchemy.Column("user", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String)
)

DB = {"user1": {"name": "Hans Muster", "email": "hans.muster@gmail.com", "password":"12345", "username": "user1"},
      "user2":{"name": "Franz Test", "email": "franz.test@gmail.com", "password":"pass123", "username": "user2"},
      "user3":{"name": "Max Beispiel", "email": "max.bsp@gmeil.com", "password":"passwort", "username": "user3"}
      }

@manager.user_loader()
def load_user(username:str):
    user = DB.get(username)
    return user

@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)
    if not user:
        raise InvalidCredentialsException
    elif password != user["password"]:
        raise InvalidCredentialsException
    access_token = manager.create_access_token(
        data= {"sub": username}
    )
    resp = RedirectResponse(url="/new", status_code=status.HTTP_302_FOUND)

    manager.set_cookie(resp, access_token)

    return resp

@app.get("/login", response_class=HTMLResponse)
def loginwithCreds():
    with open("templates/login.html") as f:
        return HTMLResponse(content=f.read())

@app.get("/new")
async def creat_notes(request: Request, user = Depends(manager)):
    return templates.TemplateResponse("news.html", context={"request": request})

@app.post("/new")
async def post_notes(request: Request, title =Form(), text= Form(), user= Depends(manager)):
    query= notes.insert().values(title=title, text=text, user=user["username"])
    print (user)
    myid = await database.execute(query)
    return templates.TemplateResponse("news.html", context={"request": request})

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get(f"""/users/user1""")
async def read_notes():
    query = notes.select().where(notes.c.user == "user1")
    return await database.fetch_all(query)

@app.get(f"""/users/user2""")
async def read_notes():
    query = notes.select().where(notes.c.user == "user2")
    return await database.fetch_all(query)

@app.get(f"""/users/user3""")
async def read_notes():
    query = notes.select().where(notes.c.user == "user3")
    return await database.fetch_all(query)



uvicorn.run(app, host="localhost", port=8000)
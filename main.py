import os
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_route, category_route, faq_route, resource_route, user_route
from dotenv import load_dotenv
load_dotenv()


app = FastAPI()
main_router = APIRouter()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

main_router.include_router(user_route.router)
main_router.include_router(auth_route.router)
main_router.include_router(resource_route.router)
main_router.include_router(category_route.router)
main_router.include_router(faq_route.router)

app.include_router(main_router)
@app.get("/")
def read_root():
    return {"Hello": "World"}

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def startseite():
    return {"nachricht": "Unique Studyclub Backend läuft! 🎓"}

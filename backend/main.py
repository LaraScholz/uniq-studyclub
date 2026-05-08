from fastapi import FastAPI
from groq import Groq
from dotenv import load_dotenv
import os 



# ! Wichtig: API Key niemals auf GitHub pushen
# ? Frage: Sollen wir später mehrere Sprachen unterstützen?
# TODO: Groq API einbinden
# TODO: Endpunkt für Community hinzufügen
# TODO: Login/Registrierung bauen
# * Das hier läuft bereits perfekt ✅


# Setup 
load_dotenv(dotenv_path=".env") # .env Datei laden

app = FastAPI()


client = Groq(
api_key=os.environ.get("GROQ_API_KEY"),
)


@app.get("/")
def startseite():
    # * Startseite funktioniert
    return {"nachricht": "Unique Studyclub Backend läuft! 🎓"}

# TODO: Später Datenbankverbindung hier prüfen
@app.get("/health")
def health_check():
    return {"status": "ok"}


# TODO: Chatverlauf einbauen
@app.post("/frage")
async def frage_stellen(frage: str):
    antwort = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": "Du bist ein hilfreicher Studenten-Tutor. Erkläre Dinge klar und einfach."
            },
            {
                "role": "user",
                "content": frage
            }
        ]
    )
    return {"antwort": antwort.choices[0].message.content}
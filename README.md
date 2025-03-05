README.md
# 🎵 Music Library API

Ett REST API för att hantera en musikbibliotek med CRUD-funktionalitet byggt med **Node.js, Express och MongoDB**.

## 🚀 Funktionalitet
- Skapa, läsa, uppdatera och radera låtar
- Koppling till en MongoDB-databas (kommer snart)
- Felhantering och validering

## 🛠️ Installation
1. Klona detta repo:
    ```sh
    git clone https://github.com/Shah-Sabouri/u05-music-library-api.git

2. Installera beroenden:
    ```sh
    npm install 

3. Skapa en .env-fil och lägg till:
    ```ini
    MONGO_URI= (kommer snart)

4. Starta servern:
    ```sh
    npm start

## 🛣️ API Endpoints (just nu med dummydata)

| Metod  | Endpoint      | Beskrivning            |
|--------|-------------|------------------------|
| GET    | `/songs`     | Hämta alla låtar       |
| GET    | `/songs/:id` | Hämta en låt via ID    |
| POST   | `/songs`     | Lägg till en ny låt    |
| PUT    | `/songs/:id` | Uppdatera en låt       |
| DELETE | `/songs/:id` | Ta bort en låt         |

## 📝 Kommande uppdateringar

- Koppling till MongoDB
- Deployment till en molntjänst
- cURL-exempel för API-anrop
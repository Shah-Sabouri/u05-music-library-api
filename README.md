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

3. Skapa en `.env`-fil och lägg till:
    ```ini
    MONGO_URI=your_mongodb_connection_string

4. Starta servern:
    ```sh
    npm run dev

## 🛣️ API Endpoints (just nu med dummydata)

| Metod  | Endpoint      | Beskrivning            |
|--------|-------------|------------------------|
| GET    | `/songs`     | Hämta alla låtar       |
| GET    | `/songs/:id` | Hämta en låt via ID    |
| POST   | `/songs`     | Lägg till en ny låt    |
| PUT    | `/songs/:id` | Uppdatera en låt       |
| DELETE | `/songs/:id` | Ta bort en låt         |

## 🛠️ cURL-exempel för API-anrop

### 📌 Hämta alla låtar
```sh
curl -X GET http://localhost:3000/api/songs
```
### 📌 Hämta en låt via ID
```sh
curl -X GET http://localhost:3000/api/songs/{id}
```
### 📌 Skapa en ny låt
```sh
curl -X POST http://localhost:3000/api/songs \
     -H "Content-Type: application/json" \
     -d '{"title": "I Want You", "artist": "Marvin Gaye", "genre": "R&B", "rating": 5}'
```
### 📌 Uppdatera en låt
```sh
curl -X PUT http://localhost:3000/api/songs/{id} \
     -H "Content-Type: application/json" \
     -d '{"title": "New Title", "artist": "New Artist", "genre": "New Genre", "rating": 4}'
```
### 📌 Ta bort en låt
```sh
curl -X DELETE http://localhost:3000/api/songs/{id}
```

## 🚀 Deployment
- API:et ska snart deployas till en molntjänst

## 📝 Kommande uppdateringar
- Implementering av fler funktioner
- Utökad dokumentation och autentisering
- Deployment och testning i produktion
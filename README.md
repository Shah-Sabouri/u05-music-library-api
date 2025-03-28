README.md
# 🎵 Music Library API

Ett REST API för att hantera ett musikbibliotek med CRUD-funktionalitet byggt med **Node.js, Express och MongoDB**.

## 🚀 Funktionalitet
- Skapa, läsa, uppdatera och radera låtar
- Filtrera låtar efter artister, samt sortera låtarna efter deras rating (från högst till lägst och vice versa)
- Koppling till en MongoDB-databas
- Felhantering och validering

## 🚀 Deployment
```sh
https://u05-music-library-api.onrender.com
```

## 🛠️ Installation
1. Klona detta repo:
    ```sh
    git clone https://github.com/Shah-Sabouri/u05-music-library-api.git

2. Installera beroenden:
    ```sh
    npm install 

3. Skapa en `.env`-fil och lägg till:
    ```sh
    MONGO_URI=your_mongodb_connection_string

4. Starta servern:
    ```sh
    npm run dev

## 🛣️ API Endpoints

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
curl -X GET https://u05-music-library-api.onrender.com/api/songs
```
### 📌 Hämta en låt via ID
```sh
curl -X GET https://u05-music-library-api.onrender.com/api/songs/{id}
```
### 📌 Skapa en ny låt
```sh
curl -X POST https://u05-music-library-api.onrender.com/api/songs \
     -H "Content-Type: application/json" \
     -d '{"title": "Representin 93", "artist": "2pac", "genre": "Hiphop", "rating": 5}'
```
### 📌 Uppdatera en låt
```sh
curl -X PUT https://u05-music-library-api.onrender.com/api/songs/{id} \
     -H "Content-Type: application/json" \
     -d '{"title": "Representin 93", "artist": "2pac", "genre": "Hiphop", "rating": 4}'
```
### 📌 Ta bort en låt
```sh
curl -X DELETE https://u05-music-library-api.onrender.com/api/songs{id}
```
### 📌 Filtrera låtar efter artist
```sh
curl -X GET "https://u05-music-library-api.onrender.com/api/songs?artist={artist}"
```
### 📌 Filtrera och sortera låtar efter artist och rating:
```sh
curl -X GET "https://u05-music-library-api.onrender.com/api/songs?artist={artist}&sort=desc"
```
### 📌 Sortera låtar efter rating i stigande ordning:
```sh
curl -X GET "https://u05-music-library-api.onrender.com/api/songs?artist={artist}&sort=asc"
```

## 🛠️ Felhantering & Statuskoder

| Statuskod | Scenario | Exempel på felmeddelande |
|-----------|---------|---------------|
| **400** | Felaktigt eller ofullständigt request | `"Invalid song ID format"` eller `"All fields are required"` |
| **404** | Låten finns inte i databasen | `"Song not found"` |
| **500** | Serverfel (t.ex. problem med databasen) | `"Server Error"` |

### 📌 Exempel på felmeddelanden
#### ❌ Försök hämta en låt med ogiltigt ID
```sh
curl -X GET "http://localhost:3000/api/songs/12345"
```
#### 📤 Svar:
```sh
{
  "message": "Invalid song ID format"
}
```
#### ❌ Försök skapa en låt utan alla obligatoriska fält
```sh
curl -X POST http://localhost:3000/api/songs \
     -H "Content-Type: application/json" \
     -d '{"title": "Song without artist"}'
```
#### 📤 Svar:
```sh
{
  "message": "All fields are required: title, artist, genre, rating"
}
```

#### ❌ Försök hitta artist och dennes låtar som inte finns
```sh
curl -X GET "http://localhost:3000/api/songs?artist=xyz"
```
#### 📤 Svar:
```sh
{
  "message": "No songs found for artist: xyz"
}
```

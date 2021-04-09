#ChatApp - Slotsfeed message board

Et meget (meget) simpel SoMe besked board FULL STACK (Client, server, database). 

Features som:

* Brugere kan sende beskeder 📧
* Brugere kan se alle sendte beskeder 👀✌

## Mine mål

* [ ] 📝 Diagram af Full Stack
* [x] 🔎 Hold Client og Server hver for sig
* [x] ⌨️ Få bruger input direkte på siden
* [x] ➡️ Send brugernes input til database
* [x] 🗃 Opbevar dataen i database
* [x] 🔍 Modtag dataen fra en database til serveren
* [x]] ⬅️ Modtag dataen fra server til klientens side
* [x] 🙈 Gem loading buffer - når load er done
* [x] 🚀 Deploy clienten med Heroku
* [x] 🚀 Deploy database med MongoDB & Monk
* [x] 🚀 Deploy serveren med Heroku

## Front-end

* [x] client folder
* [x] Setup index.html
* [x] Stjæl nem css fra Skeleton CSS
  * http://getskeleton.com/
  * https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css
* [x] Header
* [x] form
  * [x] Name
  * [x] Content
* [x] Lyt efter form submits
* [x] Gem formen, når besked er sendt
* [x] Vis loading gif
* [x] Få data fra form og log den i console

## Back-end

* [x] server folder
* [x] npm init -y
* [x] npm install express morgan
* [x] Setup index.js
* [x] tilføj GET / route
* [x] tilføj POST /mews route
  * [x] log out req.body

## Front-end

* [x] fetch POST /msgs med form data
* [x] Opdag du mangler CORS

## Back-end

* [x] npm install cors
* [x] Check serveren får data
* [x] Tilføj JSON body parser middleware
* [x] Valider navn og besked
  * [x] SKAL være en string
  * [x] Kan ikke være tom
* [x] Hvis ikke den kan bruges
  * [x] Error code 422
  * [x] "Invalid message, must contain name and content"
* [x] Setup DB forbindelse
  * [x] npm install monk
  * [x] Forbind til db
  * [x] Skab 'dokument' til at samle messages
* [x] Hvis den kan bruges
  * [x] Lav objekt med besked
    * [x] name, content, created_date
  * [x] Indsæt i DB
  * [x] Responder med message object
  * [x] Opbevar data i database

## Front-end

* [x] Console log message, efter ny message
* [x] Hvis form igen
* [x] Gem loading gif (den er cool)

## Back-end

* [x] GET /slotsfeed
  * [x] Responder med messages fra DB

## Front-end

* [x] fetch GET /slotsfeed
  * [x] Iterate over messages
  * [x] Append dem til siden
  * [x] Reverse dem (for at den nyeste er øverst)
  * [x] Hvis form
  * [x] Gem loading spinner (stadig cool)
* [x] fetch GET /slotsfeed hver gang ny message kommer


## Back-end

* [x] npm install bad-words
  * [x] Filtrer navne og beskeder for 'mund-lort' inden vi lader dem igennem
* [ ] npm install express-rate-limit
  * [ ] Begræns message-send hastighed, for anti-spam

## Deploy

  * [x] Setup environment variables
  * [x] Setup database med MongoDB Atlas
    * [x] Database connection
      * process.env.MONGO_URI
  * [x] Deploy med Heroku

## Idéer til videreudvikling??

* Gifs og billeder (Tak, Lærer Maria)
* Hent nye beskeder hver gang en ny slås op fra anden PC
* ... :)
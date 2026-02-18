import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in

// const teamName = 'Cheer';
const personName = 274;


const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

app.use(express.urlencoded({ extended: true }))


app.get('/', async function (request, response) {

  // Filter eerst de berichten die je wilt zien, net als bij personen
  // Deze tabel wordt gedeeld door iedereen, dus verzin zelf een handig filter,
  // bijvoorbeeld je teamnaam, je projectnaam, je person ID, de datum van vandaag, etc..
  const params = {
    'filter[for]': `Person ${personName}`,
  }

  // Maak hiermee de URL aan, zoals we dat ook in de browser deden
  const apiURL = 'https://fdnd.directus.app/items/messages?' + new URLSearchParams(params)
  const messagesResponse = await fetch(apiURL)
  const messagesResponseJSON = await messagesResponse.json()

  console.log('API URL voor messages:', apiURL)


  const paramsPerson = {
    'sort': 'name',
    'fields': '*,squads.*',
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526'
  }

  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(paramsPerson))
  const personResponseJSON = await personResponse.json()


  // En render de view met de messages
  response.render('index.liquid', {
    personName: personName,
    messages: messagesResponseJSON.data,
    persons: personResponseJSON.data
  })
})

app.get('/random', async function (request, response) {
   
  // Haalt alleen studenten van FDND Jaar 1 en cohort 2526 op uit de database
  const paramsPerson = {
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526'
  }
  // Maakt de URL aan met de filters 
  const apiURL =
    'https://fdnd.directus.app/items/person/?' +
    new URLSearchParams(paramsPerson)

  const personResponse = await fetch(apiURL)
  const personResponseJSON = await personResponse.json()

  const persons = personResponseJSON.data
  // Kies een random index op basis van het aantal personen
  const randomIndex = Math.floor(Math.random() * persons.length)
  // Met die index kiezen we een random persoon uit de lijst 
  const randomPerson = persons[randomIndex]
  
  response.render('random.liquid', {
    person: randomPerson
  })
})

app.post('/', async function (request, response) {

  // Stuur een POST request naar de messages tabel
  // Een POST request bevat ook extra parameters, naast een URL
  await fetch('https://fdnd.directus.app/items/messages', {

    // Overschrijf de standaard GET method, want ook hier gaan we iets veranderen op de server
    method: 'POST',

    // Geef de body mee als JSON string
    body: JSON.stringify({
      // Dit is zodat we ons bericht straks weer terug kunnen vinden met ons filter
      for: `Person ${personName}`,
      // En dit zijn onze formuliervelden
      from: request.body.from,
      text: request.body.text
    }),

    // En vergeet deze HTTP headers niet: hiermee vertellen we de server dat we JSON doorsturen
    // (In realistischere projecten zou je hier ook authentication headers of een sleutel meegeven)
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Stuur de browser daarna weer naar de homepage
  response.redirect(303, '/')
})


app.set('port', process.env.PORT || 8000)

if (personName == '') {
  console.log('Voeg eerst de naam van jullie persoon in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}

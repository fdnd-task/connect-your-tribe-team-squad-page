import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in

// const teamName = 'Cheer';
let personID = 274;


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
  const paramsMessages = {
    'filter[for]': `Person ${personID}`,
  }

  // Maak hiermee de URL aan, zoals we dat ook in de browser deden
  const apiURL = 'https://fdnd.directus.app/items/messages?' + new URLSearchParams(paramsMessages)
  const messagesResponse = await fetch(apiURL)
  const messagesResponseJSON = await messagesResponse.json()

  console.log('API URL voor messages:', apiURL)


  const paramsPersons = {
    'sort': 'name',
    'fields': '*,squads.*',
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526'
  }

  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(paramsPersons))
  const personResponseJSON = await personResponse.json()


  // En render de view met de messages
  response.render('index.liquid', {
    personID: personID,
    messages: messagesResponseJSON.data,
    persons: personResponseJSON.data
  })
})

app.get('/search', async function (request, response) {
  const q = request.query.q || "";
  const isSearch = !!request.query.q

  console.log(q)

  const params = {
    sort: 'name',
    fields: '*,squads.*',
    filter: JSON.stringify({
      _and: [
        {
          _or: [
            { name: { _icontains: `${q}` } },
            { fav_animal: { _icontains: `${q}` } },
            { fav_tag: { _icontains: `${q}` } },
            { residency: { _icontains: `${q}` } },
            { hair_color: { _icontains: `${q}` } }
          ]
        },
        {
          squads: {
            squad_id: {
              tribe: { name: { _eq: 'FDND Jaar 1' } },
              cohort: { _eq: '2526' }
            }
          }
        }
      ]
    })
  };

  const personResponse = await fetch(`https://fdnd.directus.app/items/person?` + new URLSearchParams(params))
  const personResponseJSON = await personResponse.json()

  response.render('artikelen.liquid', { query: q, persons: personResponseJSON.data, isSearch: isSearch });
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

  personID = randomPerson.id

  const paramsMessages = {
    'filter[for]': `Person ${personID}`,
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526'
  }

  const messagesApiURL =
    'https://fdnd.directus.app/items/messages/?' +
    new URLSearchParams(paramsMessages)

  const messagesResponse = await fetch(messagesApiURL)
  const messagesResponseJSON = await messagesResponse.json()
  const messages = messagesResponseJSON.data


  console.log(personID)

  response.render('random.liquid', {
    person: randomPerson,
    personID: personID,
    messages: messages
  })
})

app.post('/random', async function (request, response) {

  // Stuur een POST request naar de messages tabel
  // Een POST request bevat ook extra parameters, naast een URL
  await fetch('https://fdnd.directus.app/items/messages', {

    // Overschrijf de standaard GET method, want ook hier gaan we iets veranderen op de server
    method: 'POST',

    // Geef de body mee als JSON string
    body: JSON.stringify({
      // Dit is zodat we ons bericht straks weer terug kunnen vinden met ons filter
      for: `Person ${personID}`,
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
  response.redirect(303, '/random')
})

app.get('/studenten', async function (request, response) {

  const q = request.query.search || '' // kijken of er iets in de zoekbalk staat
  const isSearch = q.length > 0 //true als er iets gezocht is en false als de zoekbalk leeg id


  const params = {
    'sort': 'name',
    'fields': '*,squads.*',
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    'filter[squads][squad_id][cohort]': '2526',
    'limit': '100'

  }

  // Alleen zoekfilter toevoegen als er een zoekterm is
  // Als er gezocht wordt, voeg dan een naam-filter toe
  // _icontains = zoekt hoofdletterongevoelig
  if (isSearch) {
    params['filter[name][_icontains]'] = q
  }

  const personResponse = await fetch(
    'https://fdnd.directus.app/items/person?' + new URLSearchParams(params)
  )

  const personResponseJSON = await personResponse.json()

  response.render('artikelen.liquid', {
    query: q,
    persons: personResponseJSON.data,
    isSearch: isSearch // true/false, voor de if in liquid
  })

})


app.set('port', process.env.PORT || 8000)

if (personID == '') {
  console.log('Voeg eerst de naam van jullie persoon in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}
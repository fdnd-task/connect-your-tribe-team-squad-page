import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in
const teamName = 'chill';

const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.use(express.urlencoded({extended: true}))


app.get('/', async function (request, response) {
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}')

  const ninetySeventyOneResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["1971-01-01","1971-12-31"]}}]}')
  const ninetySeventyThreeResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["1973-01-01","1973-12-31"]}}]}')
  const ninetyEightyFourResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["1984-01-01","1984-12-31"]}}]}')
  const ninetyNinetyResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["1990-01-01","1990-12-31"]}}]}')
  const ninetyNinetyFourResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["1994-01-01","1994-12-31"]}}]}')
  const ninetyNinetyNineResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["1999-01-01","1999-12-31"]}}]}')
  const twoThousandResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["2000-01-01","2000-12-31"]}}]}')
  const twoThousandOneResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["2001-01-01","2001-12-31"]}}]}')
  const twoThousandTwoResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["2002-01-01","2002-12-31"]}}]}')
  const twoThousandThreeResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["2003-01-01","2003-12-31"]}}]}')
  const twoThousandFourResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["2004-01-01","2004-12-31"]}}]}')
  const twoThousandFiveResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["2005-01-01","2005-12-31"]}}]}')
  const twoThousandSixResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["2006-01-01","2006-12-31"]}}]}')
  const twoThousandSevenResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"birthdate":{"_between":["2007-01-01","2007-12-31"]}}]}')

  const ninetySeventyOneResponseJSON = await ninetySeventyOneResponse.json()
  const ninetySeventyThreeResponseJSON = await ninetySeventyThreeResponse.json()
  const ninetyEightyFourResponseJSON = await ninetyEightyFourResponse.json()
  const ninetyNinetyResponseJSON = await ninetyNinetyResponse.json()
  const ninetyNinetyFourResponseJSON = await ninetyNinetyFourResponse.json()
  const ninetyNinetyNineResponseJSON = await ninetyNinetyNineResponse.json()
  const twoThousandOneResponseJSON = await twoThousandOneResponse.json()
  const twoThousandTwoResponseJSON = await twoThousandTwoResponse.json()
  const twoThousandThreeResponseJSON = await twoThousandThreeResponse.json()
  const twoThousandFourResponseJSON = await twoThousandFourResponse.json()
  const twoThousandFiveResponseJSON = await twoThousandFiveResponse.json()
  const twoThousandSixResponseJSON = await twoThousandSixResponse.json()
  const twoThousandSevenResponseJSON = await twoThousandSevenResponse.json()
  const personResponseJSON = await personResponse.json()
  const twoThousandResponseJSON = await twoThousandResponse.json()
  
  response.render('index.liquid', {
    persons: personResponseJSON.data, 
    ninetySeventyOne: ninetySeventyOneResponseJSON.data,
    ninetySeventyThree: ninetySeventyThreeResponseJSON.data,
    ninetyEightyFour: ninetyEightyFourResponseJSON.data,
    ninetyNinety: ninetyNinetyResponseJSON.data,
    ninetyNinetyFour: ninetyNinetyFourResponseJSON.data,
    ninetyNinetyNine: ninetyNinetyNineResponseJSON.data,
    twoThousands: twoThousandResponseJSON.data,
    twoThousandOne: twoThousandOneResponseJSON.data,
    twoThousandTwo: twoThousandTwoResponseJSON.data,
    twoThousandThree: twoThousandThreeResponseJSON.data,
    twoThousandFour: twoThousandFourResponseJSON.data,
    twoThousandFive: twoThousandFiveResponseJSON.data,
    twoThousandSix: twoThousandSixResponseJSON.data,
    twoThousandSeven: twoThousandSevenResponseJSON.data })
})

app.get('/', async function (request, response) {
  const messagesResponse = await fetch(`https://fdnd.directus.app/items/messages/?filter={"for":"Team ${teamName}"}`)
  const messagesResponseJSON = await messagesResponse.json()

  response.render('index.liquid', {
    teamName: teamName,
    messages: messagesResponseJSON.data
  })
})

app.post('/', async function (request, response) {
  await fetch('https://fdnd.directus.app/items/messages/', {
    method: 'POST',
    body: JSON.stringify({
      for: `Team ${teamName}`,
      from: request.body.from,
      text: request.body.text
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/')
})


app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}


const dcNames = [
  {name: 'Batman'},
  {name: 'Superman'},
  {name: 'Joker'},
  {name: 'Lex Luthor'},
  {name: 'Robin'},
  {name: 'The Flash'},
  {name: 'Professor Zoom'},
  {name: 'Wonder Woman'},
  {name: 'Supergirl'},
  {name: 'Static'},
  {name: 'Green Lantern'},
  {name: 'Aquaman'},
  {name: 'Green Arrow'},
  {name: 'Question'},
  {name: 'Martian Manhunter'},
  {name: 'Cyborg'},
  {name: 'Black Canary'},
  {name: 'Shazam'},
  {name: 'Black Adam'},
  {name: 'Catwoman'},
  {name: 'Darkseid'},
  {name: 'Brainiac'},
  {name: 'Deathstroke'},
  {name: 'Harley Quinn'}
]

const dcHeroes = [];

dcNames.map((hero, index) => {
  dcHeroes.push(
    {
      name: hero.name,
      image: `/assets/dc/dc${index}.jpeg`,
      order: index
    }
  )
})

export default dcHeroes;
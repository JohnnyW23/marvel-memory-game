const marvelNames = [
  {name: 'Spider-man'},
  {name: 'Iron-man'},
  {name: 'Daredevil'},
  {name: 'Captain America'},
  {name: 'Scarlet Witch'},
  {name: 'Loki'},
  {name: 'Deadpool'},
  {name: 'Wolverine'},
  {name: 'Doctor Strange'},
  {name: 'Nightcrawler'},
  {name: 'Thor'},
  {name: 'Black Widow'},
  {name: 'Vision'},
  {name: 'Punisher'},
  {name: 'Black Panther'},
  {name: 'Cyclops'},
  {name: 'Professor X'},
  {name: 'Galactus'},
  {name: 'Hulk'},
  {name: 'Human Torch'},
  {name: 'Star-lord'},
  {name: 'Quicksilver'},
  {name: 'Venom'},
  {name: 'Thanos'}
];

const marvelHeroes = [];

marvelNames.map((hero, index) => {
  marvelHeroes.push(
    {
      name: hero.name,
      image: `/assets/marvel/marvel${index}.jpeg`,
      order: index
    }
  )
})

export default marvelHeroes;
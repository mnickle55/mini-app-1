/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      return knex('movies').insert([
        {title: 'The Shawshank Redemption', description: 'Andy Dufresne is sentenced to life in Shawshank State Penitentiary for the murder of his wife and her lover, despite his claims of innocence. He befriends a fellow inmate, Ellis Boyd "Red" Redding, and together they navigate the harsh realities of prison life.' ,watched:false},{title: 'The Godfather', description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.' ,watched:false},{title: 'Pulp Fiction', description: 'Several interlocking stories of violent crime and redemption play out in Los Angeles.' ,watched:false},{title: 'The Dark Knight', description: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the city streets.' ,watched:false},{title: 'Forrest Gump', description: 'Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.' ,watched:false},{title: 'The Silence of the Lambs', description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.' ,watched:false},{title: 'The Matrix', description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.' ,watched:false},{title: 'Fight Club', description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.' ,watched:false},{title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' ,watched:false},{title: 'The Departed', description: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.' ,watched:false}
      ]);
    });
};

  

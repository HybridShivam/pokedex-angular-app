export class Pokemon {
  constructor(
    // From pokemon
    public name: string,
    public id: number,
    // public sprite, // no
    public types,
    public abilities,
    public height,
    public weight,
    public baseExperience,
    // public forms, // no
    public heldItems,
    // public gameIndices, // no
    public is_default,
    // public location, // no
    public moves,
    // public order, // no
    public stats,
    public species,
    // From pokemon-species
    public speciesDetails,
    public color,
    public genera,
    public varieties,
    public evolutionChainID
  ) {
  }
}

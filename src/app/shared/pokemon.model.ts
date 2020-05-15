export class Pokemon {
  constructor(
    // From pokemon
    public name: string,
    public id: number,
    public sprite,
    public types,
    public abilities,
    public height,
    public weight,
    public baseExperience,
    public forms,
    public heldItems,
    public gameIndices,
    public is_default,
    public location,
    public moves,
    public order,
    public stats,
    // From pokemon-species
    public species,
    public speciesDetails,
    public color,
    public genera,
    public varieties
  ) {
  }
}

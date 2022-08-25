import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../shared/pokemon.model';
import { PokemonService } from '../shared/pokemon.service';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  noOfPokemonLoaded: number;
  pokemonListSubscription;
  noOfLoadedPokemonSubscription;
  searchItem: string;
  searchItemSubscription;
  scrolled = true;
  resizeTimeout: any = 250;

  @ViewChild(VirtualScrollerComponent)
  private virtualScroller: VirtualScrollerComponent;


  @HostListener('window:resize')
  onWindowResize() {
    // debounce resize, wait for resize to finish before doing stuff
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      this.virtualScroller.invalidateCachedMeasurementAtIndex(0);
    }).bind(this), 500);
  }

  constructor(private pokemonService: PokemonService, public changeDetectorRef: ChangeDetectorRef) {
    this.pokemonService.previousPokemonID.subscribe(
      (response) => {
        this.scrolled = false;
        this.focusOnAnItem(response);
      }
    );
  }

  ngOnInit(): void {
    if (this.pokemonService.pokemons[0]) { // List already loaded
      this.pokemons = this.pokemonService.pokemons;
      this.noOfPokemonLoaded = this.pokemonService.noOfPokemonsLoaded;
    } else { // List not already Loaded
      this.pokemonListSubscription = this.pokemonService.pokemonsListChanged.subscribe(
        (response) => {
          this.pokemons = response.slice(0, this.noOfPokemonLoaded);
        }
      );
      this.noOfLoadedPokemonSubscription = this.pokemonService.newPokemonsLoaded.subscribe(
        (response) => {
          this.noOfPokemonLoaded = response;
        }
      );
    }
    this.searchItemSubscription = this.pokemonService.searchItemSubject.subscribe(
      (response) => {
        this.searchItem = response;
      }
    );
  }

  focusOnAnItem(index) {
    this.virtualScroller.scrollToIndex(index, undefined, -192, 0);
    setTimeout(() => {
      this.scrolled = true;
    }, 250); // Delay to allow the fade in animation to take place
  }

  public trackByPokemonID(index: number, pokemon: Pokemon): number {
    return pokemon.id;
  }

  ngOnDestroy(): void {
    this.pokemonService.searchItemSubject.next('');
    this.searchItemSubscription.unsubscribe();
  }

}

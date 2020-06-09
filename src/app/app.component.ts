import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PokemonService} from './shared/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  loaded = false;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.EverythingLoaded.subscribe(res => {
      this.loaded = res;
    });
  }

  ngAfterViewInit() {
    console.log(this.pokemonService.firstTime);
    setTimeout(() => {
      if (this.pokemonService.firstTime) {
        const toast = this.pokemonService._notifications.success('Welcome To The PokéDex', 'Preloading Data ...', {
          timeOut: 10000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        });
        toast.click.subscribe((event) => {
          const toast2 = this.pokemonService._notifications.info('Hate Waiting ?', 'Don\'t Worry, This app can work OFFLINE thereafter,', {
            timeOut: 10000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
          });
          toast2.click.subscribe((event) => {
            const toast2 = this.pokemonService._notifications.info('Even Better !!!', 'It can be installed!', {
              timeOut: 10000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
          });
        });
      }
    }, 100);
  }
}


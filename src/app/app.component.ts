import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PokemonService} from './shared/pokemon.service';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  loaded = false;
  @ViewChild('header') headerComponent: HeaderComponent;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.EverythingLoaded.subscribe(res => {
      this.loaded = res;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.pokemonService.firstTime) {
        const toast = this.pokemonService._notifications.success('Welcome To The PokéDex', 'Loading Data ...', {
          timeOut: 0,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        });
        toast.click.subscribe((event) => {
          const toast2 = this.pokemonService._notifications.info('Hate Waiting ?',
            'Don\'t Worry, This app can work OFFLINE thereafter...', {
            timeOut: 0,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
          });
          toast2.click.subscribe((event2) => {
            const toast2 = this.pokemonService._notifications.info('It\'s Installable too!', 'Images once loaded will be available for offline usage.', {
              timeOut: 0,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            toast2.click.subscribe((event3) => {
              this.headerComponent.openMenu();
            });
          });
        });
      }
    }, 100);
  }
}


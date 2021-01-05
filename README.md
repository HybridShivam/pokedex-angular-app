<p align="center">
  <a href="https://hybridshivam.com/pokedex/"><img src="https://raw.githubusercontent.com/HybridShivam/pokedex-angular-app/master/pokedex.png" width="250px"></a>
  
  ![Website](https://img.shields.io/badge/Website-Up-green)
  ![Offline](https://img.shields.io/badge/Offline_Compatible-Yes-yellowgreen)
  ![Installable](https://img.shields.io/badge/Installable-Yes-brightgreen)
  ![Maintenance](https://img.shields.io/badge/Maintained-Yes-green)
  ![GitHub release](https://img.shields.io/badge/Version-1.0-brightgreen)
  ![Made with](https://img.shields.io/badge/Angular-9.1.2-red)
  ![Angular CLI](https://img.shields.io/badge/Angular_CLI-9.1.1-orange)
  ![NPM](https://img.shields.io/badge/NPM-6.14.4-yellow)
  ![Node](https://img.shields.io/badge/Node-13.12.0-blue)
</p>
<p align="center">
   A PWA (Progressive Web App) Built using Angular 9 with Service Workers.
   Works Offline and can be installed.<br>
   Built using the PokéAPI.
  
   <p align="center">Website : <a href="https://hybridshivam.com/pokedex/">hybridshivam.com/pokedex</a><br>[For best experience use Chrome or any other Chromium-based browser]</p>
</p>

<p align="center">Leave a :star: if you liked it, also share :link: with those who may be interested.<p>
 
# Screenshots
<p align="center"><img src="https://user-images.githubusercontent.com/28728749/84378747-4d005180-ac02-11ea-802e-705c80cbbccc.png" width="300"> <img src="https://user-images.githubusercontent.com/28728749/84378755-51c50580-ac02-11ea-9e3d-b25b138642ca.png" width="300"> <img src="https://user-images.githubusercontent.com/28728749/84378759-54bff600-ac02-11ea-922c-a8fce6a35479.png" width="300">
 <img src="https://user-images.githubusercontent.com/28728749/84378768-57225000-ac02-11ea-9709-92ca3ecd5cfd.png" width="300">
 <img src="https://user-images.githubusercontent.com/28728749/84378776-5984aa00-ac02-11ea-842f-6187b11c3517.png" width="300">
 <img src="https://user-images.githubusercontent.com/28728749/84378783-5ab5d700-ac02-11ea-9ee7-a2863c6dbdf0.png" width="300">
 <img src="https://user-images.githubusercontent.com/28728749/84378790-5d183100-ac02-11ea-81c9-c230fbd58d49.png" width="300">
 <img src="https://user-images.githubusercontent.com/28728749/84378797-60132180-ac02-11ea-9426-fea8e163924e.png" width="300">
 <img src="https://user-images.githubusercontent.com/28728749/84378808-630e1200-ac02-11ea-8d86-32def594982a.png" width="300">
 <img src="https://user-images.githubusercontent.com/28728749/84378817-673a2f80-ac02-11ea-9e10-30a8c7a5acd4.png" width="300"></p>
 <p align="center"><img src="https://user-images.githubusercontent.com/28728749/85826421-2f0a2380-b7a2-11ea-90ea-236ff398fd53.png" width="150"> <img src="https://user-images.githubusercontent.com/28728749/84378876-7b7e2c80-ac02-11ea-933b-8309279b0e66.png" width="150">
 <img src="https://user-images.githubusercontent.com/28728749/84378883-7d47f000-ac02-11ea-95c3-4ef30f05647a.png" width="150">
 <img src="https://user-images.githubusercontent.com/28728749/84378889-80db7700-ac02-11ea-9a18-a287bd99f13d.png" width="150">
 </p>
 
 
# Versions
 **v1.0**
 * 807 Pokemon Species with all alternate forms including Alolan and Megas.
 * Special Mega Evolution Animation for Desktop Clients. (Can be disabled)
 * Abilities.
 * Moves.
 * Evolution Chains.
 * Training, Breeding, Typing and Forms.
 * Flavor Text according to the selected games.
 * *Works Offline.* :heavy_check_mark:
 * *Can be installed.* :heavy_check_mark:

# Getting Started:

**Repo with all the assets : [PokeDex Assets](https://github.com/HybridShivam/pokemon/)**

**Setting up the environment:**
1. Install Node.js and use `node -v` to check version.
1. IMP Note: You might need to use sudo depending on the npm configuration.
1. Install Angular CLI as `npm install -g @angular/cli`
1. Clone or download this repo.
1. Run `npm install` inside this project folder to install all dependencies.
1. Make sure you use the latest version of the CLI (upgrade guide below)
1. I have set the `serviceWorker` flag to `false` in `angular.json` : So Now there are two ways to start the server: 
  * If `false`
    * Without Service Worker
      1. Run `ng serve` to see the app in action (try `npm start` in case `ng serve` fails).
      1. Connect to app on `localhost:4200`
      (I use `ng serve -o --host 0.0.0.0` so that I can connect to the server via my Mobile device while on the same network and navigating to `<ip-address-of-server>:4200`)
    * With Service Worker
      1. Due to `angular-pwa` this can can only be viewed on production builds so use `ng build --prod --serviceWorker true` , this creates a build in `\dist` directory.
      1. To serve this you'll need http server : `npm install -g http-server`
      1. Run the server using `http-server -c-1 dist\pokedex`

  * If `true`
    * With Service Worker
      1. As service worker is enable here, it can can only be viewed on production builds so use `ng build --prod` , this creates a build in `\dist` directory.
      1. To serve this you'll need http server : `npm install -g http-server`
      1. Run the server using `http-server -c-1 dist\pokedex`

**Upgrading Angular CLI version**
* Run the below commands - use "sudo" only on Mac/ Linux.
1. `sudo npm uninstall -g angular-cli @angular/cli`
1. `npm cache clean --force`
1. `sudo npm install -g @angular/cli`

# Credits
Thanks to [PokéAPI.co](https://github.com/PokeAPI/pokeapi). & [Veekun](https://github.com/veekun/pokedex) for the data, [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page) for the images, [duiker101](https://github.com/duiker101/pokemon-type-svg-icons) for the type icons and of course to Nintendo, Game Freak, and The Pokémon Company for making such an awesome series of games.

# Copyright Notice
This is an unofficial, non-commercial, fan-made app and is NOT affiliated, endorsed or supported by Nintendo, Game Freak and The Pokémon Company in any way. Many images used in this app are copyrighted and are supported under fair use. Pokémon and Pokémon character names are trademarks of Nintendo. No copyright infringement intended.


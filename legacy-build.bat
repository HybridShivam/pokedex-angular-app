SET PathToFolder=deploy
::Building
echo #Building >legacy-build.log
CALL ng build --prod --baseHref /pokedex/ --serviceWorker true >>legacy-build.log

::Clean Previous Deploy Build
echo #Cleaning >>legacy-build.log
rmdir /s/q "%PathToFolder%"
mkdir "%PathToFolder%"

::Copy from dist\ to deploy\
echo #Copying >>legacy-build.log
Xcopy /E dist "%PathToFolder%"\  >>legacy-build.log

::Copy .htaccess to deploy\pokedexog
echo #Add .htaccess >>legacy-build.log
copy .htaccess "%PathToFolder%"\pokedex\ >>legacy-build.log

::Use Brotli Compression on generated js,css,json,csv etc.
echo #Gulp Brotli Task >>legacy-build.log
CALL gulp compress >>legacy-build.log

::Use 7zip to create archive of deploy folder
echo #Zipping >>legacy-build.log
cd "%PathToFolder%"
7z a pokedex.zip pokedex\* >>..\legacy-build.log
PAUSE
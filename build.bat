SET PathToFolder=deploy
::Building
echo #Building >build.log
CALL ng build --prod --baseHref /pokedex/ --serviceWorker true >>build.log

::Clean Previous Deploy Build
echo #Cleaning >>build.log
rmdir /s/q "%PathToFolder%"
mkdir "%PathToFolder%"

::Copy from dist\ to deploy\
echo #Copying >>build.log
Xcopy /E dist "%PathToFolder%"\  >>build.log

::Copy .htaccess to deploy\pokedexog
echo #Add .htaccess >>build.log
copy .htaccess "%PathToFolder%"\pokedex\ >>build.log

::Use Brotli Compression on generated js,css,json,csv etc.
echo #Gulp Brotli Task >>build.log
CALL gulp compress >>build.log

::Use 7zip to create archive of deploy folder
echo #Zipping >>build.log
cd "%PathToFolder%"
7z a pokedex.zip pokedex\* >>..\build.log
PAUSE
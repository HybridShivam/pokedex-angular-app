::Building
echo Building >Build.log
CALL ng build --prod --baseHref /pokedex/ --serviceWorker true

::Clean Previous Build
echo Cleaning >>Build.log
rmdir /Q /S deploy\pokedex 
del /f deploy\pokedex.zip

::Copy from dist\ to deploy\
echo Copying >>Build.log
Xcopy /E dist deploy\

::Copy .htaccess to deploy\pokedex
echo .htaccess >>Build.log
copy deploy\.htaccess deploy\pokedex\

::Use Brotli Compression on generated js,css,json,csv etc.
echo Brotli >>Build.log
CALL gulp compress
cd deploy\

::Use 7zip to create archive of deploy folder
cd deploy
echo Zipping >Build.log
7z a pokedex.zip pokedex\ >>Build.log
PAUSE
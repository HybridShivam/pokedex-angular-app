::Building
echo Building >Build.log
CALL ng build --prod --baseHref /pokedex --serviceWorker true >>Build.log

::Clean Previous Build
echo Cleaning >>Build.log
rmdir /Q /S deploy\pokedex >>Build.log
del /f deploy\pokedex.zip >>Build.log

::Copy from dist\ to deploy\
echo Copying >>Build.log
Xcopy /E dist deploy\ >>Build.log

::Copy .htaccess to deploy\pokedex
echo .htaccess >>Build.log
copy deploy\.htaccess deploy\pokedex\ >>Build.log

::Use Brotli Compression on generated js,css,json,csv etc.
echo Brotli >>Build.log
CALL gulp compress >>Build.log
cd deploy\ >>Build.log

::Use 7zip to create archive of deploy folder
cd deploy
echo Zipping >>Build.log
7z a pokedex.zip pokedex\ >>Build.log
PAUSE
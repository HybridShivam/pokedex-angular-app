#!/bin/bash

# Download dist file PokeDex release
wget https://github.com/TheMatrix97/pokedex-angular-app/releases/download/refs%2Fheads%2Fmaster/dist.tar.gz

tar -xvf dist.tar.gz

sudo mkdir -p /var/www/pokedex

sudo cp -r ./dist/pokedex/* /var/www/pokedex

# Install nginx
sudo apt-get update && sudo apt-get -y install nginx

# Config nginx 
INSTANCE_EC2_DNS=$(curl -s http://169.254.169.254/latest/meta-data/public-hostname) 
cat << EOF > /etc/nginx/sites-available/$INSTANCE_EC2_DNS
server {
        listen 80;
        listen [::]:80;
        root /var/www/pokedex;
        index index.html index.htm index.nginx-debian.html;
        server_name $INSTANCE_EC2_DNS;
        location / {
                try_files \$uri \$uri/ /index.html;
        }
        location /digimon {
            return 500;
        }
}
EOF
ln -s /etc/nginx/sites-available/$INSTANCE_EC2_DNS /etc/nginx/sites-enabled/

sudo service nginx restart

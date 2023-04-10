#!/bin/bash
set -e

echo -n "Building project..."
echo -n
npm run build
echo -n
echo -n "Copying build files to html..."
echo -n
yes | cp -i -av -r /var/www/track/trackdev3/html/Frontend/ettms-v2.1.0/build/. /var/www/track/trackdev3/html/
echo -n
echo -n "Completed check the link..."
echo -n
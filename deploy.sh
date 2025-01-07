#!/bin/bash

# Build the React app
npm run build

# Create a temporary directory for deployment
mkdir -p deploy_temp
cp -r build/* deploy_temp/
cp -r public/assets deploy_temp/

# Make sure the target directory exists
ssh -i "C:\Users\Chetra\Desktop\AWS.pem" ubuntu@13.210.175.219 '
sudo mkdir -p /var/www/html/reactjs
sudo chown -R www-data:www-data /var/www/html/reactjs
'

# Copy the files
scp -i "C:\Users\Chetra\Desktop\AWS.pem" -r deploy_temp/* ubuntu@13.210.175.219:/tmp/reactjs-build

# Deploy and set permissions
ssh -i "C:\Users\Chetra\Desktop\AWS.pem" ubuntu@13.210.175.219 '
sudo rm -rf /var/www/html/reactjs/*
sudo cp -r /tmp/reactjs-build/* /var/www/html/reactjs/
sudo chown -R www-data:www-data /var/www/html/reactjs
sudo chmod -R 755 /var/www/html/reactjs
sudo chmod -R 755 /var/www/html/reactjs/assets

# Clean up
sudo rm -rf /tmp/reactjs-build
'

# Clean up local temp directory
rm -rf deploy_temp

echo "Deployment complete. Checking Apache error log..."
ssh -i "C:\Users\Chetra\Desktop\AWS.pem" ubuntu@13.210.175.219 'sudo tail -n 20 /var/log/apache2/error.log' 
Setting up and running a project using PM2 (a popular process manager for Node.js applications) involves the following steps:

1. Install PM2
    Before you can use PM2, you need to install it globally on your system.
    npm install -g pm2

2. Create an ecosystem.config.js File
   The ecosystem.config.js file defines how PM2 should manage your application,including environment variables,execution mode, and more.

3. Run the Application
   Use PM2 to start your application with the configuration file for the local environment as

   pm2 start ecosystem.config.js --env local
 
4. View Logs :
   pm2 logs






## Dober MVP

This repository has the Dobre MVP project, which objective is to have a first version of this application with which to test the deployment of smart contracts and evaluate it as a product.

## Install and run

Currently just in development mode, in localhost

For the correct functioning of the project, the following repository must be cloned:

https://github.com/forcast-lmtd/Dober-SC

It is recommended to use the "mockdata" branch because it is the most up-to-date at the moment.

Ganache installation is required, you can get it from the following link:

https://trufflesuite.com/ganache/

Subsequently, it is recommended to follow the documentation of the Dober-SC repository for the necessary installations.

Once the repository is cloned, it must be positioned in the repository path and execute the following instructions in the command console:

```sh
truffle compile
```

```sh
truffle develop
```

and keep the command console running.

Now, we must open ganache and create a new workspace, in which in the "TRUFLE PROJECTS" section, we must select the "truffle-config.js" file generated in the root folder of the project. Later, in the "SERVER" section, the port number must be changed to 6545 and the network id to 1337.
Mnemonic obtained by executing the "truffle develop" instruction must be entered and we can now save the workspace.

Finally, we must open metamask in the browser and create a new local network assigning the url that appears in Ganache and the network id.

Now, we open another command console and run truffle develop again on the repository directory and we are ready to clone our repository.

Clone this repository.

Run the API on port 3000

```sh
cd server/server
npm i
node server.js 
```

Run frontend project and check your localhost:4200

```sh
cd src
npm i
ng serve --open 
```


## Main structure
### server > api
- routes.
    - indexRoutes: Contains directions to differents models routes
    - pools: pools related routes
    - balance: global balance related routes

- controllers
- mock data
- modeles
- queries
- services


### src > app
Here you can find the angular components. 

**Independent components:**
- create-pool: multi-page form with which the user provides information for creating a smart contract.
- dashboard: component with main indicators of global behavior of users pools
- my-pools: component interface to interact with specific users pools
- pool-dashboard: component with main indicators of global behavior of one users pool
- explore: component with public pools
- notifications-detail: component with user notifications
- settings: component with user settings
- user-profile: component with user profile
- pages/content-pages:
    - landing
    - login

**Shared components:**
- custom-common-modules: interface components shared throughtout the aplication 
    - donut-chart: component of a donut chart with main title and subtitle and title and subtitle inside graph
    - indicators card: card component with global or summerized information
- shared: services, data and structural componentes used globally.
    - auth: authentication services (here it is guard if there's local information saved to login)
    - vertical menu: main side menu
    - navbar: navbar of application
    - pipes
    - routes: routes to navigate application. Includes full-layout routes and content-layout routes.
        - full-layout routes export routes to navigate the application once loged in
        - content-layout routes export routes to athentication methods
    - side-nav: distributions side nav component
### src > assets
Here you can find main visual resources



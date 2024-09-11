# [Dob protocol MVP]

### src > app
Here you can find the angular components. 

1- Install node modules
2- ng serve to run on http://localhost:4200

#Production dobprotocol https://home.dobprotocol.com/home

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

# [Dob protocol contracts for distribution]

### 🏗️ Building

```sh
cargo b -p "dobprotocol*"
```

### ✅ Testing

Run all tests, except `gclient` ones:
```sh
cargo t -p "escrow*" -- --skip gclient
```

Run all tests:
```sh
# Download the node binary.
cargo xtask node
cargo t -p "escrow*"
```

    - routes: routes to navigate application. Includes full-layout routes and content-layout routes.
        - full-layout routes export routes to navigate the application once loged in
        - content-layout routes export routes to athentication methods
    - side-nav: distributions side nav component
### src > assets
Here you can find main visual resources

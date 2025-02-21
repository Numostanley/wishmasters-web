# Installation and set-up


## Clone the repo
```
git clone https://github.com/Numostanley/wishmasters-web.git
```

## cd into the directory
```
cd wishmasters-web
```

## Install yarn package manager

Note: Make sure you have node installed
```
npm install -g yarn 
```

## install packages with yarn package manager
```
yarn install
```

# Start the developement derver 
```
yarn dev
```

### NOTE: Before running the development server, ensure you have these variables in a .env file

```
nano .env
```

```
VITE_API_BASE_URL=http://13.51.48.129/v1

VITE_CLIENT_ID=WebUserClient
VITE_CLIENT_SECRET=f7fc5d2f2f2944009117a78ed54b2ea2@@z5h25@p0
```

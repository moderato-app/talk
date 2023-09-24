# How to contribute

The Talk project has been split into two repositories: [talk](https://github.com/proxoar/talk.git) and [talk-web](https://github.com/proxoar/talk-web.git).

## Clone projects
```shell
mkdir talk-project && cd talk-project
git clone https://github.com/proxoar/talk.git
git clone https://github.com/proxoar/talk-web.git
```

## Run
### Backend
I. Install [Go](https://go.dev/dl/) v1.21 or higher 

II. Start the backend server
```shell
# in talk-project/talk
make run
```
The backend server listens on `localhost:8000` 

###  Frontend
I. Install [Node](https://nodejs.org/en/download/current) v20 or higher 

II. Install yarn
```shell
npm install --global yarn
```
III. Start the WEB
```shell
# in talk-project/talk-web
yarn dev
```
Open http://localhost:5173 in browser, you should see the home page.

## Build a single binary
I. Build the static site and copy it to `talk-project/talk`
```shell
# in talk-project/talk-web
./script/build-and-copy-to-backend.sh
```
II. Build  
```shell
# in talk-project/talk
make build
``` 
An executive binary `talk` will be created
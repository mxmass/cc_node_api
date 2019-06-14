# Node JS

## Case

You should implement a nodeJS server API communicating with this: https://reqres.in/ API. Your API should have three endpoints:
* GET http://localhost:3000/api/user/{userId} - This will make a request to https://reqres.in/api/users/{userId} and returns an user JSON representation.


* GET http://localhost:3000/api/user/{userId}/avatar - This will make a request to get the image by `avatar` URL. It should do 2 things: Save the image into the FileSystem (plain file) and return back base64 image representation. When another request with the same URL comes in, the server should not make a HTTP call to get the image, but should return the previously saved file in base64 format.


* DELETE http://localhost:3000/api/user/{userId}/avatar - This will remove the file from the FileSystem storage. When a new GET http://localhost:3000/api/user/{userId} comes in, it requires a new HTTP call to get image and has to save to the fileSystem (plain file).


## How to start the server

Make sure you have Node and NPM installed both with `node -v && npm -v`.
Install packages with `npm install`.
Run server with `npm run dev` for using **Nodemon**.

## Solution and things to take in a consideration

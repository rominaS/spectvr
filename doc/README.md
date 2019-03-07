# SpectVR REST API Documentation

### Authentication

- description: signup for the application
- request: `POST /signup/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username to be registered
      - password (string) the password to be registered
- response: 200
    - body: username has signed up
- response: 409
    - body: username already exists
- response: 500
    - body: internal server error

``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"username:" "dasndu2", "password:" "d128dn12d"}
       http://localhost:3000/signup/
```

- description: signin to the application
- request: `POST /signin/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username to be logged in with
      - password (string) the password to be logged in with
- response: 200
    - body: username has signed in
- response: 401
    - body: username does not exist
- response: 500
    - body: internal server error

``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"username:" "dasndu2", "password:" "d128dn12d"}
       http://localhost:3000/signin/'
```

- description: signout of the application
- request: `GET /signout/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username to be logged in with
      - password (string) the password to be logged in with
- response: 200
    - body: username has signed in
- response: 401
    - body: username does not exist
- response: 500
    - body: internal server error

``` 
$ curl -X GET 
       -H "Content-Type: `application/json`" 
       http://localhost:3000/signout/'
```

### Video 

- description: create a new video
- request: `POST /api/videos/`
    - content-type: `multipart/form-data`
    - body: object
      - _id: (string) the id of the video
      - title (string) the name of the video
      - author: (string) the authors name
      - start: (Date) the first time the video can be viewed
      - end: (Date) the last time the video can be viewed
    - file: video/*
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the id of the video
      - title (string) the name of the video
      - author: (string) the authors name
      - start: (Date) the first time the video can be viewed
      - end: (Date) the last time the video can be viewed
- response: 500
    - body: internal server error

``` 
$ curl -X POST 
       -H "Content-Type: `multipart/form-data`" 
       -d '{"_id":"1","title":"df","author":"23f","start":"Sun Feb 10 2019 10:22:21 GMT-0500 (Eastern Standard Time)", "end":"Mon Feb 11 2019 10:22:21 GMT-0500 (Eastern Standard Time)"}
       -F "video=@localpath/to/video.mp4" 
       http://localhost:3000/api/videos/'
```

- description: get a video
- request: `GET /api/videos/:id`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the id of the video
      - title (string) the name of the video
      - author: (string) the authors name
      - start: (Date) the first time the video can be viewed
      - end: (Date) the last time the video can be viewed
- response: 404
    - body: video id does not exists
- response: 500
    - body: internal server error
``` 
$ curl http://localhost:3000/api/videos/1d26bd1d2/
```

- description: delete the video given the id
- request: `DELETE /api/videos/:id/`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the id of the video
      - title (string) the name of the video
      - author: (string) the authors name
      - start: (Date) the first time the video can be viewed
      - end: (Date) the last time the video can be viewed
- response: 404
    - body: video :id does not exists
- response: 500
    - body: internal server error
``` 
$ curl -X DELETE
       http://localhost:3000/api/videos/2d18d1n2d/
``` 
### Purchasing

- description: allow a user to view a video
- request: `POST /api/authorize/`  
    - content-type: `application/json`
    - body: object
      - videoId: (string) the id of the video
      - userId (string) the id of the user
- response: 200
    - content-type: `application/json`
    - body: object
      - videoId: (string) the id of the video
      - userId (string) the id of the user
- response : 404
    - body: video videoId does not exists
 - response : 404
    - body: user userId does not exists   
 
``` 
$ curl -X POST 
       -d '{"videoId":"1","userId":"42"}
       http://localhost:3000/api/authorize/'
``` 

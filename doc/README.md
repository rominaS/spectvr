# SpectVR REST API Documentation

### Authentication

- description: signup for the application
- request: `POST /signup/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username to be registered
      - password (string) the password to be registered
- response: 500
    - body: internal server error

``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"username:" "dasndu2", "password:" "d128dn12d"}
       https://nameless-everglades-35234.herokuapp.com/signup/
```

- description: signin to the application
- request: `POST /signin/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username to be logged in with
      - password (string) the password to be logged in with
- response: 401
    - body: access denied wrong pass
- response: 500
    - body: internal server error

``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"username:" "dasndu2", "password:" "d128dn12d"}
       https://nameless-everglades-35234.herokuapp.com/signin/'
```

- description: signout of the application
- request: `GET /signout/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username to be logged in with
      - password (string) the password to be logged in with

``` 
$ curl -X GET 
       -H "Content-Type: `application/json`" 
       https://nameless-everglades-35234.herokuapp.com/signout/'
```

### Video 

- description: create a new video
- request: `POST /image-upload`
    - content-type: `multipart/form-data`
    - body: object
      - _id: (string) the id of the video
      - title (string) the name of the video
      - artist: (string) the authors name
      - from: (Date) the first date the video can be viewed
      - fromTime: (string) the first time the video can be viewed
      - to: (Date) the last date the video can be viewed
      - toTime: (string) the last time the video can be viewed
      - price: (string) the price of the video
      - description: (string) the description of the video
    - file: video/*
    - file: image/*
- response: 500
    - body: internal server error

``` 
$ curl -X POST 
       -H "Content-Type: `multipart/form-data`" 
       -d '{title":"df","author":"23f","start":"Sun Feb 10 2019 10:22:21 GMT-0500 (Eastern Standard Time)", "end":"Mon Feb 11 2019 10:22:21 GMT-0500 (Eastern Standard Time)",
       "description": "sdad2dasd", "price":"100"}
       -F "video=@localpath/to/video.mp4" 
       -F "video=@localpath/to/thumbnail.jpg"
       https://nameless-everglades-35234.herokuapp.com/image-upload/'
```

- description: get a video
- request: `GET /videos/:id`
- response: 200
    - content-type: `application/json`
    - body: object
      - url: (string) url leading to the video
      - mimetype: (string) the mimetype of the video
- response: 401
    - body: cannot find video
- response: 500
    - body: internal server error
``` 
$ curl https://nameless-everglades-35234.herokuapp.com/videos/1d26bd1d2/
```

- description: delete the video given the id
- request: `DELETE /videos/:id/`
- response: 500
    - body: internal server error
``` 
$ curl -X DELETE
       https://nameless-everglades-35234.herokuapp.com/videos/2d18d1n2d/
``` 

- description: get all videos
- request: `GET /allVideos/:page/:limit`
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - id: (string) the id of the video
      - title (string) the name of the video
      - artist: (string) the authors name
      - from: (Date) the first date the video can be viewed
      - fromTime: (string) the first time the video can be viewed
      - to: (Date) the last date the video can be viewed
      - toTime: (string) the last time the video can be viewed
      - price: (string) the price of the video
      - description: (string) the description of the video
      - url: (string) the link to the video
- response: 500
    - body: internal server error
``` 
$ curl https://nameless-everglades-35234.herokuapp.com/allVideos/0/100
```

- description: get all videos that current user can view
- request: `GET /paidVideos/:page/:limit`
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - id: (string) the id of the video
      - title (string) the name of the video
      - artist: (string) the authors name
      - from: (Date) the first date the video can be viewed
      - fromTime: (string) the first time the video can be viewed
      - to: (Date) the last date the video can be viewed
      - toTime: (string) the last time the video can be viewed
      - price: (string) the price of the video
      - description: (string) the description of the video
      - url: (string) the link to the video
- response: 500
    - body: internal server error
- response: 401
    - body: access denied null
- response: 404
    - body: no videos paid for
``` 
$ curl https://nameless-everglades-35234.herokuapp.com/allVideos/0/100
```
### Purchasing

- description: allow a user to view a video
- request: `POST /purchase/`  
    - content-type: `application/json`
    - body: object
      - videoId: (string) the id of the video
- response: 200
    - content-type: `application/json`
    - body: object
      - videoId: (string) the id of the video
      - userId (string) the id of the user
- response : 500
    - body: internal server error
 
``` 
$ curl -X POST 
       -d '{"videoId":"1"}
      https://nameless-everglades-35234.herokuapp.com/purchase/'
``` 

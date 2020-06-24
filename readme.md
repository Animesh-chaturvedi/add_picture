# Add Pictures

## Prerequisites

- Node v
- npm -v
- git

## Installation

clone the repo

```
git clone
```

install depen

```
npm init
```

## Run server

run server

```
node index.js
```

# API specs

## GET /pictures

### Query params

Offset - Index or Id first retrieved image ; initial undefined (i.e. it will retrieve all)  
 limit - Number of images want to retrieve ; Default calue is set to 100.  
 nameString - Use to search the image (exact search) by name of Image, Initially undefined; i.e. no name filter

### Response

For request http://localhost:4200/?offset=1 (only two images were present in database)

```
{
    [{"_id":"5ef38f957cad9b28ff5475d9","name":"jojo3","url":"https://www.nba.com/history/legends/profiles/michael-jordan","type":"image/png","id":2,"__v":0}]
}
```

## POST /add

### Request

```
{
    "name": "jordan",
    "url": "https://in.pinterest.com/pin/35325178306198407/"
    "type": "image/png"
}
```

### Response

```
{
    "_id":"5ef3a95eb760eb3a337fe531",
    "name":"jordan",
    "url":"https://in.pinterest.com/pin/35325178306198407/",
    "type":"image/png",
    "id":3,
     "__v":0
}
```

## POST /addimage

To add image directly to local storage and automatic filling of fields

### Request

```
{
   "image" : xyz.png
}
```

### Response

```
    {
        "_id":"5ef3b3469060f341159ecf47","name":"image_1593029446304_Screenshot from 2020-06-24 12-42-17.png",
        "url":"uploads/image_1593029446304_Screenshot from 2020-06-24 12-42-17.png",
        "type":"image/png",
        "id":4,
        "__v":0
    }


```

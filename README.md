# Back-End-Architect
## Brooks Poltl

### Live Backend URL: https://backend-art.herokuapp.com/

### **Register a user**
*method url*: `/api/register`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | Must be unique           |
| `fullName`     | String | Yes      |                          |
| `password`     | String | Yes      |                          |
| `email`        | String | No       |                          |
| `userImgUrl`   | String | No       |                          |

#### Example
```
  {
    "username": "brooks",
    "password": "1234",
    "fullName": 'Brooks Poltl',
    "email": "bpoltl1@gmail.com",
    "userImgUrl": "something.jpg"
  }
  ```
#### Response
##### 201 (ok)
> created user
##### 400 (Bad Request)
```
  {
    "errorMessage": "missing ${itemMissing}"
  }
  ```
### **Login a user**
*method url*: `/api/login`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | must be registered user  |
| `password`     | String | Yes      |                          |


#### Example
```
  {
    "username": "brooks",
    "password": "1234",
  }
  ```
#### Response
##### 200 (ok)
> no issues logging in
###### Example response
```
{
    "id":3,
    "username":"brooks",
    "fullName":"Brooks Poltl",
    "email":null,
    "userImgUrl":null,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybmk"
}
```
##### 400 (Bad Request)
```
  {
    errorMessage: 'missing ${itemMissing}'
  }
  ```
  ##### 401 (Unauthorized)
  ```
  {
    errorMessage: "passwords don't match"
  }
  ```
### **get all users**
*method url*: `/api/users`

*http method*: **[GET]**

#### Response
##### 200 (ok)

###### Example response
```
[
  {
     "id": 1,
     "username": "brooks3",
     "password": "$2a$12$UzYfINUnqfZh2n180pBswORvPCIrwHKp3d/MEZ69DaRxoLTYj26UG",
     "fullName": "Brooks Poltl",
     "email": null,
     "userImgUrl": null
  },
  {
     "id": 2,
     "username": "Bob",
     "password": "$2a$12$5.flIIREO8kVSwAGdL2iWO1IUKaaN7VgKN9zEX/Z7XXygBupMSQ0W",
     "fullName": "McBobbers",
     "email": "brannanconrad@gmail.com",
     "userImgUrl": ""
  },
  {
    "id": 3,
    "username": "spencer",
    "password": "$2a$12$5F3zLBEigPgcTQxzQFT23.hW3A15PDyelLAFU.ENtym5Jdn17ypjW",
    "fullName": "Spencer Curtis",
    "email": null,
    "userImgUrl": null
  },
]
```

### **get a single user**
*method url*: `/api/users/:id`

*http method*: **[GET]**

#### Response
##### 200 (ok)

###### Example response
```
[
  {
    "id": 1,
    "username": "brooks3",
    "password": "$2a$12$UzYfINUnqfZh2n180pBswORvPCIrwHKp3d/MEZ69DaRxoLTYj26UG",
    "fullName": "Brooks Poltl",
    "email": null,
    "userImgUrl": null
  }
]
```

### **get all post from a single user**
*method url*: `/api/users/posts/:id (id meaning id of the user)`

*http method*: **[GET]**

#### Response
##### 200 (ok)

###### Example response
```
[
  {
    "id": 6,
    "username": "brooks12345",
    "password": "$2a$12$xEMuC6KExFMmz95p6jIAoe4CYT1oDPGBPHpxjR4FjIMmUGO09iR.m",
    "fullName": "hasdjhkha",
    "email": null,
    "userImgUrl": null,
    "posts": [
        {
          "id": 11,
          "imageUrl": "insertedImgurl",
          "upvotes": 0,
          "userId": 6,
          "description": "a painting :)",
          "postName": "mona lisa"
        },
        {
          "id": 12,
          "imageUrl": "insertedImgurl",
          "upvotes": 0,
          "userId": 6,
          "description": "a painting :)"
          "postName": "mona lisa"
        },
        {
          "id": 13,
          "imageUrl": "insertedImgurl",
          "upvotes": 0,
          "userId": 6,
          "description": "a painting :)",
          "postName": "mona lisa"
        },
        {
          "id": 14,
          "imageUrl": "insertedImgurl",
          "upvotes": 0,
          "userId": 6,
          "description": "a painting :)",
          "postName": "starry night"
         }
        ]
    }
]
```



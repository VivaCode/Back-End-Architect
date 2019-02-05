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
    username: 'brooks',
    password: '1234',
    fullName: 'Brooks Poltl',
    email: 'bpoltl1@gmail.com',
    userImgUrl: 'something.jpg'
  }
  ```
#### Response
##### 201 (ok)
> created user
##### 400 (Bad Request)
```
  {
    errorMessage: 'missing ${itemMissing}'
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
    username: 'brooks',
    password: '1234',
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
    errorMessage: 'errorMessage: "passwords don't match"
  }
  ```

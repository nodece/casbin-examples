# node-RESTful

> A [node-casbin](https://casbin.org/) example


## Run Setup

``` bash
# install dependencies
yarn

# serve at localhost:3000
yarn start
```

## Hello

## test router

- [http://localhost:3000/users](http://localhost:3000/users)
- [http://localhost:3000/books](http://localhost:3000/books)

When you request it, you may see the Forbidden text. 

### How to Solve?

You can use the Postman or curl to test

> Get policy list
```
GET http://localhost:3000/policy
```
> Delete policy
```
DELETE http://localhost:3000/policy
Content-Type: application/json

{ 
  "sub": "admin-role",
  "obj": "/users",
  "act": "GET"
} 
```

> Add policy
```
POST http://localhost:3000/policy
Content-Type: application/json

{ 
  "sub": "admin-role",
  "obj": "/users",
  "act": "GET"
} 
```


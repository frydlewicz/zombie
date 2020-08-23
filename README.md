# zombie
POC of zombie Rest API in Node.js with Express.

## install project

```
git clone https://github.com/frydlewicz/zombie.git
cd zombie
npm i

cp config.sample.json config.json
npm run watch
```

## testing environment

You can test the API on my sandbox environment:
```
http://sandbox.frydlewicz.pl:4051
```

For example:
```
http://sandbox.frydlewicz.pl:4051/api/zombie/1
```

## API methods

#### 1. list of all zombies

API returns an array of zombies ids already created.

###### request:
```
GET /api/zombies
```

###### response:
```
HTTP/1.1 200
Content-Type: application/json
{
    "timestamp": 1598171967983,
    "zombies": [ 1 ]
}
```
___

#### 2. specified zombie details
API returns an object containing creation timestamp, zombie name, array of detailed items and total value divided into currencies.

###### request:
```
GET /api/zombie/:id
```

###### successful response:
```
HTTP/1.1 200
Content-Type: application/json
{
    "timestamp": 1598172594746,
    "zombie": {
        "createdAt": 1598172585337,
        "name": "Zombiak",
        "items": [{
            "id": 2,
            "name": "Trident",
            "price": 200
        }],
        "values": {
            "PLN": 200,
            "USD": 54,
            "EUR": 46
        }
    }
}
```

###### failed  response:
```
HTTP/1.1 404
Content-Type: application/json
{
    "status": "error",
    "error": "Zombie 1 does not exist!"
}
```
___

#### 3. create new zombie
You have to provide a zombie name and an array of items ids, both parameters are required. API will return new zombie id.

###### request:
```
POST /api/zombie
Content-Type: application/json
{
    "name": "Zombiak",
    "items": [ 2 ]
}
```

###### successful response:
```
HTTP/1.1 200
Content-Type: application/json
{
    "status": "success",
    "id": 1
}
```

###### failed  response:
```
HTTP/1.1 400
Content-Type: application/json
{
    "status": "error",
    "error": "name is required string parameter!"
}
```
___

#### 4. update existing zombie
You can update zombie name or items ids or both at the same time.

###### request:
```
PATCH /api/zombie/:id
Content-Type: application/json
{
    "name": "Zombiaczek",
    "items": [ 3 ]
}
```

###### successful response:
```
HTTP/1.1 200
Content-Type: application/json
{
    "status": "success"
}
```

###### failed  response:
```
HTTP/1.1 404
Content-Type: application/json
{
    "status": "error",
    "error": "Zombie 1 doesn't exist!"
}
```
___

#### 5. delete existing zombie
Zombie will be deleted permanently.

###### request:
```
DELETE /api/zombie/:id
```

###### successful response:
```
HTTP/1.1 200
Content-Type: application/json
{
    "status": "success"
}
```

###### failed  response:
```
HTTP/1.1 404
Content-Type: application/json
{
    "status": "error",
    "error": "Zombie 1 does not exist!"
}
```

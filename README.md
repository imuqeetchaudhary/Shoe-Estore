# Shoe Estore Rest Api

## Backend Deployment Link

https://shoe-e-store-restapi.herokuapp.com/

## Routes for User

### to register a new user

- user/register : post

```
{
    name:
    email:
    password:
}
```

### to login an existing user

- user/login :post

```
{
    email:
    password:
}
```

### to view the profile of an authenticated user

- user/profile :get (Protected route. Token required)

### to update user profile

- user/update-profile :patch (Protected route. Token required)

```
{
    name:
    email:
    password:
    address:
    deliveryAddress:
    masterCardNumber:
}
```

## Routes for Articles

### to add a new article

Admin's Route

- article/add :post

```
{
    name:
    description:
    image:
    style:
    type: (raffle or sneakers)
    availableSizes: (must be an array of sizes i.e. ["6","7","8","9","10"])
    releaseDate:
    price:
}
```

### to get a raffle

User's Route

- article/get-raffle :get (Protected route. Token required)

### to get all sneakers

User's Route

- article/get-all-sneakers :get (Protected route. Token required)

### to get a single article

User's Route

- article/get-single :post (Protected route. Token required)

```
{
    articleId:
}
```

### to update an article

Admin's Route

- article/update :patch (Protected route. Token required)

```
{
    articleId:
    name:
    description:
    style:
    type: (raffle or sneakers)
    availableSizes: (must be an array of sizes i.e. ["6","7","8","9","10"])
    releaseDate:
    price:
}
```

### to delete an article

Admin's Route

- article/delete :delete (Protected route. Token required)

```
{
    articleId:
}
```

## Routes for Contact Messages

### to add a new contact message

User's Route

- contact/add :post

```
{
    message:
}
```

### to get all contact messages

Admin's Route

- contact/get-all :get (Protected route. Token required)

### to get a single contact message

Admin's Route

- contact/get-single :post (Protected route. Token required)

```
{
    contactId:
}
```

## Routes for Order Histories

### to create a new order history

User's Route

- order-history/add :post (Protected route. Token required)

```
{
    articleId:
    sizeSelected:
    shippingAddress:
    shippingState:
}
```

### to confirm payment status

User's Route

- order-history/confirm-payment :patch (Protected route. Token required)

```
{
    orderHistoryId:
}
```

### to get all order histories

Admin's Route

- order-history/get-all :get (Protected route. Token required)

### to get all order histories for a specific authentic user

User's Route

- order-history/get-all-for-auth-user :get (Protected route. Token required)

### to get a single order history

User's Route

- order-history/get-single :post (Protected route. Token required)

```
{
    orderHistoryId:
}
```

## Routes for Raffle

### to fill a raffle form

User's Route

- raffle/add-form :post (Protected route. Token required)

```
{
    articleId:
    firstName:
    lastName:
    email:
    address:
    city:
    country:
    postCode:
    gender:
    size:
    instagram:
}
```

### to get all raffles for admin

Admin's Route

- raffle/get-all-for-admin :get (Protected route. Token required)

### to get all raffles for user

User's Route

- raffle/get-all-for-user :get (Protected route. Token required)

### to declare a winner

Admin's Route

- raffle/declare-winner :patch (Protected route. Token required)

```
{
    raffleId:
}
```

### to create a payment intend

User's Route

- raffle/create-payment-intend :post (Protected route. Token required)

```
{
    raffleId:
}
```

### to confirm a raffle payment

User's Route

- raffle/confirm-payment :patch (Protected route. Token required)

```
{
    raffleId:
}
```

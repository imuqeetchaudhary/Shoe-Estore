# Shoe Estore Rest Api

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

- article/add :post

```
{
    name:
    description:
    image:
    style:
    availableSizes: (must be an array of sizes i.e. ["6","7","8","9","10"])
    releaseDate:
    price:
}
```

### to get all articles

- article/get-all :get (Protected route. Token required)

### to get a single article

- article/get-single :post (Protected route. Token required)

```
{
    articleId:
}
```

## Routes for Contact Messages

### to add a new contact message

- contact/add :post

```
{
    message:
}
```

### to get all contact messages

- contact/get-all :get (Protected route. Token required)

### to get a single contact message

- contact/get-single :post (Protected route. Token required)

```
{
    contactId:
}
```

## Routes for Order Histories

### to create a new order history

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

- order-history/confirm-payment :patch (Protected route. Token required)

```
{
    orderHistoryId:
}
```

### to get all order histories

- order-history/get-all :get (Protected route. Token required)

### to get all order histories for a specific authentic user

- order-history/get-all-for-auth-user :get (Protected route. Token required)

### to get a single order history

- order-history/get-single :post (Protected route. Token required)

```
{
    orderHistoryId:
}
```

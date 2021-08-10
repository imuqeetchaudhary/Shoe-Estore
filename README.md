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

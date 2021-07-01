# Mojito - Cocktail App

## Description

Web App that allows you to find and store your favorite drinks on a list and comment on your favorite drinks.

 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all my favorite cocktails
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **Favorite Cocktail** - As a user I want to be able to Favorite a cocktail so that i can put it in a site of Favorite Cocktails 
- **Favorite Cocktail list** - As a user I want to see all my favorite cocktails so that can Rate or Make a comment 
- **Make Comments** - As a user I want to comments so that other users can see my opinions
- **Cocktail Details** - As a user I want to see the cocktail details and attendee list of one event so that I can decide if I like the cocktail
- **See Cocktails** - As a user I want to be able see  comments so that i can decide if i want to Favorite a cocktails

## Backlog

List of other features outside of the MVPs scope

User profile:
- upload my profile picture
- see other users profile
- language setting
- user preferences 

Cocktail:
- add new cocktails
- show event in a map in event detail page
- show all events in a map in the event list page

Profile
- Show multiple lists
- Create multiple list "Want to Try"


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)
- GET /cocktails
  - renders the cocktails list + the create list
- GET /cocktail/:id
  - renders the cocktail detail page


## TECH STACK:

- HTML5
- HANDLEBARS
- CCS3
- JAVASCRIPT
- NODEJS
- EXPRESS
- AXIOS
- MONGODB

## Models

User model
 
```
    name: String,
    ingredients: [
                    {
                        name: String,
                        amount: Number,
                        unit: String
                    }
                 ],
    garnish:    String,
    method:     String,
    note:       String,
    source:     String (The Unforgettables | Contemporary Classics |New Era Drinks),
    imageUrl:   String
    feedback:   [  
                 {user: {ref: User, type: mongoose.Schema.Types.ObjectId} : {comment: String, rating: integer}}
                ]         
 
```

Create model

```
email: {
      type:         String,
      req:          true,
      unique:       true
  },
  
  hashedPassword:   String,
  
  nickname:         String,
  favDrinks:        {
                    ref: 'Drinks'
                    type: [mongoose.Schema.Types.ObjectId]
                    }
Collapse
``` 

## Links

### Trello

[https://whimsical.com/project-2-george-and-emmy-cocktail-drink-app-T7FvmvzUtJ5HZpyMREixuE] WireFrames, MOS COW Chart  & User Flow
[https://trello.com/c/YCCaY9BA]Trello 

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides



# proshore-todo

## Code Structure
      Model: /api/models
      Views: /views
      Controller: /api/controller
      Routes: /routes
  
  ## Requests
   
1. **GET /todos:** Get all todos
2. **POST /todos:** Create a new one (*name*, *short_description* and *date* are required. *done* is set *false*)
3. **PUT /todos/:todoId:** Update todo with TodoId
4. **DELETE /todos/:todoId:** Delete todo with todoId
5. **GET /todos/:todoId:** Gets particular todo. 
Haven't used anywhere, should have used to **mark as done** instead of getting data from DOM!

# Validations
* Shows auto-hiding status messages in the front-end.
* Backend returns an error on directly calling API (for past date and empty fields) so nothing goes to the database.
* Filters don't call API, it creates a new view from already fetched data instead [fast].
* Adding a todo via form calls API to send and get updated list (AJAX), and creates new view based on API response.
* **Date is stored in [epoch](https://en.wikipedia.org/wiki/Unix_time)** seconds instead of date object!
* Front-end doesn't handle all possible errors back-end can throw, but hasn't crashed on me yet.

> Created and Tested on: Node v10.15.0, MongoDB v4.0.5 [deployed on v3.6.9], Firefox v64. Database Collection: process.env.mongoDB, default proshore-todo [localhost, no auth].

## Note About Date and epoch time

**Epoch time is in milliseconds passed from 1970 UTC, this application uses epoch seconds to store and compare, but uses local time to display!**

Epoch time &rarr; epoch ms, 

this app &rarr; epoch/1000 (epoch sec)

       let date =  new Date(); 
                   Date 2019-01-01T19:37:42.801Z
           date = Number(date); 
                   1546371482862, in epoch ms
           date = Math.round(date/1000); 
                   1546371483 epoch seconds
    
## Yet another to do app!

[Try this application here](https://proshore-todo.herokuapp.com)

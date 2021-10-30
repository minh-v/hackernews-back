
backend express + hasura + postgres
magic link authentication

add, get posts

add, get user data, update (certain) user data

upvote, downvote, comments

users can delete their own posts

users can search posts + highlights search keyword

delete/disable users

sign up functionality completed
login, logout completed
submit completed

SPECIFIC TODO

bonus: add date created as part of user info.
FIX REFRESH login/signup flows

ADD GET, POST, SEARCH POSTS BY SATURDAY

help/questions:
query from browser directly with in memory jwt?
store jwt on browser? attach to apollo client requests?
or call express route, and read the cookie that's attached from there to authenticate

I’ve set up my user authentication using a jwt generated from the token that magic provides, and am storing it in an HTTPonly cookie on the browser. I'm not sure about the best way to use that token to authenticate my queries/mutations. Right now I have the browser send a request to a route on the server, and I handle the cookie and send my graphql requests from there. But this means that I can't send graphql requests from the browser with the token (only unauthenticated access). I've looked into trying to attach the token to the auth header on the apollo client, but am running into a block. I'm not sure if this even matters.
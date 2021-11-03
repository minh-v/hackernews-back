front end react + antd
middleware magic
backend node + express + hasura + postgres
magic link authentication

subscription to query posts for real time updates

authenticated users can submit posts

user registration/login, authentication with magic link + jwt token stored in httponly cookie

upvote, downvote unique user functionality

search bar functionality (url, title)

todo: 
upvote/downvote for comments,
sort comments and posts by upvote, certain variables




users can delete their own posts
delete/disable users
profile page to show all posts from a user
different types of list sort displays
pagination



SPECIFIC TODO

bonus: add date created as part of user info.
FIX REFRESH login/signup flows

help/questions:
query from browser directly with in memory jwt?
store jwt on browser? attach to apollo client requests?
or call express route, and read the cookie that's attached from there to authenticate

I’ve set up my user authentication using a jwt generated from the token that magic provides, and am storing it in an HTTPonly cookie on the browser. I'm not sure about the best way to use that token to authenticate my queries/mutations. Right now I have the browser send a request to a route on the server, and I handle the cookie and send my graphql requests from there. But this means that I can't send graphql requests from the browser with the token (only unauthenticated access). I've looked into trying to attach the token to the auth header on the apollo client, but am running into a block. I'm not sure if this even matters.

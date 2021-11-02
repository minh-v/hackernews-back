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
comments
- (comments table with columns of user id, post id, parent, children) 4 hours
- (display on front end query comments for the post) 3 hours
- (each post needs to have separate page for comments)
- (link to comments/post page from postlist) 1 hour

vote functionality = removing votes (either by button, or reclicking on vote button)
if there's a conflict for all three user id, post id, AND vote value, then remove vote
this needs to take priority

maintain vote state on front end
when querying the posts, check if vote userid matches current user id
change to green for upvote, red for downvote

specific query paramters for search




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

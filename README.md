# IWI

## Description
IWI is a social platform connecting people sharing the same interests,
mainly for community development. It allows people to find gigs,
to join community clubs and to participate in events and initiatives.


# API ROUTES
All start with http://localhost:3000
- GET '/' send back 'Homepage'

## USER BASIC ROUTES
 - ***GET '/api/users'*** -- send back all user objects with lists of ONLY IDS of clubs, events, gigs, posts and comments
 - ***GET '/api/users/userId'*** -- send back the user object if found, with lists of ONLY IDS of clubs, events, gigs, posts and comments
 - ***POST '/api/users/signup'*** -- receive {firstName: , lastName:, username:, email:, password:}, send back "Successfully created a new user"
 - ***POST '/api/users/login'*** -- receive {email:, password:}, send back { token: token } in res.body and 'auth-token': token in res.header
 - ***POST '/api/users/logout'*** -- send back "logged out!" in res.body
 - ***PATCH '/api/users/userId'*** -- receive an object of what data to change/edit (excluding password and id), and send back the user object if found, with lists of ONLY IDS of clubs, events, gigs, posts and comments
 - ***PATCH '/api/users/userId/reset_password'*** -- receive an object of {password: , new_password: }, and send back the user object if found, with lists of ONLY IDS of clubs, events, gigs, posts and comments
 - ***DELETE '/api/users/userId'*** -- receive {password:} send back "Deleted"


## GIG BASIC ROUTES
 - ***GET '/api/gigs'*** -- send back all gig objects with lists of ONLY IDS of applicants, acceptedApplicants and comments(reviews)
 - ***GET '/api/gigs/gigId'*** -- send back the gig object if found, with lists of ONLY IDS of applicants, acceptedApplicants and comments(reviews)
 - ***POST '/api/gigs'*** -- receive {title:, description:, duration:, paid:, takesPlace: {from: Date, to: Date}, budget:, location:}, and send back "A new gig is created"
 - ***PATCH '/api/gigs/gigId'*** -- receive an object of what data to change/edit, and send back the gig object if found, with lists of ONLY IDS of clubs, events, gigs, posts and comments
 - ***GET '/api/gigs/gigId/candidates'*** -- send back {"Applicants": gig.applicants, "Accepted Applicants": gig.acceptedApplicants}
 - ***GET '/api/gigs/gigId/applicants/accept/:userId'*** -- send back "You accepted an applicant at your gig!"
 - ***GET '/api/gigs/gigId/applicants/refuse/:userId'*** -- send back "You refused an applicant at your gig!"
 - ***PATCH '/api/gigs/gigId/close'*** -- (closes and reopens the gig) send back the gig object with list of IDS
 - ***POST '/api/gigs/gigId/apply'*** -- send back "You applied to the gig!"
 - ***POST '/api/gigs/gigId/cancel'*** -- (to cancel the applicants) "Cancelation is done"
 - ***DELETE '/api/gigs/gigId'*** --send back "Deleted"


## CLUB BASIC ROUTES
  - ***GET '/api/clubs'*** -- send back all club objects with lists of ONLY IDS of members, pendingRequests and posts
  - ***GET '/api/clubs/clubId'*** -- send back the club object if found, with lists of ONLY IDS of members, pendingRequests and posts
  - ***GET '/api/clubs/members'*** -- send back a list of ONLY IDS of members
  - ***POST '/api/clubs'*** -- receive {title:, description:, category;, location:}, and send back "A new club is created"
  - ***PATCH '/api/clubs/clubId'*** -- receive an object of what data to change/edit, and send back the club object if found, with lists of ONLY IDS of members, pendingRequests and posts
  - ***POST '/api/clubs/clubId/requests/accept/:userId'*** -- send back "You accepted a new member at your club!"
  - ***POST '/api/clubs/clubId/requests/refuse/:userId'*** -- send back "You refused a request to join your club!"
  - ***POST '/api/clubs/clubId/members/delete/:userId'*** -- send back "You refused a request to join your club!"
  - ***POST '/api/clubs/clubId/join'*** -- send back "You sent a request to join the club!"
  - ***POST '/api/clubs/clubId/apply'*** -- send back "You applied to the club!"
  - ***POST '/api/clubs/clubId/cancel'*** -- (to cancel your request) "Cancelation is done"
  - ***POST '/api/clubs/clubId/leave'*** -- "You left the club!"
  - ***DELETE '/api/clubs/clubId'*** -- send back "Deleted"


## EVENT BASIC ROUTES
  - ***GET '/api/events'*** -- send back all event objects with lists of ONLY IDS of participants, interested and posts
  - ***GET '/api/events/eventId'*** -- send back the event object if found, with lists of ONLY IDS of participants, interested and posts
  - ***POST '/api/events'*** -- receive {title:, description:, takesPlace: {from: Date, to: Date}, location:}, and send back "A new event is created"
  - ***PATCH '/api/events/eventId'*** -- receive an object of what data to change/edit, and send back the event object if found, with lists of ONLY IDS of participants, interested and posts
  - ***GET '/api/events/participants'*** -- send back a list of ONLY IDS of participants
  - ***POST '/api/events/participants'*** -- send back "you participate in this event"
  - ***POST '/api/events/participants/cancel'*** -- send back "Cancelation is done"
  - ***GET '/api/events/interested'*** -- send back a list of ONLY IDS of interested people
  - ***POST '/api/events/interested'*** -- send back "you are interested in this event"
  - ***POST '/api/events/interested/cancel'*** -- send back ""Cancelation is done"
  - ***DELETE '/api/events/eventId'*** -- send back "Deleted"

## POST ROUTES

***
### send back a list of posts IDS of that object
- ***GET '/api/users/userId/posts'***
- ***GET '/api/clubs/clubId/posts'***
- ***GET '/api/events/eventId/posts'***
***
### send back a specific post with list of comments IDS
- ***GET '/api/users/userId/posts/postId'***
- ***GET '/api/clubs/clubId/posts/postId'***
- ***GET '/api/events/eventId/posts/postId'***
***
### create a new post, receive {content:,} and send back a list of posts IDS of that object
- ***POST '/api/users/userId/posts'***
- ***POST '/api/clubs/clubId/posts'***
- ***POST '/api/events/eventId/posts'***
***
### receive the edited content {content:,} and send back the post object if found, with lists of ONLY IDS of comments
- ***PATCH '/api/users/userId/posts/postId'***
- ***PATCH '/api/clubs/clubId/posts/postId'***
- ***PATCH '/api/events/eventId/posts/postId'***
***
### send back "Deleted"
- ***DELETE '/api/users/userId/posts/postId'***
- ***DELETE '/api/clubs/clubId/posts/postId'***
- ***DELETE '/api/events/eventId/posts/postId'***
***

## COMMENT ROUTES

***
### send back a list of comments IDS of that post
- ***GET '/api/users/userId/posts/postId/comments'***
- ***GET '/api/clubs/clubId/posts/postId/comments'***
- ***GET '/api/events/eventId/posts/postId/comments'***
***
### send back a specific comment with list of comments (replies) IDS
- ***GET '/api/users/userId/posts/postId/comments/commentId'***
- ***GET '/api/clubs/clubId/posts/postId/comments/commentId'***
- ***GET '/api/events/eventId/posts/postId/comments/commentId'***
***
### create a new comment, receive {content:,} and send back a list of comments IDS of that object
- ***POST '/api/users/userId/posts/postId/comments'***
- ***POST '/api/clubs/clubId/posts/postId/comments'***
- ***POST '/api/events/eventId/posts/postId/comments'***
***
### receive the edited content {content:,} and send back the comment object if found, with lists of ONLY IDS of comments
- ***PATCH '/api/users/userId/posts/postId/comments/commentId'***
- ***PATCH '/api/clubs/clubId/posts/postId/comments/commentId'***
- ***PATCH '/api/events/eventId/posts/postId/comments/commentId'***
***
### send back "Deleted"
- ***DELETE '/api/users/userId/posts/postId/comments/commentId'***
- ***DELETE '/api/clubs/clubId/posts/postId/comments/commentId'***
- ***DELETE '/api/events/eventId/posts/postId/comments/commentId'***
***

## REPLIES TO A COMMENT ROUTES

***
### send back a list of comments IDS of that comment
- ***GET '/api/users/userId/posts/postId/comments/commentId/reply'***
- ***GET '/api/clubs/clubId/posts/postId/comments/commentId/reply'***
- ***GET '/api/events/eventId/posts/postId/comments/commentId/reply'***
***
### send back a specific comment with list of comments (replies) IDS
- ***GET '/api/users/userId/posts/postId/comments/commentId/reply/commentId'***
- ***GET '/api/clubs/clubId/posts/postId/comments/commentId/reply/commentId'***
- ***GET '/api/events/eventId/posts/postId/comments/commentId/reply/commentId'***
***
### create a new comment, receive {content:,} and send back a list of comments IDS of that object
- ***POST '/api/users/userId/posts/postId/comments/commentId/reply/'***
- ***POST '/api/clubs/clubId/posts/postId/comments/commentId/reply/'***
- ***POST '/api/events/eventId/posts/postId/comments/commentId/reply/'***
***
### receive the edited content {content:,} and send back the comment object if found, with lists of ONLY IDS of comments
- ***PATCH '/api/users/userId/posts/postId/comments/commentId/reply/commentId'***
- ***PATCH '/api/clubs/clubId/posts/postId/comments/commentId/reply/commentId'***
- ***PATCH '/api/events/eventId/posts/postId/comments/commentId/reply/commentId'***
***
### send back "Deleted"
- ***DELETE '/api/users/userId/posts/postId/comments/commentId/reply/commentId'***
- ***DELETE '/api/clubs/clubId/posts/postId/comments/commentId/reply/commentId'***
- ***DELETE '/api/events/eventId/posts/postId/comments/commentId/reply/commentId'***
***

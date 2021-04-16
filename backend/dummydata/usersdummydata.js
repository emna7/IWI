const users = [
  {
    id: 1,
    firstName: 'Mariem',
    lastName: 'Matri',
    username: 'matrimariem',
    email: 'mariemmatri@email.com',
    password: 'mypassword',
    gender: 'female',
    birthday: '20/11/1994',
    location: {country: 'Tunisia', state: 'Tunis', City: 'Ettadhamen'},
    phone: '21763274',
    biography: 'blablalbla bla',
    userGigs: {
      createdGigs: [{gig_id: 1, title: 'gig 1'}, {gig_id: 5, title: 'gig 5'}],
      appliedToGigs: [{gig_id: 2, title: 'gig 2'}, {gig_id: 3, title: 'gig 3'}],
      acceptedAtGigs: [{gig_id: 3, title: 'gig 3'}, ]
    },
    userClubs: {
      createdClubs: [{club_id: 1, title: 'club 1'}, {club_id: 5, title: 'club 5'}],
      adminOfClubs: [{club_id: 1, title: 'club 1'}, {club_id: 5, title: 'club 5'}],
      moderatorOfClubs: [{club_id: 9, title: 'club 9'}, {club_id: 10, title: 'club 10'}],
      joinedClubs: [{club_id: 4, title: 'club 4', sentRequest: {Date: '20/11/2021', Time: '09:00'}, joinedAt: {Date: '20/11/2021', Time: '10:00'}}, ],
      awaitingRequests: [{club_id: 2, title: 'club 2', sentRequest: {Date: '20/11/2021', Time: '09:00'}}, {club_id: 3, title: 'club 3', sentRequest: {Date: '20/11/2021', Time: '09:00'}}]
    },
    userEvents: {
      createdEvents: [{event_id: 1, title: 'event 1', createdAt: {Date: '20/11/2021', Time: '09:00'}}, {event_id: 5, title: 'event 5', createdAt: {Date: '20/11/2021', Time: '09:30'}}],
      participatedInEvents: [{event_id: 1, title: 'event 1', participatedAt: {Date: '20/11/2021', Time: '09:00'}}, {event_id: 5, title: 'event 5', participatedAt: {Date: '20/11/2021', Time: '09:30'}}],
      interestedInEvents: [{event_id: 1, title: 'event 1', interestedAt: {Date: '20/11/2021', Time: '09:00'}}, {event_id: 5, title: 'event 5', interestedAt: {Date: '20/11/2021', Time: '09:30'}}]
    },
  },
]
module.exports = {users}

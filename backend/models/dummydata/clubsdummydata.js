const clubs = [
  {
    id: 1,
    title: 'Chess Club',
    description: 'for all chess lovers',
    category: "Sports",
    coverPicture: "",
    profilePicture: "",
    location: {country: 'Tunisia', state: 'Tunis', City: 'Ettadhamen'},
    createdBy: {user_id: 1, firstName: 'Mariem', lastName: 'Matri'},
    createdAt: {Date: '20/11/2021', Time: '09:00'},
    Admins: [{user_id: 1, firstName: 'Mariem', lastName: 'Matri'}, ],
    Moderators: [{user_id: 2, firstName: 'someone2', lastName: 'someone2'}, {user_id: 3, firstName: 'someone3', lastName: 'someone3'}],
    members: [
      {user_id: 2, firstName: 'someone2', lastName: 'someone2', sentRequest: {Date: '20/11/2021', Time: '09:00'}, joinedAt: {Date: '20/11/2021', Time: '10:00'}},
      {user_id: 3, firstName: 'someone3', lastName: 'someone3', sentRequest: {Date: '20/11/2021', Time: '08:00'}, joinedAt: {Date: '20/11/2021', Time: '11:00'}},
      {user_id: 4, firstName: 'someone4', lastName: 'someone4', sentRequest: {Date: '20/11/2021', Time: '08:30'}, joinedAt: {Date: '20/11/2021', Time: '11:30'}}
   ],
   awaitingRequests: [
     {user_id: 5, firstName: 'someone5', lastName: 'someone5', sentRequest: {Date: '20/11/2021', Time: '11:00'}},
   ],
  },
  {
    id: 1,
    title: 'Running Club',
    description: 'free runnersss!!!',
    category: "Sports",
    coverPicture: "",
    profilePicture: "",
    location: {country: 'Tunisia', state: 'Tunis', City: 'Ettadhamen'},
    createdBy: {user_id: 1, firstName: 'Mariem', lastName: 'Matri'},
    createdAt: {Date: '20/11/2021', Time: '09:00'},
    Admins: [{user_id: 1, firstName: 'Mariem', lastName: 'Matri'}, ],
    Moderators: [{user_id: 2, firstName: 'someone2', lastName: 'someone2'}, {user_id: 3, firstName: 'someone3', lastName: 'someone3'}],
    members: [
      {user_id: 2, firstName: 'someone2', lastName: 'someone2', sentRequest: {Date: '20/11/2021', Time: '09:00'}, joinedAt: {Date: '20/11/2021', Time: '10:00'}},
      {user_id: 3, firstName: 'someone3', lastName: 'someone3', sentRequest: {Date: '20/11/2021', Time: '08:00'}, joinedAt: {Date: '20/11/2021', Time: '11:00'}},
      {user_id: 4, firstName: 'someone4', lastName: 'someone4', sentRequest: {Date: '20/11/2021', Time: '08:30'}, joinedAt: {Date: '20/11/2021', Time: '11:30'}}
   ],
   awaitingRequests: [
     {user_id: 5, firstName: 'someone5', lastName: 'someone5', sentRequest: {Date: '20/11/2021', Time: '11:00'}},
   ],
  }
]
module.exports = {clubs}

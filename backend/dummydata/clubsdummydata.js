const clubs = [
  {
    id: 1,
    title: 'bla',
    description: 'blablalbla bla',
    duration: '1 to 2 hours',
    paid: true,
    budget: {amount: 20, currency: 'DT'},
    takesPlace: {from: {Date: '23/11/2021', Time: '09:00'}, to: {Date: '23/11/2021', Time: '11:00'}},
    location: {country: 'Tunisia', state: 'Tunis', City: 'Ettadhamen'},
    createdBy: {user_id: 1, firstName: 'Mariem', lastName: 'Matri'},
    createdAt: {Date: '20/11/2021', Time: '09:00'},
    members: [
      {user_id: 2, firstName: 'someone2', lastName: 'someone2', appliedAt: {Date: '20/11/2021', Time: '10:00'}},
      {user_id: 3, firstName: 'someone3', lastName: 'someone3', appliedAt: {Date: '20/11/2021', Time: '11:00'}},
      {user_id: 4, firstName: 'someone4', lastName: 'someone4', appliedAt: {Date: '20/11/2021', Time: '11:30'}}
   ],
   acceptedMembers: [{user_id: 3, firstName: 'someone3', lastName: 'someone3', appliedAt: {Date: '20/11/2021', Time: '11:00'}, acceptedAt: {Date: '22/11/2021', Time: '8:00'}},],
    closedAt: {Date: '22/11/2021', Time: '20:00'}
  },
  {
    id: 2,
    title: 'bla2',
    description: 'blablalbla222bla2',
    duration: '1 to 2 hours',
    paid: false,
    budget: {},
    takesPlace: {from: {Date: '23/11/2021', Time: '09:00'}, to: {Date: '23/11/2021', Time: '11:00'}},
    location: {country: 'Tunisia', state: 'Tunis', City: 'Ettadhamen'},
    createdBy: {user_id: 1, firstName: 'Mariem', lastName: 'Matri'},
    createdAt: {Date: '20/11/2021', Time: '09:00'},
    members: [
      {user_id: 2, firstName: 'someone2', lastName: 'someone2', appliedAt: {Date: '20/11/2021', Time: '10:00'}},
      {user_id: 3, firstName: 'someone3', lastName: 'someone3', appliedAt: {Date: '20/11/2021', Time: '11:00'}},
      {user_id: 4, firstName: 'someone4', lastName: 'someone4', appliedAt: {Date: '20/11/2021', Time: '11:30'}}
   ],
   acceptedMemberss: [{user_id: 3, firstName: 'someone3', lastName: 'someone3', appliedAt: {Date: '20/11/2021', Time: '11:00'}, acceptedAt: {Date: '22/11/2021', Time: '8:00'}},],
    closedAt: {Date: '22/11/2021', Time: '20:00'}
  }
]
module.exports = {clubs}
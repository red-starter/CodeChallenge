// minimal testing script
var expect = require('chai').expect

var Person = require('./solution').Person
var Event = require('./solution').Event
var Invite = require('./solution').Invite


var Joe = new Person('Joe','Doe')

expect(Joe).to.be.a('object');

var Bob = new Person('Bob','Bobby')
// create party event
var party = new Event('Birthday','tomorrow')

// no one invited Bob
expect(Bob.getInvites()).to.have.length(0);
// create the invite for Bob to attend the party
var inviteBobToParty = new Invite(Bob,party) 
// send the invite
inviteBobToParty.send()
// Bob should have an invite called 'Birthday'
expect(Bob.getInvites()).to.have.length(1);
expect(Bob.getInvites()[0]).to.equal('Birthday')

// Bob did not accept the invite yet, so the party still has 0 attendees
expect(party.getAttendees()).to.have.length(0)
// Bob accepted the invite
Bob.acceptInvite('Birthday')
// now we should have one atttendee
expect(party.getAttendees()).to.have.length(1)
// with the name 'Bob Bobby'
expect(party.getAttendees()[0]).to.equal('Bob Bobby')
// the invite was removed from Bobs inbox of invites
expect(Bob.getInvites()).to.have.length(0)

// send out another invites
var inviteJoeToParty = new Invite(Joe,party)
inviteJoeToParty.send()
inviteJoeToParty.send()
// we can't send more than one invite to an event
expect(Joe.getInvites()).to.have.length(1)
Joe.acceptInvite('Birthday')
// we can't go to an event more than one time
Joe.acceptInvite('Birthday')
expect(party.getAttendees()).to.have.length(2)


// Event - An event has a name, date, and attendees.
// Person - A person has a first name and a last name.
// Invite - An invite has a person and an event.

function Event(name,date){
	this.name = name;
	this.date = date;
	// enforce unique attendees
	this.attendees = {};
}

Event.prototype.addAttendee = function(person){
	// adds the person to the attendee hash
	this.attendees[person] = 'attending'
}

Event.prototype.getAttendees = function(person){
	// returns an array with all the attendees
	return Object.keys(this.attendees)
}

function Invite(person,event){
	// make sure the passed in parameters are instances of the right class type
	if (person instanceof Person){
		this.person = person;
	} else {
		console.error('wrong person type');
		return;
	}
	if (event instanceof Event){
		this.event = event
	} else {
		console.error('wrong event type');
		return; 
	}
}

Invite.prototype.send = function(){
	// make sure we are passing in the proper parameters
	if (!(this in this.person.invites)){
		this.person.invites[this.event.name] = this.event;
	} else {
		console.error('already sent the invite');
		return;
	}
}

function Person(firstName,lastName){
	this.firstName = firstName;
	this.lastName = lastName;
	// enforce unique invites
	this.invites = {};
}


Person.prototype.getInvites = function(){
	// returns an array of the event names the person was invited to
	return Object.keys(this.invites);
}

Person.prototype.acceptInvite = function(eventName){
	// if the Person accepts the invite, the person is added to the list attendees and the invite is deleted from the persons invites inbox 
	if (eventName in this.invites){
		var event = this.invites[eventName];
		event.addAttendee(this.firstName + ' ' + this.lastName);	
		delete this.invites[eventName];
	} else {
		console.error('not invited to this event');
		return;
	}
}

module.exports.Person = Person
module.exports.Invite = Invite
module.exports.Event = Event


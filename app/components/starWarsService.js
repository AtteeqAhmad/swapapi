// private

import person from "../models/person.js";

//creates an object to send requests from 
let _peopleApi = axios.create({
   baseURL: 'https://swapi.co/api/people'
})

let _state = {
   people: [],
   nextPrevPeople: {
      nextUrl: '',
      previousUrl: ''
   },
   activePerson: {}

}

let _subscribers = {
   people: [],
   nextPrevPeople: [],
   activePerson: []
}

// HANDLES ALL A SYNC
function setState(prop, value) {
   _state[prop] = value
   _subscribers[prop].forEach(fn => fn());
}

// public
export default class StarWarsService {
   addSubscriber(prop, fn) {
      _subscribers[prop].push(fn)
   }
   //get local data
   get people() {
      //Breaks Refrences of each object in state
      return _state.people.map(p => new person(p))
   }

   get Next() {
      return _state.nextPrevPeople.previousUrl
   }

   get Previous() {
      return _state.nextPrevPeople.previousUrl
   }

   get ActivePerson() {
      //create a new object that is a copy of the active person (breaking refrence)
      return new Person(_state.activePerson)
   }
   // make a call to swapi api to get all people
   getApiPeople(url = '') {
      _peopleApi.get(url)
         // Happens after data comes back
         .then(response => {
            //all axios requests return 'data' in the response
            let people = response.data.results.map(d => new Person(d))
            let urlData = {
               nextUrl: response.data.next,
               previousUrl: response.data.previous
            }
            setState('nextPrevPeoplee', urlData)
            setState('people', people)
         })
         .catch(err => {
            console.error(err)
         })
   }
   getOneApiPerson(url) {
      _peopleApi.get(url)
         .then(res => {
            setState('activePerson', new Person(res.data))
         })
         .catch(err => {
            console.error(err)
         })
   }
}
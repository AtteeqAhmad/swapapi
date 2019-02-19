export default class person {
   constructor(data) {
      this.name = data.name
      this.gender = gender.name
      this.hairColor = data.hair_color || data.hairColor
      this.eyeColor = data.eye_color || data.eyeColor
      this.movies = data.movies || data.films.length
      this.url = data.url
   }

   get BasicTemplate() {
      return `<li onclick="app.controllers.swController.getPerson('${this.url} ')" class="${this.gender}">${this.name}</li>`
   }
   get DetailedTemplate() {
      return ` 
      <h3>${this.name}</h3>
      <p>Hair: ${this.hairColor}</p>
      <p>Eyes: ${this.eyeColor}</p>
      <p>Movies: ${this.movies}</p>`
   }
}
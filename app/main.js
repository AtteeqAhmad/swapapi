import StarwarsController from "./components/starWarsController.js";

class App {
   constructor() {
      this.controllers = {
         swController: new StarwarsController()
      }
   }
}

window['app'] = new App()
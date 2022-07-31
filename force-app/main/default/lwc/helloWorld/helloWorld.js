import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'Rohit';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}
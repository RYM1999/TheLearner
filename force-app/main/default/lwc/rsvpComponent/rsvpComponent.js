import { api, LightningElement, wire, track } from 'lwc';
import doRSVP from '@salesforce/apex/RsvpLWCService.doRSVP';
export default class RsvpComponent extends LightningElement {

  __rsvpData = {};
  __isSpinner = false;
  @api courseId;

handleChange(course) {
  const fieldName = course.target.name;
  const fieldValue = course.target.value;
  this.__rsvpData[fieldName] = fieldValue;
}

validateInput() {
  const inputFields = this.template.querySelectorAll('lightning-input');
  let isValid = true;
  inputFields.forEach(field => {
    if(field.reportValidity() === false) {
      isValid = false;
    }
  });
  return isValid;
}

handleRSVP(course) {
  course.preventDefault();
  if(this.validateInput()) {
    // this.dispatchEvent(new CustomEvent('rsvp', {
    //   detail: JSON.stringify(this.__rsvpData)
    // }));
    // make the call to apex class
    this.__isSpinner = true;

    //console.log('OUTPUT :', this.__rsvpData);
    doRSVP({
      params: JSON.stringify(this.__rsvpData),
      courseId: this.courseId

    })
    .then(result => {
      //console.log('Result \n ', result);
      //alert('RSVP Successful');
      this.dispatchEvent(new CustomEvent('Success'));
    })
    .catch(error => {
      console.error('Error: \n ', error);
    })
    .finally(()=> {
      this.__isSpinner = false;
    })
  }
}

handleCancel(course) {
  course.preventDefault();
  this.dispatchEvent(new CustomEvent('cancel'));
}


}
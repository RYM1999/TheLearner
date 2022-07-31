import { LightningElement, api, wire, track } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import fetchCourseDetails from '@salesforce/apex/CourseDetailLWCService.fetchCourseDetails';
import fetchTrainerDetails from '@salesforce/apex/CourseDetailLWCService.fetchTrainerDetails';
import fetchUserName from '@salesforce/apex/UserUtility.fetchUserName';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchRsvpList from '@salesforce/apex/CourseDetailLWCService.fetchRsvpList';
export default class CourseDetailComponent extends NavigationMixin(LightningElement) {

  @api courseId;
  @api source;
  __CurrentPageReference;
  isSpinner = false;

  __trainers;
  __courseDetails;
  __errors;
  __rsvpCompleted = false;

  // variable to show/hide enroll button
 __showRSVPButton = false;
 //__showButton = false;
 @api __rsvpCompleted = false;

 // variable to show rsvp modal
 __showModal = false;
 __showContactModal = false;

 

  @wire(fetchUserName)
  wiredGuestData({ error, data }) {
    if (data) {
      //console.log('Data', data);
      if(data.includes('Site Guest User')) {
        this.__showRSVPButton = false;
        //console.log("Guest User!");
        //console.log(this.__showRSVPButton);
      } else {
        this.__showRSVPButton = true;
        //console.log("Logged User!");
        //console.log(this.__showRSVPButton);
      }
    } else if (error) {
      console.error('Error:', error);
    }
    //console.log("New ", this.__showRSVPButton);
  }
  
  

  @wire(CurrentPageReference) 
  getCurrentPageReference(PageReference) {
    this.__CurrentPageReference = PageReference;
    // window.console.log('PageReference', this.__CurrentPageReference);
    // window.console.log('state', this.__CurrentPageReference.state);
    // window.console.log('state', this.__CurrentPageReference.state.c__courseId);
    // window.console.log('state', this.__CurrentPageReference.state.courseId);

    this.courseId = this.__CurrentPageReference.state.courseId;
    this.source = this.__CurrentPageReference.state.source;
    this.fetchCourseDetailsJS();
    this.fetchTrainerDetailsJS();
    this.fetchRsvpListJS();
   }
   
   fetchRsvpListJS(){
    //this.isSpinner = true;
    fetchRsvpList({ courseId: this.courseId })
      .then(result => {
        console.log('Result', result);
        if(result && result.length > 0){
          this.__rsvpCompleted = true;
        }
      })
      .catch(error => {
        console.error('Error:', error);
    });

   }

   fetchCourseDetailsJS() {
     this.isSpinner = true;
    fetchCourseDetails({ recordId: this.courseId })
       .then(result => {
         console.log('Result', result);
         //console.log("location", result);
         this.__courseDetails = result;
         if (this._courseDetails.Location__c) {
            this.__mapMarkers.push({
                location: {
                    City: this._courseDetails.Location__r.City__c,
                    Country: this._courseDetails.Location__r.Country__c,
                    
                    State: this._courseDetails.Location__r.State__c,
                    Street: this._courseDetails.Location__r.Street__c
                },
                title: this._courseDetails.Name__c,
                description: 'This is the landmark for the location'
            });
        }
       })
       .catch(error => {
         console.error('Error:', error);
         this.__errors = error;
     })
     .finally(() => {
      this.isSpinner = false;
    });

   }

   fetchTrainerDetailsJS() {
    this.isSpinner = true;
    fetchTrainerDetails({ courseId: this.courseId })
    .then(result => {
      console.log('Result', result);
      this.__trainers = result;
    })
    .catch(error => {
      console.error('Error:', error);
      this.__errors = error;
    })

   .finally(() => {
     this.isSpinner = false;
    });
  }

  

   
  handleRSVP(){
    this.__showModal = true;
  }
  handleRsvpSuccess(event) {
    alert('You have successfully Registered for course');
    event.preventDefault();
    this.__showModal = false;
    this.__showModal = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Sucess',
            message: 'You are sucessfully registered for the Course',
            variant: 'Sucess'
        }));
     //console.log('output', this.courseId);
     this.__rsvpCompleted = true;

  }
  handleCancel() {
    this.__showModal = false;
     //console.log('output', this.courseId);

  }
  handleContactUs() {

  }

  handleLoginRedirect() {
    let navigationTarget = {
      type: 'comm__namedPage',
      attributes: {
          name: 'Login'
      }
  }
  // this[NavigationMixin.Navigate](navigationTarget);
  alert('Login to enroll');
  }

}
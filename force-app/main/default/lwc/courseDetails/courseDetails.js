import { LightningElement, api, track } from 'lwc';
import getTrainers from '@salesforce/apex/CourseDetailsController.getTrainers';
import getLocationDetails from '@salesforce/apex/CourseDetailsController.getLocationDetails';
import getAttendees from '@salesforce/apex/CourseDetailsController.getAttendees';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
const columns = [
  
  {
    label: 'Name', 
    fieldName: 'Name',
    cellAttributes: 
    {
      iconName: 'standard:user',
      iconPosition: 'left',
    }
  },
  {label: 'Email', fieldName: 'Email', type: 'email'},
  {label: 'Phone', fieldName: 'Phone', type: 'phone'},
  {label: 'Company Name', fieldName: 'CompanyName'}

];

const columnsAtt = [
  
  {
    label: 'Name', 
    fieldName: 'Name',
    cellAttributes: 
    {
      iconName: 'standard:user',
      iconPosition: 'left',
    }
  },
  {label: 'Email', fieldName: 'Email', type: 'email'},
  {label: 'Phone', fieldName: 'Phone', type: 'phone'}

];

export default class CourseDetails extends NavigationMixin(LightningElement) {
  @api recordId;
  @track trainerList;
  @track courseRec;

  
  @track attendeesList;
  errors;
  columnsList = columns;
  columnsAtt = columnsAtt;
  handleTrainerActive() {
    getTrainers({
      courseId : this.recordId
    })
    .then((result) => {
      result.forEach(trainer => {
        trainer.Name = trainer.Trainer__r.Name;
        trainer.Email = trainer.Trainer__r.Email__c;
        trainer.Phone = trainer.Trainer__r.Phone__c;
        trainer.CompanyName = trainer.Trainer__r.Company__c;
      });
      window.console.log('result ',result);
      this.trainerList = result;
      this.errors = undefined;

    }).catch((err) => {
      this.errors = err;
      this.trainerList = undefined;

    })
    
  }


  handleLocationDetails() {
    getLocationDetails({
      courseId : this.recordId
    })
    .then((result) => {
      if (result.Location__c) {
        this.courseRec = result;

      } else {
        this.courseRec = undefined;
      }
      this.courseRec = result;
      this.errors = undefined;

    }).catch((err) => {
      this.errors = err;
      this.trainerList = undefined;

    })

  }

  handleCourseAttendee() {
    getAttendees({
      courseId : this.recordId
    })
    .then((result) => {
      result.forEach(att => {
        att.Name = att.Attendee__r.Name;
        att.Email = att.Attendee__r.Email__c;
        att.Phone = att.Attendee__r.Phone__c;
        //att.CompanyName = att.Attendee__r.Company_Name__c;
        
      });
      
      this.attendeesList = JSON.parse(JSON.stringify(result));
      window.console.log('result ',attendeesList);
      this.errors = undefined;

    }).catch((err) => {
      this.errors = err;
      this.trainerList = undefined;

    })

  }

  createTrainer() {
    const defaultValues = encodeDefaultFieldValues({
      Course__c: this.recordId
      });
      this[NavigationMixin.Navigate]({
      type: 'standard__objectPage',
      attributes: {
      objectApiName: 'Course_Trainer__c',
      actionName: 'new'
      },
      state: {
      defaultFieldValues: defaultValues
      }
      });
  }

  createAttendee() {
    const defaultValues = encodeDefaultFieldValues({
      Course__c: this.recordId
      });
      this[NavigationMixin.Navigate]({
      type: 'standard__objectPage',
      attributes: {
      objectApiName: 'Course_Attendee__c',
      actionName: 'new'
      },
      state: {
      defaultFieldValues: defaultValues
      }
      });
  }
}
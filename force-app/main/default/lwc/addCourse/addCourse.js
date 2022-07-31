
import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CSE_OBJECT from '@salesforce/schema/Course__c';
import Name_F from '@salesforce/schema/Course__c.Name__c';
import Organizer__c from '@salesforce/schema/Course__c.Organizer__c';
import StartDateTime__c from '@salesforce/schema/Course__c.StartDateTime__c';
import EndDateTime__c from '@salesforce/schema/Course__c.EndDateTime__c';
import MaxSeats__c from '@salesforce/schema/Course__c.MaxSeats__c';
import Location__c from '@salesforce/schema/Event__c.Location__c';
import Course_Detail__c from '@salesforce/schema/Course__c.Course_Detail__c';

import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddCourse extends NavigationMixin(LightningElement) {

    @track eventRecord = {
        Name: '',
        Organizer__c: '',
        StartDateTime__c: null,
        EndDateTime__c: null,
        MaxSeats__c: null,
        Location__c: '',
        Course_Detail__c: ''
    }

    @track errors;

    handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        this.eventRecord[name] = value;
        // MaxFIT Campaign
        // Name
        // this.eventRecord[Name] = 'MaxFIT Campaign'
    }
    /*
        Event__c newEvent = new event__c();
        newEvent.Name = '';
        newEvent.Location__c = '098203u84';
    */

    handleLookup(event) {
        let selectedRecId = event.detail.selectedRecordId;
        let parentField = event.detail.parentfield;
        this.eventRecord[parentField] = selectedRecId;
        // selectedRecId = aiwue7836734834
        // Location__c
        // this.eventRecord[Location__c] = selectedRecId;
    }

    handleClick() {
        const fields = {};
        fields[Name_F.fieldApiName] = this.eventRecord.Name;
        fields[Organizer__c.fieldApiName] = this.eventRecord.Organizer__c;
        fields[StartDateTime__c.fieldApiName] = this.eventRecord.StartDateTime__c;
        fields[EndDateTime__c.fieldApiName] = this.eventRecord.EndDateTime__c;
        fields[MaxSeats__c.fieldApiName] = this.eventRecord.MaxSeats__c;
        fields[Location__c.fieldApiName] = this.eventRecord.Location__c;
        fields[Course_Detail__c.fieldApiName] = this.eventRecord.Course_Detail__c;

        const eventRecord = { apiName: CSE_OBJECT.objectApiName, fields };

        createRecord(eventRecord)
            .then((eventRec) => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Record Saved',
                    message: 'Course Draft is Ready',
                    variant: 'success'
                }));
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        actionName: "view",
                        recordId: eventRec.id
                    }
                });
            }).catch((err) => {
                this.errors = JSON.stringify(err);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error Occured',
                    message: this.errors,
                    variant: 'error'
                }));
            });
    }

    handleCancel() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                actionName: "home",
                objectApiName: "Course__c"
            }
        });
    }
}
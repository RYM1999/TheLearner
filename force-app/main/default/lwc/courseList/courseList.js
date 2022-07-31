import { LightningElement, track, wire } from 'lwc';
import upcomingCourses from '@salesforce/apex/CourseDetailsService.upcomingCourses';

const columns = [

    {
        label: 'View',
        fieldName: 'detailsPage',
        type: 'url',
        wrapText: 'true',
        typeAttributes: {
            label: {
                fieldName: 'Name'
            }
        }
    },

    {
        label: 'Course Name',
        fieldName: 'Name',
        wrapText: "true",
        cellAttributes:
        {
            iconName: 'standard:event',
            iconPosition: 'left',
        }
    },
    {
        label: 'Organizer Name',
        fieldName: 'EVNT_ORG',
        wrapText: "true",
        cellAttributes:
        {
            iconName: 'standard:user',
            iconPosition: 'left',
        }
    },
    {
        label: 'Location',
        fieldName: 'Location',
        wrapText: true,
        type: 'text',
        cellAttributes:
        {
            iconName: 'utility:location',
            iconPosition: 'left',
        }
    },
    {
        label: 'Details',
        fieldName: 'Details',
        type: 'text',
        wrapText: true
    }


];

export default class CourseList extends LightningElement {

    columnsList = columns;
    error;
    startDateTime;
    @track result;
    @track recordsToDisplay;

    connectedCallback() {
        this.upcomingCoursesFromApex();
    }

    upcomingCoursesFromApex() {
        upcomingCourses()
            .then((data) => {
                window.console.log("course list ", data);
                data.forEach(record => {
                    record.detailsPage = "https://" + window.location.host + '/' + record.Id;
                    record.Name1 = record.Name;
                    record.EVNT_ORG = record.Organizer__r.Name;
                    record.Details = record.Course_Detail__c;
                    if (record.Location__c) {
                        record.Location = record.Location__r.Name;

                    } else {
                        record.Location = 'This is Virtual Course';
                    }

                });
                this.result = data;
                this.recordsToDisplay = data;
                this.error = undefined;

            }).catch((err) => {
                window.console.log(err);
                this.error = JSON.stringify(err);
                this.result = undefined;

            });

    }

    handleSearch(course) {
        let keyword = course.detail.value;
        let filteredCourses = this.result.filter((record, index, arrayObject) => {
            return record.Name__c.toLowerCase().includes(keyword.toLowerCase());

        });
        if (keyword && keyword.length >= 2) {
            this.recordsToDisplay = filteredCourses;
        } else {
            this.recordsToDisplay = this.result;
        }

    }

    // handleStartDate(course) {
    //     let valueDateTime = course.target.value;

    //     let filteredCourses = this.result.filter((record, index, arrayObject) => {
    //         window.console.log("StartDateTime__c ", StartDateTime__c);
    //         return record.StartDateTime__c >= valueDateTime;
    //     });
    //     this.recordsToDisplay = filteredCourses;

    //   }
    handleStartDate(course) {
        let valuedatetime = course.target.value;
          window.console.log("valueDateTime ", valueDateTime);
        let filteredCourses = this.result.filter((record, index, arrayobject) => {
             window.console.log("StartDateTime__c ", StartDateTime__c);
            return record.StartDateTime__c >= valuedatetime;
        });
        this.recordsToDisplay = filteredCourses;
    }

    handleLocationSearch(course) {

        let keyword = course.detail.value;
        let filteredCourses = this.result.filter((record, index, arrayObject) => {
            return record.Location.toLowerCase().includes(keyword.toLowerCase());

        });
        if (keyword && keyword.length >= 2) {
            this.recordsToDisplay = filteredCourses;
        } else {
            this.recordsToDisplay = this.result;
        }

    }
}
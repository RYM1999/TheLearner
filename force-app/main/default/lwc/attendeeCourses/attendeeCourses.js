import { LightningElement, api, track } from "lwc";
import upcomingEvets from "@salesforce/apex/AttendeeCourseService.upcomingEvets";
import pastCourse from "@salesforce/apex/AttendeeCourseService.pastCourse";

const columns = [
    {
        label: "Course Name",
        fieldName: "detailsPage",
        type: "url",
        wrapText: "true",
        typeAttributes: {
            label: {
                fieldName: "Name"
            }
        }
    },
    {
        label: "Name",
        fieldName: "EVNTORG",
        cellAttributes: {
            iconName: "standard:user",
            iconPosition: "left"
        }
    },
    {
        label: "Course Date",
        fieldName: "StartDateTime",
        type: "date",
        typeAttributes: {
            weekday: "long",
            year: "numeric",
            month: "long"
        }
    },
    {
        label: "Location",
        fieldName: "Location",
        type: "text",
        cellAttributes: {
            iconName: "utility:location",
            iconPosition: "left"
        }
    }
];
export default class AttendeeCourses extends LightningElement {
    @api recordId;
    @track events;
    @track past_course;
    columnsList = columns;
    errors;
    connectedCallback() {
        this.upcomingEvetsFromApex();
        this.pastCourseFromApex();
    }

    upcomingEvetsFromApex() {
        upcomingEvets({
            attendeeId: this.recordId
        })
            .then((result) => {
                //window.console.log(" error ", result);
                result.forEach((record) => {
                    record.Name = record.Course__r.Name__c;
                    record.detailsPage =
                        "https://" + window.location.host + "/" + record.Course__c;
                    record.EVNTORG = record.Course__r.CourseOrganizer__r.Name;
                    record.StartDateTime = record.Course__r.StartDateTime__c;
                    if (record.Course__r.Location__c) {
                        record.Location = record.Course__r.Location__r.Name;
                    } else {
                        record.Location = "This is a virtual event";
                    }
                });
                this.events = result;
                //window.console.log(" result ", result);
                this.errors = undefined;
            })
            .catch((error) => {
                this.events = undefined;
                this.errors = JSON.stringify(error);
            });
    }
    pastCourseFromApex() {
        pastCourse({
            attendeeId: this.recordId
        })
            .then((result) => {
                window.console.log(" past_course ", result);
                result.forEach((record) => {
                    record.Name = record.Course__r.Name__c;
                    record.detailsPage =
                        "https://" + window.location.host + "/" + record.Course__c;
                    record.EVNTORG = record.Course__r.CourseOrganizer__r.Name;
                    record.StartDateTime = record.Course__r.StartDateTime__c;
                    if (record.Course__r.Location__c) {
                        record.Location = record.Course__r.Location__r.Name;
                    } else {
                        record.Location = "This is a virtual event";
                    }
                });
                this.past_course = result;
                window.console.log(" result ", result);
                this.errors = undefined;
            })
            .catch((error) => {
                this.events = undefined;
                this.errors = JSON.stringify(error);
            });
    }
}
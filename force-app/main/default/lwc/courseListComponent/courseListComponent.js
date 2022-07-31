
import { LightningElement, wire } from 'lwc';
import fetchUpComingCourses from '@salesforce/apex/CourseListLWCService.fetchUpComingCourses';
import fetchPastCourses from '@salesforce/apex/CourseListLWCService.fetchPastCourses';

import { NavigationMixin } from 'lightning/navigation';

//import CourseTitle from '@salesforce/resourceUrl/CourseTitle';

export default class CourseListComponent extends NavigationMixin(LightningElement) {

    upcomingCourses;
    pastCourses;
    __errors;
    isSpinner = false;

    // images = {
    //     course : CourseTitle
     //}

    @wire(fetchUpComingCourses)
    wiredUpComingCoursesData({ error, data }) {
        if (data) {
            this.upcomingCourses = data;
        } else if (error) {
            console.error('Course listcmpnt Error:', error);
            this.upcomingCourses = undefined;
            this.__errors = error;
        }
    }

    @wire(fetchPastCourses)
    wiredPastCoursesData({ error, data }) {
        if (data) {
            this.pastCourses = data;
        } else if (error) {
            //console.error('Course listcmpnt Past Event Error:', error);
            this.pastCourses = undefined;
            this.__errors = error;
        }
    }

    handleCourseClick = course => {

        course.preventDefault();
        let selectedCourseId = course.currentTarget.dataset.courseId;
        //alert('Helllo...' + selectedCourseId);
        let navigationTarget = {
            type: 'comm__namedPage',
            attributes: {
                name: "Course_Details__c"
            },
            state: {
                courseId: selectedCourseId,
                source: 'CourseListPage'
            }
        }

        this[NavigationMixin.Navigate](navigationTarget);
    }
}
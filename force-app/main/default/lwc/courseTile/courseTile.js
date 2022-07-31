import { api, LightningElement } from 'lwc';
export default class CourseTile extends LightningElement {
    @api course;
    @api imageUrl;

    handleClick(course) {
        course.preventDefault();
        const selectCourse = new CustomEvent('select', {
            detail: {
                courseId: this.course.Id
            }
        });
        this.dispatchEvent(selectCourse);
    }
}
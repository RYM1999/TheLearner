trigger DuplicateCourseEnroll on Course_Attendee__c (before insert,before update) {
    
    Set<Id> attendeeIdsSet = new Set<Id>();
    Set<Id> courseIdsSet = new set<Id>();
    
    for(Course_Attendee__c ca : Trigger.New) {
        attendeeIdsSet.add(ca.Attendee__c);
        courseIdsSet.add(ca.Course__c);
    }
    
    Map<Id,String> requestedCourses = new Map<Id,String>();
    List<Course__c> relatedCourseList = [Select Id,Name From 
                                        Course__c where Id IN 
                                        : courseIdsSet];
    for(Course__c crs : relatedCourseList) {
        requestedCourses.put(crs.Id,crs.Name);
    }
    
    List<Course_Attendee__c> relatedCourseAttendeeList = [Select Id,Attendee__c,
                                                        Course__c,Course__r.Name From
                                                        Course_Attendee__c Where
                                                        Attendee__c IN : attendeeIdsSet];
    
    for(Course_Attendee__c ca : Trigger.New) {
        String EnrolledCourse = requestedCourses.get(ca.Course__c);
        
        for(Course_Attendee__c ca1 : relatedCourseAttendeeList) {
            if(ca1.Attendee__c == ca.Attendee__c && ca1.Course__r.Name == EnrolledCourse) {
                ca.Course__c.addError('The attendee is already enrolled with the same course..');
            }
        }
    }

}
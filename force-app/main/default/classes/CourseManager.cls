@RestResource(urlMapping='/v1/futurecourse')
global class CourseManager {

    @httpGet
    global static List<Course__c> upcomingCourses(){
        List<Course__c> courseList = [SELECT Id, Name, CreatedDate,
                            Location__c, Organizer__c, Organizer__r.Name,Organizer__r.Email__c,
                            Location__r.Name, Location__r.Street__c, Location__r.City__C,
                            Location__r.Country__c, Location__r.State__c,
                            Name__c, StartDateTime__c, 
                            EndDateTime__c, Recurring__c, MaxSeats__c, Live__c, 
                            PeopleAttending__c, RemainingSeats__c, 
                            ClassType__c, Frequency__c, 
                            Status__c, 
                            Course_Detail__c 
                            FROM Course__c 
                            Where StartDateTime__c >= TODAY AND Live__c = true
                            WITH SECURITY_ENFORCED
                           ];
        return courseList;
    }
    
    
}

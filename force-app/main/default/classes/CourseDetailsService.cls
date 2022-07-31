public with sharing class CourseDetailsService {

    @AuraEnabled
    public static List<Course__c> upcomingCourses (){
        List<Course__c> courseList =[
            SELECT 
            Id, 
            Name, 
            Course_Detail__c,Location__c,Location__r.Name,Organizer__c,
            StartDateTime__c,Organizer__r.Name
            FROM Course__c 
            WHERE StartDateTime__c >=Today AND Live__c = true
            WITH SECURITY_ENFORCED
            ];
            return courseList;
    }
    //this extra as mf

            @AuraEnabled(cacheable=true)
            public static List<Course__c> fetchPastCourses(){
                List<Course__c> courseList = new List<Course__c>();
                try {
                    courseList = [SELECT Id, Name, Location__c, 
                                    Location__r.Name, StartDateTime__c
                                    FROM Course__c
                                    WHERE StartDateTime__c <= TODAY
                                    WITH SECURITY_ENFORCED
                                ];
                } catch (Exception e) {
                    throw new AuraHandledException(e.getMessage());
                }
                return courseList;
    }
}
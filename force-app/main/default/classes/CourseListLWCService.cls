public without sharing class CourseListLWCService {

    @AuraEnabled(cacheable=true)
    public static List<Course__c> fetchUpComingCourses(){
        List<Course__c> courseList = new List<Course__c>();
        try {
            courseList = [SELECT Id, Name__c, Location__c, ClassType__c,
                            Location__r.Name, StartDateTime__c, EndDateTime__c, TitleImageUrl__c
                            FROM Course__c
                            WHERE StartDateTime__c >= TODAY AND Live__c = true
                            WITH SECURITY_ENFORCED
                        ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return courseList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Course__c> fetchPastCourses(){
        List<Course__c> courseList = new List<Course__c>();
        try {
            courseList = [SELECT Id, Name__c, Location__c, ClassType__c,
                            Location__r.Name, StartDateTime__c, EndDateTime__C, TitleImageUrl__c
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
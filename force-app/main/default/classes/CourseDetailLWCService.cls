public with sharing class CourseDetailLWCService {

  @AuraEnabled(cacheable=true)
  public static Course__c fetchCourseDetails(String recordId){
      Course__c courseRecord = new Course__c();
      try {
          courseRecord = [
                  SELECT Id,Name__c,Organizer__c,Organizer__r.Name,
                          Course_Detail__c, Location__c, Location__r.Name,Location__r.City__c,Location__r.Country__c,
                          Location__r.State__c,Location__r.Street__c ,StartDateTime__c,
                          EndDateTime__c, Recurring__c, MaxSeats__c, Live__c, 
                          PeopleAttending__c, RemainingSeats__c 
                  FROM Course__c
                  WHERE Id =: recordId
                  WITH SECURITY_ENFORCED
                          ];
          
      } catch (Exception e) {
          throw new AuraHandledException(e.getMessage());
      }
      return courseRecord;
  }

  @AuraEnabled(cacheable=true)
  public static List<Course_Trainer__c> fetchTrainerDetails(String courseId){
      List<Course_Trainer__c> trainers = new List<Course_Trainer__c>();
      try {
      trainers   = [SELECT Id,Name, Trainer__r.Name, 
                      Trainer__r.TrainerImageUrl__c,
                      Trainer__r.Company__c
                      FROM Course_Trainer__c
                      WHERE Course__c =: courseId
                      WITH SECURITY_ENFORCED
                  ];
      } catch (Exception e) {
          throw new AuraHandledException(e.getMessage());
      }
      return trainers;
  }

  // added user field by me on 28/07/2022   below code comment out by me
   @AuraEnabled(cacheable=true)
   public static List<Course_Attendee__c> fetchRsvpList(String courseId){
       List<Course_Attendee__c> attendees = new List<Course_Attendee__c>();
       attendees = [SELECT Id, Course__c 
                       FROM  Course_Attendee__c 
                       WHERE Course__c =: courseId 
                       AND   Attendee__r.User__c =: UserInfo.getUserId()
                       WITH SECURITY_ENFORCED
                   ];
      return attendees;
   }
}
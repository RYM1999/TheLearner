public with sharing class CourseDetailsController {
    @AuraEnabled
    public static List<Course_Trainer__c> getTrainers(String courseId) {
      List<Course_Trainer__c> trainerList = [
        SELECT
          Id,
          Name,
            Trainer__c,
            Trainer__r.Name,
            Trainer__r.Phone__c,
            Trainer__r.Email__c,
            Trainer__r.Company__c,
            Trainer__r.TrainerImageUrl__c
            
        FROM Course_Trainer__c
        WHERE Course__c = :courseId
        WITH SECURITY_ENFORCED
      ];
      return trainerList;
    }
@AuraEnabled
public static Course__c getLocationDetails(String courseId){
    Course__c courseRecord = [
    Select 
      Id,
      Name,
      Location__c,
      Location__r.Name,
      Location__r.City__c,
      Location__r.Country__c,
      Location__r.State__c,
      Location__r.Postal_Code__c,
      Location__r.Land_mark__c,
      Location__r.Street__c
    From Course__c
    Where Id =: courseId
    WITH SECURITY_ENFORCED];
    return courseRecord;
}
  
    @AuraEnabled
    public static List<Course_Attendee__c> getAttendees(String courseId) {
      List<Course_Attendee__c> CourseAttendeeList = [
        SELECT
          Id,
          Name,
          Attendee__c,
          Attendee__r.Name,
          Attendee__r.Email__c,
          Attendee__r.Company_Name__c,
          Attendee__r.Address__c,
          Attendee__r.Address__r.Name
        FROM Course_Attendee__c
        WHERE Course__c = :courseId
        WITH SECURITY_ENFORCED
      ];
      return courseAttendeeList;
    }
}

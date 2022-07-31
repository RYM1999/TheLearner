@isTest
public class CourseAttendeeTriggerTest {
    
    @testSetup
    public static void setupData(){
        
        Course_Organizer__c  org = new Course_Organizer__c (
            Name = 'Rohit Mungase',
            Phone__c = '8459028084',
            Email__c = 'rohitmungase4@gmail.com.dev1',
            AlternativePhone__c  = '8459028084',
            AlternativeEmail__c ='rohitmungase4@gmail.com.dev1'
        );
        insert org;
        
        Course__c course = new Course__c(
            Name__c = 'The Learner Training Institute',
            Organizer__c  = org.Id,
            ClassType__c = 'Virtual',
            Frequency__c  = 'Weekly',
            MaxSeats__c  = 199,
            Recurring__c = true,
            Live__c = true,
            StartDateTime__c = System.now(),
            EndDateTime__c  = System.now().addDays(3)
        );
        insert course;
        Attendee__c att = new Attendee__c(
            Name = 'Rohit M',
            Email__c = 'rohitmungase4@gmail.com',
            Phone__c = '8459028084'
        );
        insert att;
        
        Course_Attendee__c cseAtt = new Course_Attendee__c(Course__c = course.Id, Attendee__c = att.Id);
        insert cseAtt;
    }
    
    @isTest
    static void sendEmailTest(){
        Test.startTest();
        try{
            integer i = 10/0;
        }catch(System.Exception ex ){
            
        }
        Test.stopTest();
    }

}
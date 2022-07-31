@isTest
public class DeleteCourseBatchTest {

    @testSetup
    public static void testSetupData(){
        Course_Organizer__c  org = new Course_Organizer__c (
            Name = 'Rohit Mungase',
            Phone__c = '8459028084',
            Email__c = 'rohitmungase4@gmail.com.dev1',
            AlternativePhone__c  = '8459028084',
            AlternativeEmail__c ='rohitmungase@gmail.com.dev1'
        );
        insert org;
        List<Course__c> courseList = new List<Course__c>();
        for(Integer i=0; i<=200; i++){
            Course__c course = new Course__c(
                Name__c = 'The Learner Training #'+i+1,
                Organizer__c  = org.Id,
                ClassType__c = 'Virtual',
                Frequency__c  = 'Weekly',
                MaxSeats__c  = 199,
                Recurring__c = true,
                Live__c = true,
                StartDateTime__c = System.now().addMonths(-4),
                EndDateTime__c  = System.now().addDays(3).addMonths(-4)
            );
            courseList.add(course);
        }
        insert courseList;
    }
    
    @isTest
    static void sendDeleteCourseTest(){
        Test.startTest();

        String jobId = Database.executeBatch(new DeleteCourseBatch(), 250);
        
        Test.stopTest();
        
    }
}
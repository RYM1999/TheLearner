trigger CourseTrainerTrigger on Course_Trainer__c (before insert, before update ) {
    
	// Step 1 - Get the trainer id & course id 
	// Step 2 - SOQL on Course to get the Start Date and Put them into a Map
	// Step 3 - SOQL on Course - Trainer to get the Related Trainer along with the Course Start Date
	// Step 4 - Check the Conditions and throw the Error
	
    //Step 1 -  Start
	Set<Id> trainerIdsSet = new Set<Id>();
    Set<Id> courseIdsSet = new Set<Id>();
    
    for( Course_Trainer__c es : Trigger.New ){
         trainerIdsSet.add(es.trainer__c);
         courseIdsSet.add(es.Course__c);
    }
    //Step 1 -  End 
    /*
     * 10 Course Records
     * 1 (CourseId) K  --  DateTime ( Course Start_DateTime__c ) V
     */ 
    // Step 2 Start
    Map<Id, DateTime> requestedcourses = new Map<Id, DateTime>();
    
    List<Course__c> relatedCourseList = [Select Id, StartDateTime__c From Course__c 
                                       Where Id IN : courseIdsSet];
    
    for(Course__c cse : relatedCourseList ){
        requestedCourses.put(cse.Id, cse.StartDateTime__c);
    }
    // Step 2 End
    
    
    // Step 3 - Start
    List<Course_Trainer__c> relatedCourseTrainerList = [ SELECT Id, Course__c, Trainer__c,
                                               Course__r.StartDateTime__c
                                               From Course_Trainer__c
                                               WHERE Trainer__c IN : trainerIdsSet];
     
    // Step 3 - End 
    
    // Step 4 - Start
    for( Course_Trainer__c es : Trigger.New ){ // - Salesforce Geek
        
        DateTime bookingTime = requestedCourses.get(es.Course__c); 
        // DateTime for that course which is associated with this new Course-Trainer Record
        
        for(Course_Trainer__c es1 : relatedCourseTrainerList) {
            // Rohit == Salesforce => false
            // Rohit == Salesforce  => false
            // Salesforce Geek == Salesforce  => true
            if(es1.Trainer__c == es.Trainer__c && es1.Course__r.StartDateTime__c == bookingTime ){
                es.Trainer__c.addError('The trainer is already booked at that time');
                es.addError('The trainer is already booked at that time');
            }
        }
        
    }
    // Step 4 - End
    
}
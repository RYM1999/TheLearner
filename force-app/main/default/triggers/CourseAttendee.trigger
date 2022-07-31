trigger CourseAttendee on Course_Attendee__c (after insert) {
    
    if(Trigger.isAfter && Trigger.isInsert){
        CourseAttendeeTriggerHandler.sendConfirmationEmail(Trigger.New);
    }

}
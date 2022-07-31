public class DeleteCourseBatch implements Database.Batchable<sObject> {
	
    public Database.QueryLocator start(Database.BatchableContext batchContext){
        String Query = 'Select Id, Name From Course__c Where Live__c = true AND EndDateTime__c < LAST_N_MONTHS:2';
        return Database.getQueryLocator(Query);
    }
    
    /*
     * 201
     * 
     * Exe - 200
     * Exe - 1
     */ 
    public void execute(Database.BatchableContext batchContext, List<Course__c> courseList ){
        if(!courseList.isEmpty()){
            List<Database.DeleteResult> deleteResult = Database.delete(courseList);
            for(Database.DeleteResult dr : deleteResult){
                if(!dr.isSuccess()){
                    List<Database.Error> errors = dr.getErrors();
                    String errorInString = String.join(errors, ',');
                    TransactionLogHandler.doHandleExceptionWithError(errorInString, 'DeleteCourseBatch');
                }
            }
        }
    }
    
    public void finish(Database.BatchableContext batchContext){
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        
        mail.setSubject('Batch Processing Completed');
        List<String> toAddress = new List<String>();
        toAddress.add('rohitmungase4@gmail.com');
        mail.setToAddresses( toAddress );
        mail.setSenderDisplayName('TheLearner');
        
        mail.setHtmlBody('The DeleteCourseBatch Batch Prcoessing has been Completed');
        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage> {mail};
        Messaging.sendEmail(emails);
    }
}
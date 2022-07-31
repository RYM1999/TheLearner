public with sharing class UserUtility {
    
    @AuraEnabled(cacheable=true)
    public static string fetchUserName(){
        return UserInfo.getName();   
    }
}
({createItem: function(component, item) {
        var theItem = component.get("v.items");
 
        // Copy the expense to a new object
        // THIS IS A DISGUSTING, TEMPORARY HACK
        var newItem = JSON.parse(JSON.stringify(item));
 
        console.log("Item before 'create': " + JSON.stringify(theItem));
        theItem.push(newItem);
        component.set("v.items", theItem);
        console.log("Item after 'create': " + JSON.stringify(theItem));
        component.set("v.newItem",{ 'sobjectType': 'Camping_Item__c',
                    'Name': '',
                    'Quantity__c': 0,
                    'Price__c': 0,
                    'Packed__c': false });
        }
 })
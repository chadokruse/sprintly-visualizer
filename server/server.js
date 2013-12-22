Meteor.startup( function () {
   
} );

Meteor.publish( "allItems", function () {
   return Items.find( {} );
} );


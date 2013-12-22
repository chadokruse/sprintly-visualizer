var dragged = "";

Template.content.created = function () {
   Meteor.subscribe( "allItems", function () {
      var items = Items.find( {} );
      Session.set( "items", items.fetch() );

      handle = items.observe( {
         changed: function ( newDocument, oldDocument ) {
            if ( newDocument._id !== dragged ) {
               var li = $( "#" + newDocument._id );
               li.css( "left", newDocument.left );
               li.css( "top", newDocument.top );
               if ( newDocument.isDragged ) {
                  li.addClass( "isDragged" );
                  li.draggable( "disable" );
               } else {
                  li.removeClass( "isDragged" );
                  li.draggable( "enable" );
               }
            }
         }
      } );
   } );

}

Template.content.images = function () {
   return Session.get( "items" );
}

Template.content.isNotDragged = function ( id ) {
   return id !== dragged;
//   return id !== Session.get("dragging") ;
}

Template.content.rendered = function () {
   var lastUpdate = 0;
   $( ".draggable" ).draggable( {
      containment: "#grube",
      appendTo: "#grube",
//      helper: "clone",

      drag: function ( event, ui ) {
/*
         if( ui.position.left < 0 ) ui.position.left = 0;
         if( ui.position.top < 0 ) ui.position.top = 0;

*/
         if ( new Date() - lastUpdate > 100 ) {
            Items.update( {_id: event.target.id}, {$set: {left: ui.position.left, top: ui.position.top}} );
            lastUpdate = new Date();
         }
      },
      start: function ( event, ui ) {
         dragged = event.target.id;
         Items.update( {_id: event.target.id}, {$set: {isDragged: true}} );
      },
      stop: function ( event, ui ) {
         dragged = "";
         Items.update( {_id: event.target.id}, {$set: {isDragged: false}} );
      }
   } );
}
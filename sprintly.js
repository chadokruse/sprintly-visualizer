if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to sprintly.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.hello.sprintlyResponse = function() {
    return Session.get("sprintlyResponse") || [];
  }

  Template.fetch.events({
    'click .sprintly_fetch_submit': function(){
      console.log("Sprintly fetch button was clicked");
    //Sprintly API GET 
      
      var sprintlyWho = $('#draft_description').val();
      var sprintlyWhat = name.replace(/-/g, ' ');
      var sprintlyWhy = $('#draft_github_url').val(); 

      var params = { 
          "type": "story",
          "status": "someday, backlog"
        };

      Meteor.call('pullFromSprintly', params, function (err, respJson) {
        console.log(params);
        if(err) {
          window.alert("Error: " + err.reason);
          console.log("error occured on receiving data on server. ", err);
          //Session.set("showBadEmail", true); // From sample project - not used yet
        } else {
          console.log("respJson: ", respJson);
          Session.set("sprintlyResponse", respJson)
        }
        
      });
    }
  });

  
} //End isClient

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({

  pullFromSprintly: function (params) {
    console.log("API Call Method was made");
    var email = Meteor.settings.sprintlyEmail;
    var apiKey = Meteor.settings.sprintlyApiKey;
    var product = Meteor.settings.sprintlyProductId;
    var url = "https://sprint.ly/api/products/" + product + "/items.json";
    //synchronous POST
    console.log(url);
    var result = Meteor.http.get(url,
                                  {auth: email +":"+ apiKey, 
                                  params: params,
                                  timeout: 30000
                                });
    console.log("result");
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      var Items = JSON.parse(result.content);
      console.log("response received.");
      console.log(respJson)
      return respJson;
    } else {
      // TODO: Add better error handling
      //if(result.statusCode==502) {
      //  some stuff;
      //} else {
      //  some stuff;
      //}
      console.log("Response issue: ", result.statusCode);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  }
  });

  if ( Items.find().count() == 0 ) {
      Items.insert( {_id: "image1", top: 0, left: 0} );
      Items.insert( {_id: "image2", top: 0, left: 0} );
      Items.insert( {_id: "image3", top: 0, left: 0} );
      Items.insert( {_id: "image4", top: 0, left: 0} );
      Items.insert( {_id: "image5", top: 0, left: 0} );
   } else {
      Items.find().forEach(function ( item ) {
         if(item.left < 0 | item.top < 0 )
            Items.update({_id: item._id}, {$set: {left:0, top:0}});
      });
   }

}

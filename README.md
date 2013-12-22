## Sprintly visualizer    

This was a one-night weekend project to:

1.  Learn more about http calls to a 3rd party API using Meteor

2.  Visualize all my Someday cards tucked away in a [Sprintly](https://sprint.ly) project I'm working on (my startup, [Kyn](http://kyn.me)). Love me some Sprintly, but don't love how they don't take advantage of the full screen width on certain views, particularly the triage view in the Organizer.

This project wouldn't have been possible without the following reference apps/gists:

1.  [This gist](https://gist.github.com/nachiket-p/2922814) from [nachiket-p](https://github.com/nachiket-p) demonstrating a basic API call via Meteor.

2. [Meteor-synched-drag](https://github.com/drgorb/meteor-synched-drag) from [drgorb](https://github.com/drgorb) for the freeform canvas functionality.

You guys are awesome…thanks!


### Demo
[Live demo](https://sprintly-visualizer.meteor.com)

### Screenshot

![Landing Page](https://github.com/chadokruse/sprintly-visualizer/raw/master/screenshot.png)


### Wishlist:

1.  Add a way to visually connect certain stories (e.g. [jsPlumb](http://jsplumbtoolkit.com/demo/draggableConnectors/jquery.html))
2.  The db isn't hooked up, so as soon as you do a browser refresh your work is destroyed.
3.  The API call is one-way (GET). Would be great to reorder/prioritize and send back to Sprintly. An alternative is to add tags in lieu of ordering and/or move certain stories to backlog.  



## Getting started

*Note: I'm a beginner, and these instructions are intended to help other beginners get up and rolling quickly.*

You need to have Node.js and Meteor installed.

### Node  

I use Homebrew and found [this tutorial](http://madebyhoundstooth.com/blog/install-node-with-homebrew-on-os-x/) helpful.  

### Meteor

Install Meteor:

`curl https://install.meteor.com | sh`

Install Meteorite:

`npm install -g meteorite` 

Add jQuery UI package:

`mrt add jquery-ui`  

cd into the app

`cd what/ever/your/path/is/sprintly-visualizer`

Start Meteor

`meteor`

Open the app in your browser

`http://localhost:3000/`

### Usage
1.  **Insert your Sprintly credentials**  
These are located in `settings.json.example`. Be sure to save the new file as `settings.json` (e.g. remove the "example" extension).  
Note: Here's [how to find your API Key](https://sprintly.uservoice.com/knowledgebase/articles/85725-where-do-i-find-my-api-key-).  

2.  **Load your settings.json file**   
`meteor --settings settings.json`  
Notes: (a) Be sure meteor is not already running. (b) If you're going to deploy this to meteor's free hosting (i.e. yourappname.meteor.com), don't forget to load your settings.json file upon deploy as well:
`meteor deploy yourappname --password --settings settings.json`

And please, make sure you password-protect your site if deploying to meteors servers (that's the `--password` command while hitting `meteor deploy`). Otherwise, your Sprintly API key credentials could be exposed.

##Misc Notes

1. Error handling from Sprintly responses are NOT hooked up yet, so open up console if your app is throwing errors.
2. Half of the app is for the drag and drop functionality. If you just want to see how the API call is set up without all the additional clutter, revert back to [this commit]().

## Disclaimer  

This code is provided "as is" with no warranties. It'll probably break and may expose your api keys and all of your inner-most secrets. Proceed with caution.

### License

Do with it as you wish, commercial or otherwise. If you like formal licenses: Copyright (c) 2013 Chad Kruse, released under the MIT license.  



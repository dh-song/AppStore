if (Apps.find({}).count() < 1){
    var fs = Npm.require('fs');
    fs.readFile('../../../../../server/data.json','utf8',Meteor.bindEnvironment(function(err, data){
        if(err) throw err;
        var newAppData = data.split("\n");

        for(var i = 0; i < newAppData.length - 1; i++) {
            var rawAppData = JSON.parse(newAppData[i]);
            var newApp = {};

            newApp.name = rawAppData.title;
            newApp.app_id = rawAppData.app_id;
            newApp.developer = rawAppData.developer;
            newApp.description = rawAppData.intro;
            newApp.avgRating = parseInt(rawAppData.score) / 2;
            newApp.iconUrl = rawAppData.thumbnail_url;
            newApp.recommendedApps = rawAppData.top_5_app;
            Apps.insert(newApp);
        }
    }, function(err){
        throw err;
    }));
}

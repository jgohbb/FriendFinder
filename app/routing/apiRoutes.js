var friends = require("../data/friends");


module.exports = function(app) {
// get request for API friends
app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
 
  app.post("/api/friends", function(req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    var newFriend = req.body;
    var userScores = newFriend.scores;

    var totalDifference;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // Get the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(
          parseInt(currentUserScore) - parseInt(currentFriendScore)
        );
      }

       if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    friends.push(newFriend);

    res.json(bestMatch);
  });
};
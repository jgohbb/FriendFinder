var friendsData = require('../data/friends.js');

function apiRoutes(app) {
    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });

    app.post('/api/friends', function (req, res) {
        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: []
        };
        var scoresArray = [];
        for (var i = 0; i < req.body.scores.length; i++) {
            scoresArray.push(parseInt(req.body.scores[i]))
        }
        newFriend.scores = scoresArray;

        var scoreComparisionArray = [];
        for (var i = 0; i < friendsData.length; i++) {

            var currentComparison = 0;
            for (var j = 0; j < newFriend.scores.length; j++) {
                currentComparison += Math.abs(newFriend.scores[j] - friendsData[i].scores[j]);
            }
            scoreComparisionArray.push(currentComparison);
        }

        var bestMatchPosition = 0;
        for (var i = 1; i < scoreComparisionArray.length; i++) {
            if (scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]) {
                bestMatchPosition = i;
            }

        }
        var bestFriendMatch = friendsData[bestMatchPosition];

        res.json(bestFriendMatch);

        friendsData.push(newFriend);

    });

}

module.exports = apiRoutes;

























// module.exports = function(app) {

//   app.get("/api/friends", function(req, res) {
//     res.json(friends);
//   });

//   app.post("/api/friends", function(req, res) {
//     console.log(req.body.scores);

//     var user = req.body;

//     for(var i = 0; i < user.scores.length; i++) {
//       user.scores[i] = parseInt(user.scores[i]);
//     }

//     var bestFriendIndex = 0;
//     var minimumDifference = 40;

//       for(var i = 0; i < friends.length; i++) {
//       var totalDifference = 0;
//       for(var j = 0; j < friends[i].scores.length; j++) {
//         var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
//         totalDifference += difference;
//       }

//       if(totalDifference < minimumDifference) {
//         bestFriendIndex = i;
//         minimumDifference = totalDifference;
//       }
//     }

//     friends.push(user);

//     res.json(friends[bestFriendIndex]);
//   });
// };
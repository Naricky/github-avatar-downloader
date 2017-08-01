var request = require('request');
var fs = require('fs');

var GITHUB_USER = "Naricky"
var GITHUB_TOKEN = "95b9e7ce4d748fb1f9efff54cf91fe7164e9f891"


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  request.get({
            url: requestURL,
            headers: {
              'User-Agent': 'request'
            }
          })
          .on('error', function (err) {
           // throw err
           console.log("Errors:", err);

          })
         .on('response', function (response) {
            console.log(response.statusCode);
           // console.log("Result:", result)
            var body = '';
            response.on('data', function (chunk) {
              body += chunk;
            });
            response.on('end', function () {
              var result = JSON.parse(body);
              console.log('BODY: ', result);
              cb(null, result)
            });

          })


}

getRepoContributors("jquery", "jquery", function(err, result) {
  finalresult = [];
  for (i = 0 ; i < result.length ; i++) {
    finalresult.push(result[i].avatar_url);
  }
  console.log(finalresult)
});


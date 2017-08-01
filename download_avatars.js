var a = process.argv.slice(2);

var request = require('request');
var fs = require('fs');

var GITHUB_USER = "Naricky"
var GITHUB_TOKEN = "70617a6478537100de86ccf1e8822460df199b43"


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
            // console.log("Result:", response);
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

getRepoContributors(a[0], a[1], function(err, result) {

 for (var i = 0; i < result.length; i++) {
   downloadImageByURL(result[i].avatar_url, "avatars/"+result[i].login);

 }
});

function downloadImageByURL(url, filepath){
 request.get(url)
   .on('error', function (err) {
     throw err;
   })
   .on('response', function (response) {
     console.log('Response Status Code: ', response.statusCode, response.statusMessage, response.headers['content-type']);
   })
   .pipe(fs.createWriteStream(filepath));
}

var para = process.argv.slice(2);
var request = require('request');
var fs = require('fs');

var GITHUB_USER = "Naricky"
var GITHUB_TOKEN = "a4a1416bd48509e756e76ebfea4a9a968b46bb1f"

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  request.get({
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
    })
  .on('error', function (err) {

    console.log("Errors:", err);

  })
  .on('response', function (response) {
    console.log(response.statusCode);

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

  if (!para[0] || !para[1] ){
   console.log ("ERROR - NO INPUT")
}
  else {
    for (var i = 0; i < result.length; i++) {
      downloadImageByURL(result[i].avatar_url, "avatars/"+result[i].login);
 }
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



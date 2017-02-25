// Description
//   Assigns and notifies reviewers for GitHub pull requests
//
// Configuration:
//   GITHUB_TOKEN
//   GITHUB_ICON_URL - optional fallback icon URL
//
// Commands:
//   <GitHub URL> - unfurl GitHub URLs on platforms like Slack
//   review <GitHub PR URL> - assign and notify reviewers for GitHub PR
//
// Notes:
//
// Author:
//   Ivan Malopinsky

//todo: mock github api
//todo: AUTHORS/OWNERS integration
//todo: review stategy: blame/random
//todo: PR size tags
//todo: consider scraper fallback for blame
//todo: travis CI tests
//todo: eslint
//todo: consider pull request review integration

var HubotReview = require('./src/hubot-review');

module.exports = function (robot) {
  robot.hear(/github\.com\//, function (res) {
    var adapter = robot.adapterName;
    var message = res.message;
    var text = message.text;

    var hubotReview = HubotReview({
      'text': text,
      'adapter': adapter
    });

    hubotReview.then(function (response) {
      if (!response) {
        return;
      }

      res.send(response);
    })
      .catch(function (err) {
        robot.logger.error(err);
      });
  });
};
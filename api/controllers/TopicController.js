/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  doCreate: function (req, res) {
    Topic.create({topic: req.param('topic'), score: 0}).exec(function (err, data) {
      if (err) {
        return res.serverError(err);
      }
      return res.redirect('/topic');
    });
  },
  showTopics: function (req, res) {
    Topic.find().exec(function (err, dataSet) {
      if (err) {
        return res.serverError(err);
      }
      return res.view('addTopics', {data: dataSet});
    });
  },
  getTopicScores: function (req, res) {
    for (var key in req.body) {
      Topic.findOne({id: key}).exec(function (er, dat) {
        if (er) {
          return res.serverError(er);
        }
        Topic.update({id: key}, {score: dat.score + 1}).exec(function (err, data) {
          if (err) {
            return res.serverError(err);
          }
        });
      });
    }
    return res.view('thankyou');
  }
};


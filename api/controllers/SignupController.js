/**
 * SignupController
 *
 * @description :: Server-side logic for managing signups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  signup: function (req, res) {
    Signup.create({oracleId: req.param('oracleId')}).exec(function (err, data) {
      if (err) {
        return res.serverError(err, "error");
      }
      Topic.find().exec(function (er, data) {
        if (er) {
          return res.serverError(er);
        }
        return res.view('getTopics', {data: data});
      });
    });
  }
};


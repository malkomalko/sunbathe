/**
 * Module dependencies.
 */

var _ = require('underscore')._;

/**
 * Helpers.
 */

var helpers = module.exports = {};

helpers.objects = {
  nil: function(attr) {
    return _.isUndefined(attr) || _.isEmpty(attr);
  }
};

helpers.strings = {
  splitFirst: function(string, splitAt) {
    if (helpers.objects.nil(string)) return '';
    var re = new RegExp(splitAt + "(.+)");
    var splitString = string.split(re);

    return _.isUndefined(splitString[1])
      ? string
      : splitString[1].trim();
  }
};

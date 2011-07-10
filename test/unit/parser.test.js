/**
 * Module dependencies.
 */

var testHelper = require('test_helper');
var describe = testHelper.describe(exports);
var nodes = require('nodes');

/**
  * test - unit - parser.
  */

var createParser = function() {
  var parser = require('parser').parser;
  parser.yy = nodes;
  parser.yy.file = new nodes.File();
  return parser;
};

describe('When parsing input', function(it) {
  it('finds a name token', function(test) {
    var parser = createParser();
    var parsedFile = parser.parse("name: index");

    parsedFile.templates.should.eql([{ name: 'index' }]);
    test.finish();
  });
});

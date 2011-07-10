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
  it('finds a simple layout token', function(test) {
    var parser = createParser();
    var parsedFile = parser.parse("layout: index");

    parsedFile.layouts.should.eql([{ name: 'index' }]);

    test.finish();
  });

  it('finds a more complex layout token', function(test) {
    var parser = createParser();
    var parsedFile = parser.parse("layout: another crazy layout");

    parsedFile.layouts.should.eql([{ name: 'another crazy layout' }]);

    test.finish();
  });

  it('should not read in two layout tokens on the same line', function(test) {
    var parser = createParser();
    var parsedFile = parser.parse("layout: what the layout:");

    parsedFile.layouts.should.eql([{ name: 'what the layout:' }]);

    test.finish();
  });

  it('finds multiple layouts', function(test) {
    var parser = createParser();
    var parsedFile = parser.parse("layout: one\nlayout: two");

    parsedFile.ast.should.eql([
      [ 'LAYOUT', 1, 'layout: one' ],
      [ 'NEWLINE', 1, '\n' ],
      [ 'LAYOUT', 2, 'layout: two' ]
    ]);
    parsedFile.layouts.should.have.length(2);
    parsedFile.layouts.should.eql([{ name: 'one' }, { name: 'two' }]);

    test.finish();
  });
});

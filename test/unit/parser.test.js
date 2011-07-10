/**
 * Module dependencies.
 */

var testHelper = require('test_helper');
var describe = testHelper.describe(exports);

/**
  * test - unit - parser.
  */

describe('When parsing input', function(it) {
  it('finds a name token', function(test) {
    parser.parse("name: index").should.eql([{ name: 'index' }]);
  });
});

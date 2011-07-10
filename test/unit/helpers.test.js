/**
 * Module dependencies.
 */

var testHelper = require('test_helper');
var describe = testHelper.describe(exports);
var helpers = require('helpers');

/**
  * test - unit - helpers.
  */

describe('When dealing with objects', function(it) {
  it('returns whether it is nil', function(test) {
    helpers.objects.nil('').should.be.true;
    helpers.objects.nil({}).should.be.true;
    helpers.objects.nil([]).should.be.true;
    helpers.objects.nil(null).should.be.true;
    helpers.objects.nil(undefined).should.be.true;

    test.finish();
  });
});

describe('When splitting strings', function(it) {
  it('only splits at first match', function(test) {
    helpers.strings.splitFirst(
      'layout: this is only a layout:',
      'layout:')
    .should.eql('this is only a layout:');

    helpers.strings.splitFirst(
      'layout: this only has one',
      'layout:')
    .should.eql('this only has one');

    test.finish();
  });

  it('returns back with an empty string for bad strings', function(test) {
    helpers.strings.splitFirst(
      undefined,
      'something to split on')
    .should.eql('');

    helpers.strings.splitFirst(
      null,
      'something else to split on')
    .should.eql('');

    test.finish();
  });

  it('returns back with original string if split not found', function(test) {
    helpers.strings.splitFirst(
      'a string with some information',
      'not found')
    .should.eql('a string with some information');

    test.finish();
  });
});

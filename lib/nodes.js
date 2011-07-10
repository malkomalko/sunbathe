/**
 * Module dependencies.
 */

var events = require("events");
var util = require("util");
var _ = require('underscore')._;

/**
 * Nodes.
 */

var File = exports.File = function() {
  var self = this;

  this.ast = [];
  this._vars = {};
  this.state = 'INITIAL';
  this.prevState;

  events.EventEmitter.call(this);
  this.on('stateChange', function(state) {
    self.prevState = self.state;
    self.state = state;
  });

  this.templates = [];
};

util.inherits(File, events.EventEmitter);

File.prototype.popState = function() {
  this.state = this.prevState;
};

var EOF = exports.EOF = function(file) { delete file._vars; return file; };

var genNode = function(name, callback) {
  exports[name] = function(file, token) {
    if (callback) callback(file, token);
    file.ast.push(token);
    file.prevToken = token;
  };
};

genNode('Template', function(file, token) {
  file.emit('stateChange', 'TEMPLATE');

  var templateName = token[2].split('name:')[1].trim();
  file.templates.push({ name: templateName });
});

genNode('Line');
genNode('Newline');

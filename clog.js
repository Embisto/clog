'use strict';

var Clog = function(prefix) {
  this.prefix = prefix;
  this.extension = '';
  this.startTime = 0;
  this.showLines = true;
  var colors = [
    '#FC8744',
    '#6774F8',
    '#32956C',
    '#F41D8E',
    '#95759C',
    '#6A6013',
    '#18B3DE',
    '#DE4AE9',
    '#9E423C',
    '#8E235F',
    '#D71C39',
    '#26731D',
    '#CB9413',
    '#2D6DA0',
    '#FB6C8D',
    '#814EB4',
    '#D74101',
    '#A20F88',
    '#A28FDC',
    '#208E9A',
    '#AEA23D',
    '#4469C1',
    '#724271',
    '#DA95BE',
    '#C06D06',
    '#A043D4',
    '#60A8E6',
    '#3E4E8A',
    '#EA7A7B',
    '#918FFD',
    '#993E1E',
    '#9E860E',
    '#ED3DD3',
    '#2686C6',
    '#C71E91',
    '#52521A',
    '#949141',
    '#F34A2A',
    '#9B99F8',
    '#E02CCE'
  ];

  if (typeof Clog.colorIndex === 'undefined') {
    Clog.colorIndex = 0;
  }

  this.color = colors[Clog.colorIndex];

  if (Clog.colorIndex !== colors.length - 1) {
    ++Clog.colorIndex;
  } else {
    Clog.colorIndex = 0;
  }

  Clog.getCallerLine = function(obj) {
    function getErrorObject() {
        try {
          throw Error('');
        } catch (err) {
          return err;
        }
      }
      if (obj.showLines === true) {
        return ':' + getErrorObject().stack.split('\n')[5].split(':').reverse()[1];
    } else {
      return '';
    }
  };
};

Clog.prototype.log = function() {

  if (this.startTime === 0) {
    this.startTime = Date.now();
  }

  var argsArray = [
          '%c[' + this.prefix + this.extension + Clog.getCallerLine(this) + ']',
          'font-weight: bold; text-transform: uppercase; color: ' + this.color
        ];
  Array.prototype.push.apply(argsArray, arguments);
  argsArray.push('[+' + (Date.now() - this.startTime) + 'ms]');

  console.log.apply(console, argsArray);
  this.startTime = Date.now();
  this.extension = '';
};

Clog.prototype.extend = function(extension) {

  this.extension = ':' + extension;
  return this;
};

Clog.prototype.setColor = function(color) {

  this.color = color;
  return this;
};

Clog.prototype.toggleLines = function() {
  this.showLines = !this.showLines;
};

Clog.prototype.err = function() {

  if (this.startTime === 0) {
    this.startTime = Date.now();
  }

  var argsArray = [
          '%c[' + this.prefix + this.extension + Clog.getCallerLine(this) + '] %cERROR',
          'font-weight: bold; text-transform: uppercase; color: ' + this.color,
          'font-weight: bold; text-transform: uppercase; color: red'
        ];
  Array.prototype.push.apply(argsArray, arguments);
  argsArray.push('[+' + (Date.now() - this.startTime) + 'ms]');

  console.log.apply(console, argsArray);
  this.startTime = Date.now();
  this.extension = '';
};

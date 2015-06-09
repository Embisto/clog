var c = new Clog('Clog-Demo');
var d = new Clog('Clog-Demo-2');

c.log('This is a logged line');

setTimeout(function() {
	c.setColor('green').log('This is another logged line');
}, 10);

c.extend('Somewhere else').log('And another');

d.toggleLines();
d.log('This line has no linenumbers');
var Class = require('class');

var Event = Class.extend({
	add: function(callback, context) {
		if (this.handlers === undefined) {
			this.handlers = [];
		}
		this.handlers.push({
			callback: callback,
			context: context
		});
	},

	remove: function(callback, context) {
		if (this.handlers === undefined) {
			return;
		}
		for (var i = this.handlers.length - 1; i >= 0; i--) {
			if (this.handlers[i].callback === callback && 
				this.handlers[i].context === context) {
				this.handlers.splice(i, 1);
			}
		}
	},

	trigger: function() {
		if (this.handlers === undefined) {
			return;
		}
		var handlers = this.handlers.slice();
		for (var i = 0; i < handlers.length; i++) {
			handlers[i].callback.apply(handlers[i].context, arguments);
		}
	}
});

module.exports = Event;
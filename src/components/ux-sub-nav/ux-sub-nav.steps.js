/*global browser*/
module.exports = function () {

	var _ = require('lodash-compat');

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '.ux-sub-nav ';
		this.component.items     = this.component.container + 'dd';
		this.component.active    = this.component.container + 'dd.active';

		callback();
	});

	this.Then(/^I should see (\d+) options$/, function (numElements, callback) {
		var selector = this.component.items;

		browser.waitForExist(selector, 1000).then(function () {
			return browser.elements(selector);
		}.bind(this)).then(function (elements) {
			try {
				this.assert.equal(elements.value.length, numElements);
				callback();
			} catch (e) {
				callback(e);
			}
		}.bind(this)).catch(callback);

	});

	this.Then(/^the active item should contain the text "([^"]*)"$/, function (text, callback) {
		var selector = this.component.active;
		browser.waitForExist(selector, this.defaultTimeout).then(function () {
			return browser.getText(selector);
		}.bind(this))
		.then(function (elemText) {
			try {
				// If elem has nested tags, it will return array.
				if (_.isArray(elemText)) {
					this.assert.notEqual(_.indexOf(elemText, text), -1);
				} else {
					this.assert.equal(text, elemText);
				}
				callback();
			} catch (e) {
				callback(e);
			}
		}.bind(this)).catch(callback);
	});
};

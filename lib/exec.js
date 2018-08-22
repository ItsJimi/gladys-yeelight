var Promise = require('bluebird');
var YeelightSearch = require('yeelight-wifi');
var shared = require('./shared.js');

module.exports = function exec(params) {
	var value = params.state.value;
	var yeelight = shared.instances[params.deviceType.identifier];
	var model = yeelight.getModel();

	return yeelight.getValues('power', 'bright', 'hue', 'sat')
		.then(function() {
			switch (params.deviceType.type) {
			case 'binary':
				if (value == 1) {
					return yeelight.turnOn()
						.then(() => {
							return Promise.resolve();
						})
						.catch((err) => {
							return Promise.reject();
						});
				} else {
					return yeelight.turnOff()
						.then(() => {
							return Promise.resolve();
						})
						.catch((err) => {
							return Promise.reject();
						});
				}

			case 'brightness':
				return yeelight.setBrightness(value)
					.then(() => {
						return Promise.resolve();
					})
					.catch((err) => {
						return Promise.reject();
					});

			case 'hue':
				return yeelight.setHSV(value, '')
					.then(() => {
						return Promise.resolve();
					})
					.catch((err) => {
						return Promise.reject();
					});

			case 'saturation':
				return yeelight.setHSV('', value)
					.then(() => {
						return Promise.resolve();
					})
					.catch((err) => {
						return Promise.reject();
					});
			}
		})
		.catch((err) => {
			return Promise.reject();
		});
};
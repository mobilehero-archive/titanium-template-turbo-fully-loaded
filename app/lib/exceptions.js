/* eslint-disable no-empty */

Ti.App.addEventListener('uncaughtException', error => {
	console.error(`🛑 Unhandled Exception -- error:`);
	console.error(error);
	try {
		logger.error('uncaughtException', error);
	} catch (ex) {}
});

// NOTE: event name is camelCase as per node convention
process.on('unhandledRejection', (error, promise) => {
	// See Promise.onPossiblyUnhandledRejection for parameter documentation
	console.error(`📌  you are here → process.on('unhandledRejection')`);
	console.error(`🛑  error: ${JSON.stringify(error, null, 2)}`);
	console.error(`🛑  promise: ${JSON.stringify(promise, null, 2)}`);
	console.error(error);
	try {
		logger.error('unhandledRejection', error);
	} catch (ex) {}

});

// NOTE: event name is camelCase as per node convention
process.on('rejectionHandled', promise => {
	// See Promise.onUnhandledRejectionHandled for parameter documentation

	console.error(`📌  you are here → process.on('rejectionHandled')`);
	console.error(`🛑  promise: ${JSON.stringify(promise, null, 2)}`);
});

const unhandledPromises = [];
Promise.onPossiblyUnhandledRejection((reason, promise) => {
	console.error(`📌  you are here → Promise.onPossiblyUnhandledRejection`);
	console.error(`🛑  reason: ${JSON.stringify(reason, null, 2)}`);
	console.error(`🛑  promise: ${JSON.stringify(promise, null, 2)}`);
	unhandledPromises.push(promise);
	// Update some debugger UI
});

Promise.onUnhandledRejectionHandled(promise => {
	console.error(`📌  you are here → Promise.onUnhandledRejectionHandled`);
	console.error(`🛑  promise: ${JSON.stringify(promise, null, 2)}`);
	const index = unhandledPromises.indexOf(promise);
	unhandledPromises.splice(index, 1);
	// Update the debugger UI
});

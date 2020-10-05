(async global => {

	// #region ---[ Define Constants ]---

	Alloy.MANUAL_OPEN = true;

	// #endregion ---[ Define Constants ]---

	// #region ---[ Configure Bluebird Promises ]---

	// ---------------------------------------------------------
	//    Configure Bluebird Promises
	// ---------------------------------------------------------
	global.Promise = require('bluebird');

	Promise.config({
		warnings:        false, // Enable warnings
		// longStackTraces: ENV_DEV,  // Enable long stack traces for dev builds
		longStackTraces: true, // Forcing log stack trace for all builds
		cancellation:    true, // Enable cancellation
		monitoring:      true, // Enable monitoring
	});

	// #endregion ---[ Configure Bluebird Promises ]---

	// #region ---[ Configure Exception Handlers ]---

	// ---------------------------------------------------------
	//    Configure Exception Handlers
	// ---------------------------------------------------------
	require('/exceptions');

	// #endregion ---[ Configure Exception Handlers ]---

	// #region ---[ Configure Logging Manager ]---

	// ---------------------------------------------------------
	//    Configure Logging Manager
	// ---------------------------------------------------------

	const Logger = require('@geek/logger');

	const consoleStore = new Logger.stores.Console({
		// default_format: 'timestamp_message_args_color',
		default_format: 'debug_message_color',
		extras:         [ 'track' ],
		level_formats:  {
			event: 'events_color',
			// track: 'timestamp_message_color',
			// track: 'timestamp_message_args_color',
			track: 'debug_message_color',
		},
	});
	const titaniumStore = new Logger.stores.Titanium();
	const defaultLogger = new Logger({
		namespace: 'app:default',
		stores:    [ consoleStore, titaniumStore ],
		level:     'debug',
	});

	Logger.defaultLogger = defaultLogger;

	const logger = Logger.createLogger('app:alloy', { meta: { filename: __filename } });


	// enable all namespaces
	// Logger.filter('**');

	// disable all namespaces
	// Logger.filter([ '!**' ]);

	Logger.filter([
		'**',
		'!@titanium/please',
		'!@geek/cache',
	]);

	// #endregion ---[ Configure Logging Manager ]---

	// #region ---[ Initialize Titanium Essentials ]---

	// ---------------------------------------------------------
	//    Initialize Titanium Essentials
	// ---------------------------------------------------------

	require('@titanium/essentials');

	// #endregion ---[ Initialize Titanium Essentials ]---

	// #region ---[ Configure Event Tracker ]---

	// ---------------------------------------------------------
	//    Configure Event Tracker
	// ---------------------------------------------------------
	turbo.tracker = {
		event: async (name, data = {}) => {
			await logger.event(name, data);
		},
		app_launch:       async () => turbo.tracker.event('app_start'),
		app_first_launch: async () => turbo.tracker.event('app_first_launch'),
		auth_prompt:      async () => turbo.tracker.event('auth_prompt'),
		auth_success:     async () => turbo.tracker.event('auth_success'),
		auth_refresh:     async () => turbo.tracker.event('auth_refresh'),
		auth_signout:     async () => turbo.tracker.event('auth_signout'),
		app_update_check: async () => turbo.tracker.event('app_update_check'),
		open_teams:       async () => turbo.tracker.event('open_teams'),
		app_updated:      async ({ old_app_version, new_app_version } = {}) => turbo.tracker.event('app_updated', { old_app_version, new_app_version }),
		article_open:     async article_id => turbo.tracker.event('article_open', {	article_id }),
		screen_view:      async screen_name => turbo.tracker.event('screen_view', { screen_name }),
	};

	// #endregion ---[ Configure Event Tracker ]---

	Alloy.open('index');

})(this);

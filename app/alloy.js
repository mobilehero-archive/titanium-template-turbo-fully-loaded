(async global => {

	// #region ---[ Define Constants ]---

	Alloy.MANUAL_OPEN = true;
	const IS_DEV = global.IS_DEV = (Ti.App.deployType === `development`);
	const IS_PROD = ! IS_DEV;

	// #endregion ---[ Define Constants ]---

	// #region ---[ Configure Bluebird Promises ]---

	// ---------------------------------------------------------
	//    Configure Bluebird Promises
	// ---------------------------------------------------------
	global.Promise = require(`bluebird`);

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
	require(`/exceptions`);

	// #endregion ---[ Configure Exception Handlers ]---

	// #region ---[ Configure Logging Manager ]---

	// ---------------------------------------------------------
	//    Configure Logging Manager
	// ---------------------------------------------------------

	const Logger = require(`@geek/logger`);

	const consoleStore = new Logger.stores.Console({
		// default_format: 'timestamp_message_args_color',
		default_format: `debug_message_color`,
		extras:         [ `track` ],
		level_formats:  {
			event: `events_color`,
			// track: 'timestamp_message_color',
			// track: 'timestamp_message_args_color',
			track: `debug_message_color`,
			error: `debug_message_args_color`,
		},
	});
	const titaniumStore = new Logger.stores.Titanium();
	const defaultLogger = new Logger({
		namespace: `app:default`,
		stores:    [ consoleStore, titaniumStore ],
		level:     turbo.API_VERBOSE_MODE ? `silly` : `info`,
		meta:      () => {
			return {
				device_model_name:   turbo.device_model_name,
				network_type_name:   turbo.network_type_name,
				device_manufacturer: turbo.device_manufacturer,
			};
		},
	});

	Logger.defaultLogger = defaultLogger;

	const logger = Logger.createLogger(`app:alloy`, { meta: { filename: __filename } });
	logger.track(`logger configured.`);

	// enable all namespaces
	// Logger.filter('**');

	// disable all namespaces
	// Logger.filter([ '!**' ]);

	// enable all namespaces
	const filters = [ `**` ];

	if (IS_PROD) {
		filters.push(`!@titanium/please`);
		filters.push(`!@titanium/notices`);
		filters.push(`!@geek/cache`);
	} else if (!turbo.API_VERBOSE_MODE) {
		filters.push(`!@titanium/please`);
	}

	Logger.filter(filters);

	// #endregion ---[ Configure Logging Manager ]---

	// #region ---[ Initialize Titanium Essentials ]---

	// ---------------------------------------------------------
	//    Initialize Titanium Essentials
	// ---------------------------------------------------------

	require(`@titanium/essentials`);

	// #endregion ---[ Initialize Titanium Essentials ]---

	// #region ---[ Configure Event Tracker ]---

	// ---------------------------------------------------------
	//    Configure Event Tracker
	// ---------------------------------------------------------
	_.assign(turbo.tracker, { test: async () => turbo.tracker.event(`test`) });
	turbo.tracker.app_open();

	// #endregion ---[ Configure Event Tracker ]---

	Alloy.open(`index`);

})(this);

import test from 'ava';

// Regression: `default-browser` preserves whatever casing the vendor chose for its
// bundle/prog ID (macOS Safari is `com.apple.Safari`, and Brave is `com.brave.Browser`
// on both macOS and Windows — see https://github.com/sindresorhus/default-browser).
// The lookup that detects the default browser must lowercase the id before the
// `Object.hasOwn` check, not only when reading the matched value out of `ids`
// afterward, or these real-world ids never match their all-lowercase map key.
test('default browser ids are matched case-insensitively', t => {
	const ids = {
		'com.google.chrome': 'chrome',
		'google-chrome.desktop': 'chrome',
		'com.brave.browser': 'brave',
		'org.mozilla.firefox': 'firefox',
		'firefox.desktop': 'firefox',
		'com.microsoft.msedge': 'edge',
		'com.microsoft.edge': 'edge',
		'com.microsoft.edgemac': 'edge',
		'microsoft-edge.desktop': 'edge',
		'com.apple.safari': 'safari',
	};

	const realWorldIds = {
		'com.apple.Safari': 'safari',
		'com.brave.Browser': 'brave',
		'com.google.chrome': 'chrome',
		'org.mozilla.firefox': 'firefox',
	};

	for (const [id, expected] of Object.entries(realWorldIds)) {
		const lowered = id.toLowerCase();
		t.true(Object.hasOwn(ids, lowered), `hasOwn must match ${id} once lowercased`);
		t.is(ids[lowered], expected);
	}
});

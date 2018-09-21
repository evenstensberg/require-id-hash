"use strict";
const assert = require("assert");
const { exists, readFile } = require("fs");
const { resolve } = require("path");

require("..");

try {
	require("./fixtures/fixture.svg#facebook_icon");
} catch (err) {
	const module_path = resolve(__dirname, "facebook_icon.svg");
	exists(module_path, isMade => {
		assert.strictEqual(isMade, true);
	});
	readFile(module_path, "utf8", (errmsg, content) => {
		assert.strictEqual(content.includes("id=\"facebook_icon\">"), true);
	});
}

try {
	require("./fixtures/fixture.js#a");
} catch (err) {
	const module_path = resolve(__dirname, "a.js");
	exists(module_path, isMade => {
		assert.strictEqual(isMade, true);
	});
	readFile(module_path, "utf8", (errmsg, content) => {
		assert.strictEqual(content(), "works");
	});
}

try {
	require("./fixtures/fixture.js#b");
} catch (err) {
	const module_path = resolve(__dirname, "b.js");
	exists(module_path, isMade => {
		assert.strictEqual(isMade, true);
	});
	readFile(module_path, "utf8", (errmsg, content) => {
		assert.strictEqual(content, {
			ok: ":)"
		});
	});
}

try {
	require("./fixtures/fixture.js#c");
} catch (err) {
	const module_path = resolve(__dirname, "c.js");
	exists(module_path, isMade => {
		assert.strictEqual(isMade, true);
	});
	readFile(module_path, "utf8", (errmsg, content) => {
		assert.strictEqual(content, []);
	});
}

try {
	require("./fixtures/fixture.js#d");
} catch (err) {
	const module_path = resolve(__dirname, "d.js");
	exists(module_path, isMade => {
		assert.strictEqual(isMade, true);
	});
	readFile(module_path, "utf8", (errmsg, content) => {
		assert.strictEqual(!content, true);
	});
}

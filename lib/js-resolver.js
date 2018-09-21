const { writeFileSync } = require("fs");
const { reRequire } = require("./utils");

module.exports = function jsResolver(old_fp, new_fp, hashId) {
	const data = reRequire(old_fp);
	let jsData = data[hashId];
	if (typeof jsData !== "function") {
		jsData = JSON.stringify(jsData);
	}
	const new_data = `module.exports = ${jsData}`;
	writeFileSync(new_fp, new_data, "utf8");
	return new_fp;
};

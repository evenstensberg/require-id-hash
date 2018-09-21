const Module = require("module");
const { extname } = require("path");

const { getFullPathNormalized } = require("./lib/utils");
const svgResolver = require("./lib/svg-resolver");
const jsResolver = require("./lib/js-resolver");

const originalFileLoader = Module._resolveFilename;

Module._resolveFilename = function(request, parentModule, isMain) {
	const idIdx = request.indexOf("#");

	if (idIdx >= 0) {
		const hashId = request.slice(idIdx + 1);
		const hashFile = request.slice(0, idIdx);
		const absPath = getFullPathNormalized(hashFile, parentModule.filename);
		const extName = extname(absPath);
		const newPath =
			absPath.slice(0, absPath.length - hashFile.length + 2) + hashId + extName;
		const newAbsPath = getFullPathNormalized(newPath, parentModule.filename);
		let file = hashFile;
		if (extName === ".svg") {
			file = svgResolver(absPath, newAbsPath, hashId);
		}
		if (extName === ".js") {
			file = jsResolver(absPath, newAbsPath, hashId);
		}
		return originalFileLoader.call(this, file, parentModule, isMain);
	}
	return originalFileLoader.call(this, request, parentModule, isMain);
};

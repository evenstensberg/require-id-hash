const Module = require("module");
const getCallerFile = require("get-caller-file");
const normalize = require("normalize-path");
const { join, resolve, dirname } = require("path");

function reRequire(path) {
	const module = getFullPathNormalized(path, getCallerFile());
	delete require.cache[require.resolve(module)];
	return require(module);
}

function isInNodePath(resolvedPath) {
	if (!resolvedPath) return false;

	return Module.globalPaths
		.map(nodePath => {
			return resolve(process.cwd(), nodePath) + "/";
		})
		.some(fullNodePath => {
			return resolvedPath.indexOf(fullNodePath) === 0;
		});
}

function getFullPath(path, calledFrom) {
	let resolvedPath;
	try {
		resolvedPath = require.resolve(path);
	} catch (e) {
		// do nothing
	}

	const isLocalModule = /^\.{1,2}[/\\]?/.test(path);
	const isInPath = isInNodePath(resolvedPath);
	const isExternal =
		!isLocalModule && /[/\\]node_modules[/\\]/.test(resolvedPath);
	const isSystemModule = resolvedPath === path;

	if (isExternal || isSystemModule || isInPath) {
		return resolvedPath;
	}

	if (!isLocalModule) {
		return path;
	}

	const localModuleName = join(dirname(calledFrom), path);
	try {
		return Module._resolveFilename(localModuleName);
	} catch (e) {
		if (isModuleNotFoundError(e)) {
			return localModuleName;
		} else {
			throw e;
		}
	}
}

function getFullPathNormalized(path, calledFrom) {
	return normalize(getFullPath(path, calledFrom));
}

function isModuleNotFoundError(e) {
	return e.code && e.code === "MODULE_NOT_FOUND";
}

module.exports = {
	isModuleNotFoundError,
	getFullPathNormalized,
	getFullPath,
	isInNodePath,
	reRequire
};

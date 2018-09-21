const { parse } = require("svg-parser");
const { readFileSync, writeFileSync } = require("fs");

function parseSvgDataToString(data) {
	if (Array.isArray(data)) {
		return data.map(p => {
			const child = parseSvgDataToString(p);
			return child;
		});
	}

	const attri_data = Object.keys(data.attributes)
		.map(attri => {
			return attri + "=\"" + data.attributes[attri] + "\"";
		})
		.join(" ");

	if (!data.children) {
		return `<${data.name} ${attri_data}></${data.name}>`;
	}
	const childrenData = parseSvgDataToString(data.children);
	let closingTag = `</${data.name}>`;
	if (childrenData) {
		closingTag = childrenData + closingTag;
	}
	const svgTag = `<${data.name} ${attri_data}>${closingTag}`;
	return svgTag;
}

module.exports = function svgResolver(old_fp, new_fp, hashId) {
	const data = readFileSync(old_fp, "utf8");
	const svgData = parse(data);
	const meta_data = svgData.children.filter(d => d.attributes.id === hashId);
	const svg_tag = parseSvgDataToString(meta_data)[0];
	writeFileSync(new_fp, svg_tag, "utf8");
	return new_fp;
};

const xml2js = require('xml2js');

/**
 * Convert String into a Javascript object.
 * 
 * @param {} xmlString Xml String 
 * @returns Javascript Object 
 */
async function parseXmlString(xmlString) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlString, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result); // The XML converted to a JavaScript object
            }
        });
    });
}

// Export as a named export
module.exports = {
  parseXmlString,
};
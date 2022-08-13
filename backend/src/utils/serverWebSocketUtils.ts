export const convertObjectToBuffer = 
    (object: Object): Buffer => Buffer.from(JSON.stringify(object));

module.exports = {
    convertObjectToBuffer
};
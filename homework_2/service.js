/**
 * Return list of all dogs in database
 * @param response
 */
exports.getListOfDogs = function (response) {

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end("" + response);

};

/**
 * Get information about dog by name
 * @param name string
 * @param response
 */
exports.getDog = function (name, response) {

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(response));
    return response;

};

/**
 * @param name string
 * @param data object
 * @param response
 */
exports.updateDog = function (name, data, response) {

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(response));
    return response;

};

/**
 * Create a new dog entry
 * @param data object
 * @param response
 */
exports.addDog = function (data, response) {

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(response));
    return response;
};

/**
 * Remove dog entry by name
 * @param name string
 * @param response
 */
exports.removeDog = function (name, response) {

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(response));
    return response;

};


exports.invalidRequest = function (response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Invalid Request');
    return response;
};
var db = require("./database.js");

/**
 * Return list of all dogs in database
 * @param response
 */
exports.getListOfDogs = function (response) {
    var dogs = {};
    var sql = "select * from dog";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log(err);

            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.write("Server error!");
            response.end();
            return
        }

        dogs = {
            "message": "success",
            "data": rows
        };

        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(dogs));
        response.end();
    });
};

/**
 * Get information about dog by id
 * @param id int
 * @param response
 */
exports.getDog = function (id, response) {
    var dog = {};
    var sql = "select * from dog where id = ?";
    var params = [id];
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.write("Server error!");
            response.end();
        }

        if (rows.length < 1) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write("No dogs found with id " + id);
            response.end();
            return;
        }

        dog = {
            "message": "success",
            "data": rows
        };

        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(dog));
        response.end();
    });

};

/**
 * Updates a dog entry
 * @param id int
 * @param params object
 * @param response
 */
exports.updateDog = function (id, params, response) {

    var data = {
        name: params.name,
        breed: params.breed,
        age: params.age
    };
    var sql = "update dog set name = COALESCE( ? , name), 	breed = COALESCE( ? , breed), 	age = COALESCE( ? , age) WHERE id = ? ";

    var params = [data.name, data.breed, data.age, id];
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.write("Server error!");
            response.end();
            return;
        }

        dog = {
            "message": "Dog was successfully updated!",
        };

        response.writeHead(204, {
            'Content-Type': 'application/json'
        });
        response.write();
        response.end();
    });
};

/**
 * Creates a new dog entry
 * @param params object
 * @param response
 */
exports.addDog = function (params, response) {

    var errors = [];
    if (!params.breed) {
        errors.push("No breed specified");
    }
    if (!params.age) {
        errors.push("No age specified");
    }
    if (!params.name) {
        errors.push("No name specified");
    }
    if (errors.length > 0) {
        response.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        response.write(errors.join(","));
        response.end();
        return;
    }

    var data = {
        name: params.name,
        breed: params.breed,
        age: params.age
    };

    var sql = 'INSERT INTO dog (name, breed, age) VALUES (?,?,?)';
    var params = [data.name, data.breed, data.age];
    db.run(sql, params, function (err, rows) {
        if (err) {
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.write("Server error!");
            response.end();
        }
        dog = {
            "message": "Dog was successfully added!",
        };

        response.writeHead(201, {
            'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(dog));
        response.end();
    });
};

/**
 * Remove dog entry by id
 * @param id int
 * @param response
 */
exports.removeDog = function (id, response) {

    var sql = "delete from dog where id = ?";
    var params = [id];
    db.all(sql, params, (err, rows) => {
        if (err) {
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.write("Server error!");
            response.end();
            return;
        }
        dog = {
            "message": "Dog was successfully removed!",
        };


        response.writeHead(204, {
            'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(dog));

        response.end();
    });
};


exports.invalidRequest = function (response) {
    response.writeHead(400, {
        'Content-Type': 'text/plain'
    });
    response.write("Invalid request!");
    response.end();
};
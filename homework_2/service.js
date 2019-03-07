var db = require("./database.js")

/**
 * Return list of all dogs in database
 * @param response
 */
exports.getListOfDogs = function(response) {
	var dogs = {};
	var sql = "select * from dog";
	var params = []
	db.all(sql, params, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		dogs = {
			"message": "success",
			"data": rows
		}

		response.writeHead(200, {
			'Content-Type': 'application/json'
		})
		response.write(JSON.stringify(dogs));
		response.end();
	});
};

/**
 * Get information about dog by id
 * @param id int
 * @param response
 */
exports.getDog = function(id, response) {
	var dog = {};
	var sql = "select * from dog where id = ?";
	var params = [id]
	db.all(sql, params, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		dog = {
			"message": "success",
			"data": rows
		}

		response.writeHead(200, {
			'Content-Type': 'application/json'
		})
		response.write(JSON.stringify(dog));
		response.end();
	});

};

/**
 * @param id int
 * @param data object
 * @param response
 */
exports.updateDog = function(id, params, response) {

	var data = {
		name: params.name,
		breed: params.breed,
		age: params.age
	}
	var sql = "update dog set name = COALESCE( ? , name), 	breed = COALESCE( ? , breed), 	age = COALESCE( ? , age) WHERE id = ? ";

	var params = [data.name, data.breed, data.age, id];
	db.all(sql, params, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}

		dog = {
			"message": "success",
			"data": rows
		}

		response.writeHead(200, {
			'Content-Type': 'application/json'
		})
		response.write(JSON.stringify(dog));
		response.end();
	});
};

/**
 * Create a new dog entry
 * @param data object
 * @param response
 */
exports.addDog = function(params, response) {

	var errors = []
	if (!params.breed) {
		errors.push("No breed specified");
	}
	if (!params.age) {
		errors.push("No age specified");
	}
	if (errors.length) {
		res.status(400).json({
			"error": errors.join(",")
		});
		return;
	}
	var data = {
		name: params.name,
		breed: params.breed,
		age: params.age
	}
	var sql = 'INSERT INTO dog (name, breed, age) VALUES (?,?,?)'
	var params = [data.name, data.breed, data.age]
	db.run(sql, params, function(err, result) {
		if (err) {
			console.log(err);
			return;
		}
		response.writeHead(204, {
			'Content-Type': 'application/json'
		})
		// response.write(;
		response.end();
	});
};

/**
 * Remove dog entry by name
 * @param id int
 * @param response
 */
exports.removeDog = function(id, response) {

	var dog = {};
	var sql = "delete from dog where id = ?";
	var params = [id]
	db.all(sql, params, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		dog = {
			"message": "success",
			"data": rows
		}

		response.writeHead(200, {
			'Content-Type': 'application/json'
		})
		response.write(JSON.stringify(dog));
		response.end();
	});
};


exports.invalidRequest = function(response) {
	response.writeHead(404, {
		'Content-Type': 'text/plain'
	})
	response.write("Invalid request!");
	response.end();
};
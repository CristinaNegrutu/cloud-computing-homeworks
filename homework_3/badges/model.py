from bson.objectid import ObjectId
from flask_pymongo import PyMongo

builtin_list = list

mongo = None


def _id(id):
    if not isinstance(id, ObjectId):
        return ObjectId(id)
    return id


# [START from_mongo]
def from_mongo(data):
    """
    Translates the MongoDB dictionary format into the format that's expected
    by the application.
    """
    if not data:
        return None

    data['id'] = str(data['_id'])
    return data


# [END from_mongo]


def init_app(app):
    global mongo

    app.config["MONGO_URI"] = 'mongodb://cristina:cristina@cluster0-shard-00-00-uiwvz.gcp.mongodb.net:27017,cluster0-shard-00-01-uiwvz.gcp.mongodb.net:27017,cluster0-shard-00-02-uiwvz.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

    mongo = PyMongo(app)
    mongo.init_app(app)


# [START list]
def list(limit=10, cursor=None):
    cursor = int(cursor) if cursor else 0

    results = mongo.db.test.find(skip=cursor, limit=10).sort('email')
    test = builtin_list(map(from_mongo, results))

    next_page = cursor + limit if len(test) == limit else None
    return (test, next_page)


# [END list]


# [START read]
def read(id):
    result = mongo.db.test.find_one({'_id': _id(id)})
    return from_mongo(result)


# [END read]


# [START create]
def create(data):
    result = mongo.db.test.insert_one(data)
    return read(result.inserted_id)


# [END create]


# [START update]
def update(data, id):
    mongo.db.test.replace_one({'_id': _id(id)}, data)
    return read(id)


# [END update]


def delete(id):
    mongo.db.test.delete_one({'_id': _id(id)})

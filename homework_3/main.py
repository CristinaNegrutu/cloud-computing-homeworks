import logging

from flask import Flask, current_app, render_template, request, url_for

app = Flask(__name__)
from badges import storage, model, config

import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./cc-homework-3-d001b68ee5bb.json"

app.config.from_object(config)

# Setup the data model.
with app.app_context():
    model.init_app(app)

import io
import os

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

# Instantiates a client
client = vision.ImageAnnotatorClient()


@app.route('/', methods=['GET', 'POST'])
def hello():
    message = ""
    # if post
    # first, get information from request and validate
    if request.method == 'POST':
        image_url = upload_image_file(request.files.get('image'))
        data = {}
        if image_url:
            data['imageUrl'] = image_url

        client = vision.ImageAnnotatorClient()
        image = vision.types.Image()
        image.source.image_uri = image_url
        resp = client.text_detection(image=image)

        texts = resp.text_annotations
        results = []
        for text in texts:
            results.append('\n"{}"'.format(text.description))

        print(results)
        data['results'] = results

        get_model().create(data)

        return render_template('index.html',
                               message="Succesfully uploaded your image! You can find it here " + image_url,
                               image_url=image_url, results=results)
    # if get, just return page
    return render_template('index.html', message=message,
                           image_url='https://abs.twimg.com/a/1498195419/img/t1/highline/empty_state/owner_empty_avatar.png',
                           results=[])


# [START upload_image_file]
def upload_image_file(file):
    """
    Upload the user-uploaded file to Google Cloud Storage and retrieve its
    publicly-accessible URL.
    """
    if not file:
        return None

    public_url = storage.upload_file(
        file.read(),
        file.filename,
        file.content_type
    )

    current_app.logger.info(
        "Uploaded file %s as %s.", file.filename, public_url)

    return public_url


# [END upload_image_file]


@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


def get_model():
    model_backend = model

    return model_backend


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)

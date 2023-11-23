from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier
import numpy as np

app = Flask(__name__)


class Predictor:
    def __init__(self):
        self.model = RandomForestClassifier()
        self.model.fit(
            np.array([[5.1, 3.5, 1.4, 0.2], [7.0, 3.2, 4.7, 1.4]]), np.array([0, 1])
        )  # Example training

    def predict(self, data):
        return self.model.predict([data])


predictor = Predictor()


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "Empty request"}), 400
    if "features" not in data:
        return jsonify({"error": "Missing 'features' in request"}), 400
    prediction = predictor.predict(data["features"])
    return jsonify({"prediction": int(prediction[0])})

if __name__ == "__main__":
    app.run(debug=True)

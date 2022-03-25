import flask;

app = flask.Flask(__name__);

@app.route("/")
def index():
    return app.send_static_file("index.html")
@app.route("/static/index.css")
def index_css():
    return app.send_static_file("index.css")

@app.route("/api/get-design-count")
def sudoku_ready():
    return "0";

if __name__=="__main__":
	app.run(
        host = "0.0.0.0",
        port = 5000,
        debug = True)

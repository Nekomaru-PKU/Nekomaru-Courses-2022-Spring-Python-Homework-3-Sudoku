import random;
import flask;

app = flask.Flask(__name__, static_url_path='/static');

designs = []

@app.route("/")
@app.route("/index.html")
def index():
    return app.send_static_file("index.html")
@app.route("/success.html")
def success():
    return app.send_static_file("success.html")
@app.route("/sudoku-design.html")
def sudoku_design():
    return app.send_static_file("sudoku-design.html")
@app.route("/sudoku-play.html")
def sudoku_play():
    return app.send_static_file("sudoku-play.html")

@app.route("/api/get-design-count")
def api_get_design_count():
    return str(len(designs));
@app.route("/api/get-design")
def api_get_design():
    return designs[random.randint(0, len(designs) - 1)];
@app.route("/api/add-design")
def api_add_design():
    designs.append(flask.request.args.get("design"));
    return "OK";

if __name__=="__main__":
	app.run(
        host = "0.0.0.0",
        port = 5000,
        debug = True)

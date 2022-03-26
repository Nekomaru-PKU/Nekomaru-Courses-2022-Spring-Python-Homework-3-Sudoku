import flask;

app = flask.Flask(__name__, static_url_path='/static');

@app.route("/")
@app.route("/index.html")
def index():
    return app.send_static_file("index.html")
@app.route("/sudoku-design.html")
def sudoku_design():
    return app.send_static_file("sudoku-design.html")
@app.route("/sudoku-play.html")
def sudoku_play():
    return app.send_static_file("sudoku-play.html")

@app.route("/api/get-design-count")
def api_get_design_count():
    return "1";
@app.route("/api/get-design")
def api_get_design():
    return "700000000006750209004090000400002090080000020050800003000010500103048600000000001";

if __name__=="__main__":
	app.run(
        host = "0.0.0.0",
        port = 5000,
        debug = True)

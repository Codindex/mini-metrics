from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello Cluster admins'

@app.route('/add')
def add():
    # return str(3 + 4)
    return jsonify({"result": str(3+4)})

@app.route('/api/addition')
def get_addition():
    a = int(request.args.get('a', 0))
    b = int(request.args.get('b', 0))
    result = a + b
    return jsonify({'result': result})

@app.route('/api/soustraction')
def get_substraction():
    a = int(request.args.get('a', 0))
    b = int(request.args.get('b', 0))
    result = a - b
    return jsonify({'result': result})

@app.route('/api/multiplication')
def get_multiplication():
    a = int(request.args.get('a', 0))
    b = int(request.args.get('b', 0))
    result = a * b
    return jsonify({'result': result})

@app.route('/api/division')
def get_division():
    a = int(request.args.get('a', 0))
    b = int(request.args.get('b', 0))
    result = a / b
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

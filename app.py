from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.utils import secure_filename
import os
import sqlite3
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'secret_key'  # Chave secreta para gerenciar sessões
app.config['UPLOAD_FOLDER'] = './static/images'

# Configurações de banco de dados
DATABASE = 'database.db'

# Função para conectar ao banco de dados
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Criação do banco de dados (caso não exista)
def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            is_admin INTEGER NOT NULL
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reclamacoes (
            id INTEGER PRIMARY KEY,
            aluno_id INTEGER,
            descricao TEXT NOT NULL,
            imagem TEXT,
            data TEXT,
            FOREIGN KEY(aluno_id) REFERENCES users(id)
        )
    ''')
    conn.commit()
    conn.close()

# Página de início da escola
@app.route('/')
def index():
    return render_template('index.html')

# Página de login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
        user = cursor.fetchone()
        if user:
            session['user_id'] = user['id']
            session['is_admin'] = user['is_admin']
            return redirect(url_for('reclamacao') if user['is_admin'] == 0 else url_for('dashboard'))
        else:
            return 'Credenciais inválidas', 401
    return render_template('login.html')

# Página de reclamação (para alunos)
@app.route('/reclamacao', methods=['GET', 'POST'])
def reclamacao():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        descricao = request.form['descricao']
        imagem = request.files['imagem']
        if imagem:
            filename = secure_filename(imagem.filename)
            imagem.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        else:
            filename = None

        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO reclamacoes (aluno_id, descricao, imagem, data)
            VALUES (?, ?, ?, ?)
        ''', (session['user_id'], descricao, filename, datetime.now()))
        conn.commit()
        return redirect(url_for('reclamacao'))

    return render_template('reclamacao.html')

# Página de administração (para visualizar as reclamações)
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session or session.get('is_admin') != 1:
        return redirect(url_for('login'))
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM reclamacoes')
    reclamacoes = cursor.fetchall()
    return render_template('dashboard.html', reclamacoes=reclamacoes)

# Logout
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('is_admin', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)

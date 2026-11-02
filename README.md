<a id="readme-top"></a>

<!-- LOGO DO PROJETO --> <br />
 <div align="center">
 <a href="https://github.com/github_username/repo_name">
 <img src="logo.png" alt="Logo" width="80" height="80">
 </a> <h3 align="center">Finances</h3> <p align="center">
 App de finanças completo com autenticação de usuário
 </p>
 </div> <!-- TABELA DE CONTEÚDO --> <details>
 <summary>Tabela de conteúdo</summary>
 <ol>
 <li>
 <a href="#sobre-o-projeto">Sobre o projeto</a>
 <ul>
 <li><a href="#funcionalidades">Funcionalidades</a></li>
 <li><a href="#feito-com">Tecnologias Usadas</a></li>
 <li><a href="#estrutura">Estrutura do projeto</a></li>
 </ul>
 </li>
 <li>
 <a href="#comece-aqui">Comece aqui</a>
 <ul>
 <li><a href="#prerequisitos">Pré-requisitos</a></li>
 </ul>
 <li><a href="#instalacao">Instalação</a></li>
 <ul>
 <li><a href="#backend">Backend</a></li>
 <li><a href="#frontend">Frontend</a></li>
 <li><a href="#mobile">Mobile</a></li>
 <li><a href="#docker">Docker</a></li>
 </ul>
 </li>
 <li><a href="#uso">Uso</a></li>
 <li><a href="#conceitos">Conceitos usados</a></li>
 <li><a href="#decisoes-mobile">Decisões e limitações do mobile</a></li>
 </ol>
 </details> <!-- SOBRE O PROJETO -->
<h3 id="sobre-o-projeto">Sobre o projeto</h3>

Product Name Screen Shot

Aplicativo de finanças pessoais. Registre seus gastos e ganhos para ter um controle organizado da sua renda. Desenvolvido como o sétimo projeto de um desafio de desenvolvimento de 12 meses, com foco em conceitos avançados de React e Python.

O projeto também possui uma versão mobile (iOS e Android), feita com React Native e Expo, que consome a mesma API. Ela foi desenvolvida como um desafio pessoal de aprendizado em desenvolvimento mobile.

<h3 id="funcionalidades">Funcionalidades</h3>
Criação de contas e autenticação por token
Rotas protegidas
Dashboard com resumos, gráficos e itens com maiores valores
Rota para criação, edição e exclusão de gastos e ganhos
Tabelas com todos os gastos e ganhos registrados
Função de filtro por categoria, data inicial e data final
Upload de imagem para cara item cadastrado

Versão mobile (React Native + Expo):

Login com token JWT guardado de forma segura no aparelho (SecureStore) e sessão persistente
Rotas protegidas: o app alterna entre a tela de login e as telas internas conforme a autenticação
Lista de transações com "puxar para atualizar"
Criação e exclusão de gastos e ganhos, com categorias validadas conforme o tipo
Dashboard com saldo, totais, maiores valores e resumo por categoria
Upload de comprovante pela galeria do celular (somente mobile)
Cache offline de leitura: sem conexão, o app exibe a última lista salva, com aviso
<p align="right">(<a href="#topo">Voltar ao topo</a>)</p>
<h3 id="feito-com">Tecnologias usadas</h3>
Python
PostgreSQL
React
TailwindCSS
JavaScript
React Native
Expo
<p align="right">(<a href="#topo">Voltar ao topo</a>)</p>
<h3 id="estrutura">Estrutura do projeto</h3>

Estrutura do backend:

backend/
├── alembic/
│   ├── versions/
│   └── env.py
├── alembic.ini
├── app/
│   ├── init.py
│   ├── main.py                 # cria a app FastAPI, inclui routers, CORS
│   ├── core/
│   │   ├── config.py            # settings (Pydantic BaseSettings) — env vars
│   │   └── security.py          # hash de senha, criação/validação de JWT
│   ├── db/
│   │   ├── base.py               # Base declarativa do SQLAlchemy
│   │   ├── session.py            # engine, SessionLocal, get_db()
│   ├── models/
│   │   ├── user.py
│   │   └── item.py
│   ├── schemas/                  # Pydantic models (request/response)
│   │   ├── user.py
│   │   ├── item.py
│   │   └── token.py
│   ├── crud/                     # funções de acesso ao banco
│   │   ├── user.py
│   │   └── item.py
│   ├── api/
│   │   ├── deps.py                # get_current_user, get_db, etc.
│   │   └── routes/
│   │       ├── auth.py             # /login, /register
│   │       ├── users.py            # /users/me, dashboard
│   │       ├── items.py            # CRUD de itens
│   │       └── uploads.py          # upload de arquivos
│   └── static/ ou uploads/         # onde os arquivos enviados ficam salvos
├── tests/
├── .env
├── requirements.txt
└── README.md

Estrutura do Frontend:

frontend/
├── src/
│   ├── main.jsx                 # entry point, monta o React na página
│   ├── App.jsx                  # componente raiz, define as rotas
│   ├── api/
│   │   ├── axios.js              # instância do Axios com baseURL + interceptor de token
│   │   ├── auth.js               # funções: login(), register()
│   │   └── items.js               # funções: getItems(), createItem(), updateItem(), deleteItem()
│   ├── context/
│   │   └── AuthContext.jsx       # estado global de autenticação (usuário logado, token)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx       # protege rotas que exigem login
│   │   └── ItemForm.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ItemsPage.jsx
│   ├── hooks/
│   │   └── useAuth.js             # hook de conveniência pra acessar o AuthContext
│   └── styles/                    # CSS, se não usar Tailwind/styled-components
├── .env                            # VITE_API_URL=http://localhost:8000
├── index.html
├── package.json
└── vite.config.js

Estrutura do Mobile:

mobile/
├── app/                          # rotas (Expo Router: cada arquivo é uma tela)
│   ├── _layout.js                 # layout raiz: AuthProvider e rotas protegidas
│   ├── index.js                   # lista de transações (tela inicial)
│   ├── login.js                   # tela de login
│   ├── new-item.js                # formulário de nova transação
│   └── dashboard.js               # resumo financeiro
├── api/
│   ├── axios.js                   # instância do Axios (baseURL via .env + interceptors)
│   ├── auth.js                    # login(), register()
│   ├── items.js                   # getItems(), createItem(), updateItem(), deleteItem()
│   ├── users.js                   # getDashboard(), getCurrentUser()
│   └── uploads.js                 # upload e remoção de comprovante (multipart)
├── contexts/
│   └── AuthContext.js             # estado de autenticação: signIn, signOut, sessão
├── storage/
│   ├── token.js                   # SecureStore (mobile) / AsyncStorage (web)
│   └── cache.js                   # cache offline da lista de transações
├── utils/
│   └── format.js                  # formatação de moeda e data
├── .env                            # EXPO_PUBLIC_API_URL=http://SEU_IP:8000
├── app.json
└── package.json
<p align="right">(<a href="#topo">Voltar ao topo</a>)</p>
 <!-- GETTING STARTED -->
<h3 id="comece-aqui">Comece Aqui</h3>

As instruções à seguir mostram como instalar e executar o código fonte localmente.

Preview online
Se você quiser usar a versão online, clique <a href="https://task-tracker-api-2k8u.onrender.com" target="_blank">neste link</a> para iniciar o serviço de backend, e depois <a href="https://finance-tracker-sigma-bice-93.vercel.app" target="_blank">neste link</a> para acessar o aplicativo.
<p align="right">(<a href="#topo">Voltar ao topo</a>)</p>
<h3 id="prerequisitos">Pré-requisitos</h3>
<a href="https://www.python.org/downloads">Python 3.14.7+</a>
<a href="https://nodejs.org/pt-br/download">Node.js 18+</a>
<a href ="https://www.postgresql.org/download">PostgreSQL 18.3+</a>
<a href="https://git-scm.com/install/windows">Git Bash para Windows</a> (Opcional)
<a href="https://www.docker.com/products/docker-desktop/?at_exp=DO105.A-DO106.B">Docker</a> (Opcional)
<a href="https://expo.dev/go">Expo Go</a> instalado no celular, iOS ou Android (para a versão mobile)
<p align="right">(<a href="#topo">Voltar ao topo</a>)</p>
<h3 id="instalacao">Instalação</h3>

Clone o repositório

sh
git clone https://github.com/tiago3292/finances
cd finances
<h3 id="backend">Backend</h3>
1. Crie e ative o ambiente virtual
sh
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows com Git Bash
source venv/bin/activate # Linux/MacOS
2. Instale as dependências
sh
pip install -r requirements.txt
3. Configure as variáveis de ambiente
sh
cp .env.example .env

Abra o .env e preencha com os dados do seu banco de dados:

sh
DATABASE_URL=postgresql://username:password@localhost:5432/finances
SECRET_KEY=your_secret_key_here_generate_with_openssl_rand_hex_32
ALGORITHM=your_algorithm_here--delfault:HS256
ACCESS_TOKEN_EXPIRE_MINUTES=int_here
4. Atualize o banco de dados
sh
alembic upgrade head
5. Inicie o servidor
sh
uvicorn app.main:app --reload
<h3 id="frontend">Frontend</h3>
1. Instale as dependências
sh
cd ../frontend # Se estiver na pasta raiz: cd frontend
npm install
2. Executar
sh
npm run dev
<h3 id="mobile">Mobile</h3>

O celular e o computador precisam estar na mesma rede Wi-Fi.

1. Deixe o backend acessível na rede local

No celular, localhost é o próprio aparelho. Por isso, inicie o servidor escutando em todas as interfaces (e libere a porta 8000 no firewall, se necessário):

sh
uvicorn app.main:app --reload --host 0.0.0.0

Para descobrir o IP do computador: ipconfig (Windows), ipconfig getifaddr en0 (macOS) ou hostname -I (Linux). Teste abrindo http://SEU_IP:8000/docs no navegador do celular.

2. Instale as dependências
sh
cd ../mobile # Se estiver na pasta "frontend"
npm install
3. Configure a URL da API

Crie um arquivo .env na pasta mobile:

sh
EXPO_PUBLIC_API_URL=http://SEU_IP:8000

Variáveis com o prefixo EXPO_PUBLIC_ são expostas ao app. Sempre que alterar o .env, reinicie com npx expo start -c.

4. Execute
sh
npx expo start -c

Escaneie o QR code com o Expo Go (Android) ou com a câmera (iOS). Para abrir a versão web do Expo, pressione w no terminal; nesse caso, adicione http://localhost:8081 à lista de origens do CORS no main.py do backend.

Usando o backend online

Se preferir não rodar o backend localmente, aponte o app para o serviço hospedado:

sh
EXPO_PUBLIC_API_URL=https://task-tracker-api-2k8u.onrender.com

O serviço gratuito "dorme" quando fica inativo, e a primeira requisição pode demorar. Abra o link no navegador para acordá-lo antes de usar o app.

<h3 id="docker">Docker</h3>
1. Configure as variáveis de ambiente
sh
cd ../ # Se estiver na pasta "frontend"
cp .env.docker.example .env.docker

Abra o .env.docker e preencha com os dados do seu banco de dados:

sh
DATABASE_URL=postgresql://username:password@db:5432/finances
POSTGRES_USER=db_username
POSTGRES_PASSWORD=db_password
2. Construa todas as imagens e containers
sh
docker compose up
<p align="right">(<a href="#topo">Voltar ao topo</a>)</p> <!-- USAGE EXAMPLES -->
<h3 id="uso">Uso</h3>

Com os servidores do backend e frontend em execução, acesse os seguintes endereços no seu navegador:

API
sh
http://localhost:8000/docs # Swagger UI
http://localhost:8000/redoc # ReDoc
Aplicativo
sh
http://localhost:5173
Docker
sh
# API
http://0.0.0.0:8000/docs # Swagger UI
http://0.0.0.0:8000/redoc # ReDoc

# Aplicativo
http://localhost:3000
Mobile
sh
# Dentro da pasta mobile
npx expo start
# Escaneie o QR code com o Expo Go
# Versão web do Expo (opcional): pressione "w" ou acesse
http://localhost:8081
<!-- CONCEITOS USADOS --> <p align="right">(<a href="#topo">Voltar ao topo</a>)</p>
<h3 id="conceitos">Conceitos Usados</h3>
CRUD
Alembic para migration de tabelas
Relations e exclusão em cascata no banco de dados
@hybrid_property e @model_validator para categorizações condicionais de dados
JWT authentication flow para autenticação via token e rotas protegidas
CORS
Interceptor do Axios
Sistema de upload de arquivo relacionado ao item
Filtragem de itens no frontend
Tailwind no React para estilização
Docker
Deploys em sites hospedeiros (Render para o backend, Vercel para o frontend)
CI/CD com Github actions
React Native e Expo: componentes nativos (View, Text, FlatList), StyleSheet e flexbox
Expo Router: rotas baseadas em arquivos e rotas protegidas (Stack.Protected)
Context API para o estado de autenticação e useFocusEffect para recarregar telas
Armazenamento local: SecureStore para o token e AsyncStorage para o cache offline
Upload de arquivo no mobile com expo-image-picker e FormData ({ uri, name, type })
Código específico por plataforma com Platform.OS
<p align="right">(<a href="#topo">Voltar ao topo</a>)</p>
<h3 id="decisoes-mobile">Decisões e limitações do mobile</h3>

Decisões

Expo em vez de React Native "puro": dispensa Android Studio e Xcode e permite testar direto no celular com o Expo Go.
Camada de API reaproveitada: auth.js, items.js e users.js seguem a estrutura do frontend web. Mudaram o axios.js (URL por variável de ambiente e token assíncrono) e o upload (FormData com { uri, name, type }).
SecureStore no celular, AsyncStorage na web: o SecureStore (criptografado) não existe na web, então o token.js escolhe o armazenamento por Platform.OS.
Logout automático: ao receber 401, o interceptor do Axios chama um callback registrado pelo AuthContext, em vez de redirecionar por URL como no web.
Offline somente leitura: a última lista carregada fica no AsyncStorage e é exibida, com aviso, quando não há conexão. O cache é apagado no logout para não expor dados entre contas no mesmo aparelho.
Timeout nas requisições: a falha de rede é detectada em tempo razoável, o que permite acionar o cache.

Limitações conhecidas

Criar, excluir e anexar comprovantes exigem conexão: não há fila de sincronização offline.
O mobile não tem tela de cadastro, edição de item, filtros nem gráficos de pizza (o dashboard usa barras de progresso).
O upload de comprovante está disponível apenas no mobile.

Evolução futura

Fila de sincronização para escrever offline, com resolução de conflitos
Tela de cadastro, edição de item e filtros
Gráficos de pizza no dashboard
Build de produção com EAS Build e API em HTTPS
Testes automatizados
<p align="right">(<a href="#topo">Voltar ao topo</a>)</p> <!-- CONTATO -->
Contato

Linkedin

<p align="right">(<a href="#topo">Voltar ao topo</a>)</p> <!-- MARKDOWN LINKS & IMAGES --> <!-- https://www.markdownguide.org/basic-syntax/#reference-style-links --> <!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->
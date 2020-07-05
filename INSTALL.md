docker run --name redis -p 6379:6379 -d -t redis:alpine
docker run -d mongo
docker run --name postgres -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=megahack_faznegocio -p 5432:5432 -d postgres















====Tecnologia BackEnd====

express como servidor de api rest
jwt para token de autenticacao
bcryptjs para criptografia e seguranca de senhas
bee-queue para filas de processos (pedidos,envio de email,outros)
mongodb base de dados noSQL para pedidos
postgres base de dados SQL para usuarios, cadastros, registros,etc
redis cache de dados
multer armazenamento de arquivos
nodemailer envio de emails
yup validacao de dados dos formularios
sentry para registro de erros da aplicacao
---- dev ---
eslint, prettier, nodemon, editorconfig



==== Tecnologia FrontEnd & Mobile ======
ReactJS biblioteca web
axios para comunicacao com API
prop-types gestao de propriedades
redux, redux-saga,redus-persist gestao do estado da aplicacao
toastify alertas e notificacoes na aplicacao
reactotron registro e monitoramento de erros e estado
styled-components criar componentes personalizados
yup validacao de formularios
---- dev ---
eslint, prettier, editorconfig, babel




==== Servicos de terceiros ======
MailTrap receber todos emails da aplicacao durante o dev
Sentry monitorar e debugar errors

# 🍔 Food Delivery Backend API

API backend para aplicação de delivery de comida.

## 📋 Pré-requisitos

- Node.js >= 14
- MongoDB Atlas account
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis de ambiente com seus dados

```bash
cp .env.example .env
```

## ⚙️ Configuração

Edite o arquivo `.env` com suas configurações:

```env
MONGODB_URI=sua-connection-string-mongodb
PORT=4000
JWT_SECRET=sua-chave-secreta-jwt
NODE_ENV=development
```

## 🏃‍♂️ Executando o projeto

### Modo Desenvolvimento (com nodemon)
```bash
npm run server
```

### Modo Produção
```bash
npm start
```

O servidor estará rodando em `http://localhost:4000`

## 📚 Endpoints da API

### 🏠 Home
- **GET** `/`
  - Retorna informações sobre a API

### 🍕 Food Management

#### Adicionar Food Item
- **POST** `/api/food/add`
  - Body: multipart/form-data
    - `name`: string (required)
    - `description`: string (required)
    - `price`: number (required)
    - `category`: string (required)
    - `image`: file (required) - max 5MB, formatos: jpeg, jpg, png, gif, webp

#### Listar Food Items
- **GET** `/api/food/list`
  - Retorna lista de todos os items

#### Remover Food Item
- **POST** `/api/food/remove`
  - Body: JSON
    - `id`: string (required) - MongoDB ObjectId

### 🖼️ Imagens
- **GET** `/images/:filename`
  - Serve arquivos de imagem da pasta uploads

## 🗂️ Estrutura do Projeto

```
backend/
├── config/
│   └── db.js               # Configuração do MongoDB
├── controllers/
│   └── foodController.js   # Lógica de negócio para food
├── middleware/
│   └── errorHandler.js     # Middleware de tratamento de erros
├── models/
│   └── foodModel.js        # Schema do MongoDB para food
├── routes/
│   └── foodRoute.js        # Rotas da API para food
├── uploads/                # Pasta para armazenar imagens
├── .env                    # Variáveis de ambiente (não commitar)
├── .env.example            # Template de variáveis de ambiente
├── .gitignore             # Arquivos ignorados pelo git
├── package.json           # Dependências do projeto
└── server.js              # Ponto de entrada da aplicação
```

## 🛡️ Melhorias Implementadas

✅ Variáveis de ambiente para configurações sensíveis  
✅ Tratamento de erros global  
✅ Validação de entrada de dados  
✅ Validação de tipo e tamanho de arquivo  
✅ Códigos de status HTTP apropriados  
✅ Mensagens de erro descritivas  
✅ Limpeza de arquivos em caso de erro  
✅ Logging melhorado  
✅ Middleware de rotas não encontradas  

## 📦 Dependências Principais

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **multer**: Upload de arquivos
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Gerenciamento de variáveis de ambiente
- **nodemon**: Auto-restart durante desenvolvimento
- **bcrypt**: Hash de senhas
- **jsonwebtoken**: Autenticação JWT
- **validator**: Validação de dados

## 🔒 Segurança

- Credenciais do banco de dados armazenadas em variáveis de ambiente
- Validação de tipo de arquivo para uploads
- Limite de tamanho de arquivo (5MB)
- Tratamento adequado de erros sem expor informações sensíveis
- CORS configurado

## 📝 Notas

- As imagens enviadas são armazenadas na pasta `uploads/`
- Em produção, considere usar um serviço de armazenamento em nuvem (S3, Cloudinary, etc.)
- Sempre mantenha o arquivo `.env` fora do controle de versão

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

ISC License

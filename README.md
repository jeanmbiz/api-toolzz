# API Toolzz

#### Trata-se de uma API de filmes, onde o usuário cadastrado e logado pode incluir filmes na plataforma para que outros usuários possam ver em formato de streaming. (em construção)

### Frameworks e bibliotecas utilizadas neste projeto:

- Node
- Express
- express-async-errors
- TypeScript
- TypeORM
- Bcryptjs
- JWT - Json Web Token
- dotenv
- YUP
- PG
- ioredis
- Bull
- Banco de dados PostgreSQL

## Diagrama do Projeto

![diagrama](/diagrama.jpg)

## 1 Regras de Negócio do Projeto:

#### Rotas Públicas:

- Criar usuário: Não é possível criar 2 usuários com o mesmo email, a senha deve ser uma senha forte de no mínimo 8 caracteres, tendo que conter: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caracter especial.
- A rota de criação de usuário retorna todos os dados, com exceção da hash de senha.
- Login: o usuário deve estar ativo, as informações de email e senha são validadas;
- Listar Filmes: usuários não logados podem listar os filmes da plataforma, retorna apenas filmes ativos na plataforma, com as principai informações do filme e do usuário que o adicionou.

#### Rotas Protegidas:

- Update de usuário: somente o próprio usuário ativo e logado pode editar suas informações, e ao atualizar email valida se email já existe no banco de dados;
- Deletar usuário: somente o próprio usuário ativo e logado pode inativar seu cadastro da plataforma, é utilizado o soft delete, não excluindo os dados no banco de dados, apenas marcando ativo como false.
- Criar filme: usuário deve estar ativo e logado para adicionar filme na plataforma. As informações passam por uma validação antes de serem adicionadas, não sendo possível criar filme com o mesmo nome e sinopse;
- Deletar filme: o usuário ativo e logado pode deletar apenas o próprio filme que adicionou na plataforma, não sendo possível deletar filmes de outros usuários, é utilizado o soft delete, não excluindo os dados no banco de dados, apenas marcando ativo como false.

## 2 Implementações do Projeto:

- Implementado no projeto o Conceito de Filas com o Bull combinado com o Redis, aumentando a velocidade e escalabilidade na requisição de Listar Filmes;

## 3 Instalação

### Para executar o projeto localmente, siga as etapas abaixo:

#### 1.1 Clone o repositório:

```
git clone git@github.com:jeanmbiz/api-toolzz.git
```

#### 1.2 Acesse o diretório do projeto:

#### 1.3 Instale as dependências do projeto:

```
yarn
```

#### 1.4 Configure o banco de dados criando arquivo .env com base no arquivo .env.example:

#### 1.5 Persistir Migrations no Banco de Dados:

```
yarn typeorm migration:run -d src/data-source
```

#### 1.6 Rode o Projeto no Servidor Local:

```
yarn run dev
```

#### 1.8 Acesse o servidor local em seu navegador:

```
http://localhost:3000/
```

## 4 Próximas Features:

- Finalizar a implementação de testes automatizados;
- Implementar o upload de arquivos de filmes;
- Implementar streaming dos vídeos com redis;
- Implementar e aprender Kafka;
- Implementar confirmação de email de usuário para ativação de cadastro;
- Implementar MongoDB;
- Publica projeto na AWS;

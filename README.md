# Book Klub

![Book Klub Logo](src/assets/img/book_klub_logo.png)

`Book Klub` é uma plataform virtual de clubes de livros, onde leitores podem se cadastrar, criar seus próprios clubes e agendar sessões de discussão sobre a obra que estão lendo.

Todos os usuários cadastrados podem criar e administrar seus próprios clubes, e outros usuários podem ingressar em clubes existentes.

## Índice

- [Book Klub](#book-klub)
  - [Índice](#índice)
  - [Sobre a aplicação](#sobre-a-aplicação)
    - [Features](#features)
    - [Tecnologias](#tecnologias)
  - [Instalação e uso](#instalação-e-uso)
    - [Utilizando o docker](#utilizando-o-docker)
    - [Utilizando um banco de dados local](#utilizando-um-banco-de-dados-local)
  - [Api](#api)
  - [Desenvolvedores](#desenvolvedores)
      - [**Carlos**](#carlos)
      - [**Clara**](#clara)
      - [**Gabriela**](#gabriela)
      - [**Jamilly**](#jamilly)
      - [**Leo**](#leo)
      - [**Lorena**](#lorena)
  - [Licença de uso](#licença-de-uso)

## Sobre a aplicação

`Book Klub` foi desenvolvida em grupo durante a conclusão do módulo 4 do curso de desenvolvimento full stack da Kenzie Academy. A aplicação se propõe ser um tipo de rede social de leitura, onde leitores de todos os lugares podem se reunir em grupos de discussão - os clubes de leitura - e debater sobre a obra que estão lendo.

### Features

Na aplicação existem diversas funcionalidades com as quais os usários podem interagir para criar um ambiente ideal para organizar seus encontros, dentre elas, as principais são:

- Cadastro e login de usuários, com criptografia e validação de senhas
- Cadastro de novos clubes, com a possibilidade de adicionar os livros lidos aos clubes, além de atualização dos dados de um clube e remoção do clube
- Cadastro de livros e categorias

### Tecnologias

Para construir e executar Book Klub, utilizamos as seguintes tecnologias:

1. Node.js
2. Express
3. TypesORM
4. PostgreSQL

## Instalação e uso

Faça o `fork` do repositório e em seguida execute o comando `git clone` para clonar o projeto para seu dispositivo. Dentro da pasta do projeto, execute o comando abaixo para instalar todas as dependências da aplicação.

```
yarn install
```

É possível executar a aplicação tanto dentro de um container Docker, quanto localmente, utilizando um banco de dados PostgreSQL.

### Utilizando o docker

Após o comando `yarn instal`, execute o comando abaixo para executar a aplicação utilizando um container docker - é necessário ter o Docker Desktop instalado no Windows e Mac, ou Docker Compose no Linux.

```
docker-compose --build
```

Em seguida, para executar a imagem, execute o seguinte comando:

```
docker-compose up
```

A aplicação agora estará em execução e pode ser acessada em:

```
http://localhost:3000
```

### Utilizando um banco de dados local

Caso não queira utilizar o docker, é possível executar a aplicação em um servidor local, utilizando um banco de dados PostgreSQL.

Para isto, basta editar o arquivo `.env.example` e alterar as linhas:

```
SECRET_KEY=
DATABASE_URL="postgres://<username>:<password>@<host>:<port>/<database>"
```

Em `SECRET_KEY`, insira os dados da secret key que pretende utilizar. Em `DATABASE_URL`, os dados `username`, `password` e `database` pelas informações do seu banco de dados PostgreSQL. Substitua `host` e `port` pelos valores de sua preferência.

Em seguida, altere o nome do arquivo, de `.env.example` para `.env`.

## Api

Para utilizar e API `Book Klub`, acesse a [documentação do projeto](https://insomnia-doc-nine.vercel.app/)

## Desenvolvedores

#### **Carlos**

- Github
- Linkedin

#### **Clara**

- Github
- Linkedin

#### **Gabriela**

- Github
- Linkedin

#### **Jamilly**

- Github
- Linkedin

#### **Leo**

- Github
- Linkedin

#### **Lorena**

- Github
- Linkedin

## Licença de uso

`Book Klub` é um software open source com uma licença [MIT](LICENSE.md)

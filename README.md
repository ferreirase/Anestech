<img alt="GoStack" src="https://d57439wlqx3vo.cloudfront.net/iblock/2af/2af8e1dd6ec3c55ed7829de81e3cf187/c433a6dc7c21d90eeeddc632b489428c.png" />

<h3 align="center">
  My Tasks - Test Anestech
</h3>

<blockquote align="center">“Mostre ao mundo o que você pode fazer”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/ferreirase/Anestech?color=%2304D361">

  <a href="https://www.linkedin.com/in/anderson-raphael-ferreira">
    <img alt="Made by Ferreira" src="https://img.shields.io/badge/made%20by-Ferreira-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/ferreirase/Anestech/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/ferreirase/Get-Recipes?style=social">
  </a>
</p>

## :rocket: O desafio

Estamos com problemas em saber quanto tempo é gasto nas tarefas que efetuamos diariamente. Para conseguirmos registrar tudo o que fazemos precisamos de uma pequena API para registrar as tarefas e que seja possível informar quando ela foi iniciada, quando foi finalizada e o responsável da tarefa. Precisamos também, definir cargos para os usuários, sendo eles:

#### Administrador: 
```
- Pode listar, criar, alterar e deletar usuários; 
- Acessar os indicadores; 
- Tudo que um agente pode fazer. 
```

#### Agente: 
```
- Pode criar e alterar tarefas.
```

## :page_facing_up: Requisitos

#### Estrutura de usuários:
```
- Nome;
- Email.
```

#### Estrutura das Tarefas:
```
- Descrição;
- Responsável (usuário);
- Status (aberto, fazendo, finalizado);
- Data e hora de início (quando a tarefa entra no status “fazendo”);
- Data e hora de finalização;
- Data e hora de criação.
```

#### Na rota que lista todas as tarefas:
```
- Deve ser possível realizar filtros de pesquisa na descrição e status da tarefa.
- Opção para ordenar os seguintes campos de forma crescente ou decrescente:
- Responsável;
- Status;
```

#### Criação Rota de Indicadores:
```
- Desempenho geral dos usuários em determinado período de tempo:
- Número de tarefas concluídas;
- Média de tarefas concluídas por usuário;
- Tempo médio entre “aberto” e “fazendo” das tarefas;
- Tempo médio entre “fazendo” e “finalizado” das tarefas.
```

### :cd: Rodando a aplicação!

Tenha em sua máquina um banco de dados *``` Postgres ```* e forneça as credenciais de acesso no arquivo *``` src/config/database.js ```*.
 
#### Subindo o servidor
  1. Clone/Baixe este repositório na sua máquina;
  2. Abra o terminal na raiz da pasta *``` do projeto ```* e rode "npm i" ou ainda "yarn install" para download das dependências do projeto;
  3. No terminal, rode o comando *``` yarn sequelize db:migrate ```* ou ainda *``` npm run sequelize db:migrate ```* para subir as migrations para o banco de       dados; Espere finalizar e então rode o comando *``` yarn sequelize db:seed:all ```* ou ainda  *``` npm run sequelize db:seed:all ```* para subir as seeds com os    dados de um usuário administrador. A seed se encontra na pasta: ``` src/database/seeds ```* .
  4. Terminado esse processo, rode "npm run dev" ou ainda "yarn dev" para subir o servidor backend; Certifique se o banco de dados foi configurado antes e se está rodando;
  5. Pronto, seu servidor backend está no ar e pronto pra ser acessado no endereço "http://localhost:3333". 
  

## :heavy_exclamation_mark: Rotas, Verbos e Parâmetros

#### /session:
```
- Verbo: Post
- Rota para login na aplicação;
- Parâmetros: body {
  "email": "****@email.com", 
  "password": "*****"
}
```

#### /users:
```
- Verbo: GET
- Rota para listas todos os usuários; apenas usuário admin;
- Parâmetros: nenhum
```

```
- Verbo: POST
- Rota para criar um novo usuário; apenas admin;
- Parâmetros: body {
	"name": "Anderson", 
	"email": "anderson@gmail.com", 
	"password": "123456", 
	"role": "agent" //usuário pode ser 'agent' ou 'admin'
}
```

#### /users/id:
```
- Verbo: PUT
- Rota para atualizar um usuário; apenas admin;
- Parâmetros: body {
	"name": "Anderson Raphael", 
	"email": "anderson@admin.com", 
	"old_password": "123456", 
	"password": "654321", 
	"confirm_password": "654321", 
	"role": "admin"
}
```

```
- Verbo: DELETE
- Rota para atualizar um usuário; apenas admin;
- Parâmetros: ID do usuário a ser deletado no fim da rota;
```


#### /tasks:
```
- Verbo: GET
- Rota para listar todas as tarefas criadas; 
- Parâmetros: nenhum;
- Filtros: status(pode ser 'open', 'doing' ou 'done'), description(busca ocorrência da expressão na descrição da tarefa);
Ex: http://localhost:3333/tasks?status=done&description=teste

- Ordenação: order=status(pode ser 'open', 'doing' ou 'done') ou order=responsible:field_responsible:asc/desc. Responsible campos válidos: id, name, email, role; 
Ex: http://localhost:3333/tasks?order=status:asc / http://localhost:3333/tasks?order=responsible:name:desc;
```


```
- Verbo: POST
- Rota para criar uma nova tarefa; 
- Parâmetros: body {
	"description": "Task 3", 
	"responsible_id": "bc90bd05-12d7-4d7d-97f6-1aee7a8e0226",  
	"status": "open"
}
```

```
- Verbo: PUT
- Rota para atualizar uma tarefa; 
- Parâmetros: body {
	"task_id": "c249468c-0e0c-40a5-8595-e0b47037d6cf", 
	"description": "Tarefa 1", 
	"responsible_id": "7a017af9-90c4-4d81-b717-d5ab546cd2b7"
}
```

```
- Verbo: PATCH
- Rota para atualizar o status de uma tarefa; 
- Parâmetros: body {
	"task_id": "4a7e59b3-1f5d-4492-8fb7-d0140898700e", 
	"status": "done" // status da tarefa pode ser 'open', 'doing' ou 'done'
}
```

#### /tasks/indicators:
```
- Verbo: GET
- Rota para geração de indicadores;
- Parâmetros: from(data inicial da busca no formato YYYY-MM-DD)&until(data final da busca no formato YYYY-MM-DD)
A URL inteira ficaria: http://localhost:3333/tasks/indicators?from=2020-11-13&until=2020-11-11.
```

## :memo: Tecnologias Utilizadas no Projeto

- *``` NodeJS ```*
- *``` Express ```*
- *``` Eslint ```*
- *``` Prettier ```*
- *``` DateFNS ```*
- *``` Postgres ```*
- *``` Sequelize(ORM) ```*
- *``` Yup ```*
- *``` JWT ```*

---

## :man: Author
[**_```Anderson Raphael Ferreira```_**](https://www.linkedin.com/in/anderson-raphael-ferreira/)

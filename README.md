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

## :rocket: Requisitos

#### Estrutura de usuários:
```
- Nome;
- Email.
```

#### Estrutura das Tarefas:
```
- Estrutura das Tarefas:
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

Tenha em sua máquina um banco de Dados Postgres e forneça as credenciais de acesso no arquivo *``` backend/ormconfig.json ```*.
 
#### Subindo o servidor backend
  1. Clone/Baixe este repositório na sua máquina;
  2. Abrir o terminal na raiz da pasta *``` backend ```* e rode "npm i" para download das dependências;
  3. Ainda no terminal na raiz da pasta *``` backend ```* rode "npm run start:dev" para subir o servidor backend; Cerifique se o banco de Dados está em pé;
  4. Pronto, seu servidor backend está no ar e pronto pra ser acessado no endereço "http://localhost:3333". 
  
  #### Subindo o servidor frontend
  1. Clone/Baixe este repositório na sua máquina;
  2. Abrir o terminal na raiz da pasta *``` frontend ```* e rode "npm i" para download das dependências;
  3. Ainda no terminal na raiz da pasta *``` frontend ```* rode "npm run start" para subir o servidor frontend; 
  4. Pronto, seu servidor frontend está pronto pra ser acessado no endereço "http://localhost:3000;

## :memo: Tecnologias Utilizadas no Projeto

- *``` NodeJS ```*
- *``` TypeScript ```*
- *``` Express ```*
- *``` Eslint ```*
- *``` Prettier ```*
- *``` Axios ```*
- *``` React ```*
- *``` JWT ```*

---

## :man: Author
[**_```Anderson Raphael Ferreira```_**](https://www.linkedin.com/in/anderson-raphael-ferreira/)

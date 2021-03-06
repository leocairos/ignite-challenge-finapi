<h1 align="center">
    <img alt="Ignite NodeJS" title="Ignite NodeJS" src="./.github/ignite.png" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/leocairos/ignite-desafio-tests-challenge?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/leocairos/ignite-desafio-tests-challenge">

  <a href="https://github.com//leocairos/ignite-desafio-tests-challenge/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/leocairos/ignite-desafio-tests-challenge">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/leocairos/ignite-desafio-tests-challenge/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/leocairos/ignite-desafio-tests-challenge?style=social">
  </a>

  <a href="https://www.linkedin.com/in/leonardo-cairo-54a74756/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue">
  </a>
</p>

# 🚀 Sobre

O Ignite é um programa de aceleração para devs desenvolvido pela [Rocketseat](https://rocketseat.com.br/).


# 💻 Sobre o desafio

Nesse desafio você irá implementar uma nova funcionalidade na FinAPI, a aplicação que foi testada durante o desafio **[Testes unitários](https://www.notion.so/Desafio-01-Testes-unit-rios-0321db2af07e4b48a85a1e4e360fcd11)**.

A nova funcionalidade deverá permitir a transferência de valores entre contas. Para isso, você pode pensar na melhor forma de construir essa solução mas alguns requisitos deverão ser cumpridos:


- Não deve ser possível transferir valores superiores ao disponível no saldo de uma conta;
- O balance (obtido através da rota `/api/v1/statements/balance`) deverá considerar também todos os valores transferidos ou recebidos através de transferências ao exibir o saldo de um usuário;
- As informações para realizar uma transferência serão:

    ```json
    {
    	"amount": 100,
    	"description": "Descrição da transferência"
    }
    ```

    Você pode passar o `id` do usuário destinatário via parâmetro na rota (exemplo: `/api/v1/statements/transfers/:user_id`) e o id do usuário remetente poderá ser obtido através do token JWT enviado no header da requisição;

- Ao mostrar o balance de um usuário, operações do tipo `transfer` deverão possuir os seguintes campos:

    ```json
    {
      "id": "4d04b6ec-2280-4dc2-9432-8a00f64e7930",
    	"sender_id": "cfd06865-11b9-412a-aa78-f47cc3e52905",
      "amount": 100,
      "description": "Transferência de valor",
      "type": "transfer",
      "created_at": "2021-03-26T21:33:11.370Z",
      "updated_at": "2021-03-26T21:33:11.370Z"
    }
    ```

    Observe o campo `sender_id`. Esse deverá ser o `id` do usuário que enviou a transferência.
    O campo `type` também deverá exibir o tipo da operação, que nesse caso é `transfer`.

---

Esse desafio não possui testes. Você poderá realizar as alterações no mesmo repositório usado para o desafio de testes unitários e submeter novamente na plataforma.

## 📝 Licença

Este projeto esta sob a licença MIT.

Feito com ❤️ por [Leonardo Cairo](https://www.linkedin.com/in/leonardo-cairo-54a74756/)!

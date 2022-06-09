# Precato Test 💎

![image](https://user-images.githubusercontent.com/77081114/172949635-7835c6f0-69d6-46fb-9481-d495faba86a2.png)

<hr>


### Sobre o Desafio☝
> Servidor que receberá inscrições em um formulário. A partir das regras de negócio definidas, você precisará construir uma API REST que realize a inscrição, caso ela >seja válida, armazenando os dados em um banco de dados relacional.

>Inscrição no fluxo: No sistema de captação de leads inbound temos um formulário de inscrição em um fluxo de mensagens com notícias e informações sobre os precatórios >de nossos credores. Para isso, precisamos de uma API capaz de receber a inscrição pelo formulário e realizar o registro no banco de dados.

>Disparo de mensagens: Também precisamos de um serviço periódico que seja executado uma vez ao dia, sempre no mesmo horário, para atualizar no banco de dados qual a >última mensagem disparada para cada inscrição.

>Observação: O desafio deve ser desenvolvido utilizando Javascript/Typescript. Fica a seu critério qual banco de dados utilizar, desde que faça sentido ao desafio >proposto.

>Regras de negócio
> - [x] 1 - A inscrição só deve ser feita com um email válido.

> - [x] 2 - Não devem ser registradas linhas duplicadas com o mesmo email no banco de dados.

> - [x] 3 - A propriedade "position" da tabela "message_flow" indica o dia em que a mensagem deve ser enviada.

> - [x] 4 - A propriedade "last_message" da tabela "subscriptions" indica a última mensagem enviada para aquela inscrição.

> - [x] 5 - A propriedade "last_message" deve ser atualizada todos os dias com a próxima mensagem do fluxo.

> - [x] 6 - A propriedade "last_message" não deve ser atualizada em inscrições marcadas com "active" igual a "false".

> - [x] 7 - Caso a inscrição já tenha recebido todas as mensagens do fluxo, a propriedade "active" deve ser marcada como "false".

# 💻 Sobre o projeto

Neste projeto, foi colocado em prática conteúdos aprendidos:

- Princípios **`S.O.L.I.D`** usados:

  -   > S - Princípio da Responsabilidade Única
  -   > L - Princípio da Substituição de Liskov
  -   > D - Princípio da Inversão de Dependência
 
- Integração de **API** com **Banco de Dados Relacional** `MySQL` via ORM **`Prisma.io`**
  > Prisma.io deferentemente dos ORM´s padrão tem uma facilidade maior na criação de **Relacionamentos** entre as tabelas. O objetivo do Prisma.io é tornar nós Dev´s mais **produtivos** ao criarmos `Queries` de consulta **`SQL`**.
- **Autenticação Permissiva** nas rotas com **`JWT`**
<br>

- Implementação de `Testes Unitários`: 
 > Os Teste Unitários são aqueles que são implementados apenas em alguns **pedaços** ou **unidades** da aplicação, para verificar as suas integridades.
 >São `Testes` isolados pois precisam funcionar em segundos, por isso nos `Testes Unitários` não possuem acesso a nenhum tipo de serviço externo.


Isso irá me ajudar a entender e exercitar os diferentes tipos de aplicações e estruturas que podemos fazer.

## Feito Com: ⚒
![Node.Js](https://img.shields.io/badge/Node.js-52b788?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-00b4d8?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-316192?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-0a9396?style=for-the-badge&logo=prisma&logoColor=white)
![Prisma](https://img.shields.io/badge/Jest-ef5e1b?style=for-the-badge&logo=jest&logoColor=white)
![Prisma](https://img.shields.io/badge/Swagger-4be000?style=for-the-badge&logo=swagger&logoColor=white)


## 📂  Acessando o projeto

Para ter acesso ao projeto, exectue os seguintes comandos em seu terminal:


#### Clonando o repositório:

```bash
    $ git clone https://github.com/guirra-byte/Precato_Test.git
```

#### Entrando no projeto

```bash
    $ cd test-dev-precato
```

#### Abra-o em sua IDE (no meu caso o VS CODE)

```bash
    $ code .
```

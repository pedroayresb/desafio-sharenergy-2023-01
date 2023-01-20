# Desafio para o processo seletivo SHARENERGY 2023/01

Repositório destinado ao desafio realizado por Pedro Olympio Ayres Begnini para a vaga de desenvolvimento Web da SHARENERGY 2023/01

LINK PARA A ENTREGA NO YOUTUNE: https://youtu.be/tuGEKGmxEao

## Sobre a SHARENERGY

No ramo da produção de energia fotovoltaica, há a modalidade de produção compartilhada. Nessa modalidade, diferentes pessoas investem na construção de uma mesma usina fotovoltaica e dividem o retorno finaceiro referente à energia gerada pela usina.

Acreditamos que as energias renováveis terão um lugar dominante em nossa economia pelo resto de nossas vidas. Trabalhamos no sentido de ampliar o impacto positivo que as energias renováveis podem ter no meio ambiente e nas nossas vidas. O sucesso da SHARENERGY é resultado de nossa equipe apaixonada, juntamente com nosso compromisso de oferecer a melhor solução.

Sabemos que negócios enfrentam desafios únicos e por isso oferecemos soluções turnkey, customizadas, economicamente viáveis e seguras.

A Startup figura entre as top 10 EnergyTechs do ranking 100 Open Startups desde 2018. Prova de que a inovação está enraizada em nossa cultura. Somos uma startup em estágio de crescimento e você trabalhará diretamente com os fundadores, ajudando a definir a visão, o produto e a experiência do usuário.

<p align="left">
  <a href="https://www.linkedin.com/company/sharenergy-brasil/">
    <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn Button">
  </a>
  <a href="https://sharenergy.com.br/">
    <img src="https://img.shields.io/badge/-Website-red" alt="Sharenergy Website Button">
  </a>
</p>

## Aplicação

- A página inicial da aplicação é uma `Login Page`;
- O usuário é capaz de se autenticar utilizando o username `desafiosharenergy` e password `sh@r3n3rgy`, também, existe a possibilidade do usuário utilizar o `remember me` para realizar logins automáticos, sem a necessidade de digitar username e password após o primeiro acesso;
- Após o Login, a página principal deve contem uma listagem de usuários gerada a partir da api [Random User Generator](https://randomuser.me/), a lista deve contem a foto do usuário, nome completo, email, username e idade. Além disso, os requests devem säo páginados.
- Em uma segunda página, o usuário é capaz de selecionar um status code http qualquer, e, após a seleção, é retornada uma imagem da api [HTTP Cat](https://http.cat/) relacionada ao status escolhido, caso não exista tal imagem, deve ser retornada uma imagem de not found da API;
- Em uma terceira página, há uma imagem aleatória da api [Random Dog](https://random.dog/), no qual voce pode gerar novas imagens;
- Em uma quarta página, há uma lista de clientes, através da qual o usuário é capaz de cadastrar novos clientes, visualizar informações de um cliente específico, atualizar um cliente e deletar clientes. O cadastro deve possuir nome, email, telefone, endereço e cpf.

### Ferramentas e Stack utilizados

- ReactJS para o frontend
- NodeJS com Metor
- MongoDB e Minimongo
- TypeScript
- HTML e CSS

## Aplicação

Existem duas opcoes para rodar o app: Local ou pelo Docker.

### Local

 - Para rodar o projeto local, é necessario ter o Meteor instalado global na sua máquina. Para isso, execute o comando `npm install -g meteor`, e, quando finalizar, execute o comando `meteor npm install` dentro da pasta do repositorio do projeto. Assim que todas as dependencias forem instaladas, execute o comando `meteor` para abrir o projeto no `http://localhost:3000`

## Docker

- Para rodar no docker, somente execute o comando `docker compose up` na pasta do repositorio do projeto, e aguarde os containeres abrirem e o meteor finalizar sua inicializacao, abrindo no `localhost`.

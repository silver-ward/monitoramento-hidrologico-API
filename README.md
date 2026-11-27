# Monitoramento Hidrológico

API REST com dados hidrológicos de nível de rio e precipitação pluvial simulados.  

|<img alt="Demonstração mobile" src="./img/demo-mobile.gif" width="350" align="center">|  
|---|  

<br />Acesse o aplicativo: https://hydrocogmo.vercel.app/  

## Links  

#### API REST com dados simulados:  

https://monitoramento-hidrologico-api.onrender.com

| Nome | Método | Endpoint  
| :---: | :---: | :--- | 
| Health | GET | api/health |
| Stations | GET | api/stations |
| Summary | GET | api/stations/{stationid}/summary |
| Series | GET | api/stations/{stationid}/series?metric={metric}&hours={timeframe} |

#### Repositório front end:  
https://github.com/silver-ward/monitoramento-hidrologico  

#### Repositório back end:  
https://github.com/silver-ward/monitoramento-hidrologico-API

## Desenvolvimento

### Tecnologias e bibliotecas utilizadas:  
* **JavaScript**  
    Linguagem de programação e estruturação.  
* **Node.js**  
    Ambiente de execução para JavaScript.  
* **Express**  
    Framework web para Node.js com definição de rotas e tratamento de requisições de API.  
* **SQLite**  
    Sistema de gerenciamento de banco de dados relacional.

## Modelagem dos Dados

### Diagrama de Classes

**Diagrama de arquitetura**  
|<img alt="Domain-Driven Design Layers Diagram" src="./img/DDD-layers-diagram.svg" width="1024" align="center">|  
|---|  


**Diagrama de componentes**  
|<img alt="Full Back End Diagram" src="./img/full_diagram.svg" width="1024" align="center">|  
|---|  

## Execução Local

Para executar este projeto localmente, siga os seguintes passos em um terminal de comandos:  
   
* Integração com este repositório no GitHub  
    Pré-requisitos: [Git](https://git-scm.com/).  


    1. **Clone o repositório:**
        ```
        git clone https://github.com/silver-ward/monitoramento-hidrologico.git
        ```

    2. **Entre no diretório que foi clonado:**
        ```
        cd monitoramento-hidrologico
        ```

* Execução do código  
    Pré-requisitos: [Node.js](https://nodejs.org/).  

    3. **Instale as dependências:**
        ```
        npm install
        ```

    4. **Revise as variáveis de ambiente:**  

        O arquivo `.env` criado automaticamente usa porta 3000 e CORS liberado para `http://localhost:5173` por padrão.  
        Para controlar essas variáveis, copie o conteúdo de `.env.example` como `.env`.
        ```
        cp .env.example .env
        ```

    5. **Preencha o banco de dados com dados simulados pelo arquivo seed.js:**
        ```
        npm run seed
        ```

    6. **Inicie o servidor de desenvolvimento:**
        ```
        npm run dev
        ```

    7. **Teste no navegador os endpoints do localhost especificado no terminal.**  
        Exemplo:  
        ```
        http://localhost:3000/api/health
        ```

## Licença

Projeto desenvolvido por Eduardo Ribeiro para a Cogmo Technology no âmbito do programa Bolsa Futuro Digital, realizado por parceria entre o Instituto Hardware Brasil e o Instituto Federal de Brasília.

<img src="./img/hbr-logo.png" width="100" align="center"><img src="./img/ifb-test.webp" width="100" align="center"><img src="./img/cogmo-logo.png" width="100" align="center">
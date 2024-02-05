# Descrição do Projeto:

O projeto de Análise de Preço de Bitcoin é uma aplicação desenvolvida em Node.js com TypeScript, utilizando RabbitMQ para comunicação assíncrona, MongoDB para armazenamento de dados e Docker para orquestração de containers. A aplicação coleta e analisa dados de preços do Bitcoin, fornecendo uma visão abrangente das tendências e variações do mercado.

# Recursos Principais:

- Comunicação assíncrona via RabbitMQ para processamento eficiente de eventos.
- Integração com a API de preços do Bitcoin para coleta de dados em tempo real.
- Armazenamento persistente de dados no MongoDB.
- Utilização de Docker e Docker Compose para fácil implantação e escalabilidade.
- Comunicação em tempo real para geração da observabilidade com Websocket

# Tecnologias Utilizadas:

- Node.js
- TypeScript
- RabbitMQ
- MongoDB
- Docker
- Docker Compose
- Yarn
- Socket.io

# Explicação de funcionamento:
No repositório existem 2 pastas, cada uma como um serviço:

### Candle Generator
Essa pasta tem a conexão com API de valores e RabbitMQ
Analisa as variações de valores e manda uma mensagem ao RabbitMQ

### API
Essa pasta tem conexão com base de dados local MongoDB e RabbitMQ
Recebe mensagem, anota variação no MongoDB e envia via websocket

# Instruções de Configuração

## Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
### Candle Generator
```
PRICES_API=https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
QUEUE_NAME=candles
AMQP_SERVER=amqp://dev:senhadev@localhost:5672
```
### API
```
PORT=3000
AMQP_SERVER=amqp://dev:senhadev@localhost:5672
QUEUE_NAME=candles
SOCKET_EVENT_NAME=newCandle
SOCKET_CLIENT_SERVER=http://localhost:8080
MONGODB_CONNECTION_URL=mongodb://localhost/candles
```

## Instalar Dependências
```
yarn install
```

## Executar com Docker Compose
```
docker-compose up -d
```

## Executar sem Docker
Docker irá gerenciar as mensagens e criar dados na base de dados, de toda forma você deve iniciar sua aplicação
Para executar a aplicação é necessário
### API
```
yarn dev
```
### candle_generator
```
yarn start
```

* Será adicionado um Dockerfile para fazer de maneira automática e containerizada a execução da aplicação

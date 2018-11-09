FORMAT: 1A

# VUTTR API
Desafio feito para a BossaBox back-end challenge por Vinícius Sales utilizando as tecnologias: Node, Express e MongoDB.

### Iniciando o servidor (porta 3000)
```
npm start
```

### Rodando testes automatizados
```
npm test
```

## GET

# /tools
Para listarmos as tools precisamos apenas redirecionar a URL para **/tools**.

+ Response 200 (application/json)

        [
            {
                "_id": "5be353b5e7179a33cc154107",
                "title": "fastify",
                "link": "https://www.fastify.io/",
                "description": "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
                "tags": [
                    "web",
                    "framework",
                    "node",
                    "http2",
                    "https",
                    "localhost"
                ]
            },
            {
                "_id": "5be467fb49504e1bf00729b4",
                "title": "hotel",
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags": [
                    "node",
                    "organizing",
                    "webapps",
                    "domain",
                    "developer",
                    "https",
                    "proxy"
                ]
            },
            {
                "_id": "5be46842fb9e2a33742430b8",
                "title": "hotel",
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags": [
                    "node",
                    "organizing",
                    "webapps",
                    "domain",
                    "developer",
                    "https",
                    "proxy"
                ]
            }
        ]

### /tools?tag=localhost
Para filtrar as tools, é preciso inserir o parâmetro **tag** com o valor que você deseja filtar, o resultado será parecido com a listagem das tools.

### GET

+ Response 200 (application/json)

        [
            {
                "_id": "5be353b5e7179a33cc154107",
                "title": "fastify",
                "link": "https://www.fastify.io/",
                "description": "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
                "tags": [
                    "web",
                    "framework",
                    "node",
                    "http2",
                    "https",
                    "localhost"
                ]
            }
        ]

## POST
Para inserirmos tools à nossa API precisamos fazer uma requisição POST com o conteúdo que desejamos.

+ Input:

        {
            "title": "hotel",
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        }

+ Response 200 (application/json)

        {
            "title": "hotel",
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags": [
                "node",
                "organizing",
                "webapps",
                "domain",
                "developer",
                "https",
                "proxy"
            ],
            "_id": "5be46842fb9e2a33742430b8"
        }

## DELETE
### /tools/{id}

Para podermos excluir alguma tool da nossa API é necessário redirecionar a URL para /tools/**id da tool**

+ Parâmetro
  + id: `5be46842fb9e2a33742430b8` - Id da tool desejada.

+ Response 200 (application/json)

        {
            "n": 1,
            "opTime": {
                "ts": "6621542666402267137",
                "t": 1
            },
            "electionId": "7fffffff0000000000000001",
            "ok": 1,
            "operationTime": "6621542666402267137",
            "$clusterTime": {
                "clusterTime": "6621542666402267137",
                "signature": {
                    "hash": "B+jgjeYG9xVDv4V8guHTRPubPJI=",
                    "keyId": "6620776830783717377"
                }
            }
        }
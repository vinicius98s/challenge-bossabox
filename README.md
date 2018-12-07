# VUTTR

Front-end para a VUTTR utilizando [React](https://reactjs.org/)

## Servindo a build de desenvolvimento

### Instalando dependências
Para podermos rodar nossa aplicação precisamos instalar suas dependências.

Na pasta raiz do projeto vamos instalar as dependências da nossa API: 
```
npm install
```

Em seguida, a da nossa aplicação:
```
cd client
npm install
```

### Rodando o projeto
Voltado à pasta raiz, podemos abrir seu modo de desenvolvimento:
```
cd..
npm start
```

### Porta e API
Sua aplicação rodará na porta 3001, enquanto nossa API estará na porta 3000.


## Servindo a build de produção
Com as dependências instaladas:
```
cd client
npm run build
cd..
npm run build
```

### Porta e API
Sua aplicação rodará na porta 5000, enquanto nossa API estará na porta 3000.

Caso você esteja utilizando a [extensão do react para o chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), essa mensagem será exibida
![React production build](react-build.jpg)

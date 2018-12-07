# VUTTR

Front-end para a VUTTR utilizando [React](https://reactjs.org/)

## Servindo a build de desenvolvimento

Para podermos rodar nossa aplicação precisamos instalar suas dependências.

Na pasta raiz do projeto vamos instalar as dependências da nossa API: 
```
npm install
```

Em seguida, entre na pasta da nossa aplicação:
```
cd client
npm install
```

Voltado à pasta raiz do projeto, podemos abrir seu modo de desenvolvimento:
```
cd..
npm run dev
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

Acesse a aplicação em http://localhost:5000/
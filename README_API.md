# API de Contacto

Esta API permite enviar mensagens do formulário de contacto em `contacto.html` para o email `goncaloaleluiamkt@gmail.com`.

## Instalação

1. No diretório do projeto, execute:
   ```bash
   npm install
   ```

2. Copie o ficheiro de exemplo:
   ```bash
   copy .env.example .env
   ```

3. Atualize `.env` com as credenciais SMTP reais.

## Execução

```bash
npm start
```

## Testar

Abra `http://localhost:3000/contacto.html` e submeta o formulário. O endpoint da API é `POST /api/contact`.

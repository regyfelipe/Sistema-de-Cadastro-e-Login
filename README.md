# Sistema de Cadastro e Login - Concurseiro

Este projeto consiste em uma aplicação web para gerenciamento de cadastros e login de usuários em um sistema educacional voltado para concursos. A aplicação permite que os usuários se cadastrem, realizem login e acessem um painel de controle personalizado. Abaixo, estão os principais recursos implementados:

## Funcionalidades

### Cadastro de Usuários:
- O usuário pode criar uma conta fornecendo **nome**, **e-mail** e **senha**.
- A senha é protegida utilizando **bcrypt** para hash e criptografia.
- É possível adicionar um **avatar** (foto de perfil), que é processado e otimizado para a web utilizando a biblioteca **Sharp** para redimensionamento e formatação em WebP.
- Um **e-mail de confirmação** é enviado automaticamente ao usuário após o cadastro com informações de boas-vindas.

### Login Seguro:
- Implementação de login com **JSON Web Tokens (JWT)** para autenticação segura.
- A senha do usuário é validada e comparada de maneira segura com a senha armazenada no banco de dados.

### Validação e Feedback ao Usuário:
- Validação de formulários com mensagens claras para garantir que os campos sejam preenchidos corretamente.
- **Notificações interativas** de sucesso ou erro utilizando a biblioteca **react-notifications** para uma melhor experiência do usuário.


## Imagem do Projeto
![Simulado](github/imgs/202411070910.gif)


## Banco de Dados

### Criação da Tabela `users`:

```sql
-- Criação da tabela users com o campo avatar
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,             -- ID do usuário (gerado automaticamente)
    name VARCHAR(255) NOT NULL,         -- Nome do usuário
    email VARCHAR(255) UNIQUE NOT NULL, -- Email do usuário (único)
    password VARCHAR(255) NOT NULL,     -- Senha do usuário
    avatar VARCHAR(255),               -- Caminho ou URL do avatar (se houver)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  -- Data de atualização
);

-- Adicionando uma constraint para garantir que o e-mail seja único
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);



## GERAR O JWT 
* node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"


## Tecnologias Utilizadas

### Frontend:
- **React**: Para a criação da interface de usuário.
- **Bootstrap**: Para estilização e layout responsivo.
- **React Router**: Para gerenciamento de rotas da aplicação.
- **React Notifications**: Para exibição de notificações de sucesso e erro.

### Backend:
- **Node.js** e **Express**: Para a construção do servidor e APIs.
- **JWT (JSON Web Token)**: Para autenticação e autorização do usuário.
- **bcryptjs**: Para hash e verificação de senhas de maneira segura.
- **Sharp**: Para otimização de imagens, redimensionamento e conversão para o formato WebP.

### Armazenamento de Imagem:
- **Armazenamento local de avatares** com processamento de imagens no servidor.

# Brain Agriculture Frontend

O frontend do Brain Agriculture é uma aplicação web desenvolvida em React para interagir com a API do backend. A aplicação fornece uma interface para criar, listar, atualizar e excluir produtores rurais, além de exibir um painel de controle com gráficos e widgets.

## Sumário

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Configuração do Frontend](#configuração-do-frontend)
3. [Funcionalidades](#funcionalidades)
4. [Rodando a Aplicação Localmente](#rodando-a-aplicação-localmente)
5. [Rodando a Aplicação com Docker](#rodando-a-aplicação-com-docker)
6. [Como Contribuir](#como-contribuir)

## Tecnologias Utilizadas

- **React** como biblioteca de construção da interface
- **Vite** como bundler para desenvolvimento rápido
- **Nginx** para servir a aplicação em produção
- **Docker** para containerização

## Configuração do Frontend

### Requisitos

- Node.js (versão 20+)

### Passos para rodar o frontend localmente

1. **Instalar dependências:**

   No diretório `brain_agriculture_front`, execute:

   ```bash
   npm install


#### Rodar a aplicação:

Para iniciar a aplicação em modo de desenvolvimento, execute:
```
npm run dev
```
A aplicação estará disponível em http://localhost:3000.

### Funcionalidades
A aplicação frontend inclui as seguintes funcionalidades principais:

- **Criar Produtor:** Interface para adicionar novos produtores rurais ao sistema.
- **Dashboard:** Exibe gráficos e widgets com informações resumidas sobre os produtores e outras métricas relevantes.
- **Listagem de Produtores:** Visualiza uma lista de todos os produtores cadastrados.
- **Atualização de Produtores:** Permite atualizar as informações de um produtor existente.
- **Exclusão de Produtores:** Permite remover um produtor do sistema.


### Rodando a Aplicação com Docker
A aplicação está preparada para rodar via Docker.

Passos para rodar com Docker
Certifique-se de que o Docker e o Docker Compose estão instalados na sua máquina.

No diretório raiz do projeto (onde está o docker-compose.yml), execute:
```
docker-compose up --build
```
Isso irá:

Construir e iniciar o frontend.
A aplicação frontend estará disponível em http://localhost:3000.

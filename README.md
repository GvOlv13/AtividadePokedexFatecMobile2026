<div align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Pokédex Logo" width="200"/>
  <h1>Pokédex App - Fatec Mobile 2026</h1>
  <p><b>Um aplicativo completo e responsivo (Mobile & Web) integrado à API Oficial da AWS</b></p>

  <p>
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>
</div>

<br />

## 📖 Sobre o Projeto

Este projeto é uma aplicação **Pokédex** desenvolvida em **React Native com Expo Router** como parte de uma atividade acadêmica (Fatec Mobile 2026). O diferencial deste projeto é sua total **responsividade** (adaptando-se perfeitamente tanto em navegadores Desktop quanto em dispositivos Android/iOS) e sua **integração em tempo real com uma API Serverless da AWS**.

Os usuários podem se cadastrar, navegar por toda a Pokédex oficial, visualizar detalhes de cada Pokémon, montar o seu time perfeito, e simular batalhas para capturar novos monstrinhos!

---

## 🚀 Funcionalidades Principais

- **Autenticação Segura:** Login e Cadastro com validação de senhas (mínimo de 6 caracteres, mascaramento de campos) comunicando-se diretamente com o endpoint de `auth` da AWS.
- **Lista da Pokédex:** Consumo em tempo real da PokeAPI/Integração do professor para listar todos os Pokémons disponíveis.
- **Montagem de Time (Team Builder):**
  - Integração inteligente com a regra de negócios da API oficial: **o time deve ter sempre exatamente 5 Pokémons**.
  - **Sistema de Substituição (Swap):** Interface em modal intuitiva que permite aos usuários trocarem perfeitamente os membros de seus times sem quebrar o limite imposto pelo banco de dados.
- **Sistema de "Batalha" (Captura):** Mecânica onde o usuário batalha e, ao vencer, é recompensado com um Pokémon sorteado aleatoriamente e um modal customizado de comemoração de "Vitória!".
- **Perfil do Treinador (Stats):** Visualização em tempo real do nível, número de vitórias e derrotas consumidas do backend.
- **Design Adaptativo (Responsive):** Uso avançado de `Platform.select()` para entregar interfaces (ex: Bottom Sheets no celular e Cards centralizados no Web) na mesma base de código.

---

## 🛠️ Tecnologias e Ferramentas

- **Frontend Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Roteamento:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Comunicação HTTP:** [Axios](https://axios-http.com/)
- **Armazenamento Local:** `@react-native-async-storage/async-storage` (Persistência de Sessão)
- **Ícones:** `@expo/vector-icons` (Ionicons)
- **Gerenciamento de Estado:** React Context API (`AuthContext`)

---

## ⚙️ Como rodar o projeto

Certifique-se de ter o **Node.js** e o aplicativo **Expo Go** instalados (no celular) ou um emulador rodando no PC.

**1. Clone o repositório e acesse a pasta:**
```bash
git clone https://github.com/SeuUsuario/AtividadePokedexFatecMobile2026.git
cd AtividadePokedexFatecMobile2026
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Inicie o servidor do Expo:**
```bash
npx expo start
```

**4. Escolha como visualizar:**
- **Celular (Android/iOS):** Leia o QR Code usando o aplicativo Expo Go.
- **Emulador Android:** Pressione `a` no terminal.
- **Web (PC):** Pressione `w` no terminal para abrir a versão desktop responsiva direto no navegador.

---

## 🏗️ Estrutura do Projeto

Abaixo estão os principais destaques da arquitetura:

- `/app`: Páginas da aplicação estruturadas pelo *Expo Router* (ex: `(auth)` para telas públicas, `(app)` para o dashboard logado com abas).
- `/components`: Componentes reutilizáveis como botões, modais estilizados, e os inputs de senha (agora usando mascaramento cross-platform).
- `/context`: Contexto global de autenticação, controlando logins, registros e salvamento local.
- `/integration`: Camada de serviços (`api.ts` e `pokemonIntegration.ts`) que concentra todas as requisições (GET, PUT, POST, DELETE) para a infraestrutura Serverless da AWS.

---

<div align="center">
  Desenvolvido com 🔴⚪ para a disciplina Mobile - Fatec 2026
</div>

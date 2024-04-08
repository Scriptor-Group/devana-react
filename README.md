# Devana React

Le composant `Conversation` est un composant React qui implémente une conversation interactive avec une intelligence artificielle. Il utilise un hook personnalisé, `useChat`, pour gérer le stream entre l'utilisateur et l'IA. Ainsi que le module `useApi` pour gérer les appels sécurisé à l'API.

<img width="843" alt="Présentation" src="https://github.com/Scriptor-Group/devana-react/raw/main/assets/presentation.png">

## Installation

Pour installer le composant `Conversation`, vous devez d'abord ajouter le package à votre projet en utilisant npm ou yarn :

```bash
npm install devana-react
```

ou

```bash
yarn add devana-react
```

Ensuite, vous pouvez importer le composant dans votre fichier et l'utiliser comme suit :

```jsx
import { Conversation, useChat, useApi } from "devana-react";
```

## Props

Le composant `Conversation` accepte les props suivantes :

- `publicKey` (obligatoire) : La clé publique utilisée pour l'authentification avec l'API.
- `welcomeMessage` (optionnel) : Un message de bienvenue à afficher au début de la conversation.
- `assistantBackgroundColor` (optionnel) : La couleur de fond des messages de l'assistant.
- `assistantTextColor` (optionnel) : La couleur du texte des messages de l'assistant.
- `userBackgroundColor` (optionnel) : La couleur de fond des messages de l'utilisateur.
- `userTextColor` (optionnel) : La couleur du texte des messages de l'utilisateur.
- `chatBackgroundColor` (optionnel) : La couleur de fond principale de la zone de conversation.
- `chatBackgroundSecondaryColor` (optionnel) : La couleur de fond secondaire de la zone de conversation (utilisée pour le dégradé).
- `buttonBackgroundColor` (optionnel) : La couleur de fond du bouton d'envoi.
- `buttonTextColor` (optionnel) : La couleur du texte du bouton d'envoi.
- `intls` (optionnel) : Un objet contenant les traductions pour les différents éléments du composant.

## Utilisation

Pour utiliser le composant `Conversation`, vous devez l'importer dans votre fichier et le rendre en lui passant les props nécessaires. Voici un exemple d'utilisation :

```jsx
import { Conversation } from ".devana-react";

function App() {
  return (
    <div>
      <Conversation
        publicKey="votre_clé_publique"
        welcomeMessage="Bienvenue dans la conversation !"
        assistantBackgroundColor="#f0f0f0"
        assistantTextColor="#333333"
        userBackgroundColor="#e0e0e0"
        userTextColor="#111111"
        chatBackgroundColor="#ffffff"
        chatBackgroundSecondaryColor="#f5f5f5"
        buttonBackgroundColor="#007bff"
        buttonTextColor="#ffffff"
      />
    </div>
  );
}
```

## Fonctionnalités

- Affiche les messages échangés entre l'utilisateur et l'assistant.
- Permet à l'utilisateur de saisir et d'envoyer des messages.
- Gère automatiquement le défilement vers le bas lorsque de nouveaux messages sont ajoutés.
- Utilise la bibliothèque `@uiw/react-markdown-preview` pour afficher les messages au format Markdown.
- Affiche un message de bienvenue personnalisable au début de la conversation.
- Permet de personnaliser les couleurs de fond et de texte des messages de l'assistant et de l'utilisateur.
- Permet de personnaliser les couleurs de fond de la zone de conversation.
- Permet de personnaliser les couleurs du bouton d'envoi.
- Prend en charge les traductions via l'objet `intls`.

## Chat API

Pour plus d'informations sur l'API de chat, veuillez consulter la documentation officielle : [https://github.com/Scriptor-Group/documentation/blob/main/Devana/publicAgentAPI.md](https://github.com/Scriptor-Group/documentation/blob/main/Devana/publicAgentAPI.md).

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
- `welcomeMessage` (optionnel) : Un message de bienvenue à afficher au début de la conversation selon le langage sélectionné.
- `assistantBackgroundColor` (optionnel) : La couleur de fond des messages de l'assistant.
- `assistantTextColor` (optionnel) : La couleur du texte des messages de l'assistant.
- `userBackgroundColor` (optionnel) : La couleur de fond des messages de l'utilisateur.
- `userTextColor` (optionnel) : La couleur du texte des messages de l'utilisateur.
- `chatBackgroundColor` (optionnel) : La couleur de fond principale de la zone de conversation.
- `chatBackgroundSecondaryColor` (optionnel) : La couleur de fond secondaire de la zone de conversation (utilisée pour le dégradé).
- `buttonBackgroundColor` (optionnel) : La couleur de fond du bouton d'envoi.
- `buttonTextColor` (optionnel) : La couleur du texte du bouton d'envoi.
- `intls` (optionnel) : Un objet contenant les traductions pour les différents éléments du composant.
- `onEvent`: (optionnel) : Une fonction qui est appelée lorsque l'événement est déclenché. Les événements disponibles sont:
  - `messageSent`: lorsque l'utilisateur a envoyé un message.
  - `messageReceived`: lorsque un message a été reçu de l'assistant.
  - `onError`: lorsqu'une erreur est rencontrée lors de l'envoi du message.
- `displayActions`: (optionnel) : Si `true`, affiche les boutons d'actions pour la fiabilité du message.
- `displayTools`: (optionnel) : Si `true`, affiche les outils de l'assistant en cours d'exécution.
- `theme`: (optionnel) : Le thème du composant. Les valeurs possibles sont "light" et "dark". Par défaut, le thème est "light".
- `scrollHeightChat`: (optionnel) : La hauteur de la zone de conversation. Par défaut, la hauteur est "50vh".
- `fontFamilyMarkdown`: (optionnel) : La police de caractères Markdown. Par défaut, la police est "inherit".
- `themeOverrides`: (optionnel) : Les variables CSS à appliquer au composant. Les propriétés disponibles sont:
  - `--bg-color-light`: la couleur de fond clair.
  - `--bg-color-white`: la couleur de fond blanc.
  - `--bg-color-dark`: la couleur de fond sombre.
  - `--text-color-light`: la couleur du texte clair.
  - `--text-color-dark`: la couleur du texte sombre.
  - `--box-shadow-light`: la valeur de l'ombre claire.
  - `--box-shadow-dark`: la valeur de l'ombre sombre.
  - `--box-shadow-lang-light`: la valeur de l'ombre claire pour les langages.
  - `--box-shadow-langdark`: la valeur de l'ombre sombre pour les langages.
  - `--border-light`: la couleur de la bordure claire.
  - `--border-dark`: la couleur de la bordure sombre.
- `classes`: (optionnel) : Les classes CSS à appliquer au composant. Les propriétés disponibles sont:
  - `container`: la classe CSS pour le conteneur principal.
  - `messages`: la classe CSS pour le conteneur des messages.
  - `inputContainer`: la classe CSS pour le conteneur de l'input.
  - `input`: la classe CSS pour l'input.
  - `messageUser`: la classe CSS pour le message de l'utilisateur.
  - `messageAssistant`: la classe CSS pour le message de l'assistant.
  - `poweredBy`: la classe CSS pour le texte "Propulsé par Devana".
  - `typing`: la classe CSS pour le loading "...".
  - `actionsContainer`: la classe CSS pour le conteneur des boutons d'actions.
  - `btnContainerFiability`: la classe CSS pour le conteneur des boutons de fiabilité.
  - `thumpDownIcon`: la classe CSS pour l'icône de "thumb down".
  - `thumpUpIcon`: la classe CSS pour l'icône de "thumb up".

## Utilisation

Pour utiliser le composant `Conversation`, vous devez l'importer dans votre fichier et le rendre en lui passant les props nécessaires. Voici un exemple d'utilisation :

```jsx
import { Conversation } from "devana-react";

function App() {
  return (
    <div>
      <Conversation
        publicKey="votre_clé_publique"
        welcomeMessage={{
          fr: "Bienvenue dans la conversation !",
          us: "Welcome to the conversation!",
        }}
        assistantBackgroundColor="#f0f0f0"
        assistantTextColor="#333333"
        userBackgroundColor="#e0e0e0"
        userTextColor="#111111"
        chatBackgroundColor="#ffffff"
        chatBackgroundSecondaryColor="#f5f5f5"
        buttonBackgroundColor="#007bff"
        buttonTextColor="#ffffff"
        onEvent={(eventName, payload) => {
          console.log(eventName, payload);
        }}
        displayActions
        displayTools
        theme="dark"
        scrollHeightChat={"80vh" || "300px" || "80rem"}
        fontFamilyMarkdown="sans-serif"
        themeOverrides={{
        "--bg-color-light": "#f6f6f6";
        "--bg-color-white":"#fff";
        "--bg-color-dark": "#000";
        "--text-color-light": "#000";
        "--text-color-dark": "#fff";
        "--box-shadow-light": "0 0 0px 10px rgba(255, 255, 255, 0.4)";
        "--box-shadow-dark": "0 0 0px 10px rgba(255, 255, 255, 0.4)";
        "--box-shadow-lang-light": "0 0 0px 10px rgba(0, 0, 0, 0.4)";
        "--box-shadow-langdark": "0 0 0px 10px rgba(0, 0, 0, 0.4)";
        "--border-light": "#d9d9d9";
        "--border-dark": "#000000";
        }}
        classes={{
          container: "my-custom-class",
          messages: "my-custom-class",
          inputContainer: "my-custom-class",
          input: "my-custom-class",
          messageUser: "my-custom-class",
          messageAssistant: "my-custom-class",
          poweredBy: "my-custom-class",
          typing: "my-custom-class",
          actionsContainer: "my-custom-class",
          btnContainerFiability: "my-custom-class",
          thumpDownIcon: "my-custom-class",
          thumpUpIcon: "my-custom-class",
        }}
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
- Permet d'afficher les boutons d'actions pour la fiabilité du message.
- Permet d'afficher les outils de l'assistant en cours d'exécution.
- Permet de personnaliser le thème du composant .
- Permet de customiser le thème.
- Permet de personnaliser la hauteur de la zone de conversation.
- Permet de personnaliser les classes CSS du composant.
- Permet de personnaliser la police de caractères Markdown.

## Chat API

Pour plus d'informations sur l'API de chat, veuillez consulter la documentation officielle : [https://github.com/Scriptor-Group/documentation/blob/main/Devana/publicAgentAPI.md](https://github.com/Scriptor-Group/documentation/blob/main/Devana/publicAgentAPI.md).

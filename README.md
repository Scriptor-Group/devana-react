# Devana React

Le composant `Conversation` est un composant React qui implémente une conversation interactive avec une intelligence artificielle. Il utilise un hook personnalisé, `useChat`, pour gérer la communication bidirectionnelle entre l'utilisateur et l'IA.

<img width="843" alt="Capture d’écran 2024-03-04 à 16 58 53" src="https://github.com/Scriptor-Group/devana-react/assets/4999786/76f503e7-a37c-4e87-84b7-ca256df780d0">

## Les props

Le composant `Conversation` accepte les props suivants :

- `metadata` (object) : Metadonnées optionnelles supplémentaires à passer au chat, permettant l'analyse des KPI.
- `aiId` (string) : L'identifiant unique de l'IA avec laquelle l'utilisateur va interagir, présent dans l'interface Devana.
- `chatId` (string) : L'identifiant unique du chat, si un chat existant est utilisé (permet de récupérer un chat existant).
- `agentComponent` (React.Component): Un composant personnalisé pour afficher les messages de l'agent, nous recommandons idéalement d'utiliser `@uiw/react-markdown-preview` pour l'affichage des messages.
- `userComponent` (React.Component): Un composant personnalisé pour afficher les messages de l'utilisateur, nous recommandons idéalement d'utiliser `@uiw/react-markdown-preview` pour l'affichage des messages.

## Utilisation

Pour utiliser le composant `Conversation`, importez-le dans votre fichier comme suit :

```jsx
import { Conversation } from "chemin/vers/Conversation";
```

Puis, utilisez le composant dans votre code comme suit :

```jsx
<Conversation aiId="votre-ai-id" />
```

Vous pouvez également fournir des composants personnalisés `agentComponent` et `userComponent` pour personnaliser l'affichage des messages de l'agent et de l'utilisateur.

```jsx
<Conversation
  aiId="votre-ai-id"
  agentComponent={MonAgentComponent}
  userComponent={MonUserComponent}
/>
```

### agentComponent et userComponent

Ces composants reçoivent un seul argument, un objet avec une propriété `message` qui contient le message de l'agent ou de l'utilisateur. Il doit renvoyer un élément React.

## Fonctionnement interne

- Le composant utilise l'état local pour gérer l'identifiant du chat, la requête en cours et les messages de la conversation.
- Il utilise le hook `useChat` pour envoyer des messages à l'IA et gérer les réponses.
- Quand un message est soumis, il est ajouté à la liste des messages et envoyé à l'IA.
- Les réponses de l'IA sont ajoutées à la liste des messages dès qu'elles sont reçues.
- En cas d'erreur lors de l'envoi du message, un message d'erreur est affiché dans la console.
- Les messages de l'utilisateur et de l'IA sont affichés dans une fenêtre de conversation, avec les messages de l'utilisateur alignés à droite et les messages de l'IA à gauche.

## Styles

Le composant utilise des styles en ligne pour définir son apparence. Vous pouvez personnaliser ces styles en passant vos propres composants `agentComponent` et `userComponent`.

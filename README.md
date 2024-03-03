# Devana React

Le composant `Conversation` est un composant React qui implémente une conversation interactive avec une intelligence artificielle. Il utilise un hook personnalisé, `useChat`, pour gérer la communication bidirectionnelle entre l'utilisateur et l'IA.

## Les props

Le composant `Conversation` accepte les props suivants :

- `metadata` (object) : Metadonnées optionnelles supplémentaires à passer au chat.
- `aiId` (string) : L'identifiant unique de l'IA avec laquelle l'utilisateur va interagir.
- `chatId` (string) : L'identifiant unique du chat, si un chat existant est utilisé.
- `agentComponent` (React.Component): Un composant personnalisé pour afficher les messages de l'agent.
- `userComponent` (React.Component): Un composant personnalisé pour afficher les messages de l'utilisateur.
- `children` (React.ReactNode): Éléments enfants optionnels à afficher dans le composant de conversation.

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

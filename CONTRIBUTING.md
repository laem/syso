# Comment contribuer ?

Merci de prendre le temps de contribuer ! 🎉

Pour contribuer aux modèles de calcul climat, direction [futureco-data](https://github.com/laem/futureco-data).

Pour contribuer au code du site, RDV dans la section *issues* pour voir les discussions et avancement actuels.

Ci-dessous des informations plus générales sur la contribution.

### Technologies

L'application est écrite en JavaScript, elle est exécuté uniquement côté client — il n'y a pas de serveur applicatif, nous générons des fichiers `.html` statiques

Nous utilisons :

- [TypeScript](https://www.typescriptlang.org) pour ajouter un système de typage à notre code JavaScript. Le typage n'est pas utilisé partout et il n'est pas obligatoire de le prendre en compte pour contribuer.
- [Yarn](https://yarnpkg.com/fr) pour la gestion des dépendances (à la place de NPM qui est souvent utilisé dans les applications JavaScript)
- [React](https://reactjs.org) pour la gestion de l'interface utilisateur
- [Redux](https://redux.js.org) pour gérer le “state” de l'application côté client
- [Prettier](https://prettier.io/) pour formater le code source, l'idéal est de configurer votre éditeur de texte pour que les fichiers soit formatés automatiquement quand vous sauvegardez un fichier. Si vous utilisez [VS Code](https://code.visualstudio.com/) cette configuration est automatique.
- [Webpack](https://webpack.js.org) pour le “bundling”
- [Eslint](http://eslint.org) qui permet par exemple d'éviter de garder des variables inutilisées
- [Ramda](https://ramdajs.com) comme libraire d'utilitaires pour manipuler les listes/objects/etc (c'est une alternative à lodash ou underscore)
- [Mocha](https://mochajs.org), [Jest](https://jestjs.io) et [Cypress](https://www.cypress.io) pour les l'execution des tests. Plus d'informations dans la section consacrée aux tests.

### Démarrage

Si l'historique des commits est trop volumineux, vous pouvez utiliser le paramètre `depth` de git pour ne télécharger que les derniers commits.

```
# Clone this repo on your computer
git clone --depth 100 git@github.com:betagouv/mon-entreprise.git && cd mon-entreprise

# Install the Javascript dependencies through Yarn
yarn install

# Run the server
yarn start
```

L'application est exécuté sur https://localhost:8080/mon-entreprise pour la version française et http://localhost:8080/infrance pour la version anglaise.

### Messages de commit

A mettre sans retenue dans les messages de commit :

https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages

- 🎨 `:art:` when working on the app's visual style
- 🐎 `:racehorse:` when improving performance
- 📝 `:memo:` when writing docs
- 🐛 `:bug:` when fixing a bug
- 🔥 `:fire:` when removing code or files
- 💚 `:green_heart:` when fixing the CI build
- ✅ `:white_check_mark:` when adding tests
- ⬆️ `:arrow_up:` when upgrading dependencies
- :sparkles: `:sparkles:` when formatting, renaming, reorganizing files

Et ceux spécifiques au projet :

- :gear: `:gear:` pour une contribution au moteur qui traite les YAML
- :hammer: `:hammer:` pour une contribution à la base de règles
- :calendar: `:calendar:` pour un changement de règle du à une évolution temporelle (en attendant mieux)
- :chart_with_upwards_trend: `:chart_with_upwards_trend:` pour une amélioration du tracking
- :alien: `:alien:` pour ajouter des traductions
- :wheelchair: `:wheelchair:` pour corriger les problèmes liés à l'accessibilité
- :fountain_pen: `:fountain_pen:` pour séparer les commits liés à la modification du contenu

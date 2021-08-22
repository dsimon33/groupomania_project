PROJET n°7 OpenClassroom / Réalisation du frontend et backend et utilsation d'une base de données SQL

# Groupomania_project
Création d'un réseau social d'entreprise

# Technologies utilisées
. Vue@2.6.14//VueRouter//Vue/cli@4.5.13//Node.JS//Express//ORM Sequelize (SQL)

PREREQUIS : Avoir installé Mysql et y avoir créé une base de donnée.


# - Cloner les dossiers frontend et backend et assurez-vous d'avoir installer le NPM(node package manager)

## - Pour lancer le backend

### - A la racine du dossier backend, créer un fichier .env afin d'y insérer les paramètres d'environnement nécessaires à la connexion

### - Dans le fichier nouvellement créé, y insérer les lignes suivantes :

![New Issue · dsimon33groupomania_project - Google Chrome](https://user-images.githubusercontent.com/76514993/130363957-e0831bf5-f920-4e53-b86b-693a20e67920.jpg)

attention au SECRET=, il faut bien y mettre une suite de caractères aléatoire (ex: TOKEN_SECRET=sdflksdfhgjdhgrubnfdkgjheriugfjg).

### - Dans le fichier app.js, décommenter la partie encadrée  puis enregistrer la modification afin de mettre à jour la table des roles (utilisateur, administrateur, modérateur)

![ app js - groupomania - Visual Studio Code](https://user-images.githubusercontent.com/76514993/130364314-3ff3a694-db77-4666-8bab-25c765bcdc1d.jpg)

### - Dans votre terminal, charger le package nodemon : npm install -g nodemon (attention de bien se situer sur le dossier backend)
### - puis lancer le serveur : nodemon

Les différentes tables de votre base de données sont à présents créées, il ne vous reste plus qu'à recommenter la zone décommenter auparavant afin que votre serveur soit prêt a fonctionner.

Aprés une nouvelle sauvegarde du fichier app.js, vous devriez obtenir :
  Listening on port 8080 sur votre terminal


## - Pour lancer le frontend

### Dans votre terminal, taper : npm run serve (attention de bien se situer sur le dossier frontend)

Vous devrier obtenir : 
  App running at:
  - Local:   http://localhost:8081/ sur votre terminal

## - Pour créer votre utilisateur Admin

### Créer votre utilisateur admin en premier via l'application

### Ouvrir votre terminal SQL Command Line Client et connectez-vous avec votre mot de passe

#### Connectez-vous à la Base de donnée que vous avez créée avec la commande : USE "nom de votre BDD";
#### Taper : "SELECT * FROM users;" pour vous assurer que votre utilisateur admin porte bien l'id "1".
#### Donner le role administrateur à votre admin en tapant la commande suivante : UPDATE user_roles SET roleId=3 WHERE userId=1  (adapter le numéro du userId si besoin).

Vous êtes prêt, votre admin disposera à présent des droits administrateurs a sa prochaine connexion.

## Etape 1 : initialiser le projet sur "p6_back" avec la commande "cd" en faisant "cd p6_back"
## Etape 2 : pour le server du back-end, il faut faire "npm start"
## Etape 3 : initialiser le projet sur "p6_front" avec la commande "cd" en faisant "cd p6_front"
## Etape 4 : pour le server du front-end, il faut "npm start"

## Compléter les variables d'environement selon le modèle fourni dans la fiche exemple
## A partir du frontend : 
    Créer un compte : avec une adresse mail au format XXX@example
    Choisir un mot de passe :   compris entre 5 et 15 caractères avec au moins une masjuscule, une minuscule et deux chiffres sans espace. 
    Ces mots ne sont pas acceptés comme mot de passe : "Password", "password1232"
## Chaque utilisateur peut voir et liker ou disliker toutes les sauces qui sont enregistrées mais il ne peut modifier que les suaces qu'il a téléchargé. Il ne peut pas modifier les suaces téléchargées par un autre utilisateur.  

=======
Routes dans Postman 
## Pour créer un compte
SIGNUP POST : http://localhost:3000/api/auth/signup
## Pour se connecter
LOGIN  POST : http://localhost:3000/api/auth/login
## Pour envoyer une sauce dans la base de données
SAUCE POST : http://localhost:3000/api/sauces
## Pour afficher toutes les sauces enregistrées dans la base de données
SAUCE GET : http://localhost:3000/api/sauces
## Pour afficher une seule sauce à partir de son ID 
SAUCE GET : http://localhost:3000/api/sauces/:id  // il faut remplacer le (:id) par l'id de l'objet créé dans la base de données
## Pour modifier une sauce à partir de son ID 
SAUCE PUT : http://localhost:3000/api/sauces/:id
## Pour supprimer une sauce à partir de son ID 
SAUCE DELETE : http://localhost:3000/api/sauces/:id

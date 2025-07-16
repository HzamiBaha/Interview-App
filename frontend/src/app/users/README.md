# 👥 User Management with Angular Signals

## 🎯 Objectif

Ce projet est une démonstration simple de l’utilisation des **Angular Signals** pour gérer une liste d’utilisateurs.

Il montre comment :

- Charger des données depuis une API avec `toSignal`
- Gérer un état local modifiable avec `writableSignal`
- Calculer des valeurs dérivées avec `computed`
- Réagir automatiquement aux changements avec `effect`

---

## 🚀 Comportement de l’application

- Charge automatiquement une liste d’utilisateurs depuis l’API [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/users)
- Affiche la liste des utilisateurs
- Permet de filtrer les utilisateurs par nom via un champ texte
- Affiche en temps réel le nombre total d’utilisateurs et le nombre d’utilisateurs correspondant au filtre
- Permet d’ajouter un nouvel utilisateur manuellement (nom + email)
- Log dans la console à chaque modification du filtre pour illustrer la réactivité des effets

---

## 💡 Technologies utilisées

- Angular 17+ avec Signals
- HttpClient pour les appels API
- API publique JSONPlaceholder pour les données utilisateurs

# Commandes divers et variées


## Guide de suppréssion des branches 


1 - Supprimer la branche sur GitHub
```
git push origin --delete nom_de_la_branche
```
2 - Supprimer la branche en local
```
git branch -d nom_de_la_branche
```
3 - Récupérer une branche non visible
```
git fetch
```
4 - Nettoyer les branches distantes supprimées
```
git config --global fetch.prune true
```
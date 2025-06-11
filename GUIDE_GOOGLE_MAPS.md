# 🗺️ Guide de Configuration Google Maps

## ⚠️ IMPORTANT : Configuration obligatoire

Pour que la carte fonctionne dans le formulaire d'inscription des restaurants, vous **DEVEZ** configurer une clé API Google Maps.

## 📋 Étapes de configuration

### 1. Créer un compte Google Cloud
- Allez sur [Google Cloud Console](https://console.cloud.google.com/)
- Connectez-vous avec votre compte Google
- Acceptez les conditions d'utilisation

### 2. Créer un projet
- Cliquez sur "Sélectionner un projet" en haut
- Cliquez sur "Nouveau projet"
- Donnez un nom à votre projet (ex: "FoodSwift Maps")
- Cliquez sur "Créer"

### 3. Activer les APIs nécessaires
Vous devez activer ces 3 APIs :

#### a) Maps JavaScript API
- Allez dans "APIs et services" > "Bibliothèque"
- Recherchez "Maps JavaScript API"
- Cliquez dessus et cliquez sur "Activer"

#### b) Places API
- Recherchez "Places API"
- Cliquez dessus et cliquez sur "Activer"

#### c) Geocoding API
- Recherchez "Geocoding API"
- Cliquez dessus et cliquez sur "Activer"

### 4. Créer une clé API
- Allez dans "APIs et services" > "Identifiants"
- Cliquez sur "Créer des identifiants" > "Clé API"
- Copiez la clé générée (elle ressemble à : `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 5. Configurer la clé dans votre projet
- Ouvrez le fichier `.env` à la racine de votre projet
- Remplacez `your_google_maps_api_key_here` par votre vraie clé API :
```
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 6. Redémarrer le serveur
```bash
npm run dev
```

## 🔒 Sécuriser votre clé API (Recommandé)

### Restrictions par domaine
- Retournez dans "Identifiants" > Cliquez sur votre clé API
- Sous "Restrictions d'application", sélectionnez "Référents HTTP"
- Ajoutez vos domaines autorisés :
  - `localhost:5173/*` (pour le développement)
  - `votre-domaine.com/*` (pour la production)

### Restrictions par API
- Sous "Restrictions d'API", sélectionnez "Restreindre la clé"
- Sélectionnez uniquement :
  - Maps JavaScript API
  - Places API
  - Geocoding API

## 💰 Coûts et quotas

### Quotas gratuits (par mois)
- **Maps JavaScript API** : 28 000 chargements gratuits
- **Geocoding API** : 40 000 requêtes gratuites
- **Places API** : Varie selon le type de requête

### Surveillance des coûts
- Configurez des alertes de facturation dans Google Cloud
- Définissez des quotas pour éviter les dépassements

## 🐛 Dépannage

### La carte ne s'affiche pas
1. **Vérifiez la clé API** : Assurez-vous qu'elle est correctement copiée dans `.env`
2. **Redémarrez le serveur** : `npm run dev`
3. **Vérifiez la console** : Ouvrez les outils de développement (F12)
4. **Vérifiez les APIs** : Assurez-vous que les 3 APIs sont activées

### Erreurs courantes
- `InvalidKeyMapError` : Clé API invalide ou non configurée
- `ApiNotActivatedMapError` : Une des APIs n'est pas activée
- `RefererNotAllowedMapError` : Restrictions de domaine trop strictes

### Messages d'erreur dans l'application
L'application affiche des messages d'aide détaillés si la configuration n'est pas correcte.

## 🎯 Test de fonctionnement

Une fois configuré, vous devriez pouvoir :
- ✅ Voir la carte s'afficher
- ✅ Cliquer sur la carte pour positionner le marqueur
- ✅ Glisser le marqueur pour changer la position
- ✅ Voir l'adresse se mettre à jour automatiquement
- ✅ Utiliser le bouton de géolocalisation

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez ce guide étape par étape
2. Consultez la [documentation officielle Google Maps](https://developers.google.com/maps/documentation/javascript)
3. Vérifiez les quotas et la facturation dans Google Cloud Console

---

**Note** : La configuration de Google Maps est **obligatoire** pour que la fonctionnalité de géolocalisation fonctionne. Sans clé API valide, seule la saisie manuelle d'adresse sera possible.
# 🚀 ACTIVATION DE L'API GOOGLE MAPS - GUIDE COMPLET

## ⚠️ ÉTAPES OBLIGATOIRES À SUIVRE

### 🔗 LIENS DIRECTS POUR GAGNER DU TEMPS

1. **[Créer un projet Google Cloud](https://console.cloud.google.com/projectcreate)**
2. **[Activer Maps JavaScript API](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)**
3. **[Activer Places API](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)**
4. **[Activer Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)**
5. **[Créer une clé API](https://console.cloud.google.com/apis/credentials)**

---

## 📋 PROCÉDURE DÉTAILLÉE

### ÉTAPE 1 : Créer un projet Google Cloud
1. Allez sur **[Google Cloud Console](https://console.cloud.google.com/)**
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"Sélectionner un projet"** en haut
4. Cliquez sur **"Nouveau projet"**
5. Nom du projet : `FoodSwift-Maps` (ou autre nom)
6. Cliquez sur **"Créer"**
7. ⏳ Attendez que le projet soit créé (30 secondes)

### ÉTAPE 2 : Activer les APIs (OBLIGATOIRE)

#### A) Maps JavaScript API
1. Cliquez sur ce lien : **[Activer Maps JavaScript API](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)**
2. Sélectionnez votre projet si demandé
3. Cliquez sur **"ACTIVER"**
4. ✅ Attendez la confirmation

#### B) Places API
1. Cliquez sur ce lien : **[Activer Places API](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)**
2. Cliquez sur **"ACTIVER"**
3. ✅ Attendez la confirmation

#### C) Geocoding API
1. Cliquez sur ce lien : **[Activer Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)**
2. Cliquez sur **"ACTIVER"**
3. ✅ Attendez la confirmation

### ÉTAPE 3 : Créer une clé API
1. Allez sur **[Créer des identifiants](https://console.cloud.google.com/apis/credentials)**
2. Cliquez sur **"+ CRÉER DES IDENTIFIANTS"**
3. Sélectionnez **"Clé API"**
4. 🎉 **Copiez immédiatement la clé générée** (elle ressemble à : `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### ÉTAPE 4 : Configurer la clé dans votre projet
1. Ouvrez le fichier `.env` dans votre projet
2. Remplacez `your_google_maps_api_key_here` par votre vraie clé :
```
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
3. **Sauvegardez le fichier**

### ÉTAPE 5 : Redémarrer l'application
```bash
npm run dev
```

---

## 🔒 SÉCURISATION (RECOMMANDÉ)

### Restreindre la clé API
1. Dans **[Identifiants](https://console.cloud.google.com/apis/credentials)**
2. Cliquez sur votre clé API
3. **Restrictions d'application** :
   - Sélectionnez "Référents HTTP (sites web)"
   - Ajoutez : `localhost:5173/*`
   - Ajoutez votre domaine de production si applicable

4. **Restrictions d'API** :
   - Sélectionnez "Restreindre la clé"
   - Cochez uniquement :
     - ✅ Maps JavaScript API
     - ✅ Places API  
     - ✅ Geocoding API

---

## 💰 COÛTS ET QUOTAS

### 🆓 Quotas GRATUITS par mois
- **Maps JavaScript API** : 28 000 chargements
- **Geocoding API** : 40 000 requêtes
- **Places API** : Varie selon le type

### 💡 Conseils pour économiser
- Configurez des **alertes de facturation**
- Définissez des **quotas** pour éviter les dépassements
- Utilisez les **restrictions** pour limiter l'usage

---

## ✅ VÉRIFICATION QUE ÇA MARCHE

Une fois configuré, vous devriez voir :
1. 🗺️ La carte Google Maps s'afficher
2. 📍 Un marqueur orange sur la carte
3. 🖱️ Possibilité de cliquer pour déplacer le marqueur
4. 📝 L'adresse qui se met à jour automatiquement
5. 🧭 Le bouton de géolocalisation qui fonctionne

---

## 🚨 DÉPANNAGE

### Erreurs courantes
- **"InvalidKeyMapError"** → Clé API incorrecte ou non configurée
- **"ApiNotActivatedMapError"** → Une des 3 APIs n'est pas activée
- **"RefererNotAllowedMapError"** → Restrictions trop strictes

### Solutions
1. ✅ Vérifiez que la clé est bien copiée dans `.env`
2. ✅ Vérifiez que les 3 APIs sont activées
3. ✅ Redémarrez avec `npm run dev`
4. ✅ Ouvrez la console du navigateur (F12) pour voir les erreurs

---

## 📞 AIDE SUPPLÉMENTAIRE

Si vous avez des problèmes :
1. 📖 Consultez la [documentation officielle](https://developers.google.com/maps/documentation/javascript)
2. 💬 Vérifiez les quotas dans [Google Cloud Console](https://console.cloud.google.com/apis/dashboard)
3. 🔍 Regardez les erreurs dans la console du navigateur

---

## 🎯 RÉSUMÉ RAPIDE

1. **[Créer projet](https://console.cloud.google.com/projectcreate)** → Nom : `FoodSwift-Maps`
2. **[Activer Maps API](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)** → Cliquer "ACTIVER"
3. **[Activer Places API](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)** → Cliquer "ACTIVER"  
4. **[Activer Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)** → Cliquer "ACTIVER"
5. **[Créer clé API](https://console.cloud.google.com/apis/credentials)** → "CRÉER DES IDENTIFIANTS" → "Clé API"
6. **Copier la clé** dans le fichier `.env`
7. **Redémarrer** avec `npm run dev`

**⏱️ Temps estimé : 5-10 minutes**

---

**🔥 IMPORTANT** : Sans cette configuration, la carte ne fonctionnera pas et vous verrez un message d'erreur avec des instructions dans l'application.
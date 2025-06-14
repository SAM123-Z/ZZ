# FoodSwift - Plateforme de Livraison de Nourriture

Une plateforme moderne de livraison de nourriture construite avec React, TypeScript et Tailwind CSS.

## 🚀 Démarrage rapide

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. Clonez le repository
```bash
git clone <repository-url>
cd foodswift
```

2. Installez les dépendances
```bash
npm install
```

3. Configurez les variables d'environnement
```bash
cp .env.example .env
```

4. **Configuration Google Maps (IMPORTANT)**
   
   Pour que la carte fonctionne dans le formulaire d'inscription des restaurants, vous devez :
   
   a. Aller sur [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   
   b. Créer un nouveau projet ou sélectionner un projet existant
   
   c. Activer les APIs suivantes :
      - Maps JavaScript API
      - Places API
      - Geocoding API
   
   d. Créer une clé API (Credentials > Create Credentials > API Key)
   
   e. Copier votre clé API dans le fichier `.env` :
   ```
   VITE_GOOGLE_MAPS_API_KEY=votre_cle_api_ici
   ```

5. Démarrez le serveur de développement
```bash
npm run dev
```

## 🗺️ Configuration Google Maps

### Étapes détaillées :

1. **Créer un projet Google Cloud**
   - Allez sur https://console.cloud.google.com/
   - Créez un nouveau projet ou sélectionnez un existant

2. **Activer les APIs nécessaires**
   - Dans le menu, allez à "APIs & Services" > "Library"
   - Recherchez et activez :
     - Maps JavaScript API
     - Places API
     - Geocoding API

3. **Créer une clé API**
   - Allez à "APIs & Services" > "Credentials"
   - Cliquez sur "Create Credentials" > "API Key"
   - Copiez la clé générée

4. **Configurer les restrictions (recommandé)**
   - Cliquez sur votre clé API pour la modifier
   - Sous "Application restrictions", sélectionnez "HTTP referrers"
   - Ajoutez vos domaines autorisés (ex: localhost:5173 pour le développement)

5. **Ajouter la clé dans votre projet**
   - Ouvrez le fichier `.env`
   - Remplacez `your_google_maps_api_key_here` par votre vraie clé API

### Dépannage Google Maps

Si la carte ne s'affiche pas :

1. **Vérifiez la clé API** : Assurez-vous qu'elle est correctement copiée dans `.env`
2. **Redémarrez le serveur** : Après avoir modifié `.env`, redémarrez avec `npm run dev`
3. **Vérifiez la console** : Ouvrez les outils de développement pour voir les erreurs
4. **Vérifiez les quotas** : Assurez-vous que vous n'avez pas dépassé les limites gratuites

## 📱 Fonctionnalités

- 🏠 Page d'accueil avec recherche et catégories
- 🍕 Catalogue de restaurants et plats
- 🛒 Panier d'achat avec gestion des quantités
- 👤 Système d'authentification (inscription/connexion)
- 🏪 Inscription des restaurants avec géolocalisation
- 📊 Tableau de bord restaurant
- 📱 Design responsive
- 🎨 Interface moderne avec Tailwind CSS

## 🛠️ Technologies utilisées

- **Frontend** : React 18, TypeScript
- **Styling** : Tailwind CSS
- **Routing** : React Router DOM
- **Forms** : React Hook Form + Zod validation
- **UI Components** : Radix UI
- **Icons** : Lucide React
- **Maps** : Google Maps JavaScript API
- **Charts** : ApexCharts
- **Build Tool** : Vite

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── auth/           # Composants d'authentification
│   └── ui/             # Composants UI de base
├── context/            # Contextes React (Auth, Cart)
├── screens/            # Pages principales
│   ├── Home/           # Page d'accueil
│   ├── Categories/     # Page des catégories
│   ├── Restaurants/    # Page des restaurants
│   ├── Profile/        # Profil utilisateur
│   └── RestaurantSignup/ # Inscription restaurant
└── lib/                # Utilitaires
```

## 🔧 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la build de production

## 🌟 Fonctionnalités à venir

- [ ] Système de paiement
- [ ] Notifications en temps réel
- [ ] Suivi des commandes
- [ ] Système de notation et avis
- [ ] Application mobile
- [ ] API backend complète

## 📄 Licence

Ce projet est sous licence MIT.
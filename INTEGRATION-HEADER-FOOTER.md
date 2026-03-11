# 🎨 Guide d'Intégration Header & Footer Uniformes

## 📋 Vue d'ensemble

Ce système fournit un header et footer uniformes pour toutes les pages du site MINJEC Portal, avec des animations fluides et une expérience utilisateur cohérente.

---

## 🚀 Installation Rapide

### Étape 1: Ajouter les fichiers CSS dans le `<head>`

Ajoutez ces lignes dans la section `<head>` de **TOUTES** vos pages HTML:

```html
<!-- Styles uniformes Header & Footer -->
<link rel="stylesheet" href="assets/css/header-footer.css">
<link rel="stylesheet" href="assets/css/advanced-animations.css">
```

### Étape 2: Ajouter les scripts JavaScript avant `</body>`

Ajoutez ces lignes **AVANT** la balise de fermeture `</body>`:

```html
<!-- Scripts uniformes Header & Footer -->
<script src="assets/js/header-footer.js"></script>
<script src="assets/js/navigation-update.js"></script>
```

---

## 📝 Exemple Complet d'Intégration

Voici un exemple de structure HTML complète:

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma Page - MINJEC Portal</title>
    
    <!-- Styles existants -->
    <link rel="stylesheet" href="assets/css/style.css">
    
    <!-- NOUVEAU: Styles uniformes Header & Footer -->
    <link rel="stylesheet" href="assets/css/header-footer.css">
    <link rel="stylesheet" href="assets/css/advanced-animations.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Le header sera injecté automatiquement ici par header-footer.js -->
    
    <!-- Votre contenu de page -->
    <main style="padding-top: 70px;"> <!-- Important: ajouter padding-top pour éviter que le contenu soit caché sous le header fixe -->
        <h1>Contenu de votre page</h1>
        <p>Votre contenu ici...</p>
    </main>
    
    <!-- Le footer sera injecté automatiquement ici par header-footer.js -->
    
    <!-- Scripts existants -->
    <script src="assets/js/main.js"></script>
    
    <!-- NOUVEAU: Scripts uniformes Header & Footer -->
    <script src="assets/js/header-footer.js"></script>
    <script src="assets/js/navigation-update.js"></script>
</body>
</html>
```

---

## ⚙️ Fonctionnalités du Header

### 1. Navigation Principale
- Logo cliquable avec animation
- Liens de navigation (Accueil, Projets, À propos)
- Menu dropdown "Plus" avec toutes les fonctionnalités
- Responsive avec menu mobile

### 2. Barre de Recherche
- Modal de recherche avec animation
- Suggestions populaires
- Recherche en temps réel (à implémenter)

### 3. Notifications
- Panneau latéral de notifications
- Badge avec compteur
- Notifications en temps réel

### 4. Profil Utilisateur
- Avatar et nom d'utilisateur
- Menu dropdown avec:
  - Dashboard
  - Mon Profil
  - Favoris
  - Déconnexion

### 5. Effets au Scroll
- Header qui se cache/affiche intelligemment
- Effet de transparence
- Ombre au scroll

---

## 🎨 Fonctionnalités du Footer

### 1. Sections
- **À propos**: Logo, description, réseaux sociaux
- **Liens rapides**: Navigation principale
- **Nos services**: Toutes les fonctionnalités
- **Contact**: Coordonnées complètes

### 2. Animations
- Vague animée en haut du footer
- Animations au scroll pour chaque section
- Liens avec effets hover

### 3. Bouton "Retour en haut"
- Apparaît après 300px de scroll
- Animation fluide de retour en haut
- Design moderne avec gradient

---

## 🎭 Animations Disponibles

### Classes d'Animation CSS

Ajoutez ces classes à vos éléments pour les animer:

#### Animations d'Entrée
```html
<div class="animate-fade-in">Fade In</div>
<div class="slide-in-left">Slide from Left</div>
<div class="slide-in-right">Slide from Right</div>
<div class="slide-in-up">Slide from Bottom</div>
<div class="slide-in-down">Slide from Top</div>
<div class="zoom-in">Zoom In</div>
<div class="flip-in">Flip In</div>
```

#### Animations Continues
```html
<div class="float-animation">Floating</div>
<div class="glow-effect">Glowing</div>
<div class="bounce-animation">Bouncing</div>
<div class="rotate-animation">Rotating</div>
<div class="scale-pulse">Pulsing</div>
<div class="heartbeat">Heartbeat</div>
```

#### Effets Hover
```html
<div class="card-hover-lift">Lift on Hover</div>
<div class="card-hover-glow">Glow on Hover</div>
<div class="card-hover-scale">Scale on Hover</div>
<a class="hover-underline">Underline on Hover</a>
```

#### Animations au Scroll
```html
<div class="animate-on-scroll">Animate when visible</div>
<div class="scroll-reveal">Reveal on scroll</div>
```

#### Délais d'Animation
```html
<div class="animate-fade-in delay-100">Delay 0.1s</div>
<div class="animate-fade-in delay-200">Delay 0.2s</div>
<div class="animate-fade-in delay-300">Delay 0.3s</div>
```

---

## 🎯 Personnalisation

### Modifier les Couleurs

Dans `header-footer.css`, modifiez les variables:

```css
/* Couleur principale */
#38bdf8 → Votre couleur

/* Couleur secondaire */
#10b981 → Votre couleur

/* Couleur de fond */
#0f172a → Votre couleur
```

### Modifier le Logo

Dans `header-footer.js`, ligne ~20:

```javascript
<img src="assets/images/votre-logo.png" alt="Logo">
```

### Ajouter des Liens au Menu

Les liens sont ajoutés automatiquement par `navigation-update.js`. Pour ajouter manuellement:

```javascript
// Dans header-footer.js, section dropdown-menu
<a href="nouvelle-page.html" class="dropdown-item">
    <i class="fa-solid fa-icon"></i> Nouveau Lien
</a>
```

---

## 📱 Responsive Design

Le système est entièrement responsive:

- **Desktop** (1024px+): Navigation complète
- **Tablet** (768px - 1023px): Navigation adaptée
- **Mobile** (< 768px): Menu hamburger

### Points de Rupture

```css
@media (max-width: 1024px) { /* Tablette */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Petit mobile */ }
```

---

## 🔧 Fonctions JavaScript Disponibles

### Déconnexion
```javascript
handleLogout(); // Déconnecte l'utilisateur
```

### Charger les Notifications
```javascript
loadNotifications(); // Charge les notifications
```

### Charger les Infos Utilisateur
```javascript
loadUserInfo(); // Charge les infos de l'utilisateur connecté
```

---

## ⚠️ Important: Pages d'Authentification

Le header et footer **NE SONT PAS** injectés sur:
- `login.html`
- `register.html`

Ceci est intentionnel pour garder ces pages épurées.

---

## 🎨 Exemples d'Utilisation des Animations

### Carte avec Animation
```html
<div class="card card-hover-lift animate-fade-in delay-100">
    <h3>Titre de la carte</h3>
    <p>Contenu de la carte</p>
</div>
```

### Bouton Animé
```html
<button class="btn btn-hover-slide glow-effect">
    <i class="fa-solid fa-rocket"></i>
    Lancer le projet
</button>
```

### Section avec Animations Échelonnées
```html
<div class="stagger-animation">
    <div class="card">Carte 1</div>
    <div class="card">Carte 2</div>
    <div class="card">Carte 3</div>
    <div class="card">Carte 4</div>
</div>
```

### Texte avec Effet Néon
```html
<h1 class="neon-text">MINJEC Portal</h1>
```

### Élément Flottant
```html
<div class="float-animation">
    <img src="icon.png" alt="Icon">
</div>
```

---

## 🐛 Dépannage

### Le header/footer n'apparaît pas
1. Vérifiez que `header-footer.js` est bien chargé
2. Vérifiez la console pour les erreurs JavaScript
3. Assurez-vous que vous n'êtes pas sur `login.html` ou `register.html`

### Les animations ne fonctionnent pas
1. Vérifiez que `advanced-animations.css` est chargé
2. Vérifiez que les classes CSS sont correctement appliquées
3. Testez dans un navigateur moderne (Chrome, Firefox, Edge)

### Le menu mobile ne s'ouvre pas
1. Vérifiez que Font Awesome est chargé
2. Vérifiez la console pour les erreurs
3. Testez sur un vrai appareil mobile

### Les notifications ne s'affichent pas
1. Vérifiez que l'utilisateur est connecté
2. Vérifiez `localStorage` pour `currentUser`
3. Ouvrez la console pour voir les erreurs

---

## 📊 Performance

### Optimisations Incluses
- ✅ Animations CSS (GPU accelerated)
- ✅ Lazy loading des notifications
- ✅ Debouncing du scroll
- ✅ Transitions optimisées
- ✅ Reduced motion support

### Taille des Fichiers
- `header-footer.css`: ~15KB
- `advanced-animations.css`: ~12KB
- `header-footer.js`: ~10KB
- **Total**: ~37KB (non compressé)

---

## 🎓 Bonnes Pratiques

1. **Toujours** ajouter `padding-top: 70px` au contenu principal
2. **Utiliser** les classes d'animation avec parcimonie
3. **Tester** sur mobile et desktop
4. **Vérifier** l'accessibilité (contraste, navigation clavier)
5. **Optimiser** les images du footer

---

## 📚 Ressources

- [Font Awesome Icons](https://fontawesome.com/icons)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

---

## ✅ Checklist d'Intégration

- [ ] Ajouter `header-footer.css` dans le `<head>`
- [ ] Ajouter `advanced-animations.css` dans le `<head>`
- [ ] Ajouter `header-footer.js` avant `</body>`
- [ ] Ajouter `navigation-update.js` avant `</body>`
- [ ] Ajouter `padding-top: 70px` au contenu principal
- [ ] Tester sur desktop
- [ ] Tester sur mobile
- [ ] Vérifier les animations
- [ ] Vérifier la navigation
- [ ] Vérifier les notifications

---

**Développé avec ❤️ pour MINJEC Portal**  
**Version 2.0 - Mars 2026**

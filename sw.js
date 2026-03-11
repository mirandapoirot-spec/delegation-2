// 1: Fichier Service Worker : Moteur de gestion de la Progressive Web App (PWA) pour le portail Aurora
// 2: Définition de la version du cache pour assurer le renouvellement des ressources statiques
const CACHE_NAME = 'aurora-portal-v1.0.0';

// 5: Inventaire exhaustif des ressources critiques destinées au stockage hors-ligne
const urlsToCache = [
  '/', // 7: Point d'entrée racine du serveur
  '/index.html', // 9: Interface d'accueil et tableau de bord public
  '/login.html', // 11: Portail sécurisé d'authentification
  '/actualites.html', // 13: Flux d'informations institutionnelles
  '/evenements.html', // 15: Calendrier des activités de la jeunesse
  '/programmes.html', // 17: Catalogue des opportunités et subventions
  '/ressources.html', // 19: Bibliothèque documentaire et formulaires
  '/favoris.html', // 21: Espace de sauvegarde personnel de l'utilisateur
  '/assets/css/style.css', // 23: Architecture visuelle et design system
  '/assets/js/main.js', // 25: Cœur logique et orchestrateur d'animations
  '/assets/js/auth.js', // 27: Gestionnaire des sessions et de la sécurité
  '/assets/js/data-loader.js', // 29: Adaptateur de base de données JSON/LocalStorage
  '/data/users.json', // 31: Registre initial des accréditations
  '/data/projects.json', // 33: Fonds documentaire des dossiers projets
  '/data/config.json', // 35: Paramètres structurels du portail
  // 37: Intégration des dépendances typographiques externes (Google Fonts)
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  // 39: Intégration du moteur d'iconographie (Font Awesome CDN)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

/**
 * INSTALLATION
 * 44: Phase de déploiement initial et capture des ressources dans le cache
 */
self.addEventListener('install', (event) => {
  // 46: Signalement de la phase d'amorçage dans la console système
  console.log('SW: Initialisation de la phase d\'installation');
  // 48: Suspendre le cycle de vie jusqu'à la réussite de la mise en cache
  event.waitUntil(
    // 50: Ouverture sécurisée de l'espace de stockage désigné
    caches.open(CACHE_NAME)
      .then((cache) => {
        // 54: Confirmation de l'accès au pool de ressources
        console.log('SW: Canal de stockage local ouvert');
        // 56: Migration massive des fichiers vers le cache persistant
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        // 62: Log d'interception des échecs de téléchargement ou de stockage
        console.error('SW Critical: Échec de la capture initiale des ressources', error);
      })
  );
});

/**
 * ACTIVATION
 * 71: Nettoyage des versions obsolètes et prise de contrôle du navigateur
 */
self.addEventListener('activate', (event) => {
  // 73: Notification de transition vers l'état opérationnel
  console.log('SW: Promotion à l\'état ACTIF');
  // 75: Purge des anciens registres pour éviter les conflits de version
  event.waitUntil(
    // 77: Énumération de tous les conteneurs de cache existants
    caches.keys().then((cacheNames) => {
      // 79: Exécution séquentielle des commandes de suppression
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 83: Identifier les conteneurs n'appartenant pas à la version courante
          if (cacheName !== CACHE_NAME) {
            // 85: Journalisation du nettoyage de l'espace disque
            console.log('SW Maintenance: Évacuation de l\'ancien cache', cacheName);
            // 87: Destruction physique du conteneur de cache obsolète
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/**
 * FETCH (Interception des requêtes)
 * 102: Logique de délégation entre le Cache (Offline First) et le Réseau
 */
self.addEventListener('fetch', (event) => {
  // 104: Router la réponse par le gestionnaire PWA
  event.respondWith(
    // 106: Tenter de servir une copie conforme depuis le cache local
    caches.match(event.request)
      .then((response) => {
        // 110: Si la ressource est déjà archivée
        if (response) {
          // 112: Délivrer instantanément (Mode ultra-rapide / Hors-ligne)
          return response;
        }

        // 117: Sinon, solliciter le serveur distant
        return fetch(event.request)
          .then((response) => {
            // 121: Validation de la qualité et de la provenance de la réponse réseau
            if (!response || response.status !== 200 || response.type !== 'basic') {
              // 123: Transmettre directement sans stockage intermédiaire si non conforme
              return response;
            }

            // 128: Créer un duplicata de la réponse (Le flux original étant consommé à la lecture)
            const responseToCache = response.clone();

            // 131: Enregistrer dynamiquement la nouvelle ressource pour les futures visites
            caches.open(CACHE_NAME)
              .then((cache) => {
                // 135: Inscription de la paire Requête/Réponse dans l'archive
                cache.put(event.request, responseToCache);
              });

            // 140: Délivrer la réponse originale à l'application
            return response;
          })
          .catch(() => {
            // 144: Stratégie de secours en cas de rupture de connectivité totale
            // 146: Si l'utilisateur tente d'accéder à une page de navigation (Document HTML)
            if (event.request.destination === 'document') {
              // 148: Rediriger vers la page d'accueil (ou page Offline spécifique)
              return caches.match('/index.html');
            }
          });
      })
  );
});

/**
 * PUSH (Notifications Distantes)
 * 161: Réception des signaux d'information en provenance du serveur MINJEC
 */
self.addEventListener('push', (event) => {
  // 163: Tracer l'arrivée du signal push
  console.log('SW: Signal Push intercepté');

  // 166: Architecturer les paramètres visuels de la notification système
  const options = {
    // 168: Contenu textuel (Payload) ou message d'alerte par défaut
    body: event.data ? event.data.text() : 'Mise à jour disponible sur le portail Aurora',
    icon: '/assets/img/logo-symbol.png', // 170: Identité visuelle
    badge: '/assets/img/logo-badge.png', // 172: Signature en barre de statut
    vibrate: [200, 100, 200], // 174: Alerte haptique rythmée
    data: {
      dateOfArrival: Date.now(), // 178: Métadonnée temporelle
      primaryKey: 1 // 180: Clé d'indexation
    },
    actions: [
      // 184: Boutons d'interaction rapide sous la notification
      {
        action: 'explore', // 188: ID d'action interne
        title: 'Consulter l\'annonce', // 190: Label du bouton
        icon: '/assets/img/icons/check.png' // 192: Iconographie de succès
      },
      {
        action: 'close', // 198: ID de rejet
        title: 'Ignorer', // 200: Label de fermeture
        icon: '/assets/img/icons/cross.png' // 202: Iconographie d'annulation
      }
    ]
  };

  // 211: Maintenir le Service Worker en vie le temps de l'interaction système
  event.waitUntil(
    // 213: Appel de l'API de notification native du système d'exploitation
    self.registration.showNotification('Portail Aurora - Bangangté', options)
  );
});

/**
 * NOTIFICATION CLICK
 * 220: Gestion des intentions utilisateur suite à un clic sur une notification
 */
self.addEventListener('notificationclick', (event) => {
  // 222: Journaliser l'interaction matérielle
  console.log('SW Intelligence: Interaction utilisateur détectée');

  // 225: Révoquer immédiatement la bulle de notification du centre de notifications
  event.notification.close();

  // 228: Logique décisionnelle basée sur le bouton cliqué
  if (event.action === 'explore') {
    // 230: Action 'Explorer' -> Focus ou Ouverture de l'espace de gestion
    event.waitUntil(
      // 232: Lancer le navigateur sur l'entrée principale du projet
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // 236: Action 'Fermer' -> Aucune opération supplémentaire requise
    console.log('SW: Notification déclinée');
  } else {
    // 241: Clic global sur le corps de la notification -> Ouverture standard
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

/**
 * BACKGROUND SYNC
 * 253: Rattrapage automatique des données enregistrées en zone morte (Hors-ligne)
 */
self.addEventListener('sync', (event) => {
  // 255: Message de relance de la synchronisation de fond
  console.log('SW: Tentative de synchronisation différée');

  // 258: Vérifier si le jeton de sync correspond à notre protocole Aurora
  if (event.tag === 'background-sync') {
    // 260: Garantir l'atomicité de l'opération de synchronisation
    event.waitUntil(
      // 262: Déclencher le script de migration vers le serveur
      syncOfflineData()
    );
  }
});

/**
 * syncOfflineData
 * 271: Procédure de vidage des files d'attente locales vers l'infrastructure Cloud
 */
async function syncOfflineData() {
  try {
    // 274: Tenter d'accéder aux données mises en cache durant la coupure
    const pendingData = JSON.parse(localStorage.getItem('pending_sync') || '[]');

    // 278: Si des paquets de données sont en attente d'exportation
    if (pendingData.length > 0) {
      // 280: Journaliser le volume de la transaction
      console.log('SW Migration: Envoi de', pendingData.length, 'paquets vers le Cloud');

      // 283: [POINT DE CONNEXION API] - Emplacement pour fetch('api/sync', {method: 'POST'})

      // 286: Après confirmation simulée du succès de l'envoi
      localStorage.removeItem('pending_sync');

      // 289: Informer l'utilisateur que ses données sont désormais sécurisées en ligne
      self.registration.showNotification('Aurora Sync', {
        body: 'Synchronisation terminée. Vos dossiers sont à jour.',
        icon: '/assets/img/icons/sync-done.png'
      });
    }
  } catch (error) {
    // 301: Capture des anomalies critiques durant le tunnel de synchronisation
    console.error('SW Sync Failure: Erreur lors du dialogue avec le serveur', error);
  }
}

/**
 * MESSAGE INTERFACE
 * 308: Canal de communication direct avec l'application principale (Main Thread)
 */
self.addEventListener('message', (event) => {
  // 310: Ordre de mise à jour forcée (Hot Reload PWA)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // 312: Forcer l'adoption immédiate de la nouvelle version sans attendre le redémarrage
    self.skipWaiting();
  }
});

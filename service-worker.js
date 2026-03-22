// Sementis Service Worker
// Version 1.0.0

const CACHE_VERSION = 'sementis-v1.0.0';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC = `${CACHE_VERSION}-dynamic`;
const CACHE_IMAGES = `${CACHE_VERSION}-images`;

// Files to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/home.html',
  '/login.html',
  '/trilha (1).html',
  '/css/styles.css',
  '/css/landing.css',
  '/css/home.css',
  '/css/login.css',
  '/js/main.js',
  '/js/home.js',
  '/js/login.js',
  '/manifest.json',
  '/assets/brand/logo_sementis_branco.png',
  '/assets/icons/icone_moeda.png',
  '/assets/icons/icone_sequencia_fogo.png',
  '/assets/icons/icone_vida.png',
  '/assets/icons/icone_usuario.png',
  '/assets/icons/menu_rodape_tarefa.png',
  '/assets/icons/menu_rodape_trofeu_liga.png',
  '/assets/icons/menu_rodape_alvo.png',
  '/assets/icons/menu_rodape_usuario.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...', event);

  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('[Service Worker] Error caching static assets:', error);
      })
  );

  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...', event);

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete caches that don't match current version
              return cacheName.startsWith('sementis-') &&
                     cacheName !== CACHE_STATIC &&
                     cacheName !== CACHE_DYNAMIC &&
                     cacheName !== CACHE_IMAGES;
            })
            .map((cacheName) => {
              console.log('[Service Worker] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
  );

  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - handle network requests with caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests and chrome extensions
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests with appropriate strategies
  if (request.method !== 'GET') {
    // Don't cache non-GET requests
    return;
  }

  // HTML pages - Network first, fallback to cache
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      networkFirstStrategy(request, CACHE_STATIC)
    );
    return;
  }

  // Images - Cache first, fallback to network
  if (request.headers.get('accept').includes('image')) {
    event.respondWith(
      cacheFirstStrategy(request, CACHE_IMAGES)
    );
    return;
  }

  // CSS, JS, and other static assets - Cache first, fallback to network
  if (url.pathname.match(/\.(css|js|json)$/)) {
    event.respondWith(
      cacheFirstStrategy(request, CACHE_STATIC)
    );
    return;
  }

  // Default: Network first, fallback to cache
  event.respondWith(
    networkFirstStrategy(request, CACHE_DYNAMIC)
  );
});

// Cache strategies

// Network First Strategy - Try network first, fallback to cache
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);

    // Clone and cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network request failed, trying cache:', request.url);

    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for HTML requests
    if (request.headers.get('accept').includes('text/html')) {
      return caches.match('/index.html');
    }

    throw error;
  }
}

// Cache First Strategy - Try cache first, fallback to network
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    // Clone and cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Fetch failed for:', request.url, error);
    throw error;
  }
}

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);

  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Implement data sync logic here
      Promise.resolve()
    );
  }
});

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received:', event);

  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do Sementis',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver agora',
        icon: '/assets/icons/menu_rodape_tarefa.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/assets/icons/icone_usuario.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Sementis', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/home.html')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_DYNAMIC)
        .then((cache) => cache.addAll(event.data.urls))
    );
  }
});

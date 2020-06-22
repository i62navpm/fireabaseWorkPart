module.exports = {
  transpileDependencies: ['vuetify'],
  pwa: {
    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: 'img/icons/mstile-150x150.webp',
    },
    manifestOptions: {
      name: 'Nóminas',
      short_name: 'Nóminas',
      theme_color: '#1976d2',
      icons: [
        {
          src: 'img/icons/android-chrome-192x192.webp',
          sizes: '192x192',
          type: 'image/webp',
        },
        {
          src: 'img/icons/android-chrome-512x512.webp',
          sizes: '512x512',
          type: 'image/webp',
        },
        {
          src: 'img/icons/android-chrome-maskable-192x192.webp',
          sizes: '192x192',
          type: 'image/webp',
          purpose: 'maskable',
        },
        {
          src: 'img/icons/android-chrome-maskable-512x512.webp',
          sizes: '512x512',
          type: 'image/webp',
          purpose: 'maskable',
        },
      ],
      start_url: '.',
      display: 'standalone',
      background_color: '#ffffff',
    },
  },
}

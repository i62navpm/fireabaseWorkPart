module.exports = {
  ci: {
    assert: {
      // preset: 'lighthouse:recommended',
    },
    collect: {
      staticDistDir: './packages/frontend/dist/',
      isSinglePageApplication: true,
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}

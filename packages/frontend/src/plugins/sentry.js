import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import config from '@/config/sentry'
import { version } from '@/../package.json'

Sentry.init({
  dsn: config.dsn,
  integrations: [new VueIntegration({ Vue, attachProps: true })],
  release: `frontend@${version}`,
})

export default Sentry

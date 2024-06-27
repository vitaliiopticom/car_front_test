import * as Sentry from '@sentry/react';
import { FC, PropsWithChildren } from 'react';
import { ENV_CONFIG } from './env';

Sentry.init({
  dsn: ENV_CONFIG.SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ENV_CONFIG.SENTRY_TRACE_PROPAGATION?.split(','),
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  environment: ENV_CONFIG.APP_ENV,
});

export const SentryProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>;
};

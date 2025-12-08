import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ErrorBoundary
        fallback={<div>Something went wrong. Please try again later.</div>}
      >
        <Suspense fallback={<div>Loading tasks from API...</div>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>,
  );
}

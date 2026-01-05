import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorManagementComponent from './ErrorManagement/ErrorManagement';
import './App.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ErrorBoundary
        fallback={
          <ErrorManagementComponent
            message="Failed to load tasks. Please check your network connection and try again."
            onDismiss={() => window.location.reload()}
          />
        }
      >
        <Suspense fallback={<div>Loading tasks from API...</div>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>,
  );
}

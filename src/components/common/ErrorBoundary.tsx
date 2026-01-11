import React from 'react';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: unknown;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-[50vh] flex items-center justify-center px-6 text-center">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl text-primary mb-3">Something crashed</h2>
              <p className="font-mono text-sm text-muted-foreground">
                A section failed to render. Try refreshing; if it persists, we’ll disable the 3D layer.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorInfo: string | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorInfo: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
          <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-zinc-100">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-zinc-900">Something went wrong</h1>
            <p className="text-zinc-500 mb-8 leading-relaxed">
              We encountered an unexpected error. Our team has been notified.
            </p>
            {this.state.errorInfo && (
              <div className="bg-zinc-50 p-4 rounded-xl text-left mb-8 overflow-auto max-h-40">
                <code className="text-xs text-zinc-400 break-all">{this.state.errorInfo}</code>
              </div>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-zinc-950 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

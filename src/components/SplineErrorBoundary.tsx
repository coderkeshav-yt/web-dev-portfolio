import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SplineErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Spline Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center bg-slate-900/50 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-slate-200 mb-2">3D Content Unavailable</h3>
            <p className="text-slate-400 text-sm">
              We couldn't load the 3D content. This might be due to your browser configuration.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SplineErrorBoundary;

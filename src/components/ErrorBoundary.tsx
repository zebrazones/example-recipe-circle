import { Component, ErrorInfo, ReactNode } from "react";
import { version as reactVersion } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled error:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="max-w-md text-muted-foreground">
          The page hit an unexpected error. Try reloading, and if it keeps happening let us know.
        </p>
        <pre className="max-w-lg overflow-auto rounded-md bg-muted p-4 text-left text-xs text-muted-foreground">
          {this.state.error?.message}
          {"\n\n"}
          React {reactVersion} · Vite {import.meta.env.MODE} build
        </pre>
        <Button onClick={() => window.location.reload()}>Reload page</Button>
      </div>
    );
  }
}

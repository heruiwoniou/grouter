import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: "" };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error.stack || error.message || String(error)
    };
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          <pre>{error}</pre>
        </h1>
      );
    }

    return this.props.children; // eslint-disable-line
  }
}

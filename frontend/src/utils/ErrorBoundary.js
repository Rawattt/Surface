import React, { Component } from 'react';
import FallbackUI from './FallbackUI';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error.message);
    }

    render() {
        return (
            <>{this.state.hasError ? <FallbackUI /> : this.props.children}</>
        );
    }
}

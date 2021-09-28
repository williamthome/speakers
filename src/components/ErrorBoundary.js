import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true }
  }

  // componentDidCatch(error, errorInfo) {
  // logErrorToMyService(error, errorInfo)
  // }

  render() {
    if (this.state.hasError) {
      if (this.props.errorUI) {
        return this.props.errorUI
      }

      return (
        <div>Sorry Something went wrong</div>
      )
    }

    return this.props.children
  }
}
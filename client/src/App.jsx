/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import BMICalculator from "./pages/BMICalculator";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-undef
    logErrorToMyService(
      error,
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      info.componentStack,
      // Warning: `captureOwnerStack` is not available in production.
      React.captureOwnerStack(),
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    // <ErrorBoundary fallback={<p>Something went wrong</p>}>
      // {/* <Navbar> */}
      <>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<BMICalculator />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element= {<Signup />} />
          {/* You can add more routes here later */}
        </Routes>
        </>
      // {/* </Navbar> */}
    // {/* </ErrorBoundary> */}
  );
};
export default App;



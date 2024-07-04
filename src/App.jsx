import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <RoutesViews />
      </Router>
    </>
  );
};

export default App;

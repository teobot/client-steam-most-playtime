import "../css/App.css";

import { checkServer } from "../controllers/api.controller";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    checkServer();
  }, []);

  return <div className="App">hello world</div>;
}

export default App;

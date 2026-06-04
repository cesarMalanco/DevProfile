import Navbar from "../src/components/Navbar";
import AppRouter from "../src/routes/AppRouter";

import { CVProvider } from "./context/CVContext";

function App() {
  return (
    <CVProvider>
      <Navbar />
      <AppRouter />
    </CVProvider>
  );
}

export default App;
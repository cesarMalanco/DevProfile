import Navbar from "../src/components/Navbar";
import AppRouter from "../src/routes/AppRouter";
import Footer from "../src/components/Footer";

import { CVProvider } from "./context/CVContext";

function App() {
  return (
    <CVProvider>
      <Navbar />

      <AppRouter />
      <Footer />
    </CVProvider>
  );
}

export default App;
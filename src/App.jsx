import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from 'sonner';

import ViewTransactions from "./pages/viewTransactions";
import AddTransaction from "./pages/addTransaction/addTransaction";
import NotFound from "./pages/notFound";
import Payments from "./pages/payments";
import { ContextProvider } from "./context/globalContext";

const App = () => (
  <ContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/transactions" />} />
        <Route path="/transactions" element={<ViewTransactions />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    <Toaster richColors />
  </ContextProvider>
);

export default App;

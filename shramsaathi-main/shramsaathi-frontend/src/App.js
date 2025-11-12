// src/App.js
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import OwnerWorkersList from './components/OwnerWorkersList';
import Dashboard from './pages/Dashboard';
import NearbyJobs from './pages/NearbyJobs';
import RegisterWorker from './pages/RegisterWorker';
import RegisterOwner from './pages/RegisterOwner';
import SearchWorker from './pages/SearchWorker';
import MapView from './pages/MapView';
import FAQ from './pages/FAQ';

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
  <Route path="/register" element={<RegisterWorker />} />
  <Route path="/map" element={<MapView />} />
        <Route path="/register-owner" element={<RegisterOwner />} />
        <Route path="/search" element={<SearchWorker />} />
        <Route path="/jobs" element={<NearbyJobs />} />
        <Route path="/ownerworkerslist" element={<OwnerWorkersList />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;

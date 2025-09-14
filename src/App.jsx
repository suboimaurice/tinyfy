import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Dashboard from './components/Dashboard';
import DashboardAuth from './components/DashboardAuth';
import { Toaster } from "react-hot-toast";

function App(){

    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainContent />} />
                                <Route path="/dashboard" element={
                                    <DashboardAuth>
                                        <Dashboard />
                                    </DashboardAuth>
                                } />
            </Routes>
            <Footer />
            <Toaster position="bottom-right" reverseOrder={false} />
        </BrowserRouter>
    );
}

export default App;

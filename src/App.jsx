import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailBarang from "./pages/DetailBarang"; // akan kita buat nanti
import KategoriList from "./pages/KategoriList";
import MainLayout from "./layouts/MainLayout";
import PeminjamanList from "./pages/PeminjamanList";
import LaporanPeminjaman from "./pages/LaporanPeminjaman";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/barang/:id"
          element={
            <MainLayout>
              <DetailBarang />
            </MainLayout>
          }
        />
        <Route
          path="/kategori"
          element={
            <MainLayout>
              <KategoriList />
            </MainLayout>
          }
        />
        <Route
          path="/peminjaman"
          element={
            <MainLayout>
              <PeminjamanList />
            </MainLayout>
          }
        />
        <Route
          path="/laporan"
          element={
            <MainLayout>
              <LaporanPeminjaman />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

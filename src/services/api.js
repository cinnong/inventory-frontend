import axios from "axios";

// Ganti URL ini kalau backend kamu pakai port berbeda
const API_BASE_URL = "http://localhost:3000/api";

export const getAllBarang = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/barang`);
    return response.data;
  } catch (error) {
    console.error("Error mengambil data barang:", error);
    throw error;
  }
};

export const getBarangById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/barang/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error mengambil detail barang:", error);
    throw error;
  }
};

export const getAllKategori = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/kategori`);
    return response.data;
  } catch (error) {
    console.error("Gagal ambil kategori:", error);
    throw error;
  }
};

export const getAllPeminjaman = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/peminjaman`);
    return response.data;
  } catch (error) {
    console.error("Gagal ambil data peminjaman:", error);
    throw error;
  }
};

export const getLaporanPeminjaman = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laporan/peminjaman`);
    return response.data;
  } catch (error) {
    console.error("Gagal ambil data laporan:", error);
    throw error;
  }
};



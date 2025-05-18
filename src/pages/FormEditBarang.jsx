import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBarangById, updateBarang } from "../services/api";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";

export default function FormEditBarang() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [barang, setBarang] = useState({
    nama: "",
    kategori_id: "",
    stok: "",
  });
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    // Fetch kategori untuk dropdown
    const fetchKategori = async () => {
      try {
        const data = await getAllKategori();
        const kategoriMap = data.reduce((acc, kategori) => {
          acc[kategori.id] = kategori;
          return acc;
        }, {});
        setKategori(data);
        
        // Jika barang sudah ada, set nama kategori
        if (barang.id && barang.kategori_id) {
          const selectedKategori = kategoriMap[barang.kategori_id];
          setBarang(prev => ({
            ...prev,
            kategori: selectedKategori
          }));
        }
      } catch (error) {
        console.error("Error mengambil kategori:", error);
      }
    };
    fetchKategori();
  }, [barang.id, barang.kategori_id]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const data = await getBarangById(id);
        setBarang(data);
      } catch (error) {
        setAlert({
          type: "error",
          message: "Gagal mengambil data barang",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBarang();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBarang((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBarang(id, barang);
      setAlert({
        type: "success",
        message: "Barang berhasil diperbarui",
      });
      navigate("/dashboard");
    } catch (error) {
      setAlert({
        type: "error",
        message: "Gagal memperbarui barang",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Edit Barang
      </Typography>

      {alert && (
        <Alert
          color={alert.type === "success" ? "green" : "red"}
          className="mb-4"
        >
          {alert.message}
        </Alert>
      )}

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                label="Nama Barang"
                name="nama"
                value={barang.nama}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                name="kategori_id"
                value={barang.kategori_id}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Kategori</option>
                {kategori.map((kat) => (
                  <option key={kat.id} value={kat.id}>
                    {kat.nama}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Input
                type="number"
                label="Stok"
                name="stok"
                value={barang.stok}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outlined"
                color="gray"
                onClick={() => navigate("/dashboard")}
              >
                Batal
              </Button>
              <Button type="submit" color="blue">
                Simpan
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

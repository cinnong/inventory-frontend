import { useEffect, useState } from "react";
import { getAllKategori } from "../services/api";
import {
  Card,
  CardBody,
  Typography,
  Spinner
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function KategoriList() {
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllKategori()
      .then((data) => {
        setKategori(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" color="blue" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">Daftar Kategori</Typography>
      <Card>
        <CardBody className="overflow-x-auto">
          <table className="table-auto w-full border text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Deskripsi</th>
                <th className="px-4 py-2">Tanggal Dibuat</th>
              </tr>
            </thead>
            <tbody>
              {kategori.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">{item.deskripsi}</td>
                  <td className="px-4 py-2">{item.tanggal_buat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Link to="/" className="inline-block mt-4">
        <Typography className="text-blue-600 hover:underline">← Kembali ke Dashboard</Typography>
      </Link>
    </div>
  );
}

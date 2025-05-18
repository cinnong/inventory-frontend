import { useEffect, useState } from "react";
import { getAllBarang } from "../services/api";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBarang()
      .then((data) => {
        setBarang(data);
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
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Dashboard Barang
      </Typography>
      <Card>
        <CardBody className="overflow-x-auto">
          <table className="table-auto w-full border text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">kategori_id</th>
                <th className="px-4 py-2">Stok</th>
                <th className="px-4 py-2">Tanggal Dibuat</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {barang.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">{item.kategori_id}</td>
                  <td className="px-4 py-2">{item.stok}</td>
                  <td className="px-4 py-2">{item.tanggal_buat}</td>
                  <td className="px-4 py-2">
                    <Link to={`/barang/${item.id}`}>
                      <Button size="sm">Detail</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

import { useEffect, useState } from "react";
import { getAllPeminjaman } from "../services/api";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
} from "@material-tailwind/react";

export default function PeminjamanList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPeminjaman()
      .then((res) => {
        setData(res);
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
      <Typography variant="h4" className="mb-4">Daftar Peminjaman</Typography>
      <Card>
        <CardBody className="overflow-x-auto">
          <table className="table-auto w-full border text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Telepon</th>
                <th className="px-4 py-2">Jumlah</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.nama_peminjam}</td>
                  <td className="px-4 py-2">{item.email_peminjam}</td>
                  <td className="px-4 py-2">{item.telepon_peminjam}</td>
                  <td className="px-4 py-2">{item.jumlah}</td>
                  <td className="px-4 py-2">{item.status}</td>
                  <td className="px-4 py-2">{item.tanggal_pinjam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

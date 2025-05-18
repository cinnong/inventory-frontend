import { useEffect, useState } from "react";
import { 
  Card, 
  CardBody, 
  Typography, 
  Spinner,
  Button
} from "@material-tailwind/react";
import { 
  CubeIcon, 
  TagIcon, 
  ArrowPathIcon,
  UserGroupIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { 
  getAllBarang, 
  getAllKategori, 
  getAllPeminjaman 
} from "../services/api";

export default function DashboardRingkasan() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    totalBarang: 0,
    totalKategori: 0,
    totalPeminjaman: 0,
    peminjamanAktif: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [barang, kategori, peminjaman] = await Promise.all([
          getAllBarang(),
          getAllKategori(),
          getAllPeminjaman()
        ]);

        const peminjamanAktif = peminjaman.filter(
          p => p.status === 'dipinjam' || p.status === 'Dipinjam'
        ).length;

        setCounts({
          totalBarang: barang.length,
          totalKategori: kategori.length,
          totalPeminjaman: peminjaman.length,
          peminjamanAktif
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Barang",
      value: counts.totalBarang,
      icon: CubeIcon,
      color: "blue",
      link: "/barang"
    },
    {
      title: "Total Kategori",
      value: counts.totalKategori,
      icon: TagIcon,
      color: "green",
      link: "/kategori"
    },
    {
      title: "Total Peminjaman",
      value: counts.totalPeminjaman,
      icon: ArrowPathIcon,
      color: "purple",
      link: "/peminjaman"
    },
    {
      title: "Sedang Dipinjam",
      value: counts.peminjamanAktif,
      icon: UserGroupIcon,
      color: "orange",
      link: "/peminjaman?status=dipinjam"
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" color="blue" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Dashboard 
        </Typography>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          <Typography color="gray" className="text-sm">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index} className="block">
            <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
              <CardBody className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" color="blue-gray" className="mt-2">
                      {stat.value.toLocaleString()}
                    </Typography>
                  </div>
                  <div
                    className={`p-3 rounded-full bg-${stat.color}-50 text-${stat.color}-500`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5" color="blue-gray">
                Peminjaman Terbaru
              </Typography>
              <Button variant="text" size="sm" className="text-blue-500">
                Lihat Semua
              </Button>
            </div>
            <div className="space-y-4">
              <div className="text-center py-8">
                <Typography variant="small" color="gray" className="font-normal">
                  coming soon!
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5" color="blue-gray">
                Stok Barang Menipis
              </Typography>
              <Button variant="text" size="sm" className="text-blue-500">
                Lihat Semua
              </Button>
            </div>
            <div className="space-y-4">
              <div className="text-center py-8">
                <Typography variant="small" color="gray" className="font-normal">
                  coming soon!
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

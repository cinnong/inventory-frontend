// src/components/Organisms/Table.jsx
import React from "react";

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Nama</th>
            <th className="px-4 py-2 text-left">Kategori</th>
            <th className="px-4 py-2 text-left">Deskripsi</th>
            <th className="px-4 py-2 text-left">Tanggal Dibuat</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="px-4 py-2">{item._id}</td>
              <td className="px-4 py-2">{item.nama}</td>
              <td className="px-4 py-2">{item.kategori}</td>
              <td className="px-4 py-2">{item.deskripsi}</td>
              <td className="px-4 py-2">{item.tanggal_buat}</td>
              <td className="px-4 py-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

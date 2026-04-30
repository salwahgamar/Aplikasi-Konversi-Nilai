import React from 'react';

const TableNilai = ({ nilaiList, onEdit, onDelete }) => {
  const calculateIPK = () => {
    if (nilaiList.length === 0) return 0;
    const totalMutuSKS = nilaiList.reduce((sum, n) => sum + (n.getMutu() * n.sks), 0);
    const totalSKS = nilaiList.reduce((sum, n) => sum + n.sks, 0);
    return totalSKS > 0 ? (totalMutuSKS / totalSKS).toFixed(2) : 0;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Daftar Nilai</h2>
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-lg">
          IPK: <span className="font-bold text-blue-600 text-2xl">{calculateIPK()}</span>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-200">
              <th className="px-4 py-2 text-left">Kode</th>
              <th className="px-4 py-2 text-left">Nama Mata Kuliah</th>
              <th className="px-4 py-2 text-left">SKS</th>
              <th className="px-4 py-2 text-left">Nilai</th>
              <th className="px-4 py-2 text-left">Huruf</th>
              <th className="px-4 py-2 text-left">Mutu</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {nilaiList.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                  Belum ada data. Tambahkan data terlebih dahulu.
                </td>
              </tr>
            ) : (
              nilaiList.map((nilai, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-2">{nilai.kode}</td>
                  <td className="px-4 py-2">{nilai.nama}</td>
                  <td className="px-4 py-2 text-center">{nilai.sks}</td>
                  <td className="px-4 py-2 text-center">{nilai.nilai}</td>
                  <td className="px-4 py-2 text-center font-semibold">{nilai.getHuruf()}</td>
                  <td className="px-4 py-2 text-center font-semibold">{nilai.getMutu()}</td>
                  <td className="px-4 py-2 space-x-2 flex">
                    <button
                      onClick={() => onEdit(nilai, index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm font-semibold transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm font-semibold transition-colors duration-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableNilai;
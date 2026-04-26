import React from 'react';

const TableNilai = ({ nilaiList, onEdit, onDelete }) => {
  const calculateIPK = () => {
    if (nilaiList.length === 0) return 0;
    const totalMutu = nilaiList.reduce((sum, n) => sum + n.getMutu(), 0);
    return (totalMutu / nilaiList.length).toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Daftar Nilai</h2>
      <div className="mb-4">
        <p className="text-lg">IPK: <span className="font-bold">{calculateIPK()}</span></p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">Mata Kuliah</th>
              <th className="px-4 py-2 text-left">Nilai</th>
              <th className="px-4 py-2 text-left">Huruf</th>
              <th className="px-4 py-2 text-left">Mutu</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {nilaiList.map((nilai, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{nilai.nama}</td>
                <td className="px-4 py-2">{nilai.matkul}</td>
                <td className="px-4 py-2">{nilai.nilai}</td>
                <td className="px-4 py-2">{nilai.getHuruf()}</td>
                <td className="px-4 py-2">{nilai.getMutu()}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => onEdit(nilai, index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableNilai;
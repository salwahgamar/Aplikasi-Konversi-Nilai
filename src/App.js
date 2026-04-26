import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FormNilai from './components/FormNilai';
import TableNilai from './components/TableNilai';
import ApiData from './components/ApiData';
import './index.css';

function App() {
  const [nilaiList, setNilaiList] = useState([]);
  const [editingNilai, setEditingNilai] = useState(null);

  const handleAddNilai = (nilai) => {
    nilai.id = Date.now();
    setNilaiList([...nilaiList, nilai]);
  };

  const handleEdit = (nilai, index) => {
    setEditingNilai({ ...nilai, index });
  };

  const handleUpdateNilai = (updatedNilai) => {
    const newList = [...nilaiList];
    newList[editingNilai.index] = updatedNilai;
    setNilaiList(newList);
    setEditingNilai(null);
  };

  const handleDelete = (index) => {
    setNilaiList(nilaiList.filter((_, i) => i !== index));
  };

  const handleCancelEdit = () => {
    setEditingNilai(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <FormNilai
          onAddNilai={handleAddNilai}
          editingNilai={editingNilai}
          onUpdateNilai={handleUpdateNilai}
          onCancelEdit={handleCancelEdit}
        />
        <TableNilai
          nilaiList={nilaiList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ApiData />
      </div>
    </div>
  );
}

export default App;
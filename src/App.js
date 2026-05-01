// Aplikasi Konversi Nilai IPK - React App
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FormNilai from './components/FormNilai';
import TableNilai from './components/TableNilai';
import Login from './components/Login';
import Quote from './components/Quote';
import Nilai from './models/Nilai';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [nilaiList, setNilaiList] = useState([]);
  const [editingNilai, setEditingNilai] = useState(null);
  const [quoteTrigger, setQuoteTrigger] = useState(0);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(storedUser);
      loadUserNilai(storedUser);
    }
  }, []);

  // Load user's nilai data from localStorage
  const loadUserNilai = (user) => {
    const key = `nilai_${user}`;
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Convert plain objects back to Nilai instances
        const nilaiInstances = parsedData.map(n => 
          new Nilai(n.kode, n.nama, n.sks, n.nilai)
        );
        setNilaiList(nilaiInstances);
      } catch (e) {
        console.error('Error loading nilai data:', e);
        setNilaiList([]);
      }
    } else {
      setNilaiList([]);
    }
  };

  // Save nilai data to localStorage
  const saveUserNilai = (data) => {
    const key = `nilai_${username}`;
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    loadUserNilai(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    setNilaiList([]);
    setEditingNilai(null);
  };

  const handleAddNilai = (nilai) => {
    // Check for duplicate kode mata kuliah
    if (nilaiList.some(n => n.kode === nilai.kode)) {
      alert('Kode mata kuliah sudah ada! Gunakan kode yang berbeda.');
      return;
    }
    nilai.id = Date.now();
    const updatedList = [...nilaiList, nilai];
    setNilaiList(updatedList);
    saveUserNilai(updatedList);
    // Trigger quote fetch ketika data nilai berhasil ditambahkan
    setQuoteTrigger(prev => prev + 1);
  };

  const handleEdit = (nilai, index) => {
    setEditingNilai({ ...nilai, index });
  };

  const handleUpdateNilai = (updatedNilai) => {
    // Check for duplicate kode mata kuliah (excluding the current item)
    if (nilaiList.some((n, idx) => n.kode === updatedNilai.kode && idx !== editingNilai.index)) {
      alert('Kode mata kuliah sudah ada! Gunakan kode yang berbeda.');
      return;
    }
    const newList = [...nilaiList];
    newList[editingNilai.index] = updatedNilai;
    setNilaiList(newList);
    // Trigger quote fetch ketika data nilai berhasil diupdate
    setQuoteTrigger(prev => prev + 1);
    saveUserNilai(newList);
    setEditingNilai(null);
  };

  const handleDelete = (index) => {
    const updatedList = nilaiList.filter((_, i) => i !== index);
    setNilaiList(updatedList);
    saveUserNilai(updatedList);
  };

  const handleCancelEdit = () => {
    setEditingNilai(null);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={username} onLogout={handleLogout} />
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
        {nilaiList.length > 0 && <Quote triggerFetch={quoteTrigger} />}
      </div>
    </div>
  );
}

export default App;
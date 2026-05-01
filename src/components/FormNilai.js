import React, { useState, useEffect } from 'react';
import Nilai from '../models/Nilai';

const FormNilai = ({ onAddNilai, editingNilai, onUpdateNilai, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    sks: '',
    nilai: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingNilai) {
      setFormData({
        kode: editingNilai.kode,
        nama: editingNilai.nama,
        sks: editingNilai.sks,
        nilai: editingNilai.nilai
      });
    } else {
      setFormData({ kode: '', nama: '', sks: '', nilai: '' });
    }
  }, [editingNilai]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.kode.trim()) newErrors.kode = 'Kode mata kuliah tidak boleh kosong';
    if (!formData.nama.trim()) newErrors.nama = 'Nama mata kuliah tidak boleh kosong';
    if (!formData.sks || isNaN(formData.sks) || parseInt(formData.sks) <= 0) {
      newErrors.sks = 'SKS harus angka dan lebih dari 0';
    }
    if (!formData.nilai || isNaN(formData.nilai) || formData.nilai < 0 || formData.nilai > 100) {
      newErrors.nilai = 'Nilai harus angka antara 0-100';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const nilaiObj = new Nilai(formData.kode, formData.nama, formData.sks, formData.nilai);
      if (editingNilai) {
        nilaiObj.id = editingNilai.id;
        onUpdateNilai(nilaiObj);
      } else {
        onAddNilai(nilaiObj);
      }
      setFormData({ kode: '', nama: '', sks: '', nilai: '' });
    }
  };

  const handleCancel = () => {
    setFormData({ kode: '', nama: '', sks: '', nilai: '' });
    setErrors({});
    onCancelEdit();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">{editingNilai ? 'Edit Nilai' : 'Tambah Nilai'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Kode Mata Kuliah</label>
          <input
            type="text"
            name="kode"
            value={formData.kode}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.kode && <p className="text-red-500 text-sm">{errors.kode}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Mata Kuliah</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">SKS</label>
          <input
            type="number"
            name="sks"
            value={formData.sks}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.sks && <p className="text-red-500 text-sm">{errors.sks}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nilai</label>
          <input
            type="number"
            name="nilai"
            value={formData.nilai}
            onChange={handleChange}
            min="0"
            max="100"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.nilai && <p className="text-red-500 text-sm">{errors.nilai}</p>}
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold transition-colors duration-200"
          >
            {editingNilai ? 'Simpan Perubahan' : 'Tambah'}
          </button>
          {editingNilai && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 font-semibold transition-colors duration-200"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormNilai;
import React, { useState, useEffect } from 'react';
import Nilai from '../models/Nilai';

const FormNilai = ({ onAddNilai, editingNilai, onUpdateNilai, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    nama: '',
    matkul: '',
    nilai: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingNilai) {
      setFormData({
        nama: editingNilai.nama,
        matkul: editingNilai.matkul,
        nilai: editingNilai.nilai
      });
    } else {
      setFormData({ nama: '', matkul: '', nilai: '' });
    }
  }, [editingNilai]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nama.trim()) newErrors.nama = 'Nama tidak boleh kosong';
    if (!formData.matkul.trim()) newErrors.matkul = 'Mata Kuliah tidak boleh kosong';
    if (!formData.nilai || isNaN(formData.nilai) || formData.nilai < 0 || formData.nilai > 100) {
      newErrors.nilai = 'Nilai harus angka antara 0-100';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const nilaiObj = new Nilai(formData.nama, formData.matkul, formData.nilai);
      if (editingNilai) {
        nilaiObj.id = editingNilai.id;
        onUpdateNilai(nilaiObj);
      } else {
        onAddNilai(nilaiObj);
      }
      setFormData({ nama: '', matkul: '', nilai: '' });
    }
  };

  const handleCancel = () => {
    setFormData({ nama: '', matkul: '', nilai: '' });
    setErrors({});
    onCancelEdit();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">{editingNilai ? 'Edit Nilai' : 'Tambah Nilai'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama</label>
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
          <label className="block text-sm font-medium text-gray-700">Mata Kuliah</label>
          <input
            type="text"
            name="matkul"
            value={formData.matkul}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.matkul && <p className="text-red-500 text-sm">{errors.matkul}</p>}
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {editingNilai ? 'Update' : 'Tambah'}
          </button>
          {editingNilai && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
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
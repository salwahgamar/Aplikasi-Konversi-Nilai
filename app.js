const { useState, useEffect, useRef, useMemo } = React;

class NoteStore {
  constructor(initialNotes = []) {
    this.notes = initialNotes;
  }

  add(note) {
    this.notes = [note, ...this.notes];
    return this.notes;
  }

  update(id, data) {
    this.notes = this.notes.map((note) => (note.id === id ? { ...note, ...data } : note));
    return this.notes;
  }

  delete(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    return this.notes;
  }

  search(query = '', category = 'Semua') {
    const keyword = query.trim().toLowerCase();
    return this.notes.filter((note) => {
      const matchesText =
        note.title.toLowerCase().includes(keyword) || note.content.toLowerCase().includes(keyword);
      const matchesCategory = category === 'Semua' || note.category === category;
      return matchesText && matchesCategory;
    });
  }
}

const NOTES_STORAGE_KEY = 'catatan-harian-notes';
const categoryOptions = ['Semua', 'Kuliah', 'Pribadi', 'Kerja'];

const formatDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const createNoteObject = ({ title, content, category }) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: title.trim(),
  content: content.trim(),
  category,
  date: formatDate(),
});

const loadNotesFromStorage = () => {
  try {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Gagal memuat data dari localStorage', error);
    return null;
  }
};

const saveNotesToStorage = (notes) => {
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.warn('Gagal menyimpan data ke localStorage', error);
  }
};

const Header = ({ search, onSearch, darkMode, onToggleDark }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white px-3 py-3 shadow-sm">
    <div className="container-fluid">
      <div>
        <span className="navbar-brand mb-0 h1">Catatan Harian</span>
        <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>
          Aplikasi catatan harian dengan UI responsif, pencarian, kategori, dan fetch API.
        </p>
      </div>

      <div className="d-flex align-items-center gap-2 flex-wrap">
        <div className="input-group">
          <span className="input-group-text">🔎</span>
          <input
            type="search"
            className="form-control"
            placeholder="Cari judul atau isi..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-primary btn-toggle" onClick={onToggleDark}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  </nav>
);

const NoteForm = ({ form, onChange, onSubmit, isEditing, onReset }) => (
  <div className="card p-4 mb-4 note-card">
    <h2 className="section-title">{isEditing ? 'Edit Catatan' : 'Tambah Catatan Baru'}</h2>

    <div className="row g-3">
      <div className="col-12 col-md-6">
        <label className="form-label">Judul</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Masukkan judul"
          value={form.title}
          onChange={onChange}
        />
      </div>
      <div className="col-12 col-md-6">
        <label className="form-label">Kategori</label>
        <select name="category" className="form-select" value={form.category} onChange={onChange}>
          {categoryOptions.slice(1).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12">
        <label className="form-label">Isi Catatan</label>
        <textarea
          name="content"
          rows="5"
          className="form-control"
          placeholder="Tuliskan catatan harian..."
          value={form.content}
          onChange={onChange}
        ></textarea>
      </div>
    </div>

    <div className="mt-4 d-flex gap-2 flex-wrap">
      <button className="btn btn-primary" onClick={onSubmit}>
        {isEditing ? 'Simpan Perubahan' : 'Tambah Catatan'}
      </button>
      {isEditing && (
        <button className="btn btn-outline-secondary" onClick={onReset}>
          Batal
        </button>
      )}
    </div>
  </div>
);

const NoteSummary = ({ total, category }) => (
  <div className="card p-3 mb-4 note-card">
    <div className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-3">
      <div>
        <h3 className="section-title">Ringkasan Catatan</h3>
        <p className="text-muted mb-0">Total catatan saat ini: {total}</p>
      </div>
      <div className="text-muted">Filter aktif: {category}</div>
    </div>
  </div>
);

const ExternalPosts = ({ loading, error, posts }) => (
  <div className="card p-3 mb-4 note-card">
    <h3 className="section-title">Data Eksternal dari API</h3>
    {loading && <div className="alert alert-warning">Memuat konten dari jsonplaceholder.typicode.com...</div>}
    {error && <div className="alert alert-danger">{error}</div>}
    {!loading && !error && posts.length > 0 && (
      <div className="row gx-3 gy-3">
        {posts.map((post) => (
          <div className="col-12 col-md-6 col-xl-4" key={post.id}>
            <div className="card h-100 note-card shadow-sm">
              <div className="card-body">
                <h6 className="card-title">{post.title}</h6>
                <p className="card-text note-preview">{post.body.slice(0, 100)}...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const App = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ id: '', title: '', content: '', category: 'Kuliah' });
  const [isEditing, setIsEditing] = useState(false);
  const [externalItems, setExternalItems] = useState([]);

  const storeRef = useRef(new NoteStore([]));

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const savedNotes = loadNotesFromStorage();
    const initialNotes = savedNotes && Array.isArray(savedNotes) && savedNotes.length > 0
      ? savedNotes
      : [
          createNoteObject({
            title: 'Selamat datang',
            content: 'Aplikasi catatan harian siap digunakan. Coba cari kata "kuliah" atau tambahkan catatan baru.',
            category: 'Pribadi',
          }),
        ];

    storeRef.current = new NoteStore(initialNotes);
    setNotes(initialNotes);
    fetchExternalNotes();
  }, []);

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const fetchExternalNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
      if (!response.ok) {
        throw new Error('Gagal memuat data eksternal.');
      }
      const posts = await response.json();
      setExternalItems(posts);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memuat API');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert('Judul dan isi catatan tidak boleh kosong.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (isEditing) {
      const updatedNotes = storeRef.current.update(form.id, {
        title: form.title,
        content: form.content,
        category: form.category,
      });
      setNotes(updatedNotes);
      setIsEditing(false);
      setForm({ id: '', title: '', content: '', category: 'Kuliah' });
      return;
    }

    const note = createNoteObject(form);
    const updatedNotes = storeRef.current.add(note);
    setNotes(updatedNotes);
    setForm({ id: '', title: '', content: '', category: 'Kuliah' });
  };

  const handleEdit = (note) => {
    setIsEditing(true);
    setForm({ id: note.id, title: note.title, content: note.content, category: note.category });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Yakin mau hapus?');
    if (!confirmed) {
      return;
    }
    const updatedNotes = storeRef.current.delete(id);
    setNotes(updatedNotes);
  };

  const handleReset = () => {
    setIsEditing(false);
    setForm({ id: '', title: '', content: '', category: 'Kuliah' });
  };

  const filteredNotes = useMemo(
    () => storeRef.current.search(search, filterCategory),
    [search, filterCategory, notes]
  );

  return (
    <div className="container py-4">
      <Header search={search} onSearch={setSearch} darkMode={darkMode} onToggleDark={() => setDarkMode((current) => !current)} />

      <div className="row mt-4">
        <div className="col-12 col-xl-8">
          <NoteForm form={form} onChange={handleChange} onSubmit={handleSubmit} isEditing={isEditing} onReset={handleReset} />
          <ExternalPosts loading={loading} error={error} posts={externalItems} />
        </div>

        <div className="col-12 col-xl-4">
          <NoteSummary total={filteredNotes.length} category={filterCategory} />
          <div className="card p-3 mb-4 note-card">
            <h3 className="section-title">Filter Kategori</h3>
            <div className="btn-group d-flex flex-wrap" role="group">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`btn ${filterCategory === category ? 'btn-primary' : 'btn-outline-secondary'} mb-2 me-2`}
                  onClick={() => setFilterCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <h6>Petunjuk singkat</h6>
              <ul className="mb-0 ps-3 text-muted">
                <li>Tambah catatan dengan judul, isi, dan kategori.</li>
                <li>Gunakan kotak pencarian untuk menemukan kata dalam judul atau isi.</li>
                <li>Edit atau hapus catatan sesuai kebutuhan.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="alert alert-info">Tidak ada catatan yang cocok dengan pencarian atau filter.</div>
      ) : (
        <>
          <div className="card note-card mb-4 d-none d-lg-block">
            <div className="card-body">
              <h4 className="section-title">Daftar Catatan (Tabel)</h4>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Judul</th>
                      <th>Kategori</th>
                      <th>Tanggal</th>
                      <th>Preview</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotes.map((note) => (
                      <tr key={note.id}>
                        <td>{note.title}</td>
                        <td>{note.category}</td>
                        <td>{note.date}</td>
                        <td>{note.content.length > 80 ? `${note.content.slice(0, 80)}...` : note.content}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(note)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(note.id)}>
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row gy-3 d-lg-none">
            {filteredNotes.map((note) => (
              <div className="col-12" key={note.id}>
                <div className="card note-card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-2 flex-wrap">
                      <h5 className="card-title mb-1">{note.title}</h5>
                      <span className="badge bg-secondary category-badge">{note.category}</span>
                    </div>
                    <p className="note-preview mb-2">{note.date}</p>
                    <p className="card-text note-preview">{note.content.length > 100 ? `${note.content.slice(0, 100)}...` : note.content}</p>
                    <div className="mt-auto d-flex gap-2 flex-wrap">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(note)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(note.id)}>
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

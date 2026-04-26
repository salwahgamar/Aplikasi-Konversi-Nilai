class Nilai {
  constructor(nama, matkul, nilai) {
    this.nama = nama;
    this.matkul = matkul;
    this.nilai = parseFloat(nilai);
  }

  getHuruf() {
    if (this.nilai >= 85) return 'A';
    if (this.nilai >= 75) return 'B';
    if (this.nilai >= 65) return 'C';
    if (this.nilai >= 50) return 'D';
    return 'E';
  }

  getMutu() {
    if (this.nilai >= 85) return 4;
    if (this.nilai >= 75) return 3;
    if (this.nilai >= 65) return 2;
    if (this.nilai >= 50) return 1;
    return 0;
  }
}

export default Nilai;
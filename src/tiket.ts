// APLIKASI TIKET BIOSKOP (KODE A)

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout, 
});

// fungsinya untuk menampilkan judul aplikasi, daftar film dengan ratinmg usia, tipe studio, jam tayang, dan metode pembayaran
// menampilkan judul aplikasi
console.log("==============================");
console.log("       POP REEL CINEMA        ");
console.log("==============================");

// menampilkan daftar film beserta rating usianya 
console.log("\nDAFTAR FILM:");
console.log("1. Na Willa (SU)");
console.log("2. Senin Harga Naik (13+)");
console.log("3. Alas Roban (17+)");

// menampilkan daftar studio beserta harga dasar tiketnya
console.log("\nTIPE STUDIO:");
console.log("1. Regular  - 40000");
console.log("2. Premier  - 60000");
console.log("3. IMAX     - 75000");

// menampilkan daftar jam tayang
console.log("\nJAM TAYANG:");
console.log("1. Pagi  (10.00)");
console.log("2. Siang (13.00)");
console.log("3. Malam (19.00)");

// menampilkan daftar metode pembayaran
console.log("\nMETODE PEMBAYARAN:");
console.log("1. Tunai");
console.log("2. E-Wallet");
console.log("3. Kartu Debit/Kredit\n");

// nilai tetap, memakai const
const biayaLayanan: number = 2500; // biaya layanan per tiket
const hargaWeekend: number = 10000; // tambahan harga tiket saat Sabtu/Minggu
const batasMaksimalTiket: number = 40; // batas maksimal jumlah tiket per transaksi
// const maksimalDiskon: number = 0.35; // batas maksimal total diskon dalam desimal (35% = 0.35)
const daftarBayar: string[] = ["Tunai", "E-Wallet", "Kartu Debit/Kredit"]; // metode pembayaran
const ratingUsiaFilm: number[] = [0, 13, 17]; // rating usia film per kode film

// pertanyaan 1: nama pelanggan
rl.question("Nama Pelanggan: ", (inputNama: string) => {
  const namaPelanggan: string = inputNama.trim(); // membuang spasi di awal/akhir nama
  if (namaPelanggan.trim() === "" || !isNaN(Number(namaPelanggan))) {
    // jika nama kosong atau berupa angka maka dianggap tidak valid
    console.log("Nama tidak valid, silahkan masukkan nama Anda dengan benar.");
    rl.close();
    return;
  }

  // pertanyaan 2: umur pelanggan
  rl.question("Umur: ", (inputUmur: string) => {
    const umur: number = Number(inputUmur); // konversi dari string ke number
    if (inputUmur.trim() === "" || isNaN(umur)) {
      // jika input bukan angka
      console.log("Umur tidak valid, silahkan masukkan umur Anda dengan benar.");
      rl.close();
      return;
    } else if (inputUmur === "" || umur < 1 || umur > 120) {
      // jika umur kosong atau di luar batas (1-120)
      console.log("Umur tidak terdeteksi, silahkan masukkan umur Anda dengan benar.");
      rl.close();
      return;
    }

    // pertanyaan 3: status member
    rl.question("Member? (y/n): ", (inputMember: string) => {
      const isMember: boolean = inputMember.trim().toLowerCase() === "y"; // true jika menjawab "y"
      if (inputMember.trim().toLowerCase() !== "y" && inputMember.trim().toLowerCase() !== "n") {
        console.log("Input tidak valid, silahkan Masukkan y / n");
        rl.close();
        return;
      }

      // pertanyaan 4: film
      rl.question("Pilih film (1-3): ", (inputFilm) => {
        const kodeFilm: number = Number(inputFilm);
        if (inputFilm.trim() === "" || Number.isNaN(kodeFilm) || kodeFilm < 1 || kodeFilm > 3) {
          console.log("Kode film tidak valid, silahkan masukkan kode film yang benar.");
          rl.close();
          return;
        }

        // menentukan apakah pelanggan memenuhi syarat usia untuk menonton film yang dipilih

        if (kodeFilm === 1 && umur < 0) { // semua umur tidak ada batasan usia, jadi tidak perlu dicek
          console.log("\n[DITOLAK] Maaf, usia Anda belum memenuhi rating usia film ini (minimal Semua Umur).");
          rl.close();
          return;
        } else {
          if (kodeFilm === 2 && umur < 13) { // rating 13+ (minimal 13 tahun)
            console.log("\n[DITOLAK] Maaf, usia Anda belum memenuhi rating usia film ini (minimal 13 tahun).");
            rl.close();
            return;
          } else if (kodeFilm === 3 && umur < 17) { // rating 17+ (minimal 17 tahun)
            console.log("\n[DITOLAK] Maaf, usia Anda belum memenuhi rating usia film ini (minimal 17 tahun).");
            rl.close();
            return;
          } else {
            console.log("\n[OK] Pemeriksaan rating usia lolos. Memproses pesanan...",);
          }
        }
        

        // pertanyaan 5: studio
        rl.question("Pilih studio (1-3): ", (inputStudio) => {
          const kodeStudio: number = Number(inputStudio);
          if (inputStudio.trim() === "" || Number.isNaN(kodeStudio) || kodeStudio < 1 || kodeStudio > 3) {
            console.log("Kode studio tidak valid, silahkan masukkan kode studio yang benar.");
            rl.close();
            return;
          }

          // pertanyaan 6: jam tayang
          rl.question("Pilih jam tayang (1-3)  : ", (inputJam: string) => {
            const kodeJam: number = Number(inputJam); // konversi ke number
            if (kodeJam.toString() === "" || kodeJam < 1 || kodeJam > 3) {
              // jika kode jam kosong atau di luar batas (1-3)
              console.log(
                "Kode jam tayang tidak valid, silahkan masukkan kode jam tayang yang benar.",
              );
              rl.close();
              return;
            }

            // pertanyaan 7: hari
            rl.question(
              "Hari (1=Senin ... 7=Minggu): ",
              (inputHari: string) => {
                const hari: number = Number(inputHari); // konversi ke number
                if (hari.toString() === "" || hari < 1 || hari > 7) {
                  // jika kode hari kosong atau di luar batas (1-7)
                  console.log(
                    "Kode hari tidak valid, silahkan masukkan kode hari dengan benar.",
                  );
                  rl.close();
                  return;
                }

                // pertanyaan 8: jumlah tiket
                rl.question("Jumlah tiket: ", (inputJumlah: string) => {
                  const jumlahTiket: number = Number(inputJumlah); // konversi ke number
                  if (
                    jumlahTiket.toString() === "" ||
                    jumlahTiket < 1 ||
                    jumlahTiket > batasMaksimalTiket
                  ) {
                    // jika jumlah tiket kosong atau di luar batas (1-batasMaksimalTiket)
                    console.log("Jumlah tiket melebihi batas maksimum, silahkan masukkan jumlah tiket dengan benar.",
                    );
                    rl.close();
                    return;
                  }

                  // pertanyaan 9: metode pembayaran
                  rl.question("Metode bayar (1-3): ", (inputBayar: string) => {
                    const kodeBayar: number = Number(inputBayar); // konversi ke number
                    if (kodeBayar.toString() === "" || kodeBayar < 1 || kodeBayar > 3
                    ) {
                      // jika kode bayar kosong atau di luar batas (1-3)
                      console.log("Kode metode bayar tidak valid, silahkan masukkan kode metode bayar dengan benar.",
                      );
                      rl.close();
                      return;
                    }
                    rl.close();

                    console.log("\nMemproses pembayaran...");
                    
                    // semua kondisi digabung dengan operator logika && (dan); nilai NaN otomatis gagal di perbandingan
                    const inputValid: boolean =
                      // nama tidak boleh kosong
                      namaPelanggan !== "" &&
                      // umur harus masuk akal (1-120)
                      umur >= 1 &&
                      umur <= 120 &&
                      // kode film harus valid (1-3)
                      kodeFilm >= 1 &&
                      kodeFilm <= 3 &&
                      // kode studio harus valid (1-3)
                      kodeStudio >= 1 &&
                      kodeStudio <= 3 &&
                      // kode jam harus valid (1-3)
                      kodeJam >= 1 &&
                      kodeJam <= 3 &&
                      // kode hari harus valid (1. senin-7. minggu)
                      hari >= 1 &&
                      hari <= 7 &&
                      // kode metode bayar harus valid (1-3)
                      kodeBayar >= 1 &&
                      kodeBayar <= 3 &&
                      // jumlah tiket harus valid (1 sampai batas maksimal)
                      Number.isInteger(jumlahTiket) &&
                      jumlahTiket >= 1 &&
                      jumlahTiket <= batasMaksimalTiket; // jumlah tiket 1 sampai batas maksimal

                    // menentukan judul film dan rating usia film berdasarkan kode film yang diinput
                    let judulFilm: string = ""; // judul film, nilainya berubah sesuai pilihan sehingga memakai let
                    let ratingFilm: string = ""; // rating usia film, awalnya kosong

                    // memilih data film berdasarkan kode film yang diinput
                    switch (kodeFilm) {
                      case 1: //rating SU (Semua Umur)
                        judulFilm = "Na Willa"; // isi judul film
                        ratingFilm = "SU"; // isi rating (Semua Umur)
                        break;

                      case 2: //rating 13+ (minimal 13 tahun)
                        judulFilm = "Senin Harga Naik";
                        ratingFilm = "13+";
                        break;

                      case 3: //rating 17+ (minimal 17 tahun)
                        judulFilm = "Alas Roban";
                        ratingFilm = "17+";
                        break;

                      default:
                        judulFilm = "Tidak diketahui";
                        break;
                    }

                   

                    // menentukan studio dan harga tiket berdasarkan kode studio yang diinput

                    let namaStudio: string = ""; 
                    let hargaTiket: number = 0; 

                    // memilih studio berdasarkan kode studio yang diinput
                    switch (kodeStudio) {
                      case 1: // studio regular
                        namaStudio = "Regular"; 
                        hargaTiket = 40000; 
                        break; 
                      
                      case 2: //studio premier
                        namaStudio = "Premier"; // isi nama studio
                        hargaTiket = 60000; // isi harga dasar
                        break; 
                      
                      case 3: //studio IMAX
                        namaStudio = "IMAX"; 
                        hargaTiket = 75000; 
                        break; 
                      
                      default:
                        namaStudio = "Tidak diketahui"; 
                        break; 
                    }
                    
                    // menentukan harga tiket akhir pekan (hari 6 dan 7)
                    const isAkhirPekan: boolean = hari === 6 || hari === 7;

                    // jika akhir pekan, harga tiket naik
                    if (isAkhirPekan) {
                      hargaTiket += hargaWeekend; // operator compound += menambah tarif akhir pekan
                    }

                    // jam tayang, promo, dan metode bayar (+ NESTED 4 TINGKAT)
                    let namaJam: string = ""; // nama jam tayang, akan diisi sesuai pilihan
                    let persenDiskon: number = 0; // total diskon dalam persen, awalnya 0 dan akan bertambah
                    let keteranganPromo: string = "Tidak ada promo"; // keterangan promo, awalnya tidak ada

                    // tingkat 1: memilih perlakuan berdasarkan jam tayang
                    switch (kodeJam) {
                      // jam tayang pagi 
                      case 1:
                        namaJam = "Pagi (10.00)"; // isi nama jam tayang
                        // tingkat 2 
                        if (!isAkhirPekan) {
                          // tingkat 3: promo hanya untuk member yang membeli minimal 2 tiket (2 kondisi dengan &&)
                          if (isMember && jumlahTiket >= 2) {
                            keteranganPromo = "Promo Jam Tayang Pagi Member"; // catat nama promo
                            persenDiskon += 15; // diskon dasar promo Jam Tayang Pagi 15%
                            // tingkat 4: bonus diskon tambahan sesuai metode pembayaran
                            switch (kodeBayar) { 
                              // apabila bayar memakai tunai
                              case 1:
                                persenDiskon += 0; //tidak ada bonus untuk tunai
                                break;

                              // apabila bayar memakai e-wallet
                              case 2:
                                persenDiskon += 10; // bonus 10% untuk e-wallet
                                break; 

                              // apabila bayar memakai kartu
                              case 3:
                                persenDiskon += 5; // bonus 5% untuk kartu
                                break;

                              default: 
                                console.log("Metode bayar tidak valid, tidak ada bonus tambahan promo");
                                break; 
                            }
                          }
                        }
                        break; 
                      
                      // jam tayang siang
                      case 2:
                        namaJam = "Siang (13.00)"; 
                        // member mendapat diskon tetap 5% untuk tayang siang
                        if (isMember) {
                          keteranganPromo = "Diskon Member Siang"; // catat nama promo
                          persenDiskon += 5; // tambah diskon 5%
                        }
                        break;

                      // jam tayang malam
                      case 3:
                        namaJam = "Malam (19.00)"; // isi nama jam tayang
                        // tidak ada promo untuk jam tayang malam
                        break;
                  
                      default:
                        namaJam = "Tidak diketahui"; 
                        break; 
                    }

                    // menentukan perhitungan total 
                    const subtotal: number = hargaTiket * jumlahTiket; 
                    let potongan: number = subtotal;

                    potongan *= persenDiskon / 100; // compound *= : dikali persen diskon

                    // menghitung total banyar

                    let totalBayar: number = subtotal; // total bayar dimulai dari subtotal
                    totalBayar -= potongan; // compound -= : subtotal dikurangi potongan

                    const biayaLayananTotal: number =
                      biayaLayanan * jumlahTiket; // biaya layanan total = biaya per tiket x jumlah tiket
                    totalBayar += biayaLayananTotal; // compound += : ditambah biaya layanan

                    // const sisaBulat: number = totalBayar % 500; // operator modulus % mencari sisa pembagian untuk pembulatan ke kelipatan 500
                    // totalBayar -= sisaBulat; // compound -= : membuang sisa sehingga total menjadi kelipatan 500

                    // output struk pemesanan
                    // tanda ?? memberi nilai cadangan jika data tidak ditemukan
                    const namaBayar: string =
                      daftarBayar[kodeBayar - 1] ?? "Tidak diketahui";
                  
                    console.log("\n=========== STRUK TIKET BIOSKOP POP REEL CINEMA ===========");
                    console.log("Pelanggan     : " + namaPelanggan + (isMember ? " (Member)" : ""),
                    );

                    console.log("Film          : " + judulFilm + " [" + ratingFilm + "]",
                    );
                    console.log("Studio        : " + namaStudio);
                    console.log("Jam tayang    : " + namaJam);
                    console.log("Harga/tiket   : " + hargaTiket);
                    console.log("Jumlah tiket  : " + jumlahTiket);
                    console.log("Subtotal      : " + subtotal);
                    console.log("Promo         : " + keteranganPromo);
                    console.log("Total diskon  : " + persenDiskon +"% (" + potongan +")",
                    );

                    console.log("Biaya layanan : " + biayaLayananTotal);
                    console.log("Metode bayar  : " + namaBayar);
                    console.log("-----------------------------------");
                    console.log("TOTAL BAYAR   : " + totalBayar);
                    console.log("===================================");
                    console.log("Terima kasih, selamat menonton!"); 

                    rl.close();
                  });
                });
              },
            );
          });
        });
      });
    });
  });
});

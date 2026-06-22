-- =====================================================
-- Vision: seed Bahasa Malaysia translations (hand-translated)
-- =====================================================
-- Populates the _ms columns directly — no API cost. The Haiku pipeline
-- (admin /admin/translations) remains for any future content added later.
-- =====================================================

-- ---------- Ministries ----------
update public.ministries set name_ms = 'Kementerian Pendidikan', description_ms = 'Sekolah, kurikulum, dan pencapaian pelajar bagi pendidikan rendah dan menengah.' where slug = 'education';
update public.ministries set name_ms = 'Kementerian Pengajian Tinggi', description_ms = 'Universiti, politeknik, dan pembelajaran peringkat tertiari.' where slug = 'higher-education';
update public.ministries set name_ms = 'Kementerian Kesihatan', description_ms = 'Penjagaan kesihatan awam, hospital, dan perkhidmatan kesihatan.' where slug = 'health';
update public.ministries set name_ms = 'Kementerian Perumahan dan Kerajaan Tempatan', description_ms = 'Perumahan mampu milik, sewaan, dan perkhidmatan majlis tempatan.' where slug = 'housing-local-government';
update public.ministries set name_ms = 'Kementerian Sumber Manusia', description_ms = 'Pekerjaan, buruh, dan pembangunan tenaga kerja.' where slug = 'human-resources';
update public.ministries set name_ms = 'Kementerian Kewangan', description_ms = 'Belanjawan negara, percukaian, dan kewangan awam.' where slug = 'finance';
update public.ministries set name_ms = 'Kementerian Ekonomi', description_ms = 'Perancangan ekonomi, perangkaan, dan pembangunan.' where slug = 'economy';
update public.ministries set name_ms = 'Kementerian Digital', description_ms = 'Kerajaan digital, data, dan ekonomi digital.' where slug = 'digital';
update public.ministries set name_ms = 'Kementerian Pengangkutan', description_ms = 'Jalan raya, pengangkutan awam, pelesenan, dan mobiliti.' where slug = 'transport';
update public.ministries set name_ms = 'Kementerian Dalam Negeri', description_ms = 'Imigresen, pendaftaran negara, dan ketenteraman awam.' where slug = 'home-affairs';
update public.ministries set name_ms = 'Kementerian Perdagangan Dalam Negeri dan Kos Sara Hidup', description_ms = 'Perlindungan pengguna, harga, dan perdagangan dalam negeri.' where slug = 'domestic-trade-cost-of-living';
update public.ministries set name_ms = 'Kementerian Komunikasi', description_ms = 'Media, penyiaran, dan komunikasi awam.' where slug = 'communications';
update public.ministries set name_ms = 'Kementerian Sains, Teknologi dan Inovasi', description_ms = 'Penyelidikan & pembangunan, inovasi, dan teknologi baharu.' where slug = 'science-technology-innovation';
update public.ministries set name_ms = 'Kementerian Pembangunan Luar Bandar dan Wilayah', description_ms = 'Infrastruktur luar bandar dan pertumbuhan wilayah.' where slug = 'rural-regional-development';
update public.ministries set name_ms = 'Kementerian Kerja Raya', description_ms = 'Infrastruktur awam dan pembinaan.' where slug = 'works';
update public.ministries set name_ms = 'Kementerian Pertanian dan Keterjaminan Makanan', description_ms = 'Pertanian, perikanan, dan bekalan makanan.' where slug = 'agriculture-food-security';
update public.ministries set name_ms = 'Kementerian Belia dan Sukan', description_ms = 'Pembangunan belia dan sukan.' where slug = 'youth-sports';
update public.ministries set name_ms = 'Kementerian Pelancongan, Seni dan Budaya', description_ms = 'Pelancongan, warisan, seni, dan budaya.' where slug = 'tourism-arts-culture';
update public.ministries set name_ms = 'Kementerian Pelaburan, Perdagangan dan Industri', description_ms = 'Perdagangan, pelaburan, dan pembangunan perindustrian.' where slug = 'investment-trade-industry';
update public.ministries set name_ms = 'Kementerian Pembangunan Usahawan dan Koperasi', description_ms = 'PKS, usahawan, dan koperasi.' where slug = 'entrepreneur-cooperatives';
update public.ministries set name_ms = 'Kementerian Pertahanan', description_ms = 'Pertahanan negara dan angkatan tentera.' where slug = 'defence';
update public.ministries set name_ms = 'Kementerian Luar Negeri', description_ms = 'Diplomasi dan hubungan antarabangsa.' where slug = 'foreign-affairs';
update public.ministries set name_ms = 'Kementerian Perladangan dan Komoditi', description_ms = 'Minyak sawit, getah, dan komoditi.' where slug = 'plantation-commodities';
update public.ministries set name_ms = 'Kementerian Sumber Asli dan Kelestarian Alam', description_ms = 'Alam sekitar, biodiversiti, dan sumber asli.' where slug = 'natural-resources-environment';
update public.ministries set name_ms = 'Kementerian Peralihan Tenaga dan Transformasi Air', description_ms = 'Tenaga, tenaga boleh diperbaharui, dan air.' where slug = 'energy-water';
update public.ministries set name_ms = 'Kementerian Pembangunan Wanita, Keluarga dan Masyarakat', description_ms = 'Kebajikan, keluarga, dan pembangunan masyarakat.' where slug = 'women-family-community';
update public.ministries set name_ms = 'Kementerian Perpaduan Negara', description_ms = 'Perpaduan sosial dan perpaduan negara.' where slug = 'national-unity';

-- ---------- Initiatives (by id) ----------
update public.initiatives set
  problem_ms = 'Pelajar tiada cara berstruktur dan bergamifikasi untuk berlatih sukatan pelajaran kebangsaan, dan guru kurang pandangan terhadap penguasaan setiap topik.',
  idea_ms = 'EduBridge — platform pembelajaran dengan kuiz, pemarkahan di pelayan, XP, dan papan pendahulu, disokong oleh API MyQuiza dan klien Android natif (Syllabuzz).'
where id = '4b5ca958-4d27-4683-9dc5-7c02136e5aa5';

update public.initiatives set
  problem_ms = 'Klien web dan mudah alih EduBridge memerlukan satu sumber dipercayai untuk kandungan kuiz, pemarkahan, dan kemajuan — tanpa setiap klien melaksanakan semula peraturan atau mempercayai markah di sebelah klien.',
  idea_ms = 'MyQuiza — API REST ASP.NET Core yang mengesahkan JWT Supabase dan menguruskan pemarkahan, XP, dan kemajuan di pelayan. Menggerakkan kedua-dua EduBridge (web) dan Syllabuzz (mudah alih).'
where id = 'e9df6462-fadd-4564-9113-d46f93741108';

update public.initiatives set
  problem_ms = 'Pelajar mahu belajar dan menjawab kuiz pada telefon mereka, bukan hanya di web.',
  idea_ms = 'Syllabuzz — klien Android natif untuk ekosistem EduBridge/MyQuiza: layari subjek, jawab kuiz, dan jejak kemajuan serta papan pendahulu pada mudah alih.'
where id = '268820fc-aaa0-40bf-9d8d-2006f7a82557';

update public.initiatives set
  problem_ms = 'Guru menghabiskan berjam-jam menyediakan slaid, dan bahan pengajaran berkualiti sukar dikongsi atau dijual.',
  idea_ms = 'SlideMarket — pasaran tempat pendidik menjual dan meminta slaid pendidikan tersuai.'
where id = '2dbe29f2-ea05-45b4-8eaf-41dc6daa0017';

update public.initiatives set
  problem_ms = 'Sekolah mengeluarkan sijil kertas yang sukar disahkan dan mudah dipalsukan.',
  idea_ms = 'Mysertifico — pengurusan dan pengesahan sijil digital dengan profil pelajar dan pembina resume.'
where id = '12129870-54de-441c-9968-e2c8b2b80f17';

update public.initiatives set
  problem_ms = 'Pelajar mendapati Sejarah membosankan dan terpisah daripada tempat dan kisah di sekeliling mereka.',
  idea_ms = 'ACCodeSEA — belajar sejarah Malaysia dengan memainkannya: permainan platformer berlatarkan Melaka 1511, dalam semangat mod Discovery Tour Assassin''s Creed.'
where id = '24205bdf-4ff5-4f18-8522-5cdca7492652';

update public.initiatives set
  problem_ms = 'Pelajar peringkat tertiari memerlukan alat ulang kaji rentak sendiri yang dipetakan kepada kursus mereka.',
  idea_ms = 'Perluas pepohon kandungan dan enjin kuiz EduBridge kepada subjek peringkat tertiari.'
where id = '6ac42a49-be24-4382-8e7c-fac9e3a5c34c';

update public.initiatives set
  problem_ms = 'Penyewa sukar mencari bilik yang disahkan, dan tiada saluran penyenaraian yang boleh dipercayai dengan pengesahan organisasi.',
  idea_ms = 'BilikSewa — platform sewaan dengan pengesahan organisasi dan penyenaraian van ulang-alik.'
where id = 'f39d5efe-d7dc-4093-af01-a2b7c42011c4';

update public.initiatives set
  problem_ms = 'Pencari kerja dan majikan tiada saluran berstruktur untuk menjejaki permohonan dan memadankan jawatan kosong.',
  idea_ms = 'JobMatch — penjejakan permohonan, pengurusan iklan kerja, dan papan pemuka majikan.'
where id = 'ac7bcd7e-e12b-4983-9b36-4d72d6825d9d';

update public.initiatives set
  problem_ms = 'Pengetahuan di tempat kerja — pelajaran praktikal yang dipelajari pekerja — jarang dirakam atau dikongsi dalam sesebuah organisasi.',
  idea_ms = 'TIWIKOM (Things I Wish I Knew On My...) — platform untuk pekerja berkongsi pandangan, nasihat, dan pengajaran.'
where id = '8e8be030-86d9-4217-b6a2-b2f91d06b265';

update public.initiatives set
  problem_ms = 'Penyelidik dan penggubal dasar memerlukan data tinjauan berkualiti, dan peserta kurang insentif untuk memberikan jawapan yang teliti.',
  idea_ms = 'Veyoyee — platform tinjauan yang menghubungkan pencipta dan peserta dengan sistem ganjaran dan reputasi untuk meningkatkan kualiti data.'
where id = 'c7afa3e4-93db-46a0-bbe9-7d9196f85fe9';

update public.initiatives set
  problem_ms = 'Penyewa yang menemui bilik masih menghadapi jurang batu terakhir — bergerak dari hab transit ke premis dan di sekitar kawasan tanpa kereta.',
  idea_ms = 'Penyenaraian van ulang-alik BilikSewa menghubungkan sewaan ke transit berdekatan, menangani sambungan batu terakhir seiring dengan carian bilik.'
where id = 'b8af58db-a12c-4092-85e7-9f9d0acffed6';

update public.initiatives set
  problem_ms = 'Perkhidmatan kaunter kerajaan (KP, lesen, pasport, saman) melibatkan giliran yang panjang dan tidak telus.',
  idea_ms = 'MyBeratur — penggiliran digital dengan cadangan cawangan pintar, giliran keutamaan, dan tiket QR/PDF.'
where id = '23f9e09e-77d5-4f84-b970-628adb50b54e';

update public.initiatives set
  problem_ms = 'Anak muda Malaysia jarang terhubung dengan warisan negara — tempat seperti Melaka terasa seperti sejarah yang jauh dan bukannya tempat untuk diterokai.',
  idea_ms = 'ACCodeSEA — permainan platformer naratif berlatarkan kejatuhan Melaka 1511 yang menjadikan warisan Asia Tenggara satu pengalaman interaktif, mencetuskan minat sebenar terhadap tapak sejarah.'
where id = 'ead30e17-f33b-4926-8263-d5533ecde330';

update public.initiatives set
  problem_ms = 'Pelajar universiti yang menjalankan perniagaan kecil beroperasi secara tidak formal melalui WhatsApp tanpa struktur.',
  idea_ms = 'UYE (University Young Entrepreneur) — pasaran berstruktur untuk perkhidmatan dikendalikan pelajar.'
where id = '909883c6-d765-4cf4-aea6-4adaa2944122';

update public.initiatives set
  problem_ms = 'Pemilik perniagaan kecil menguruskan inventori, pesanan, dan kewangan merentas hamparan tanpa satu papan pemuka.',
  idea_ms = 'SBMP (Small Business Management Platform) — papan pemuka untuk inventori, pemprosesan pesanan, dan penjejakan kewangan yang disasarkan kepada perusahaan mikro dan kecil.'
where id = 'dc45b6fd-7b0d-487e-af9c-2ae104e1dd5b';

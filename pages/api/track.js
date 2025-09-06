export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.error("URL Google Script belum diatur di .env.local");
      return res.status(500).json({ status: 'error', message: 'Konfigurasi server tidak lengkap.' });
    }

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        res.status(200).json({ status: 'success', message: 'Lokasi berhasil dikirim ke spreadsheet' });
      } else {
        throw new Error(result.message || 'Terjadi kesalahan pada Google Script');
      }
    } catch (error) {
      console.error('Gagal mengirim data ke Google Spreadsheet:', error);
      res.status(500).json({ status: 'error', message: 'Gagal meneruskan data lokasi.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
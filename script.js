document.getElementById('pengaduanForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    const statusPesan = document.getElementById('statusPesan');
    statusPesan.style.color = "blue";
    statusPesan.textContent = "Mengirim pengaduan secara aman...";

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });

        const result = await response.json();
        
        if (response.status === 200) {
            statusPesan.style.color = "green";
            statusPesan.textContent = "Pengaduan berhasil dikirim secara rahasia dan aman ke Admin!";
            form.reset();
        } else {
            statusPesan.style.color = "red";
            statusPesan.textContent = result.message || "Terjadi kesalahan, gagal mengirim pengaduan.";
        }
    } catch (error) {
        statusPesan.style.color = "red";
        statusPesan.textContent = "Gagal terhubung ke server.";
    }

    setTimeout(() => {
        statusPesan.textContent = "";
    }, 6000);
});
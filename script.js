document.addEventListener('DOMContentLoaded', () => {
    const indicatorArea = document.getElementById('indicatorArea');
    const solutionArea = document.getElementById('solutionArea');
    const resultArea = document.getElementById('resultArea');

    // Simpan data pilihan indikator dan larutan
    let selectedIndicator = null;
    let selectedSolution = null;

    // Handle click event untuk memilih indikator
    document.querySelectorAll('.tool').forEach(tool => {
        tool.addEventListener('click', () => {
            const toolType = tool.id;
            const imagePath = tool.dataset.image;

            if (toolType === 'litmusmerah' || toolType === 'phenolphthalein' || toolType === 'litmusbiru' || toolType === 'geranium' || toolType === 'kol' || toolType === 'kunyit' || toolType === 'mawar') {
                showImageInArea(imagePath, indicatorArea);
                selectedIndicator = toolType;
            } else if (toolType === 'HCl' || toolType === 'NaOH' || toolType === 'air' || toolType === 'soda' || toolType === 'cuka' || toolType === 'deterjen' || toolType === 'lemon') {
                showImageInArea(imagePath, solutionArea);
                selectedSolution = toolType;
            }

            // Tampilkan hasil jika kedua alat telah dipilih
            if (selectedIndicator && selectedSolution) {
                showResult(selectedIndicator, selectedSolution);
            }
        });
    });

    // Fungsi untuk menampilkan gambar pada area yang dipilih
    function showImageInArea(imagePath, area) {
        area.innerHTML = '';  // Kosongkan area sebelum menambahkan gambar baru
        const img = document.createElement('img');
        img.src = imagePath;
        img.style.width = '100px';
        img.style.height = '100px';
        area.appendChild(img);
    }

    // Fungsi untuk menampilkan hasil
    function showResult(indicator, solution) {
        resultArea.innerHTML = ''; // Kosongkan area hasil

        let resultImagePath;

        // Tentukan gambar hasil berdasarkan kombinasi indikator dan larutan
        if (indicator === 'litmusmerah' && solution === 'HCl') {
            resultImagePath = 'images/lakmus merah.png';  // Ganti dengan path gambar sebenarnya
        } 
        else if (indicator === 'litmusmerah' && solution === 'NaOH') {
            resultImagePath = 'images/lakmus biru.png';
        } 
        else if (indicator === 'litmusmerah' && solution === 'cuka') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'litmusmerah' && solution === 'soda') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'litmusmerah' && solution === 'lemon') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'litmusmerah' && solution === 'deterjen') {
            resultImagePath = 'images/lakmus biru.png';
        }
        else if (indicator === 'litmusmerah' && solution === 'air') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'litmusbiru' && solution === 'HCl') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'litmusbiru' && solution === 'NaOH') {
            resultImagePath = 'images/lakmus biru.png';
        }
        else if (indicator === 'litmusbiru' && solution === 'cuka') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'litmusbiru' && solution === 'soda') {
            resultImagePath = 'images/lakmus biru.png';
        }
        else if (indicator === 'litmusbiru' && solution === 'lemon') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'litmusbiru' && solution === 'deterjen') {
            resultImagePath = 'images/lakmus biru.png';
        }
        else if (indicator === 'litmusbiru' && solution === 'air') {
            resultImagePath = 'images/lakmus biru.png';
        }
        else if (indicator === 'phenolphthalein' && solution === 'HCl') {
            resultImagePath = 'images/putih.png';
        } 
        else if (indicator === 'phenolphthalein' && solution === 'NaOH') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'phenolphthalein' && solution === 'cuka') {
            resultImagePath = 'images/putih.png';
        }
        else if (indicator === 'phenolphthalein' && solution === 'soda') {
            resultImagePath = 'images/putih.png';
        }
        else if (indicator === 'phenolphthalein' && solution === 'lemon') {
            resultImagePath = 'images/putih.png';
        }
        else if (indicator === 'phenolphthalein' && solution === 'deterjen') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'phenolphthalein' && solution === 'air') {
            resultImagePath = 'images/putih.png';
        }
        else if (indicator === 'kunyit' && solution === 'HCl') {
            resultImagePath = 'images/kuning.png';
        }
        else if (indicator === 'kunyit' && solution === 'NaOH') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'kunyit' && solution === 'cuka') {
            resultImagePath = 'images/kuning.png';
        }
        else if (indicator === 'kunyit' && solution === 'soda') {
            resultImagePath = 'images/kuning.png';
        }
        else if (indicator === 'kunyit' && solution === 'lemon') {
            resultImagePath = 'images/kuning.png';
        }
        else if (indicator === 'kunyit' && solution === 'deterjen') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'kunyit' && solution === 'air') {
            resultImagePath = 'images/kuning.png';
        }
        else if (indicator === 'mawar' && solution === 'HCl') {
            resultImagePath = 'images/merah muda.png';
        }
        else if (indicator === 'mawar' && solution === 'NaOH') {
            resultImagePath = 'images/hijau.png';
        }
        else if (indicator === 'mawar' && solution === 'cuka') {
            resultImagePath = 'images/merah muda.png';
        }
        else if (indicator === 'mawar' && solution === 'soda') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'mawar' && solution === 'lemon') {
            resultImagePath = 'images/kuning.png';
        }
        else if (indicator === 'mawar' && solution === 'deterjen') {
            resultImagePath = 'images/hijau.png';
        }
        else if (indicator === 'mawar' && solution === 'air') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'geranium' && solution === 'HCl') {
            resultImagePath = 'images/orange.png';
        }
        else if (indicator === 'geranium' && solution === 'NaOH') {
            resultImagePath = 'images/kuning.png';
        }
        else if (indicator === 'geranium' && solution === 'cuka') {
            resultImagePath = 'images/orange.png';
        }
        else if (indicator === 'geranium' && solution === 'soda') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'geranium' && solution === 'lemon') {
            resultImagePath = 'images/orange.png';
        }
        else if (indicator === 'geranium' && solution === 'deterjen') {
            resultImagePath = 'images/kuning.png';
        }
        else if (indicator === 'geranium' && solution === 'air') {
            resultImagePath = 'images/lakmus merah.png';
        }
        else if (indicator === 'kol' && solution === 'HCl') {
            resultImagePath = 'images/merah muda.png';
        }
        else if (indicator === 'kol' && solution === 'NaOH') {
            resultImagePath = 'images/hijau.png';
        }
        else if (indicator === 'kol' && solution === 'cuka') {
            resultImagePath = 'images/merah muda.png';
        }
        else if (indicator === 'kol' && solution === 'soda') {
            resultImagePath = 'images/ungu.png';
        }
        else if (indicator === 'kol' && solution === 'lemon') {
            resultImagePath = 'images/merah muda.png';
        }
        else if (indicator === 'kol' && solution === 'deterjen') {
            resultImagePath = 'images/hijau.png';
        }
        else if (indicator === 'kol' && solution === 'air') {
            resultImagePath = 'images/ungu.png';
        }

        // Tampilkan gambar hasil jika ada kombinasi yang sesuai
        if (resultImagePath) {
            const resultImg = document.createElement('img');
            resultImg.src = resultImagePath;
            resultImg.style.width = '100px';
            resultImg.style.height = '100px';
            resultArea.appendChild(resultImg);
        } else {
            // Tampilkan pesan error jika kombinasi tidak ditemukan
            const errorText = document.createElement('p');
            errorText.textContent = "Kombinasi tidak dikenal!";
            resultArea.appendChild(errorText);
        }
    }
});

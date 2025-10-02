let currentPage = 0;
const pages = document.getElementById('pages');
const dots = document.querySelectorAll('.dot');

function goToPage(pageIndex) {
  if (pageIndex < 0) pageIndex = 0;
  if (pageIndex > 2) pageIndex = 2;
  pages.style.transform = `translateX(-${pageIndex * 33.333}%)`;
  currentPage = pageIndex;
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === pageIndex);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const serviceItems = document.querySelectorAll('.service-item');
  const galleryContainer = document.getElementById('gallery-container');
  const galleryServiceTitle = document.getElementById('gallery-service-title');
  const galleryServiceSubtitle = document.getElementById('gallery-service-subtitle');
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const imageCaption = document.getElementById('imageCaption');
  const closeModal = document.getElementById('closeModal');

  // Define mapping from service id to folder + files
 // Define mapping from service id to folder + files
   const serviceImages = {
        'pvccar-parking': {
          folder: 'Images/PvcCarParking/',
          files: ['pvc1.jpeg', 'pvc2.jpeg', 'pvc3.jpeg', 'pvc4.jpeg', 'pvc5.jpeg', 'pvc6.jpeg', 'pvc7.jpeg', 'pvc8.jpeg', 'pvc9.jpeg', 'pvc10.jpeg', 'pvc11.jpeg', 'pvc12.jpeg', 'pvc13.jpeg', 'pvc14.jpeg', 'pvc15.jpeg', 'pvc16.jpeg', 'pvc17.jpeg', 'pvc18.jpeg', 'pvc19.jpeg', 'pvc20.jpeg']
        },
        'modern-car-parking': {
          folder: 'ModernCarparking/',
          files: ['MP1.jpeg', 'MP2.jpeg', 'MP3.jpeg', 'MP4.jpeg','MP4.jpeg','MP5.jpeg','MP6.jpeg','MP7.jpeg','MP8.jpeg','MP9.jpeg','MP10.jpeg','MP11.jpeg','MP12.jpeg','MP13.jpeg','MP14.jpeg','MP15.jpeg','MP16.jpeg','MP17.jpeg','MP18.jpeg','MP19.jpeg','MP20.jpeg','MP21.jpeg','MP22.jpeg','MP23.jpeg','MP24.jpeg','MP25.jpeg','MP26.jpeg','MP27.jpeg']
        },
        'aluminium-doors': {
          folder: 'images/aluminium-doors/',
          files: ['AD1.jpg', 'AD2.jpg']
        }
      };

  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      const serviceId = item.getAttribute('data-service');
      const serviceName = item.textContent;

      serviceItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      galleryServiceTitle.textContent = serviceName;
      galleryServiceSubtitle.textContent = "Project Gallery";

      // Clear existing galleries
      galleryContainer.innerHTML = '';

      const info = serviceImages[serviceId];
      if (info) {
        const galleryDiv = document.createElement('div');
        galleryDiv.classList.add('service-gallery', 'active');

        const titleEl = document.createElement('h3');
        titleEl.className = 'gallery-title';
        titleEl.textContent = serviceName;
        galleryDiv.appendChild(titleEl);

        const galleryImgsDiv = document.createElement('div');
        galleryImgsDiv.className = 'gallery-images';

        info.files.forEach(file => {
          const img = document.createElement('img');
          img.src = info.folder + file;
          img.alt = file;
          img.className = 'gallery-image';
          img.addEventListener('click', () => {
            modalImage.src = img.src;
            imageCaption.textContent = img.alt;
            imageModal.style.display = 'flex';
          });
          galleryImgsDiv.appendChild(img);
        });

        galleryDiv.appendChild(galleryImgsDiv);

        const backBtn = document.createElement('button');
        backBtn.className = 'back-button';
        backBtn.textContent = '← Back to Services';
        backBtn.onclick = () => goToPage(1);
        galleryDiv.appendChild(backBtn);

        galleryContainer.appendChild(galleryDiv);
      }

      goToPage(2);
    });
  });

  closeModal.addEventListener('click', () => {
    imageModal.style.display = 'none';
  });

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      imageModal.style.display = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.style.display === 'flex') {
      imageModal.style.display = 'none';
    }
  });

  // Swipe / Mouse drag
  let startX = 0, endX = 0;
  const minSwipe = 50;

  pages.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  pages.addEventListener('touchmove', e => endX = e.touches[0].clientX);
  pages.addEventListener('touchend', () => {
    const diff = endX - startX;
    if (Math.abs(diff) > minSwipe) {
      if (diff > 0) goToPage(currentPage - 1);
      else goToPage(currentPage + 1);
    }
    startX = endX = 0;
  });

  pages.addEventListener('mousedown', e => {
    startX = e.clientX;
    pages.style.cursor = 'grabbing';
  });
  pages.addEventListener('mousemove', e => {
    if (startX !== 0) endX = e.clientX;
  });
  pages.addEventListener('mouseup', () => {
    const diff = endX - startX;
    if (Math.abs(diff) > minSwipe) {
      if (diff > 0) goToPage(currentPage - 1);
      else goToPage(currentPage + 1);
    }
    startX = endX = 0;
    pages.style.cursor = 'grab';
  });
  pages.addEventListener('mouseleave', () => {
    startX = endX = 0;
    pages.style.cursor = 'grab';
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-page'));
      goToPage(idx);
    });
  });

  pages.style.cursor = 'grab';
});


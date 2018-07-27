
const modal = document.getElementById('simpleModal');

const modalBtn = document.getElementById('modalBtn');

const closeBtn = document.querySelector('.closeBtn');


function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutSide(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}

// listen for modal open click
modalBtn.addEventListener('click', openModal);

// listen for modal close click
closeBtn.addEventListener('click', closeModal);

// listen for outside click
window.addEventListener('click', clickOutSide);

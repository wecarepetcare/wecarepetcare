const menu = document.getElementById('menu');
const nav = document.getElementById('nav');

menu.onclick = () => nav.classList.toggle('open');

nav.querySelectorAll('a').forEach((link) => {
  link.onclick = () => nav.classList.remove('open');
});

const modal = document.getElementById('modal');

document.querySelectorAll('.card').forEach((card) => {
  card.onclick = () => {
    document.getElementById('mt').textContent = card.dataset.name;
    document.getElementById('mc').textContent = card.dataset.copy;
    modal.showModal();
  };
});

document.getElementById('close').onclick = () => modal.close();
document.getElementById('ask').onclick = () => modal.close();

document.getElementById('form').onsubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const status = document.getElementById('status');
  const button = form.querySelector('button[type="submit"]');

  status.textContent = 'Sending...';
  button.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/mojggdqe', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.ok) {
      status.textContent = 'Thank you! Your booking request was sent.';
      form.reset();
    } else {
      const data = await response.json();

      status.textContent = data.errors
        ? data.errors.map((error) => error.message).join(', ')
        : 'Something went wrong. Please try again.';
    }
  } catch (error) {
    status.textContent = 'Unable to send right now. Please try again.';
  } finally {
    button.disabled = false;
  }
};

document.getElementById('year').textContent = new Date().getFullYear();

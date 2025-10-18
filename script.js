// Countdown Timer
const countdown = document.getElementById('countdown');
const deadline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

function updateCountdown() {
  const now = new Date();
  const diff = deadline - now;
  if (diff <= 0) {
    countdown.textContent = "🎊 Giveaway ended!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  countdown.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Entry Form
const form = document.getElementById('entryForm');
const entriesList = document.getElementById('entriesList');

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('giveawayEntries') || '[]');
  entriesList.innerHTML = entries.map(e => `<li>${e.name} (${e.email})</li>`).join('');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email) return;

  const entries = JSON.parse(localStorage.getItem('giveawayEntries') || '[]');
  entries.push({ name, email });
  localStorage.setItem('giveawayEntries', JSON.stringify(entries));
  loadEntries();
  form.reset();
});

loadEntries();
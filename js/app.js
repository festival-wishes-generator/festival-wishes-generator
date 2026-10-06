/* Festival Wishes Generator - Client Script */
document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('userName');
  const festivalSelect = document.getElementById('festivalSelect');
  const generateBtn = document.getElementById('generateWishBtn');

  if (generateBtn) {
    generateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const festival = festivalSelect ? festivalSelect.value : 'diwali';
      const name = nameInput ? encodeURIComponent(nameInput.value.trim()) : '';
      window.open(`https://shubhkamna.in/?festival=${festival}&name=${name}`, '_blank', 'noopener,noreferrer');
    });
  }
});

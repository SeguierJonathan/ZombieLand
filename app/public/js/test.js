function toggleEdit(button) {
  const card = button.closest('.reservation-card');

  card.querySelectorAll('.view-mode').forEach(el => el.style.display = 'none');
  card.querySelectorAll('.edit-mode').forEach(el => el.hidden = false);

  button.hidden = true;
  card.querySelector('.btn-save').hidden = false;
}

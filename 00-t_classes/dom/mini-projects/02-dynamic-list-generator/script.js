const input = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

addBtn.addEventListener('click', () => {
  if (input.value === '') {
    alert('Please enter an item');
    return; // Prevent adding empty items
  }

  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('delete');

  li.textContent = input.value;
  delBtn.addEventListener('click', () => {
    list.removeChild(li);
  });
  list.appendChild(li);
  li.appendChild(delBtn);
  input.value = ''; // Clear the input field
});

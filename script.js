document.addEventListener("DOMContentLoaded", function() {
    // Function to generate alphabet items
    function generateAlphabet() {
      const tbody = document.querySelector('tbody');
      let index = 0;
      for (let i = 0; i < 7; i++) { // Number of rows
        const row = document.createElement('tr');
        for (let j = 0; j < 4; j++) { // Number of columns
          const letter = String.fromCharCode(65 + index); // Uppercase letters
          const lowercaseLetter = String.fromCharCode(97 + index); // Lowercase letters
          const cell = document.createElement('td');
          const alphabetItem = document.createElement('div');
          const indexItem = document.createElement('div');
          alphabetItem.classList.add('alphabet-item');
          indexItem.classList.add('index-item');
          alphabetItem.textContent = `${letter}/${lowercaseLetter}`;
          indexItem.textContent = index;
          cell.appendChild(alphabetItem);
          cell.appendChild(indexItem);
          row.appendChild(cell);
          index++;
        }
        tbody.appendChild(row);
      }
    }

    // Call the function to generate alphabet items
    generateAlphabet();
  });


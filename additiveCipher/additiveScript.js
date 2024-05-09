
document.addEventListener("DOMContentLoaded", function () {
  // Function to generate alphabet items
  function generateAlphabet() {
    const tbody = document.querySelector("tbody");
    let index = 0;
    for (let i = 0; i < 7; i++) {
      // Number of rows
      const row = document.createElement("tr");
      for (let j = 0; j < 4; j++) {
        // Number of columns
        const letter = String.fromCharCode(65 + index); // Uppercase letters
        const lowercaseLetter = String.fromCharCode(97 + index); // Lowercase letters
        const cell = document.createElement("td");
        const alphabetItem = document.createElement("div");
        const indexItem = document.createElement("div");
        alphabetItem.classList.add("alphabet-item");
        indexItem.classList.add("index-item");
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

// Encryption function

function encrypt() {
  let plaintext = document
    .getElementById("encryptionInput")
    .value.toUpperCase();
  let key = parseInt(document.getElementById("encryptionKey").value);
  let steps = [];
  let ciphertext = "";
  let stepDescriptions = []; // Array to store step descriptions

  // Add the "All Alphabet Values" as the second column header
  let alphabetValuesRow = [];
  for (let i = 0; i < 26; i++) {
    alphabetValuesRow.push(i);
  }
  steps.push(alphabetValuesRow);

  // Add the alphabet index values
  let alphabetIndexRow = [];
  for (let i = 0; i < 26; i++) {
    alphabetIndexRow.push(i);
  }
  steps.push(alphabetIndexRow);

  for (let i = 0; i < plaintext.length; i++) {
    let char = plaintext[i];
    if (char === " ") {
      // If character is a space, add it directly to the ciphertext
      ciphertext += " ";
      // Push an empty array for the space step
      steps.push([]);
      continue; // Skip the rest of the iteration for this character
    }
    let charCode = char.charCodeAt(0) - 65; // Convert letter to number value (A=0, B=1, ..., Z=25)

    if (charCode >= 0 && charCode <= 25) {
      // Step 1: Add key value to the character value
      let step1 = `${char}`;
      steps.push([step1]);

      let plaintextvalue = charCode;
      let step2 = `${plaintextvalue}`;
      steps[i + 2].push(step2);

      let keyAddingValue = charCode + key;
      let step3 = ` ${plaintextvalue} +  ${key} = ${keyAddingValue}`;
      steps[i + 2].push(step3);

      // Step 3: Apply modulo 26
      let mod26Value = keyAddingValue % 26;
      let step4 = ` ${keyAddingValue} mod 26 = ${mod26Value}`;
      steps[i + 2].push(step4);

      // Step 4: Convert back to letter
      let encryptedCharCode = mod26Value + 65;
      let encryptedChar = String.fromCharCode(encryptedCharCode);
      let step5 = ` ${encryptedChar}`;
      steps[i + 2].push(step5);

      ciphertext += encryptedChar;
    } else {
      // Not a valid letter, keep as is
      ciphertext += char;
    }
  }

  // Display steps in the table
  displaySteps(steps);

  // Display ciphertext
  document.getElementById("encryptedText").value = ciphertext;
}

function displaySteps(steps) {
  let tableBody = document.getElementById("encryptionTableBody");
  tableBody.innerHTML = "";

  // Start iterating from the second row (excluding the index row)
  for (let i = 2; i < steps.length; i++) {
    let row = tableBody.insertRow();

    // Insert plaintext value
    let plaintextCell = row.insertCell();
    plaintextCell.textContent = steps[i][0];
    // Insert plaintext value
    let plaintextCellCharValue = row.insertCell();
    plaintextCellCharValue.textContent = steps[i][1];

    // Insert key adding value
    let keyAddingCell = row.insertCell();
    keyAddingCell.textContent = steps[i][2];

    // Insert modulo 26 value
    let mod26Cell = row.insertCell();
    mod26Cell.textContent = steps[i][3];

    // Insert encrypted character
    let encryptedCell = row.insertCell();
    encryptedCell.textContent = steps[i][4];
  }
}


function decrypt() {
    let ciphertext = document
      .getElementById("decryptionInput")
      .value.toUpperCase();
    let key = parseInt(document.getElementById("decryptionKey").value);
    let steps = [];
    let plaintext = "";

    // Add the "All Alphabet Values" as the second column header
    let alphabetValuesRow = [];
    for (let i = 0; i < 26; i++) {
      alphabetValuesRow.push(i);
    }
    steps.push(alphabetValuesRow);

    // Add the alphabet index values
    let alphabetIndexRow = [];
    for (let i = 0; i < 26; i++) {
      alphabetIndexRow.push(i);
    }
    steps.push(alphabetIndexRow);

    for (let i = 0; i < ciphertext.length; i++) {
      let char = ciphertext[i];
      if (char === " ") {
        // If character is a space, add it directly to the plaintext
        plaintext += " ";
        // Push an empty array for the space step
        steps.push([]);
        continue; // Skip the rest of the iteration for this character
      }
      let charCode = char.charCodeAt(0) - 65; // Convert letter to number value (A=0, B=1, ..., Z=25)

      if (charCode >= 0 && charCode <= 25) {
        // Step 1: Subtract key value from the character value
        let step1 = `${char}`;
        steps.push([step1]);

        let ciphertextValue = charCode;
        let step2 = ` ${ciphertextValue}`;
        steps[i + 2].push(step2);

        
        let ciphertextValuesub = charCode-key;
        let step3 = ` ${ciphertextValue} - ${key} = ${ciphertextValuesub}`;
        steps[i + 2].push(step3);



        let keySubtractingValue = (charCode - key + 26) % 26; // Adding 26 to handle negative numbers
        let step4 = `${ciphertextValuesub} mod 26  = ${keySubtractingValue}`;
        steps[i + 2].push(step4);

        // Step 2: Convert back to letter
        let decryptedCharCode = keySubtractingValue + 65;
        let decryptedChar = String.fromCharCode(decryptedCharCode);
        let step5 = `${decryptedChar}`;
        steps[i + 2].push(step5);

        plaintext += decryptedChar;
      } else {
        // Not a valid letter, keep as is
        plaintext += char;
      }
    }

    // Display steps in the table
    displayDecryptionSteps(steps);

    // Display plaintext
    document.getElementById("decryptedText").value = plaintext;
}

function displayDecryptionSteps(steps) {
    let tableBody = document.getElementById("decryptionTableBody");
    tableBody.innerHTML = "";


    for (let i = 2; i < steps.length; i++) {
      let row = tableBody.insertRow();

      // Insert ciphertext value
      let ciphertextCell = row.insertCell();
      ciphertextCell.textContent = steps[i][0];

      // Insert ciphertext value
      let ciphertextCellCharValue = row.insertCell();
      ciphertextCellCharValue.textContent = steps[i][1];

      // Insert key subtracting value
      let keySubtractingCell = row.insertCell();
      keySubtractingCell.textContent = steps[i][2];

      // Insert modulo 26 value
      let mod26Cell = row.insertCell();
      mod26Cell.textContent = steps[i][3];

      // Insert decrypted character
      let decryptedCell = row.insertCell();
      decryptedCell.textContent = steps[i][4];
    }
}

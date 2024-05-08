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
function multiplyEncrypt() {
  let plaintext = document
    .getElementById("multiplicativeInput")
    .value.toUpperCase();
  let key = parseInt(document.getElementById("multiplicativeKey").value);
  let steps = [];
  let ciphertext = "";

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
      // Step 1: Multiply key value with the character value
      let step1 = `${char}`;
      steps.push([step1]);

      let plaintextvalue = charCode;
      let step2 = `${plaintextvalue}`;
      steps[i + 2].push(step2);

      let plaintextvaluemultiply = charCode * key;
      let step3 = ` ${charCode} * ${key} = ${plaintextvaluemultiply}`;
      steps[i + 2].push(step3);

      let keyMultiplyingValue = (charCode * key) % 26;
      let step4 = ` ${plaintextvaluemultiply} mod 26 = ${keyMultiplyingValue}`;
      steps[i + 2].push(step4);

      // Step 3: Convert back to letter
      let encryptedCharCode = keyMultiplyingValue + 65;
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
  displayMultiplicativeEncryptionSteps(steps);

  // Display ciphertext
  document.getElementById("multiplicativeEncryptedText").value = ciphertext;
}

function displayMultiplicativeEncryptionSteps(steps) {
  let tableBody = document.getElementById("multiplicativeEncryptionTableBody");
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

    // Insert key multiplying value
    let keyMultiplyingCell = row.insertCell();
    keyMultiplyingCell.textContent = steps[i][2];

    // Insert modulo 26 value
    let mod26Cell = row.insertCell();
    mod26Cell.textContent = steps[i][3];

    // Insert encrypted character
    let encryptedCell = row.insertCell();
    encryptedCell.textContent = steps[i][4];
  }
}

function multiplyDecrypt() {
  let ciphertext = document
    .getElementById("multiplicativeDecryptionInput")
    .value.toUpperCase();
  let key = parseInt(
    document.getElementById("multiplicativeDecryptionKey").value
  );
  let steps = [];
  let plaintext = "";
  let inverseKey = modInverse(key, 26); // Calculate the modular multiplicative inverse of the key
  console.log(inverseKey);
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
      // Step 1: Multiply modular multiplicative inverse of key with the character value
      let step1 = `${char}`;
      steps.push([step1]);

      let ciphertextValue = charCode;
      let step2 = `${ciphertextValue}`;
      steps[i + 2].push(step2);

      let ciphertextValuemultifly = charCode * inverseKey;
      let step3 = `${inverseKey} * ${charCode} = ${ciphertextValuemultifly}`;
      steps[i + 2].push(step3);
    

      let keyInverseMultiplyingValue = (charCode * inverseKey) % 26;
      let step4 = `${ciphertextValuemultifly}  mod 26 = ${keyInverseMultiplyingValue}`;
      steps[i + 2].push(step4);

     
      let decryptedCharCode = keyInverseMultiplyingValue + 65;
      let decryptedChar = String.fromCharCode(decryptedCharCode);
      let step5 = `${decryptedChar}`;
      steps[i + 2].push(step5);

      plaintext += decryptedChar;
    } else {
   
      plaintext += char;
    }
  }


  displayMultiplicativeDecryptionSteps(steps);

 
  document.getElementById("multiplicativeDecryptedText").value = plaintext;
}

function displayMultiplicativeDecryptionSteps(steps) {
  let tableBody = document.getElementById("multiplicativeDecryptionTableBody");
  tableBody.innerHTML = "";

 
  for (let i = 2; i < steps.length; i++) {
    let row = tableBody.insertRow();

    
    let ciphertextCell = row.insertCell();
    ciphertextCell.textContent = steps[i][0];

    // Insert ciphertext value
    let ciphertextCellCharValue = row.insertCell();
    ciphertextCellCharValue.textContent = steps[i][1];

    // Insert key inverse multiplying value
    let keyInverseMultiplyingCell = row.insertCell();
    keyInverseMultiplyingCell.textContent = steps[i][2];

    // Insert modulo 26 value
    let mod26Cell = row.insertCell();
    mod26Cell.textContent = steps[i][3];

    // Insert decrypted character
    let decryptedCell = row.insertCell();
    decryptedCell.textContent = steps[i][4];
  }
}

// Function to calculate the modular multiplicative inverse
function modInverse(a, m) {
  // inverse_calculation.js
  // Validate if 'a' has a multiplicative inverse modulo 'm'
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return NaN; // If 'a' doesn't have a multiplicative inverse modulo 'm'
}

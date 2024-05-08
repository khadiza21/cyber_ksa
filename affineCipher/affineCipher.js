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

function affineEncrypt() {
  let plaintext = document.getElementById("affineInput").value.toUpperCase();
  let keyA = parseInt(document.getElementById("affineKeyA").value);
  let keyB = parseInt(document.getElementById("affineKeyB").value);
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
      // Step 1: Multiply keyA value with the character value and add keyB
      let step1 = `${char}`;
      steps.push([step1]);

      let plaintextvalue = charCode;
      let step2 = ` ${plaintextvalue}`;
      steps[i + 2].push(step2);

      let plaintextvaluemultiply = plaintextvalue * keyA;
      let step3 = ` ${keyA} *  ${plaintextvalue} = ${plaintextvaluemultiply}`;
      steps[i + 2].push(step3);

      let encryptionValuewithkey2 = plaintextvaluemultiply + keyB;
      let step4 = `  ${plaintextvaluemultiply} + ${keyB}  = ${encryptionValuewithkey2}`;
      steps[i + 2].push(step4);

      let encryptionValue = (keyA * plaintextvalue + keyB) % 26;
      let step5 = `${encryptionValuewithkey2} mod 26 = ${encryptionValue}`;
      steps[i + 2].push(step5);

      // Step 2: Convert back to letter
      let encryptedCharCode = encryptionValue + 65;
      let encryptedChar = String.fromCharCode(encryptedCharCode);
      let step6 = ` ${encryptedChar}`;
      steps[i + 2].push(step6);

      ciphertext += encryptedChar;
    } else {
      // Not a valid letter, keep as is
      ciphertext += char;
    }
  }

  // Display steps in the table
  displayAffineEncryptionSteps(steps);

  // Display ciphertext
  document.getElementById("affineEncryptedText").value = ciphertext;
}

function displayAffineEncryptionSteps(steps) {
  let tableBody = document.getElementById("affineEncryptionTableBody");
  tableBody.innerHTML = "";

  // Start iterating from the second row (excluding the index row)
  for (let i = 2; i < steps.length; i++) {
    let row = tableBody.insertRow();

    // Insert plaintext value
    let plaintextCell = row.insertCell();
    plaintextCell.textContent = steps[i][0];

    let plaintextCell1 = row.insertCell();
    plaintextCell1.textContent = steps[i][1];

    let plaintextCell2 = row.insertCell();
    plaintextCell2.textContent = steps[i][2];

    // Insert plaintext value
    let plaintextCellCharValue = row.insertCell();
    plaintextCellCharValue.textContent = steps[i][3];

    // Insert encryption value
    let encryptionCell = row.insertCell();
    encryptionCell.textContent = steps[i][4];

    // Insert encrypted character
    let encryptedCell = row.insertCell();
    encryptedCell.textContent = steps[i][5];
  }
}

function affineDecrypt() {
  let ciphertext = document
    .getElementById("affineDecryptionInput")
    .value.toUpperCase();
  let keyA = parseInt(document.getElementById("affineDecryptionKeyA").value);
  let keyB = parseInt(document.getElementById("affineDecryptionKeyB").value);
  let steps = [];
  let plaintext = "";
  let inverseKeyA = modInverse(keyA, 26);

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
      // Step 1: Apply decryption formula
      // let step1 = `Decrypting (${char}) using formula D(x) = ${inverseKeyA}(x - ${keyB}) mod 26`;
      let step1 = `${char}`;
      steps.push([step1]);

      let ciphertextValue = charCode;
      let step2 = ` ${ciphertextValue}`;
      steps[i + 2].push(step2);

      let ciphertextValuekey2sub = ciphertextValue - keyB;
      let step3 = ` ${ciphertextValue}  -  ${keyB} = ${ciphertextValuekey2sub}`;
      steps[i + 2].push(step3);

      let decryptionValue1 = inverseKeyA * (ciphertextValue - keyB);
      let decryptionValue = inverseKeyA * (ciphertextValue - keyB);
      while (decryptionValue < 0) {
        decryptionValue += 26; // Ensure the value is positive
      }
      decryptionValue %= 26;

      let step4 = `  ${inverseKeyA} * ${ciphertextValuekey2sub}  = ${decryptionValue1}`;
      steps[i + 2].push(step4);

      let step5 = ` ${decryptionValue1} mod 26 = ${decryptionValue}`;
      steps[i + 2].push(step5);

      // Step 2: Convert back to letter
      let decryptedCharCode = decryptionValue + 65;
      let decryptedChar = String.fromCharCode(decryptedCharCode);
      let step6 = ` ${decryptedChar}`;
      steps[i + 2].push(step6);

      plaintext += decryptedChar;
    } else {
      // Not a valid letter, keep as is
      plaintext += char;
    }
  }

  // Display steps in the table
  displayAffineDecryptionSteps(steps);

  // Display plaintext
  document.getElementById("affineDecryptedText").value = plaintext;
}

function displayAffineDecryptionSteps(steps) {
  let tableBody = document.getElementById("affineDecryptionTableBody");
  tableBody.innerHTML = "";

  // Start iterating from the second row (excluding the index row)
  for (let i = 2; i < steps.length; i++) {
    let row = tableBody.insertRow();

    // Insert ciphertext value
    let ciphertextCell = row.insertCell();
    ciphertextCell.textContent = steps[i][0];

    // Insert ciphertext value
    let ciphertextCellCharValue1 = row.insertCell();
    ciphertextCellCharValue1.textContent = steps[i][1];

    let ciphertextCellCharValue2 = row.insertCell();
    ciphertextCellCharValue2.textContent = steps[i][2];

    let ciphertextCellCharValue = row.insertCell();
    ciphertextCellCharValue.textContent = steps[i][3];

    // Insert decryption value
    let decryptionCell = row.insertCell();
    decryptionCell.textContent = steps[i][4];

    // Insert decrypted character
    let decryptedCell = row.insertCell();
    decryptedCell.textContent = steps[i][5];
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

const ENZYME_UNITS_LOCAL_STORE_KEY = 'enzymeUnitsKey';

const enzymeUnitsInput = document.getElementById('enzymeUnitsPerGramFat');
const foodItemsDiv = document.getElementById('foodItems');
const resultDiv = document.getElementById('resultDiv');
const resultText = document.getElementById('resultText');

const saved = localStorage.getItem(ENZYME_UNITS_LOCAL_STORE_KEY);
if (saved) {
    enzymeUnitsInput.value = saved;
}

// add initial row
addFoodRow();

function addFoodRow() {
    const row = document.createElement('div');
    row.className = 'row food-row';
    row.innerHTML = `
        <div class="col-6 mb-3">
            <input type="number" inputmode="decimal" class="form-control fat-per-100g" aria-label="Gramm Fett in 100g">
        </div>
        <div class="col-6 mb-3">
            <input type="number" inputmode="decimal" class="form-control eaten-grams" aria-label="gegessene Gramm Lebensmittel">
        </div>
    `;
    foodItemsDiv.appendChild(row);
}

document.getElementById('addFoodBtn').addEventListener('click', addFoodRow);

document.getElementById('removeFoodBtn').addEventListener('click', () => {
    const rows = foodItemsDiv.querySelectorAll('.food-row');
    if (rows.length > 1) {
        rows[rows.length - 1].remove();
    }
});

document.getElementById('calculatorForm').addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem(ENZYME_UNITS_LOCAL_STORE_KEY, enzymeUnitsInput.value);

    let totalFatGrams = 0;
    foodItemsDiv.querySelectorAll('.food-row').forEach((row) => {
        const fatInput = row.querySelector('.fat-per-100g').value;
        const eatenInput = row.querySelector('.eaten-grams').value;
        const fat = parseFloat(fatInput) || 0;
        const eaten = parseFloat(eatenInput) || 0;

        totalFatGrams += fat / 100 * eaten;
    });

    const neededEnzymeUnits = parseFloat(enzymeUnitsInput.value) * totalFatGrams;

    resultText.innerHTML = `Gesamtmenge Fett: ${totalFatGrams}g<br>Dafür benötigte Enzymeinheiten: ${neededEnzymeUnits}`;
    resultDiv.style.display = 'block';
});

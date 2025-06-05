let lastResult = 0;
let history = [];

function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (value === 'pi') {
        display.value += Math.PI;
    } else if (value === 'ans') {
        display.value += lastResult;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('display');
    const originalExpression = display.value;
    try {
        let expression = display.value;
        expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
        expression = expression.replace(/\^2/g, '**2');
        const result = eval(expression);
        display.value = result;
        lastResult = result;
        addToHistory(originalExpression, result);
    } catch (error) {
        display.value = 'Error';
    }
}

function addToHistory(expression, result) {
    const historyEntry = `${expression} = ${result}`;
    history.unshift(historyEntry);
    if (history.length > 10) history.pop();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    updateHistoryDisplay();
}

function saveHistory() {
    if (history.length === 0) {
        alert('History is empty!');
        return;
    }
    const historyText = history.join('\n');
    const blob = new Blob([historyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculator_history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
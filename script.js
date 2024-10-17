let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const statusDisplay = document.getElementById('status');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // إضافة الصنف المناسب للخلايا
    clickedCell.classList.add(currentPlayer);

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;

            // إضافة الصنف winning-cell للخلايا الفائزة
            const winningCells = [a, b, c];
            winningCells.forEach(index => {
                const cell = document.querySelector(`.cell[data-index="${index}"]`);
                cell.classList.add('winning-cell');
                // تغيير لون الحرف الفائز إلى الأبيض
                cell.style.color = 'rgb(255, 255, 255)'; 
                // إضافة تأثير التوهج للأخضر
                cell.style.textShadow = '0 0 10px rgb(0, 255, 0), 0 0 20px rgb(0, 200, 0)';
            });

            break; // نخرج من الحلقة عند الفوز
        }
    }

    if (roundWon) {
        statusDisplay.textContent = ` ${currentPlayer} فاز اللاعب`;
        isGameActive = false; // إيقاف اللعبة
        return;
    }

    // تحقق مما إذا كانت اللوحة مكتملة
    if (!board.includes('')) {
        statusDisplay.textContent = '! تعادل';
        isGameActive = false;
        return;
    }

    // تغيير الدور الحالي
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = ` ${currentPlayer} دور اللاعب `;
}



function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusDisplay.textContent = ` ${currentPlayer} دور اللاعب `;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = ''; // إزالة النص من الخلية
        cell.classList.remove('winning-cell'); // إزالة الصنف "winning-cell"
        cell.style.color = ''; // إعادة تعيين اللون الافتراضي
        cell.style.textShadow = ''; // إعادة تعيين تأثير التوهج الافتراضي
        cell.classList.remove('X'); // إزالة صنف X
        cell.classList.remove('O'); // إزالة صنف O
    });
}



document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('resetButton').addEventListener('click', resetBoard);
statusDisplay.textContent = ` ${currentPlayer} دور اللاعب `;



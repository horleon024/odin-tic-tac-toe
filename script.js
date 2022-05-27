const playerFactory = (sign) => {
	let _sign = sign;
	const getSign = () => _sign;
	return { getSign };
};

const gameBoard = (() => {
	let _gameArray = new Array(9);

	const clearBoard = () => {
		for (let i = 0; i < 9; i++) _gameArray[i] = "";
	};

	const setField = (index, sign) => {
		_gameArray[index] = sign;
	};

	const getField = (index) => {
		return _gameArray[index];
	}

	return {
		clearBoard,
		setField,
		getField
	};
})();

const displayController = (() => {
	const _restartButton = document.querySelector(".restart-button");
	const _gameState = document.querySelector(".game-state");
	const _gameFields = document.querySelectorAll(".game-field");

	let _gameIsOver = false;

	const _updateGameField = (event) => {
		if (event.target.textContent !== "" || _gameIsOver) return;

		const currentIndex = parseInt(event.target.dataset.index) - 1;
		_gameFields[currentIndex].textContent = gameController.getCurrentPlayerSign();
		if (gameController.playRound(currentIndex)) _gameIsOver = true;
	};

	_gameFields.forEach((gameField) => gameField.addEventListener("click", _updateGameField));

	const _restartGame = () => {
		gameBoard.clearBoard();
		for (let i = 0; i < 9; i++) _gameFields[i].textContent = "";
		gameController.resetGame();
		setGameState("Player X's turn", true);
	};

	_restartButton.addEventListener("click", _restartGame);

	const setGameState = (state, isRestart = false) => {
		_gameState.textContent = state;
		if (isRestart) _gameIsOver = false;
	};
	return { setGameState };
})();

const gameController = (() => {
	const _playerX = playerFactory("X");
	const _playerO = playerFactory("O");
	let _currentRound = 1;

	const getCurrentPlayerSign = () => {
		return _currentRound % 2 == 1 ? _playerX.getSign() : _playerO.getSign();
	};

	const _checkForRowWin = () => {
		for (let rowNumber = 0; rowNumber < 3; rowNumber++) {
			if (gameBoard.getField(rowNumber * 3) !== "") {
				const field1 = gameBoard.getField(rowNumber * 3);
				const field2 = gameBoard.getField(rowNumber * 3 + 1);
				const field3 = gameBoard.getField(rowNumber * 3 + 2);
				if (field1 === field2 && field1 === field3) return true;
			}
		}
		return false;
	};

	const _checkForColumnWin = () => {
		for (let columnNumber = 0; columnNumber < 3; columnNumber++) {
			if (gameBoard.getField(columnNumber) !== "") {
				const field1 = gameBoard.getField(columnNumber);
				const field2 = gameBoard.getField(columnNumber + 3);
				const field3 = gameBoard.getField(columnNumber + 6);
				if (field1 === field2 && field1 === field3) return true;
			}
		}
		return false;
	};

	const _checkForDiagonalWin = () => {
		const middleField = gameBoard.getField(4);
		if (middleField === "") return false;
		const topLeftField = gameBoard.getField(0);
		const bottomRightField = gameBoard.getField(8);
		if (middleField === topLeftField && middleField === bottomRightField) return true;
		const topRightField = gameBoard.getField(2);
		const bottomLeftField = gameBoard.getField(6);
		if (middleField === topRightField && middleField === bottomLeftField) return true;
		return false;
	};

	const _checkForWin = () => {
		if (_currentRound < 5) return false;
		if (_checkForColumnWin() || _checkForRowWin() || _checkForDiagonalWin()) return true;
		return false;
	};

	const playRound = (fieldIndex) => {
		gameBoard.setField(fieldIndex, getCurrentPlayerSign());
		if (_checkForWin()) {
			displayController.setGameState(`Player ${getCurrentPlayerSign()} has won`);
			return true;
		}
		if (_currentRound === 9) {
			displayController.setGameState("Draw");
			return true;
		}
		_currentRound++;
		displayController.setGameState(`Player ${getCurrentPlayerSign()}'s turn`);
		return false;
	};

	const resetGame = () => {
		_currentRound = 1;
	};

	return { playRound, resetGame, getCurrentPlayerSign };
})();
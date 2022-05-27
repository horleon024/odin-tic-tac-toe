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

	const _updateGameField = (event) => {

	};

	_gameFields.forEach((gameField) => gameField.addEventListener("click", _updateGameField));

	const _restartGame = () => {
		gameBoard.clearBoard();

	};

	_restartButton.addEventListener("click", _restartGame);

	const setGameState = (state) => {
		_gameState.textContent = state;
	};
	return { setGameState };
  })();
const playerFactory = (sign) => {
	let _sign = sign;
	const getSign = () => _sign;
	return { getSign };
};

const gameBoard = (() => {
	let _gameArray = new Array(9);

	const clearBoard = () => {
		for (let i = 0; i < 9; i++) gameArray[i] = "";
	};

	const setField = () => {

	};

	return {
		clearBoard,
		setField
	};
  })();
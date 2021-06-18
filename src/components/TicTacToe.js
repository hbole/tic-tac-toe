import { Component } from "react";

const players = {
	"Player 1": {
		value: "X",
		next: "Player 2",
	},
	"Player 2": {
		value: "O",
		next: "Player 1",
	},
};

class TicTacToe extends Component {
	state = {
		activePlayer: "Player 1",
		foundWinner: false,
		winnerPositions: [],
		value: [],
		ticTacToeMatrix: [
			[[], [], []],
			[[], [], []],
			[[], [], []],
		],
	};

	componentDidMount() {
		this.createTicTacToeMatrix(3, 3);
	}

	resetState = () => {
		this.setState({
			activePlayer: "Player 1",
			foundWinner: false,
			winnerPositions: [],
			value: [],
			ticTacToeMatrix: [
				[[], [], []],
				[[], [], []],
				[[], [], []],
			],
		});

		this.createTicTacToeMatrix(3, 3);
	};

	createTicTacToeMatrix = (rows, cols) => {
		let { ticTacToeMatrix } = this.state;

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				ticTacToeMatrix[i][j] = "";
			}
		}

		this.setState({ ticTacToeMatrix });
	};

	checkIfThePlayerIsWinner = (ticTacToeMatrix, possibleOutcomes, value) => {
		let isWinner = false;
		let winnerPositions = [];

		for (let i = 0; i < possibleOutcomes.length; i++) {
			let position1 = possibleOutcomes[i][0];
			let position2 = possibleOutcomes[i][1];

			let firstValue = ticTacToeMatrix[position1[0]][position1[1]];
			let secondValue = ticTacToeMatrix[position2[0]][position2[1]];

			if (firstValue === value && secondValue === value) {
				let positionA = `${position1[0]}${position1[1]}`;
				let positionB = `${position2[0]}${position2[1]}`;

				winnerPositions.push(positionA);
				winnerPositions.push(positionB);

				isWinner = true;
				break;
			}
		}

		let winner = {
			isWinner,
			winnerPositions,
		};

		return winner;
	};

	checkPattern = (ticTacToeMatrix, activePlayer) => {
		let { winnerPositions } = this.state;

		let winner;
		let validOutcomes = {
			"00": [
				[
					[0, 1],
					[0, 2],
				],
				[
					[1, 1],
					[2, 2],
				],
				[
					[1, 0],
					[2, 0],
				],
			],
			"01": [
				[
					[1, 1],
					[1, 2],
				],
			],
			"02": [
				[
					[1, 2],
					[2, 2],
				],
				[
					[1, 1],
					[2, 0],
				],
			],
			10: [
				[
					[1, 1],
					[1, 2],
				],
			],
			20: [
				[
					[2, 1],
					[2, 2],
				],
			],
		};

		let value = players[activePlayer].value;
		let initialPosition;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				initialPosition = `${i}${j}`;
				if (ticTacToeMatrix[i][j] === value && validOutcomes[initialPosition]) {
					let possibleOutcomes = validOutcomes[initialPosition];

					winner = this.checkIfThePlayerIsWinner(
						ticTacToeMatrix,
						possibleOutcomes,
						value
					);

					if (winner && winner.isWinner) {
						winnerPositions.push(initialPosition);
						winnerPositions = [...winnerPositions, ...winner.winnerPositions];
						this.setState({ winnerPositions });
						break;
					}
				}
			}

			if (winner && winner.isWinner) {
				break;
			}
		}

		return winner && winner.isWinner;
	};

	addSymbol = (rowIndex, colIndex) => {
		let { ticTacToeMatrix, activePlayer, foundWinner } = this.state;

		if (!ticTacToeMatrix[rowIndex][colIndex] && !foundWinner) {
			ticTacToeMatrix[rowIndex][colIndex] = players[activePlayer].value;

			this.setState({ ticTacToeMatrix });
			let isWinner = this.checkPattern(ticTacToeMatrix, activePlayer);

			if (isWinner) {
				this.setState({ foundWinner: true });
			} else {
				this.setState({ activePlayer: players[activePlayer].next });
			}
		}
	};

	render() {
		const { activePlayer, ticTacToeMatrix, winnerPositions, foundWinner } =
			this.state;

		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div>
					<p>Welcome To Tic Tac Toe !</p>
					<p>Active Player: {activePlayer}</p>
				</div>

				{foundWinner ? (
					<p>Congratulations {activePlayer} won the match!</p>
				) : null}

				<div style={{ display: "flex", flexDirection: "column" }}>
					{ticTacToeMatrix.map((matrixRow, rowIndex) => (
						<div style={{ display: "flex", flexDirection: "row" }}>
							{" "}
							{matrixRow.map((matrixColumns, colIndex) => (
								<div
									onClick={() => this.addSymbol(rowIndex, colIndex)}
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										border: "1px solid black",
										borderRadius: "6px",
										margin: "2px",
										height: 80,
										width: 80,
										background:
											winnerPositions.indexOf(`${rowIndex}${colIndex}`) > -1
												? "#45818e"
												: "#94b6d1",
									}}
								>
									{ticTacToeMatrix[rowIndex][colIndex]}
								</div>
							))}
						</div>
					))}
				</div>

				<button
					onClick={() => this.resetState()}
					style={{
						background: "#ffcd53",
						marginTop: 24,
						width: 160,
						height: 56,
						color: "white",
						fontSize: 20,
						fontWeight: 700,
						border: "1px solid, white",
						borderRadius: "8px",
					}}
				>
					Reset
				</button>
			</div>
		);
	}
}

export default TicTacToe;

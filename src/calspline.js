export function CalLinearSpline(x,y, targetX) {


	let result;
	for (let i = 0; i < x.length - 1; i++) {
		if (targetX >= x[i] && targetX <= x[i + 1]) {
			const t = (targetX - x[i]) / (x[i + 1] - x[i]);
			result = (1 - t) * y[i] + t * y[i + 1];
		}
	}
	return result
}

export function CalQuadraticSpline(pointX,pointY, targetX) {


	const n = pointX.length;
	const matrixA = [];
	const matrixB = [];

	for (let i = 1; i < n; i++) {
		const rowMatrix = [];
		const x = pointX[i];
		const y = pointY[i];

		for (let j = 0; j < 3 * (i - 1); j++) rowMatrix.push(0);
		rowMatrix.push(x * x);
		rowMatrix.push(x);
		rowMatrix.push(1);
		for (let j = 0; j < 3 * (n - i); j++) rowMatrix.push(0);
		matrixA.push(rowMatrix);
		matrixB.push(y);

		const rowMatrix2 = [];
		for (let j = 0; j < 3 * (i - 1) + 3; j++) rowMatrix2.push(0);
		rowMatrix2.push(x * x);
		rowMatrix2.push(x);
		rowMatrix2.push(1);
		for (let j = 0; j < 3 * (n - i - 1); j++) rowMatrix2.push(0);
		matrixA.push(rowMatrix2);
		matrixB.push(y);
	}

	{
		const rowMatrix = [];
		const x = pointX[0];
		const y = pointY[0];
		rowMatrix.push(x * x);
		rowMatrix.push(x);
		rowMatrix.push(1);
		for (let j = 0; j < 3 * (n - 1); j++) rowMatrix.push(0);
		matrixA.push(rowMatrix);
		matrixB.push(y);

		const rowMatrix2 = [];
		for (let j = 0; j < 3 * (n - 1); j++) rowMatrix2.push(0);
		const x2 = pointX[n - 1];
		const y2 = pointY[n - 1];
		rowMatrix2.push(x2 * x2);
		rowMatrix2.push(x2);
		rowMatrix2.push(1);
		matrixA.push(rowMatrix2);
		matrixB.push(y2);
	}

	for (let i = 1; i < n; i++) {
		const rowMatrix = [];
		const x = pointX[i];

		for (let j = 0; j < 3 * (i - 1); j++) rowMatrix.push(0);
		rowMatrix.push(2 * x);
		rowMatrix.push(1);
		rowMatrix.push(0);
		rowMatrix.push(-2 * x);
		rowMatrix.push(-1);
		rowMatrix.push(0);
		for (let j = 0; j < 3 * (n - i - 1); j++) rowMatrix.push(0);
		matrixA.push(rowMatrix);
		matrixB.push(0);
	}

	{
		const rowMatrix = [];
		rowMatrix.push(1);
		rowMatrix.push(0);
		rowMatrix.push(0);
		for (let j = 0; j < 3 * (n - 1); j++) rowMatrix.push(0);
		matrixA.push(rowMatrix);
		matrixB.push(0);
	}

	for (let i = 0; i < matrixA.length; i++) {
		matrixA[i].push(matrixB[i]);
	}

	const matrixRREF = rref(matrixA);

	const answers = new Array(matrixRREF.length);
	for (let i = 0; i < matrixRREF.length; i++) {
		answers[i] = matrixRREF[i][matrixRREF[i].length - 1];
	}

	let result = -1;

	for (let i = 0; i < n - 1; i++) {
		const a = answers[i * 3];
		const b = answers[i * 3 + 1];
		const c = answers[i * 3 + 2];
		if (targetX >= pointX[i] && targetX <= pointX[i + 1]) {
			result = a * targetX * targetX + b * targetX + c;
		}
	}

	return result;
}

export function CalCubicSpline(pointx,pointy, targetX) {
	const x = pointx.map((point) => (parseFloat(point)));
	const y = pointy.map((point) => (parseFloat(point)));

	const n = x.length;
	const h = Array(n - 1);
	const alpha = Array(n - 1);
	const l = Array(n);
	const mu = Array(n - 1);
	const z = Array(n);

	for (let i = 0; i < n - 1; i++) {
		h[i] = x[i + 1] - x[i];
		alpha[i] = (3 / h[i]) * (y[i + 1] - y[i]) - (3 / h[i - 1]) * (y[i] - y[i - 1]);
	}

	l[0] = 1;
	mu[0] = 0;
	z[0] = 0;

	for (let i = 1; i < n - 1; i++) {
		l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * mu[i - 1];
		mu[i] = h[i] / l[i];
		z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
	}

	l[n - 1] = 1;
	z[n - 1] = 0;
	const c = Array(n);
	const b = Array(n - 1);
	const d = Array(n - 1);

	c[n - 1] = 0;
	for (let j = n - 2; j >= 0; j--) {
		c[j] = z[j] - mu[j] * c[j + 1];
		b[j] = (y[j + 1] - y[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
		d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
	}

	let result;
	for (let i = 0; i < n - 1; i++) {
		if (targetX >= x[i] && targetX <= x[i + 1]) {
			const xDiff = targetX - x[i];
			const a = y[i];
			result = a + b[i] * xDiff + c[i] * xDiff ** 2 + d[i] * xDiff ** 3;
			break;
		}
	}

	return result;
}

function rref(matrix) {
	let lead = 0;
	const rowCount = matrix.length;
	const colCount = matrix[0].length;

	for (let r = 0; r < rowCount; r++) {
		if (lead >= colCount) return matrix;

		let i = r;
		while (matrix[i][lead] === 0) {
			i++;
			if (i === rowCount) {
				i = r;
				lead++;
				if (colCount === lead) return matrix;
			}
		}

		let temp = matrix[i];
		matrix[i] = matrix[r];
		matrix[r] = temp;

		let val = matrix[r][lead];
		for (let j = 0; j < colCount; j++) {
			matrix[r][j] /= val;
		}

		for (let i = 0; i < rowCount; i++) {
			if (i === r) continue;
			val = matrix[i][lead];
			for (let j = 0; j < colCount; j++) {
				matrix[i][j] -= val * matrix[r][j];
			}
		}
		lead++;
	}
	return matrix;
}
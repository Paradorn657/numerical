let x_old = 0;
let x = 0;
let y = (43 * x) - 180;

while (y !== 0) {
    x = x + 1;
    console.log(x);
    let y_new = (43 * x) - 180;

    if (y_new * y < 0) {
        x = x - 1;
        while (Math.abs(x - x_old / x) * 100 > 0.000001) {
            console.log(x);
            x = x + 0.000001;
            y_new = (43 * x) - 180;
            if (y_new * y < 0) {
                break;
            }

            x_old = x;
        }
        break;
    }

    x_old = x;
}

console.log(x);
const range3 = [0, 1, 2];
const sudoku = {
    data: range3.map(i => range3.map(j => range3.map(k => range3.map(l => 0)))),
    onUpdated: () => {},
};
const colors = {
    okay: "#90CAF9",
    err0: "#F8BBD0",
    err1: "#F06292",
}

const onSudokuChanged = () => {
    for (let i of range3) for (let j of range3) for (let k of range3) for (let l of range3)
        $(`#sudoku-${i}-${j}-${k}-${l}`)[0].style.backgroundColor = colors.okay;
    const err = [];
    for (let i of range3) for (let k of range3) {
        let okay = true;
        for (let j0 of range3) for (let l0 of range3)
        for (let j1 of range3) for (let l1 of range3) {
            if (j1 === j0 && l1 === l0) continue;
            const v0 = $(`#sudoku-${i}-${j0}-${k}-${l0}`)[0].value;
            const v1 = $(`#sudoku-${i}-${j1}-${k}-${l1}`)[0].value;
            if (! v0) continue;
            if (! v1) continue;
            if (v0 === v1) { okay = false; err.push([i, j0, k, l0]); }
        }
        if (! okay)
            for (let j of range3) for (let l of range3)
                $(`#sudoku-${i}-${j}-${k}-${l}`)[0].style.backgroundColor = colors.err0;
    }
    for (let j of range3) for (let l of range3) {
        let okay = true;
        for (let i0 of range3) for (let k0 of range3)
        for (let i1 of range3) for (let k1 of range3) {
            if (i1 === i0 && k1 === k0) continue;
            const v0 = $(`#sudoku-${i0}-${j}-${k0}-${l}`)[0].value;
            const v1 = $(`#sudoku-${i1}-${j}-${k1}-${l}`)[0].value;
            if (! v0) continue;
            if (! v1) continue;
            if (v0 === v1) { okay = false; err.push([i0, j, k0, l]); }
        }
        if (! okay)
            for (let i of range3) for (let k of range3)
                $(`#sudoku-${i}-${j}-${k}-${l}`)[0].style.backgroundColor = colors.err0;
    }
    for (let i of range3) for (let j of range3) {
        let okay = true;
        for (let k0 of range3) for (let l0 of range3)
        for (let k1 of range3) for (let l1 of range3) {
            if (k1 === k0 && l0 === l1) continue;
            const v0 = $(`#sudoku-${i}-${j}-${k0}-${l0}`)[0].value;
            const v1 = $(`#sudoku-${i}-${j}-${k1}-${l1}`)[0].value;
            if (! v0) continue;
            if (! v1) continue;
            if (v0 === v1) { okay = false; err.push([i, j, k0, l0]); }
        }
        if (! okay)
            for (let k of range3) for (let l of range3)
                $(`#sudoku-${i}-${j}-${k}-${l}`)[0].style.backgroundColor = colors.err0;
    }
    for (let [i, j, k, l] of err)
        $(`#sudoku-${i}-${j}-${k}-${l}`)[0].style.backgroundColor = colors.err1;
    sudoku.onUpdated(err.length == 0);
}

const initSudoku = () => {
    $("#sudoku").html(
        range3.map(i =>
            `<div class=\"sudoku-outer-row\" id=\"sudoku-${i}\">` + range3.map(j =>
                `<div class=\"sudoku-outer-col\" id=\"sudoku-${i}-${j}\">` +
                range3.map(k =>
                    `<div class=\"sudoku-inner-row\" id=\"sudoku-${i}-${j}-${k}\">` + range3.map(l =>
                        `<input class=\"sudoku-input\" id=\"sudoku-${i}-${j}-${k}-${l}\">`
                    ).join('') + "</div>"
                ).join('') + "</div>"
            ).join('') + "</div>"
        ).join(''));
    for (let i of range3) for (let j of range3) for (let k of range3) for (let l of range3) {
        $(`#sudoku-${i}-${j}-${k}-${l}`)[0].oninput = ev => {
            if (sudoku.data[i][j][k][l])
                ev.target.value = sudoku.data[i][j][k][l];
            else {
                const value = ev.target.value;
                const valueLastCharCode = value.charCodeAt(value.length - 1);
                if (valueLastCharCode >= "1".charCodeAt(0) &&
                    valueLastCharCode <= "9".charCodeAt(0))
                    ev.target.value = value.slice(-1);
                else
                    ev.target.value = '';
                onSudokuChanged();
            }
        };
    }
}

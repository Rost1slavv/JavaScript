const SortLib = {
    compare(a, b, ascending) {
        if (a === undefined) return false;
        if (b === undefined) return true;
        return ascending ? a > b : a < b;
    },

    stats: {
        comparisons: 0,
        swaps: 0,
        reset() {
            this.comparisons = 0;
            this.swaps = 0;
        },
        log(method) {
            console.log(`Метод: ${method}`);
            console.log(`Кількість порівнянь: ${this.comparisons}`);
            console.log(`Кількість обмінів/переміщень: ${this.swaps}`);
        }
    },

    bubbleSort(arr, ascending = true) {
        this.stats.reset();

        let result = [...arr];
        let n = result.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.stats.comparisons++;
                if (this.compare(result[j], result[j + 1], ascending)) {
                    [result[j], result[j + 1]] = [result[j + 1], result[j]];
                    this.stats.swaps++;
                }
            }
        }

        this.stats.log("Сортування обміну");
        return result;
    },

    selectionSort(arr, ascending = true) {
        this.stats.reset();

        let result = [...arr];
        let n = result.length;

        for (let i = 0; i < n - 1; i++) {
            let idx = i;
            for (let j = i + 1; j < n; j++) {
                this.stats.comparisons++;
                if (this.compare(result[idx], result[j], ascending)) {
                    idx = j;
                }
            }
            if (i !== idx) {
                [result[i], result[idx]] = [result[idx], result[i]];
                this.stats.swaps++;
            }
        }

        this.stats.log("Сортування мінімального елемента");
        return result;
    },

    insertionSort(arr, ascending = true) {
        this.stats.reset();

        let result = [...arr];

        for (let i = 1; i < result.length; i++) {
            let key = result[i];
            let j = i - 1;
            while (j >= 0 && this.compare(result[j], key, ascending)) {
                result[j + 1] = result[j];
                this.stats.comparisons++;
                this.stats.swaps++;
                j--;
            }
            result[j + 1] = key;
        }

        this.stats.log("Сортування вставками");
        return result;
    },

    shellSort(arr, ascending = true) {
        this.stats.reset();

        let result = [...arr];
        let n = result.length;
        let gap = Math.floor(n / 2);

        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                let temp = result[i];
                let j = i;
                while (j >= gap && this.compare(result[j - gap], temp, ascending)) {
                    result[j] = result[j - gap];
                    this.stats.comparisons++;
                    this.stats.swaps++;
                    j -= gap;
                }
                result[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }

        this.stats.log("Сортування Шелла");
        return result;
    },

    quickSort(arr, ascending = true) {
        this.stats.reset();

        function _quickSort(array, low, high, compareFn, stats) {
            if (low < high) {
                let pi = partition(array, low, high, compareFn, stats);
                _quickSort(array, low, pi - 1, compareFn, stats);
                _quickSort(array, pi + 1, high, compareFn, stats);
            }
        }

        function partition(array, low, high, compareFn, stats) {
            let pivot = array[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                stats.comparisons++;
                if (compareFn(pivot, array[j])) {
                    i++;
                    [array[i], array[j]] = [array[j], array[i]];
                    stats.swaps++;
                }
            }

            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            stats.swaps++;
            return i + 1;
        }

        let result = [...arr];
        _quickSort(result, 0, result.length - 1, (a, b) => this.compare(a, b, ascending), this.stats);
        this.stats.log("Швидке сортування (Хоара)");
        return result;
    }
};

//-------------------------------------------------------------------------------------
// 2. Касса
//=------------------------------------------------------------------------------------
// Дана касса, в которой имеется определенное количество различных монет и купюр разных номиналов. Номиналы доступных денежных единиц: 1, 5, 10, 50, 100. Требуется написать алгоритм, который будет выдавать указанную сумму наименьшим количеством денежных единиц, доступных в кассе. Если указанная сумма не может быть выдана, алгоритм должен вернуть сообщение об ошибке.

// Формат ввода
// На вход функция принимает строку, где первое значение - сумма, которую надо выдать. После этого через точку с запятой идут пары чисел, разделённых двоеточием, где первое число - это номинал в порядке возрастания, а второе - это кол-во купюр. Входное значение может быть пустой строкой.

// "78;1:7,5:5,10:3,50:6,100:2"

// Формат вывода
// На выход ожидается строка, где указаны номиналы купюр и их количество через запятую в порядке возрастания номинала. Выходное значение может быть пустой строкой.

// "1:3,5:1,10:2,50:1"

// Если не удалось собрать нужно значение, должно выводится сообщение об ошибке - "Error: Not enough money"

function atm(line) {
    if (!line) return "";

    let [sum, denominations] = line.split(';');
    sum = parseInt(sum);
    if (isNaN(sum)) return "Error: Invalid input";

    let available = new Map(
        denominations.split(',').map(pair => {
            let [denomination, count] = pair.split(':').map(Number);
            return [denomination, count];
        })
    );

    let result = new Map();

    let sortedDenominations = Array.from(available.keys()).sort((a, b) => b - a);

    for (let denomination of sortedDenominations) {
        if (sum <= 0) break;
        let count = available.get(denomination);
        let needed = Math.min(Math.floor(sum / denomination), count);
        if (needed > 0) {
            result.set(denomination, needed);
            sum -= denomination * needed;
        }
    }

    if (sum > 0) {
        return "Error: Not enough money";
    }

    let output = Array.from(result.keys()).sort((a, b) => a - b)
        .map(denomination => `${denomination}:${result.get(denomination)}`)
        .join(',');

    return output;
}

console.log(atm("78;1:7,5:5,10:3,50:6,100:2"))
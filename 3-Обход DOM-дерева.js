//---------------------------------------------------------------------------------------
// 3. Обход DOM-дерева
//---------------------------------------------------------------------------------------
// Дано дерево DOM-элементов. У каждого элемента есть поле tagName, которое содержит название тега этого элемента, и опциональный массив children, в котором содержатся его дочерние элементы. Дочерних элементов может не быть, тогда поле children отсутствует. Количество дочерних элементов может быть до 10 штук, глубина дерева - не больше 10. Необходимо составить селекторы вида: DIV>DIV>SPAN для всех элементов дерева, и вывести их отсортированными в строке

// Формат ввода
// На вход функция принимает JSON, сериализованный в строку, в котором содержится информация о DOM дереве - корень дерева со вложенными в него потомками. Входное значение не может быть пустой строкой и гарантировано содержит хотя бы один элемент дерева.

// '{"tagName":"ASIDE","children":[{"tagName":"DIV","children":[{"tagName":"SPAN"}]},{"tagName":"DIV"}]}'

// Формат вывода
// На выход ожидается строка, где указаны все селекторы всех элементов дерева через запятую отсортированные как строки в порядке возрастания. Дубли исключены. Выходное значение может быть пустой строкой.

// "ASIDE,ASIDE>DIV,ASIDE>DIV>SPAN"

function getAllSelectors(line) {
    const root = JSON.parse(line);
    const selectors = new Set();

    function generateSelectors(node, currentSelector = '') {
        selectors.add(currentSelector + node.tagName);
        if (node.children) {
            node.children.forEach(child => {
                generateSelectors(child, currentSelector + node.tagName + '>');
            });
        }
    }

    generateSelectors(root);
    return Array.from(selectors).sort().join(',');
}

console.log(getAllSelectors('{"tagName":"ASIDE","children":[{"tagName":"DIV","children":[{"tagName":"SPAN"}]},{"tagName":"DIV"}]}'))
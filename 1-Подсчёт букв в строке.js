//-----------------------------------------------------------------------
//1. Подсчёт букв в строке
//-----------------------------------------------------------------------
// На вход подается строка состоящая из букв в нижнем регистре. 
// Требуется разработать алгоритм, который сможет вычислить количество вхождений каждой буквы в эту строку. 
// Затем алгоритм должен вернуть строку, в которой каждая буква будет перечислена в алфавитном порядке, с указанием количества её вхождений.

// Формат ввода
// Входное значение может быть пустой строкой.

// "abcbb"

// Формат вывода
// Выходное значение может быть пустой строкой.

// "a:1,b:3,c:1"

function countLetters(str) {
    const letterCounts = {};

    for (const char of str) {
        letterCounts[char] = (letterCounts[char] || 0) + 1;
    }

    const sortedEntries = Object.entries(letterCounts).sort();

    return sortedEntries.map(([letter, count]) => `${letter}:${count}`).join(',');
}

console.log(countLetters("abcbb"))
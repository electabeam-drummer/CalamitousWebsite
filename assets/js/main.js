/*
    main.js - наш главный скрипт, который будет выполнять всю "магию" на сайте.
    На этом уроке его задача одна: загрузить код навигационной панели из отдельного файла
    и вставить его на каждую страницу. Это решает проблему дублирования.
*/

// Функция для загрузки и вставки компонентов.
// fetch() - это современный способ делать запросы к файлам или серверам.
// async/await - это синтаксис, который позволяет писать асинхронный код просто и понятно.
async function includeHTML() {
    // Находим все элементы с атрибутом `include-html`
    const elements = document.querySelectorAll('[include-html]');
    
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const file = element.getAttribute('include-html'); // Получаем путь к файлу из атрибута
        
        if (file) {
            try {
                // Загружаем содержимое файла
                const response = await fetch(file);
                if (response.ok) {
                    const text = await response.text();
                    element.innerHTML = text; // Вставляем содержимое в наш элемент-плейсхолдер
                } else {
                    element.innerHTML = 'Page not found.'; // Обработка ошибки
                }
            } catch (error) {
                console.error('Error fetching HTML:', error);
                element.innerHTML = 'Error loading content.';
            }
        }
    }
}

// Запускаем нашу функцию после того, как весь HTML-документ будет загружен и готов.
document.addEventListener('DOMContentLoaded', includeHTML);
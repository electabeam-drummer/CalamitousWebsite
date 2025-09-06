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
//document.addEventListener('DOMContentLoaded', includeHTML);//

// Новая функция для отрисовки персонала из JSON-файла.
async function renderPersonnel() {
    const personnelContainer = document.querySelector('.div_personnel');
    // Если на текущей странице нет контейнера для персонала, просто выходим из функции.
    if (!personnelContainer) {
        return;
    }

    try {
        const response = await fetch('data/personnel.json');
        if (!response.ok) {
            // Если файл не найден или есть другая ошибка сети, сообщаем об этом.
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const personnelList = await response.json();

        let html = '';
        personnelList.forEach(person => {
            // Генерируем HTML для каждой карточки участника.
            // Используем тернарный оператор, чтобы показать заглушку, если фото нет.
            const photoUrl = person.photoUrl ? person.photoUrl : 'assets/images/placeholder.png';
            
            html += `
                <div class="personnel-card">
                    <img src="${photoUrl}" alt="Фотография ${person.name}" class="personnel">
                    <div class="personnel-info">
                        <h3>${person.name}</h3>
                        <p>${person.role} (${person.years})</p>
                    </div>
                </div>
            `;
        });

        personnelContainer.innerHTML = html;
    } catch (error) {
        console.error('Error fetching or rendering personnel:', error);
        personnelContainer.innerHTML = '<p style="color: red;">Не удалось загрузить состав группы. Пожалуйста, попробуйте позже.</p>';
    }
}


// Запускаем наши функции после того, как весь HTML-документ будет загружен и готов.
document.addEventListener('DOMContentLoaded', () => {
    includeHTML();
    renderPersonnel();
});
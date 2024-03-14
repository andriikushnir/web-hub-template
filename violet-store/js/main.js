
    // Функция для генерации случайного числа в заданном диапазоне
    function randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Функция для генерации случайного градиента
    function generateRandomGradient() {
        // Генерация случайных цветов для градиента
        var color1 = `rgb(${randomInRange(0, 255)}, ${randomInRange(0, 255)}, ${randomInRange(0, 255)})`;
        var color2 = `rgb(${randomInRange(0, 255)}, ${randomInRange(0, 255)}, ${randomInRange(0, 255)})`;
        // Возвращаем строку с CSS linear-gradient
        return `linear-gradient(330deg, ${color1}, ${color2})`;
    }

    // Функция для изменения градиента фона элемента с плавным эффектом
    function changeGradientSmoothly(element) {
        var duration = 5000; // Длительность анимации в миллисекундах
        var interval = 100; // Интервал обновления цвета фона в миллисекундах

        var startColor = element.style.backgroundImage; // Текущий цвет фона
        var endColor = generateRandomGradient(); // Случайный цвет для анимации

        var startTime = Date.now(); // Время начала анимации

        // Функция анимации изменения цвета фона
        function animate() {
            var elapsedTime = Date.now() - startTime; // Прошедшее время с начала анимации
            var progress = Math.min(elapsedTime / duration, 1); // Прогресс анимации от 0 до 1

            // Интерполяция между начальным и конечным цветами
            var interpolatedColor = `linear-gradient(330deg, ${interpolateColors(startColor, endColor, progress)})`;

            element.style.backgroundImage = interpolatedColor; // Установка нового цвета фона

            // Если анимация завершена, запускаем новую анимацию
            if (progress < 1) {
                setTimeout(animate, interval);
            }
        }

        // Запуск анимации
        animate();
    }

    // Функция для интерполяции между двумя цветами
    function interpolateColors(color1, color2, progress) {
        var result = [];
        for (var i = 0; i < 3; i++) {
            var value = Math.round(color1[i] + (color2[i] - color1[i]) * progress);
            result.push(value);
        }
        return result.join(', ');
    }

    // Запуск анимации изменения градиента фона
    changeGradientSmoothly(document.getElementById('gradient-background'));
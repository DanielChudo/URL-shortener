# URL shortener

Первая версия проекта была написана по мотивам видеоролика Владилена Минина, но позже бОльшая часть кодовой базы была переписана, а логика работы сервера улучшена. Мне не совсем понравился используемый автором подход, поэтому я внес следующие изменения:

- В авторской версии было много повторений кода, а одна функция могла выполнять тонну вещей. В таком виде серверная часть больше походила на спагетти-код, поэтому я разбил все на controllers, services, middlewares, exceptions и так далее
- Полностью переделал логику авторизации. К уже имеющемся access token добавил refresh token, передаваемый через cookie. На клиентские запросы повесил interceptors
- Разделил сервер и клиент на два непересекающихся мира. В исходном проекта была лишняя вложенность, которая иногда вызывала конфликт зависимостей
- Заменил config на более популярный и удобный dotenv
- Заменил context на redux
- Заменил fetch на axios
- Добавил PropTypes
- Подключил ESLint + airbnb-config в связке с Prettier
- Пофиксил баги. Например: при генерации новая ссылка не появлялась в личном списке пользователя, если до этого кто-то другой уже сокращал ее

## Готовый проект

Собранный сайт можно найти по адресу [https://chudo-url-shortener.herokuapp.com](https://chudo-url-shortener.herokuapp.com)

Пример сокращенной ссылки (в реальном проекте домен был бы короче): [https://chudo-url-shortener.herokuapp.com/t/UPzZ5coSF](https://chudo-url-shortener.herokuapp.com/t/UPzZ5coSF)

![Детализация сокращенной ссылки](https://i.ibb.co/nB7S3dG/details.png)

## Технологии, библиотеки, расширения

Сервер:

- Node.js
- Mongoose
- Express
- Express validator
- Bcrypt.js
- Dotenv
- Jsonwebtoken
- Shortid
- Nodemon
- ESLint + airbnb-config
- Prettier

Клиент:

- React
- Redux
- Redux Thunk
- Аxios
- React Router
- PropTypes
- ESLint + airbnb-config
- Prettier

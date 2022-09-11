# **Проект: Stellar Burger**
### Факультет "React разработчик" Яндекс.Практикум

Проект представляет собой приложение космической бургерной, позволяющее заказывать уникальные бургеры, которые приготовят по индивидуальному заказу. В приложении можно создавать бургеры простым перетаскиванием необходимых ингредиентов, оформлять заказ, а также отслеживать его статус в реальном времени.


## Технологии

* React
* TypeScript
* Redux
* WebSocket
* React Router
* React DnD
* CSS Modules


## Функциональность

*	Drag-n-drop перетаскивания ингредиентов для изменения их порядка в бургере или для добавления в новый;
*	Лента с обновлением статусов заказов в реальном времени (WebSocket);
*	Изменение порядка ингредиентов;
*	Регистрация/авторизация/восстановление пароля пользователей;
*	Редактирование профиля;
*	История заказов пользователя с обновлением в реальном времени;
*	Защита роутов авторизацией;
*	Динамический роутинг.


## Установка

1.	Создаем рабочую директорию с произвольным именем (например dev):
    mkdir <имя рабочей директории>;

2.	Клонируем репозиторий в рабочую директорию, переходим в неё: 
    cd <имя рабочей директории>;

3.	Клонируем репозиторий: git clone https://github.com/339598u5uut/REACT.git;
    В рабочей директории должна появиться папка проекта react-burger;

4.	Переходим в папку с проектом:
    cd react-burger, устанавливаем зависимости: npm install;

5.	Запускаем проект: npm start.



## Тестирование бизнес-логики приложения: 
   npm test


## Функциональное тестирование с использованием Cypress:
npm run cypress


[GitHubPages](https://339598u5uut.github.io/REACT/)


***  

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

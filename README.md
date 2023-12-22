# Проект: TodoList


## Оглавление

- [О проекте](#о-проекте)
- [Используемые технологии](#используемые-технологии)
- [Скрипты запуска проекта](#скрипты-запуска-проекта)
- [Работа с SCSS](#работа-с-scss)
  - [Миксины](#миксины)
  - [Переменные](#переменные)


### О проекте
Представляет собой ToDo лист с следующими возможностями:
-  добавлять дела
-  удалять дела
-  редактировать дела
-  помечать дела как выполненные
-  выполнять по ним поиск
-  сортировки по имени/дате/важности
<!-- - (опционально) Возможность drag and drop для изменения порядка дел -->


### Используемые технологии

- React v 18.2.0
- React-redux v 9.0.4
- Typescript v 5.2.2
- Sass v 1.69.5


### Скрипты запуска проекта

- Запуск проекта в режиме разработки:

  ```bash
  npm run dev
  ```

- Сборка проекта и его деплой на GH Pages:

  ```bash
  npm run deploy
  ```

### Работа с SCSS

Миксины и переменные находятся в директории `src/components/Shared/`. Для того чтобы работать с миксинами и переменными **необходимо в начале стилевого файла компонента указать следующие импорты** (если их не указать, то при сохранение изменений в файле получим ошибку о том, что переменная или миксин не найдены):

```scss
@import "../../Shared/mixins";
@import "../../Shared/variables";
```

#### Миксины

Пример миксины:

```scss
@mixin font-sans($size, $color, $weight, $lh: false, $ls: false) {
  font: {
    family: "OpenSans", Helvetica, Arial, sans-serif;
    size: $size;
    weight: $weight;
  }
  color: $color;
  @if $lh {
    line-height: $lh;
  }
  @if $ls {
    letter-spacing: $ls;
  }
}
```

Миксин принимает 5 параметров:

- `$size` - отвечает за размер шрифта, является обязательным параметром
- `$color` - отвечает за цвет шрифта, является обязательным параметром
- `$weight` - отвечает за вес шрифта, является обязательным параметром
- `$lh` - отвечает за высоту строки, является не обязательным, т.е. если его не указывать, то можно считать, что данный параметр вообще не указан, и браузер использует его значение по умолчанию.
- `$ls` - отвечает за расстояние между словами, является не обязательным, т.е. если его не указывать, то можно считать, что данный параметр вообще не указан, и браузер использует его значение по умолчанию.

Пример использования миксины:

```scss
.app {
  &__content {
    /* Без необязательных параметров */
    @include font-sans($textXL, $color-violet, 700);
  }
}
```

#### Переменные

- Для удобства переменные цвета начинаются с `$color-...`, переменные размера шрифта с `$text...`, это необходимо чтобы Emmet не вываливал вам все значения со знаком `$`, а вы пытались вспомнить название цвета.
- При выборе названия переменной цвета пытаемся исходить из следующей логики
  - Если цвет используется например не только в тексте, но и, допустим, как фоновой цвет элементов, то стараемся назвать переменную по названию цвета, например `$color-violet`.
  - Если цвет используется, допустим как фоновый цвет элемента, то стараемся назвать его по месту применения, например `$color-bg-divider`.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

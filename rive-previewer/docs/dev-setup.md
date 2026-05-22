# 開發環境設定

## Vite 插件

目前提供兩個官方插件，擇一使用：

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — 使用 Oxc
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — 使用 SWC（速度較快）

## React Compiler

此模板預設未啟用 React Compiler，因為它會影響開發與建置效能。若要啟用，請參考[官方文件](https://react.dev/learn/react-compiler/installation)。

## ESLint 型別感知規則

正式應用建議啟用型別感知 lint 規則：

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // 或更嚴格：
      tseslint.configs.strictTypeChecked,
      // 可選風格規則：
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## ESLint React 專屬插件

```bash
npm install -D eslint-plugin-react-x eslint-plugin-react-dom
```

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

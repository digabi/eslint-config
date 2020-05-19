# eslint-config

Shared ESLint config for the digabi project.

# How to add to a new project?

Add the required dependencies:

    $ yarn add -D @digabi/eslint-config typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-mocha eslint-plugin-prettier eslint-plugin-react
    
Modify `eslintrc.json` to use our config:

```json
{
  "extends": "@digabi/eslint-config"
}
```

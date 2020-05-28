# eslint-config

Shared ESLint config for the digabi project.

# How to add to a new project?

Add the required dependencies:

    $ yarn add -D @digabi/eslint-config @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier
    
If you're using React, add

    $ yarn add -D eslint-plugin-react
    
If you're using Mocha, add

    $ yarn add -D eslint-plugin-mocha
    
If you're using Jest, add    

    $ yarn add -D eslint-plugin-jest
    
Finally, add or modify `.eslintrc.json` in the project root.

```json
{
  "extends": "@digabi/eslint-config"
}
```

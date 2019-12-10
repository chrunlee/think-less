# think-less
A less middleware for thinkjs 3.0 on development enviroment.
Compiler less file to css when request `xxx.css` file in pages.

# Installation
```
npm install think-less --save-dev
```

# API

Modify `/src/config/middleware.js` 

```
const less = require('think-less');
const path = require('path');
const isDev = think.env === 'development';

module.exports = [
    {
        handle: less,
        enable: isDev ? true : false,
        options: {
            root: path.join(think.ROOT_PATH, 'res'),
            target: path.join(think.ROOT_PATH, 'www'),
            lessOptions: {
                paths: [path.join(think.ROOT_PATH, 'res')],
                compress: true
            }
        }
    }
]
```

### Options 

- root : Root directory to find less file .
- target : Root directory to place css file .
- lessOptions : Options of [https://github.com/less/less.js](Less.js)
# parameter-grab
---
Just a simple module that grabs parameters from AWS Parameter Store based on the given directory.

#### Install in any Lambda with:

`npm install /parameter-grab#master --save`

#### Then use...

    const grabParams = require('parameter-grab');

    grabParams({ENV}/{appName})
    .then(data => console.log('Success', data))
    .catch(err => console.log('ERROR', err));

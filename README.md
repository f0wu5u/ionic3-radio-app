# ionic3-radio-app
Unoffical 181.FM mobile online streaming app with real time stream meta data

## Installation
Create a new ionic 3 app using
``` npm install -g ionic cordova ```

Browse to your desired project location and open terminal

run

```ionic start ionic3-radio blank```

Then clone this repo into your project directory, make sure you override the existing files

 
Add cordova platforms android and browser

```ionic cordova platform add android```

```ionic cordova platform add browser```

```ionic cordova plugin add cordova-plugin-media```

then run
```ionic cordova prepare --prod```
### Well done you just configured the Ionic3 Radio App

serve the app by running

``` npm run ionic:serve ```

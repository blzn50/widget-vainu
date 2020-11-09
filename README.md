# Vainu Widget

A webapp which can be embedded into other client web apps and display business information as customizable widget.

### Starting the project

#### Server
To start the server,
```sh
cd backend
```

Create `.env` file at the root of the backend folder and set `VAINU_AUTH` api key as shown in `.env.example` file.

```
VAINU_AUTH=
```

Then,

```sh
npm install
npm start
```

Server will run in port 3001.

#### Client

Start another terminal instance and from the root folder,

```sh
cd frontend
npm install
```

```sh
npm run serve:widget
```

This will create a static server in port 5000 simulating the hosting of the widget JS file.

---

Create yet another terminal instance and inside the frontend folder, run

```sh
npm run serve:client
```

This simulate a client webapp which loads the hosted widget JS file.

### Configuring the widget

To use the widget in another client webapp, the following script should be loaded in the `index.html` file inside `<script></script>` tag possibly before the `</body>` tag.

```js
/**
 * @param {String} w - browser window object
 * @param {String} d - browser HTML document object
 * @param {String} s - contains the word 'script' to create new DOM element
 * @param {String} o - dynamically defined name of the global variable
 * @param {String} f - address of the main script that is required for loading the widget script
 * @param {String} js - script element created later on for the widget using 's' parameter
 * @param {String} fjs - the script tag that is already located in the body
 * */
(function (w, d, s, o, f, js, fjs) {
  w['vainu-widget'] = o;
  w[o] =
    w[o] ||
    function () {
      (w[o].q = w[o].q || []).push(arguments);
    };
  js = d.createElement(s);
  fjs = d.getElementsByTagName(s)[0];
  js.id = o;
  js.src = f;
  js.async = 1;
  fjs.parentNode.insertBefore(js, fjs);
})(window, document, 'script', 'vainu', 'http://localhost:5000/widget.js');

/**
 * @param {String} load - api method name to load script
 * @param {String} section-right - class name of the element to load the vainu widget
 * @param {String} 02152542 - business id to fetch
 * */
vainu('load', 'section-right', '90146432');
vainu('load', 'section-bottom', '23087882');
```

Like this

```html
<script>
  (function (w, d, s, o, f, js, fjs) {
    w['vainu-widget'] = o;
    w[o] =
      w[o] ||
      function () {
        (w[o].q = w[o].q || []).push(arguments);
      };
    js = d.createElement(s);
    fjs = d.getElementsByTagName(s)[0];
    js.id = o;
    js.src = f;
    js.async = 1;
    fjs.parentNode.insertBefore(js, fjs);
  })(window, document, 'script', 'vainu', 'http://localhost:5000/widget.js');
  vainu('load', 'section-right', '90146432');
  vainu('load', 'section-bottom', '23087882');
</script>
```

N.B. Currently, only `load` api method is supported.

### Configuring the backend to add new client webapp

The embedding of the hosted JS file won't be enough to run the script in new client web app. There is a mock database in `backend/database/index.js` file where the url and the respective api key for each client is configured as an object. A new object should be added to this database array in the format

```js
{
  id: 5,
  origin: 'http://localhost:4000',
  apiKey: process.env.VAINU_AUTH,
}
```

Restart the backend server and the new client will be able to load the widget.

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDeTNcA0x_AqH9B6Qfq5sMFW5rQTqoZJcw',
    authDomain: 'kageogform.firebaseapp.com',
    databaseURL: 'https://kageogform.firebaseio.com',
    projectId: 'kageogform',
    storageBucket: 'kageogform.appspot.com',
    messagingSenderId: '1070338139262'
  }
};

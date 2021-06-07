// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  namespaceAuth0:'https://bluter.softland.website',

  domain_auth0:'storebus.us.auth0.com',
  pathGetTokenAuth0:'/oauth/token',

  client_Id_Management:'4e09MyOhwsgn8kv24RKfUpNBl5xhultw',
  client_Secret_Management:'Pny-s7ssLbb3ClpzpAwNN830e3O0nCSJcwWCC7BDJ3bwzoHL5ANfTPCEhOTWJ2ir',


  /*Variables de API audience*/ 
  audience_API_storebus:'https://storebus.com',
  audience_API_Management:'https://storebus.us.auth0.com/api/v2/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

# On OpenShift
Building frontend using STI grunt-nginx image
```
oc new-build sti-grunt-nginx~https://github.com/clerixmaxime/askme-backbone.git
```
Launching the application on OpenShift
```
oc new-app askme-backbone 
```

## Changes for OpenShift
* nginx.conf, root changed to /usr/share/nginx/html/ in order to match with the STI-grunt-nginx image configuration.
* nginx.conf, dashboard has been removed

# Presenter Feedback demo app

This application is used as part of the *Lean Engineering* demo.
**This is just a frontend part** of the app and in order to run it successfully
you will need to get the backend part as well.

The app is deployed askme.accenture.com with integration to Accenture's federated
single sign on where it gets the information about the user submitting questions.

Frontend code is stored [here](https://newsource.accenture.com/projects/A2214/repos/presenter-feedback/)

Backend code is stored [here](https://newsource.accenture.com/projects/A2214/repos/presenter-feedback-backend/)

Proxy setup is stored [here](https://newsource.accenture.com/projects/A2214/repos/presenter-feedback-proxy/)

Note: proxy requires https with shibboleth running (not possible to run locally)

To get the frontend path up and running you will need:

 - nodejs (version 4.2 is recommended, should be running on older ones without a problem)
 - npm (2.14 was used the last time feature were added)

The workflow / compilation is standard AOWP stuff:

  - npm install
  - bower install
  - grunt build/serve

Note: The app uses *http* and *websockets* to communicate to backend.

To run the BDD/acceptance tests you will need:

  - phantomjs with webdriver running on port 4444 (`phantomjs --webdriver=4444`)
  - an instance of the frontend part running in the background locally (`grunt serve`)
  - an instance of the backend part (with db of course) running locally
  (`node index.js` in the backend part folder)
  - `grunt acceptance` should connect to the app via the phantomjs and the bdd tests

To run unit tests:

  - `grunt test`

To run static code analysis:

  - `grunt jshint`

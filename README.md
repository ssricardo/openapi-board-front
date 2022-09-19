# openApi-Center-Front

FrontEnd for the OpenAPI Center App

It's a standard Angular App. It uses Angular-cli. Therefore, common commands are available, like:
 
> ng serve

> ng build

# Build 

## Docker Image

Build the application with: 

> docker build . -t "openapi-center-front"

This invokes ng-cli with prod parameters. The image is based on nginx. 
For that, the file nginx.conf (in this root) is used.
The tag mentioned above matches the one used in the k8s descriptors (in the "parent" project )

### Integration

It calls the backend through REST calls.  
The base paths for the backend are on `app.config.ts`.


### TODO

* Use angular-material in some more parts
* Work on tests
* Review styles and colors
* Spit modules

Or you can also use it from `npm`. Check the scripts out on `package.json`.
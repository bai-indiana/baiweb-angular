# BaiwebAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:5000/`. The application will automatically reload if you change any of the source files.

## Deploy in github

Run 'ng build --output-path docs --base-href baiweb-angular/' this will deploy whole app in docs dir. Push docs into github then see the changes in 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Create components for each of your menu items and sub-menu items. For example, create components for Home, Events, About, Member, Contact, Announcements, Executive Committee, and BY-LAWS.</br>
Commands Ran - > </br>
    ng generate component home </br>
    ng generate component events </br>
    ng generate component about </br>
    ng generate component member </br>
    ng generate component contact </br>
    ng generate component announcements </br>
    ng generate component executive-committee </br>
    ng generate component by-laws </br>

Create a shared header and footer component. </br>
    ng generate component shared/header </br>
    ng generate component shared/footer </br>

Create contact page form service  </br>
    ng generate service contact/contact </br>
    ng generate service shared/loading/loading </br>

Crerate model </br>
    ng generate class shared/client --type=model    

Design  </br>

-Menu  https://getbootstrap.com/docs/5.3/components/navbar/ </br>

1. Code Deployment - **Only deploy dist directory**
    1. Ref video -  https://www.youtube.com/watch?v=YMw5YmZRiI0 </br>
    2. Install 'Azure App Service' plugin 
    3. press ctrl+shift+P
    4. This will open a text box on top
    5. Then type sign in / Sign out (if you already sign out and sign in)
    6. Login using bai.indiana@outlook.com
    7. Open 'Azure App Service' plugin
    8. Select subscription
    10. Deploy using above video
    11. **Add SCM_DO_BUILD_DURING_DEPLOYMENT=false for first time only
    12. ref - https://medium.com/@theartemkovtun/azure-web-app-angular-couldnt-detect-a-version-for-the-platform-nodejs-in-the-repo-3d93892a514e 
    13. Go-to - https://baiweb-angular-l.azurewebsites.net/home to see the change

 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

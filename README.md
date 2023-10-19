# BaiwebAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:5000/`. The application will automatically reload if you change any of the source files.

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

Design  </br>

-Menu  https://getbootstrap.com/docs/5.3/components/navbar/ </br>


</br>
Code Deployment - </br> 
Ref video -  https://www.youtube.com/watch?v=YMw5YmZRiI0 </br>
        Install 'Azure App Service' plugin </br>
        press ctrl+shift+P</br>
        This will open a text box on top </br>
        Then type sign in / Sign out (if you already sign out and sign in)</br>
        Login using bai.indiana@outlook.com</br>
        Open 'Azure App Service' plugin</br>
        Select subscription</br>
        Deploy using above video</br>
        **Add SCM_DO_BUILD_DURING_DEPLOYMENT=false for first time only ref - https://medium.com/@theartemkovtun/azure-web-app-angular-couldnt-detect-a-version-for-the-platform-nodejs-in-the-repo-3d93892a514e </br>
        
        Go-to - https://baiweb-angular-l.azurewebsites.net/home to see the change
         









## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

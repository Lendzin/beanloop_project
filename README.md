# Beanloop-dashboard

This is the repository for the project made for the course 1DV611 - Linnaeus University. The project is developed in collaboration with the company Beanloop.

# Getting Started

## Prerequisites

Make sure to have Node and yarn/npm installed.

## First time installation
1. Clone the repository:  ```git clone https://github.com/rasfa98/beanloop-studentprojekt.git ```
2. Make sure the dev branch is up to date: ```git pull origin dev```
3. Navigate to client folder: ```cd client```
4. Run your package installer of choice:  ```npm install``` or ```yarn install```
5. Start your local dev instance ```npm start``` or ```yarn run```

***

# Presentation of Application

## Implemented features

#### CRUD functionality 
Full CRUD functionality needed for the application to function is made possible through a Apollo / GraphQL implementation on the Front-End and a GraphQL Endpoint on a AWS Lambda FaaS on the Back-End. 
The CRUD functionality includes: 
1. Adding and removing Dashboards.
2. Adding, Updating and removing Widgets.

These operations are protected by authentication. The means of authentication is currently provided by verifying provided JWT token in the GraphQL queries from the Front-End. Detailed information about this is provided in the technical documentation found in the wiki.

#### Login functionality
Login Page with login functionality connected to the existing user base found in Beanloop Back-end. When logging in with correct credentials a token is returned and stored Redux State. This token is then used in conjunction with the backend in order for the user to get access to correct Dashboards and Widgets.

#### Dashboard List
A Dashboard List page which displays the current brands of a user and the Dashboards created for that specific brand. This page utilizes the CRUD functionality in regards to creating and removing Dashboards for the user. Dashboards can be named and set to display data from a certain time span.

#### Dashboard Page
A Dashboard Page showing the selected Dashboard. In here, users can create widgets using the "add widget"-functionality in the bottom right corner, or view his or her existing saved template widgts using the bottom left "Show Templates"-functionality. 

##### Add widget-functionality
This functionality brings up a modal where a user currently can choose between two widgets: Chart and Line. Upon choosing one of the widgets, the user is presented with some options to enter;
1. The user can give the widget a "title" - No more than 20 characters long.
2. The user can give the widget a "description".
3. The user can choose which type of metric will be displayed.
4. The user can choose which size, "small" or "large" for the widget
5. The user can change background color (Number and Chart widget) or background color and fill color (Chart widget).
6. Optionally, the user can enter a template name if he or she wants to save the widget to templates.
7. The user clicks "Save" if he or she wants to save the widget, or "Create" if they want to place it on the Dashboard.

#### Show Templates-functionality
This functionality brings up a modal where the user can view all saved templates. If templates exist, users can interact with them in three ways:
1. If the user chooses the "trashcan"-icon for the selected template, they will delete it. This is permanent.
2. If the user chooses the "plus"-icon, the widget will be added to the Dashboard.
3. If the user chooses the "pen"-icon, the modal for entering options for the widget will be displayed and options like title, description, metric type and color can be changed.

#### Save/render-functionality
In the middle of the Dashboard there exist a button called Save/Render. This is used to "save" a current configuration of the dashboard with selected widgets. This means that the Dashboard can be returned to later and the widgets will still exist in it. It also puts the displayed grid in an "uneditable" state that correctly shows how it will later be displayed.

# Known missing implementations
As of 27/5-19 when we are presenting this we still need to work on implementing these last fixes. Time is running short, but we will use our time to the best of our abilities to implement these in order of priority:

1. Change so X-axis on chart widgets displays correct date(This is the most important feature we did not have time to add due to unexpected events during last sprint)
2. Display name of active Dashboard on the Dashboard page (most likely in the Navbar).

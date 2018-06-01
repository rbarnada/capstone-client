# Budget Client

### Technologies used:
- HTML
- CSS
- Bootstrap
- Sass
- Javascript
- Handlebars
- Jquery
- AJAX
- Atom text editor
- Terminal
- Google Chrome

---
### Installation
- Install dependencies with npm install.

---
### App Description
This web app allows users to set a monthly budget and log their expenses. The app lets you know the total you have spent so far, and how much is remaining until you hit your budget. Expenses are listed for users to referred back to and can be updated or delete at will. Users can also add a budget for the next month to begin planning for the future but currently only allows the addition of one extra month.

---
### Planning
For this project, I wanted to spend a good amount of time on the UI and making it as easy to navigate as possible. I started out with a basic wireframe which had four views. These views separated out different concerns and handle differing needs. As I progress through the project I began to think of more ways to divide concerns into more views. I ended up adding an additional view with plans for more to further optimize the pages layout. 
---
### Development Process:
I started out by creating basic forms for all CRUD actions for my three resources (users, budgets, and expenses). These forms submit given info to make the appropriate API calls. Once these basic features were functional, I worked on creating a UI that was more user friendly. This proved to be a more difficult and lengthy process. I split the forms across multiple views based on the info they displayed. This came out to about four or five views and managing the content on the page began to be a bit difficult. Additionally, as users added, updated, or deleted resources, I wanted the page to dynamically update so the user would not have to manually refresh the page. This involved making GET requests after pretty much every other action to make sure the page always contained current information. After a good bit of debugging, I believe I acheived a UI that is fairly user-friendly and have improvements in mind to take it even further.

---
### Unsolved Problems/Future Plans:
There were many features I intended to include but could not add in before the original deadline for the project. In future interations, I intend to add a graph on each budgets page. In the graph, it would visualize which categories the user is spending their money in and would be better visually than just displaying the data as text. With this addition to the page for each budget, I would also want to move the list of expenses off this page and into a new view. Ideally, the user would click a button that says 'view all expenses' which would load a page that just lists all expenses for that given budget. This would de-clutter the budget page and but keep the content for those who want further details about their expenses. Beyond that, I would like to make continued improvements to style and UI to make the site more visually appealing.

---
### User Stories:
- As a user, I want to be able to create an account/sign in/out and change my password
- As a user, I want to be able to set my budget for the month
- As a user, I want to be able to log my expenses
- As a user, I want to be able to track how close I am to my set budget
- As a user, I want to be able to visually see when and what I spend my money on
- As a user, I want to see how much of my income is spent in a month

---
### Image:
![Deployed Site](https://i.imgur.com/OjoJ0RM.png)

---
### Links:
- Wireframes: https://i.imgur.com/xVqQdfo.jpg
- Client Deployed: https://rbarnada.github.io/capstone-client/
- Client Repo: https://github.com/rbarnada/capstone-client
- API Repo: https://github.com/rbarnada/capstone-api
- API Deployed: https://wdi-budget-api.herokuapp.com/

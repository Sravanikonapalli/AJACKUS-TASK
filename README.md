**User Management Dashboard**
This project is a User Management Dashboard built using React, where you can add, edit, delete, and display users. It interacts with a mock API (jsonplaceholder.typicode.com) to simulate saving, updating, and deleting user data.

**Features**
1. View User List: Displays a table of users with their details (ID, First Name, Last Name, Email, Address).
2. Edit User: Modify user information (Name, Username, Email, Address).
3. Add New User: Add new users to the list.
4. Delete User: Remove users from the list.
5. Success Messages: Success messages appear with green ticks when users are deleted.
6. Responsive UI: The app is responsive and works well on both desktop and mobile devices.

**Tech Stack**
Frontend: React
State Management: React state
HTTP Client: Axios
Icons: React Icons (for success messages)
Styling: CSS (basic styles, can be further customized)

**To get start with this project follow below steps**
1. git clone https://github.com/Sravanikonapalli/AJACKUS-TASK.git 
2. cd user_management_dashboard
3. npm install
4. npm start

**How to Use**
-> View Users: The dashboard displays a list of users with their details.
-> Edit User: Click the Edit button next to a user to modify their information. After editing, click Save User to save the changes.
-> Add User: Click the Add User button at the bottom right of the page to add a new user. Fill out the form and click Save User.
-> Delete User: Click the Delete button next to a user to remove them from the list.

**How It Works**
**UserList Component:*

.Fetches users from the mock API (jsonplaceholder.typicode.com/users).
.Displays a list of users with options to edit or delete them.
.Handles actions like adding, editing, and deleting users, and updates the state accordingly.

*UserForm Component:*

.A form for adding or editing a user.
.When the form is submitted, the appropriate request (POST for adding a user, PUT for updating a user) is made using Axios.
.The parent component (UserList) is notified after a successful action and the list of users is updated accordingly.

*App Component:*

The main entry point of the app that renders the UserList component.
# heatcheck
A MEAN-stack app that calls API for NBA stats and displays top scorers for selected date.

Heat Check is web application that calls an API with statistics for the National Basketball Association (NBA) and displays a horizontal bar graph of the top 10 scorers on a date selected by the user. The colour of the bars in the chart change from yellow (20+ points), to orange (30+ points) to dark orange (40+ points) to red (50+ points). Hovering over a single bar reveals additional statistics. The web application is responsive and will display a side menu when the hamburger menu is opened.

Link to try/test the application: https://fierce-inlet-96619.herokuapp.com

Link to API (balldontlie): https://www.balldontlie.io/#introduction

The application was created using the MEAN stack (MongoDB, Express, Angular, Node). 

---------
FRONT PAGE


Visitors to the application's URL will see the front page which displays text welcoming them
to the application. The top menu contains links to the login and registration pages (top right). If not logged in, a user clicking on the log (top left) will remain on the front page. 

-------
REGISTRATION PAGE

The registration page contains six fields: first name, last name, username, email address, password and phone number. All fields are mandatory to complete registration. If any field is left blank, the user will be prompted to complete the form. 

The email field is validated using the following regular expression: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

Test email examples:

testcom (failed)

test.com (failed)

@test.com (failed)

test@test.com (passed)

The phone number field is validated using the following regular expression: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/

Test phone number examples:

111 111 111 (failed)

111 111 1111 (passed)

(222) 222 222 (failed)

(222) 222 2222 (passed)

333-333-333 (failed)

333-333-3333 (passed)

The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character. It is encrypted using bcrypt hashing. It is validated using the following regular expression: /(?=.*[A-Z]+.*)(?=.*[a-z]+.*)(?=.*\d+.*)(?=.*[!@#$%^&*()]+.*).{8,}/

Test password examples:

test (failed)

testTEST (failed)

testTEST123 (failed)

testTEST123!@# (passed)

The following three test users have already been added to the users database of the application:

First name: Tom

Last name: Jones

Username: tomjones

Email: tomjones@tomjones.com

Password: zudIDK3745@*# 

Phone number:(111) 111-1111

-----

First name: John

Last name: Smith

Username: johnsmith

Email: johnsmith@johnsmith.com

Password: ideIFL9847#*&

Phone number: (222) 222-2222

-----

First name: Joe

Last name: House

Username: joehouse

Email: joehouse@joehouse.com

Password: idkUEH847*$(

Phone number:(333) 333-3333


-----------
LOGIN PAGE

The login page contains two mandatory fields: email address and password. If the email address is found in the user database and the hashed password is authenticated, the user is granted a JSON web token that gives them access to the web application. 

----------
HOME PAGE

Only users that have registered and logged in can access the home page. 

The home page contains a date picker and a horizontal bar graph displaying the top 10 scoring players on the selected date. The default date when first visting the home page is March 17, 2019, on which there were scorers in each category of the graph as sorted by color: yellow (20+ points), to orange (30+ points) to dark orange (40+ points) to red (50+ points). If there were no games on the entered date, a message saying "No games on this date" will be displayed. 

-------------
USER PROFILE

Only users that have registered and logged in can access the user profile page.

This page displays the users registration information (except the password). The user can delete their profile from the user database and will be automatically logged out and redirected to the front page.









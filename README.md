# Flask_MySQL_MagazineApp

## Description of Program:
-  A fullstack application that has 2 types of users
* Client user
- Can signup (feature not implemented yet)
- Can login
- Can deactivate account (feature not implemented yet)
- Can subscribe to magazines (feature not implemented yet)
- View catalog 
- Add, update, or stop subscription
* Admin user
- Can login with special admin password (“password”)
- Presented with admin menu options which include queries for:
- Viewing all customers
- View catalog
- Various other queries that tell insightful information about users or magazines (i.e. avg cost of magazines across categories) - feature not implemented yet


## Instructions to run the program:
1. Navigate to the directory containing the app on your terminal or command line
```
cd DirectoryWhereAppIs
```
2. Create a virtual environment (if not already created)
```
python3 -m venv venv
```
3. Activate the venv
```
source venv/bin/activate
```
4. Install pip packages
- Mac
```
pip3 install -r requirements.txt
```
- Windows/Linux
```
pip install -r requirements.txt
```
5. Turn on flask server
```
flask run
```
6. Open a separate terminal or command line
7. Navigate to client folder within application
```
cd client
```
8. Install npm depdendecies
```
npm install
```
9. Start the react server
```
npm run start
```
## Release Notes
- Existing client users can login and then once authenticated is redirected to their dashboard containing their current subscriptions.
- User logins are cached in local storage (do not have to login again).
- Users who are signed in can add magazines to their cart, checkout or clear their cart. Checking out will save the magazine subscription for that user which is reflected under the user’s subscription page.
- Admin user can login and is presented with admin menu options
- Admin user logins are not cached (intentionally).
- The first 3 admin menu options are working (get all customers, get magazines catalog, get avg magazine cost per category); the other options are disabled for the user as they are not functional yet.
- Redirects - redirects users appropriately after clicking on links or logging in. 
- Error handling when login with a username that does not exist or enter invalid password. 
- Error handling when signing up; user cannot sign up with a username that already exists.
- SQL Queries have been all written, but not all of them are implemented in the application.
- API unit test script
- Not yet mobile responsive
- No JSON Web Tokens (JWTs) yet

- Note: admin user password is simply “password”

### Admin user credentials
<!-- admin user password -->
password: password
<!-- Test user (no white space) -->
username: 6LiI-Dorothy
password: !9Fq
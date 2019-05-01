# Account

## 1 Sing UP 🍐
> POST /account/player  

* Validate input data - Joi
* Create verification code - uuid
* Encrypt password - bcrypt
* Create uuid - uuidv4
* Create User Profile - PlayerModel
* Insert into data base - mongo pool
* Send verification email - Sendgrid

## 2 Activate Account 
> GET /account/acctivate

## 3 Log IN 🍐
> POST /account/login

* Validate input data - Joi
* Check if user exist - mongo query
* Check if account is activated
* Check if password its OK
* Generate Access Token

<br />

---
---

<br />

# Player

## 1 Get player Profile 🍐
> GET /player

## 2 Update player Profile 🍐
> PUT /player

## 3 Update avatar 🍐
> POST /player/avatar

## 4 Update background 🍓
> PATCH /player/background

## 5 Add tags 🍐
> POST/player/tags

## 6 Delete tags 🍐
> DELETE/player/tags

## 7 Job applications status 🍓
> GET/player/job-status

<br />

---
---

<br />


# Team

## 1 Get team Profile 🍐
> GET / team

## 2 Update team Profile 🍐
> PUT /team

## 3 Update avatar 🍐
> POST /team/avatar


<br />

---
---

<br />


# Job

## 1 Create new job 🍐
> POST /job

## 2 Update job 🍓
> PUT /job

## 3 Delete job 🍐
> DELETE /job

## 4 Get applicants 🍐
> GET /job/applicants

## 5 Reject applicants 🍓
> DELETE /job/applicants

## 1 Get job detail🍐
> GET /job

## 2 Apply to job 🍓
> POST /job/apply

<br />

---
---

<br />

# Search

## 1 Search Teams by tag, shortName or Full Name 🍐
> GET /search/teams

## 2 Search Jobs by tag, title, description  🍐
> GET /seach/jobs

## 3 Search Peoble by tag, nick or Full Name 🍐
> GET /seach/people

# VIMI

## Environment

* VIMI_DB_NAME
* VIMI_DB_PASSWORD
* VIMI_DB_USERNAME
* VIMI_SESSION_SCRT
* VIMI_TWILIO_ACCOUNTSID
* VIMI_TWILIO_AUTHTOKEN
* VIMI_PAYMENT_APIKEY
* VIMI_PAYMENT_APISECRET
* VIMI_PAYMENT_REPORTINGTOKEN


## Coding Style Guide

### 0 Understand every single char you write
Be prepared to justify your approach.
In other words, always think about your solutions and why you chose them.
### 1 underscore naming convention for variables
### 2 one line blocks on the same line
```javascript
//good
if (true) console.log("yes")

//bad
if (true)
  console.log("yes")
```
### 3 only use brackets for multi line statements
```javascript
//good
if (true) console.log("yes")

if (true) {
  console.log("yes")
  console.log("no")
}

//bad
if (true) {console.log("yes")}
```
### 4 using anonymous functions
```javascript
//don't use parenthesis if only 1 argument is passed
// good
x => console.log()
// bad
(x) => console.log(x)

//don't use braces if only one statement.
// good
x => console.log(x)
//bad
x => {console.log(x)}
```
### 5 use destructuring when possible
[learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
### 6 [airbnb javascript style guide](https://github.com/airbnb/javascript)

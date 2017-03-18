# vimi
Group food delivery

## Environment

* VIMI_DB_NAME
* VIMI_DB_PASSWORD
* VIMI_DB_USERNAME
* VIMI_SESSION_SCRT

## Coding Style Guide

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
\\good
if (true) console.log("yes")

if (true) {
  console.log("yes")
  console.log("no")
}

\\bad
if (true) {console.log("yes")}
```
### [airbnb javascript style guide](https://github.com/airbnb/javascript)

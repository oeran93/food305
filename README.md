# VIMI

## Environment

* VIMI_DB_NAME
* VIMI_DB_PASSWORD
* VIMI_DB_USERNAME
* VIMI_SESSION_SCRT
* VIMI_TWILIO_ACCOUNTSID
* VIMI_TWILIO_AUTHTOKEN
* VIMI_STRIPE_APIKEY
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_REGION=us-west-2
* DELIVERY_PORT
* DELIVERY_ADMIN_PORT
* TEST_PORT
* CURATOR_PORT


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

## Read-only git workflow
----------------------
### Setup
* Set up a personal GitHub account (Properly secure it with a strong password and 2-factor auth) and let Tyler or Bracken know what the account name is.
* **Windows** local git setup:
  * install Git for Windows ( https://git-scm.com/download/win )
  * Open Git Bash
  * `mkdir ~/.ssh` Make the ssh key folder
  * Follow the Linux/Mac directions
* **Linux/Mac** local git setup:
  * from: https://help.github.com/articles/connecting-to-github-with-ssh/
  * `ssh-keygen -t rsa -b 4096 -C "`_your@email.address_`" -f ~/.ssh/GitHubRsa`
    * Put in a good passphrase or store the file in an encrypted container.
  * ``eval `ssh-agent -s` `` Start the SSH authentication agent (do this after each reboot)
  * `ssh-add ~/.ssh/GitHubRsa` (Also, do this after each reboot)
  * copy the contents of .ssh/GitHubRsa.pub to
    * GitHub -> Account Settings -> SSH and GPG keys -> New SSH Key -> Key
* Go to https://github.com/LessAnnoyingCRM/LessAnnoyingCRM and click _Fork_ (near top right) and select your personal account as the target repository (click your icon).
* Use your git client to checkout git@github.com:<YOUR GITHUB USER NAME>/LessAnnoyingCRM.git
  * `mkdir Documents/lacrm` Create an empty folder for the project.
  * `git clone https://github.com/`_YourUserName_`/LessAnnoyingCRM`
* Add the official repo (not your forked version) as an _upstream remote branch_
  * Command line
    * `git remote add upstream git@github.com:LessAnnoyingCRM/LessAnnoyingCRM.git`
  * or SmartGit/Git Gui
    * Find setting for "Remotes" (Git Gui: Remote -> Add...)
      * Name: `upstream`
      * Location: `git@github.com:LessAnnoyingCRM/LessAnnoyingCRM.git`
* Create a local git branch `master` cloned from `upstream/master`.
  * Note: if there is already a master branch, follow these steps.
    * `git checkout -b TempMaster upstream/master` Create a temporary branch and check it out.
    * `git branch -mf TempMaster master` Overwrite the old master with the clone of upstream.

#### Usage
* _DO NOT WORK IN MASTER_. Instead, use it to keep sync with the real master.
* To do work, create a branch from `master` in your forked repository on GitHub. Usually you'll want to name this branch after the feature you're working on. This is called a "feature branch".
* Pull the branch to your local repository using your git client and start working!
* _Note: Often you'll need to merge `master` into your branch while working or before a pull request. If you have questions on how to do this, feel free to ask._
* Example:
  * __Starting__
  * `git checkout -b CoolNewHomePage master` Make `CoolNewHomePage` from `master` and switch to it.
  * Make your changes on a file, say `example.php`
  * `git stage example.php` Stage your changes for a commit.
  * `git fetch upstream master:master` Get the latest updates.
  * `git merge master` Merge them in to avoid conflicts.
  * `git commit example.php -m 'This commit message is short and useful'`
  * `git push origin CoolNewHomePage` Send the updates to GitHub
  * Now, in GitHub under `https://github.com/`_YourUserName_`/LessAnnoyingCRM`, select Branch: `CoolNewHomePage` and click `New pull request`
  * Put in a decent description like `Updated the company info on the home page`.
  * Create the Pull request.

#### Code review and deployment
* Push your _feature branch_ to GitHub.
* Create a pull request for your feature branch on GitHub. Be sure to notify Tyler that your PR has been opened.
* Once approved, the code will be merged by someone with write-access.
* Push to your _feature branch_ to make any updates to the pull request. Make sure to also leave a comment, otherwise reviewer aren't notified by GitHub.
* Example:
  * __Reviewing__
  * Work with feedback to make appropriate changes.
  * `git stage example.php` Stage your changes for a commit.
  * `git fetch upstream master:master` to keep updated with upstream
  * `git merge master`
  * `git commit example.php -m 'This example commit message is short and useful'`
  * `git push origin CoolNewHomePage` to update the pull request automatically.
  * __Deploying__
  * When the work is merged, you can delete the GitHub branch (link in pull request).
  * `git checkout master` Move back to master to get ready to branch for the next feature
  * `git branch -D CoolNewHomePage` Delete the completed feature branch locally.
  * `git pull` Get the updates from upstream.

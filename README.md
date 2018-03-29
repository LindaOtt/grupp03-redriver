# Red River

[Wiki](https://github.com/jimmybengtsson/grupp03-redriver/wiki) 


## Version control

If you don't have the repository on your local machine:
```
$ git clone https://github.com/jimmybengtsson/grupp03-redriver.git
```

#### 1. Create issue. 

Create an issue based on the requirement to implement. You can also add assignees, labels, projects and milestones. 

![Create issue](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/documentation/img/version-control/1-create-issue.png)

You can add the created issue to Project-page.

![Add issue to project page](https://github.com/jimmybengtsson/grupp03-redriver/blob/master/documentation/img/version-control/2-add-issue-to-project-page.gif)

#### 2. Create new branch

Before creating a new branch, pull the changes from upstream to your local master-branch. Your local master needs to be up to date.
```
$ git pull origin master
```

Create a branch on your local machine,  named after the new issue, and switch to this branch :
```
$ git checkout -b [name_of_your_new_branch]
```

Push the branch to github :
```
$ git push origin [name_of_your_new_branch]
```

You can change working branch by:
```
$ git checkout [name_of_branch]
```

#### 3. Commit and Push

Once your branch has been created, it's time to start making changes. Whenever you add, edit, or delete a file, you're making a commit, and adding them to your branch. This process of adding commits keeps track of your progress as you work on a feature branch.

When you want to commit something, make sure to be in the correct branch. Not in master-branch! You can see all branches by using :
```
$ git branch
```
Add to Git and Commit as normal but use this command when pushing to Github:
```
$ git push origin [name_of_your_branch]
```

#### 4. Pull request

When you’re finished implementing your branch, create a pull request in repository on Github.


You can add the keyword Fixes and number of the issue to automatically close the issue after merge.

After the branch has been reviewed and everything seems ok, you can merge your created branch with the master branch.

#### 5. Delete branch

If you whant to delete the branch after merge, make shure to do it both on your local machine and on Github.

Local machine:
```
$ git branch -d [name_of_branch]
```

Github:
```
$ git push origin :[name_of_branch]
```


#### 6. Read more about:

[Github flow](https://guides.github.com/introduction/flow/)  
[Create and delete branches](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)  
[Pull request](https://help.github.com/articles/about-pull-requests/)  
[Merge](https://help.github.com/articles/merging-a-pull-request/)  

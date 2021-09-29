# 340database[CS340 Project Guide_ INTRODUCTION TO DATABASES (CS_340_400_F2021).pdf](https://github.com/jtoallen/340database/files/7252134/CS340.Project.Guide_.INTRODUCTION.TO.DATABASES.CS_340_400_F2021.pdf)

CS340 Project Guide
Project Goals

Implement all the database-related skills that you learn in this course as well as CS290.
Understand how to transform an idea into a database.
Learn how to develop a web-based UI for your database for providing Create-Read-Update-Delete (CRUD) functionalities (Links to an external site.).
Learn to work in Steps towards a bigger goal.
 

Specifications
The CS340 Project that you will submit at the end of this course should satisfy all these specifications:

Your database should be pre-populated with sample data. At least three rows per table is expected. The sample data should illustrate a table's functionality, e.g. if the table is part of a many-to-many relationship, the sample data should depict M:M.
Your database should have at least 4 entities and at least 4 relationships, one of which must be a many-to-many relationship.  The entities and relationships should implement the operational requirements of your project.
You are creating a web interface for data tables, so the primary user is the administrator of this database.
 It is NOT a customer facing website; thus there is no need for login page; sessions; register/password; shopping cart; check-out; etc.  While having those pages would be helpful in many customer facing applications, the purpose of this project is to provide a UI for your tables. 
Put another way, if you had 4 entities that were implemented as 5 tables in a database, then we expect roughly 5 web app pages as a front end for each of the 5 tables in your database.
The one exception is oftentimes it works better for the end-user to have a single web page for a Many-to-Many relationship between 2 tables (so the user doesn't have to view two pages to complete a transaction in both tables). So in that case if you had 4 entities that were implemented as 5 tables, with 1 many-to-many relationship between 2 of those tables, and the 2 tables in that m:m were managed on a single web page, then we expect 4 web pages in the project. 
Some students may chose to add a home page to their project, which is acceptable but not required. To continue the example from the previous item, adding a home page would be a 5th page in the project. 
It should be possible to INSERT entries into every table individually.
Every table should be used in at least one SELECT query. For the SELECT queries, it is fine to just display the content of the tables, but your website needs to also have the ability to search using text or filter using a dynamically populated list of properties. This search/filter functionality should be present for at least one entity. It is generally not appropriate to have only a single query that joins all tables and displays them.
You need to include one DELETE and one UPDATE function in your website, for any one of the entities. In addition, it should be possible to add and remove things from at least one many-to-many relationship and it should be possible to add things to all relationships. This means you need INSERT functionality for all relationships as well as entities. And DELETE for at least one many-to-many relationship.
In a one-to-many relationship (like bsg_people to bsg_planets), you should be able to set the foreign key value to NULL (such as on a person in bsg_people), that removes the relationship. In case none of the one-to-many relationships in your database has partial participation, you would need to change that to make sure they can have NULL values.
In a many-to-many relationship, to remove a relationship one would need to delete a row from a table. That would be the case with bsg_people and bsg_certifications. One should be able to add and remove certifications for a person without deleting either bsg_people rows or bsg_certification rows. If you implement DELETE functionality on at least (1) many-to-many relationship table, such that the rows in the relevant entity tables are not impacted, that is sufficient.
 

General Rules and Grading
Can be developed using any technology platform which serves content over the web.
Should use MySQL/MariaDB as the database back end.
You should write all the queries and not depend on an ORM or similar mechanism to generate any queries.
You can host it anywhere as long as it is accessible to the graders.
Apart from Step 0 (see table below), you are required to work on the Project Steps in a Project Group of two students. By the end of Week 1, you are required to submit the names of your team members. It’s recommended that you have a set weekly meeting time to check on the progress and also use tools like version control to keep in sync. You can change groups at most 1 time through the quarter, and then only if you find someone else ready to swap groups.
Please note that the CS340 database created for you will be deleted from the server at the end of the term.
You will be working on this project over several weeks, earning points for each step completed. The distribution of points for each step is shown in this table:


Project Step

Description

Points for Draft Version

Group Review

Points for Final Version

Total Points

0

Connect webapp to database

NA

NA

2

2

1

Proposal and outline

NA

NA

3

3

2

Design ERD & Schema

2

Yes

3

5

3

Design HTML interface

2

Yes

3

5

4

DML + DDL Queries

2

Yes

3

5

5

Implement CREATE + READ operations 

2

Yes

NA

2

6

Implement UPDATE + DELETE operations

2

Yes

NA

2

7

Submit final completed project

NA

NA

16

16

TOTAL

10

 

30

40

 

Project Steps
Starting from Step 1, you will submit a PDF file along with other required deliverables for each Step. The PDF (and other deliverables) should be modified based on the feedback you received in the previous Step.

This PDF file is a version log of your work on the Project which would include:

Feedback that you received from your peers and grader in previous Step.
Changes that you decided to make to your Project based on the feedback.
Reasons why you decided not act on the feedback.
Thus, it’s a living document where you would have this information in reverse chronological order (previous Step first) on top. With completion of each Step, the document should still make sense as a whole. I recommend using a Google Doc or Box doc to collaborate on this document with your teammate.

 

How to work on the 8 Project Steps
Step 1:
You work to connect a web-based interface to the CS340 database that has been created for you. You can choose to use the NodeJS or Python content created for you or use any technology as long as it satisfies the criteria listed above.

You also submit a PDF describing your Project and the Database you intend to create.

 

Steps 2 & 3
For Steps 2, 3 ,and 4 there are THREE submissions each:

a. Draft version
This is due early and you will earn points for simply turning in the work. You submit this on Ed Discussion as a follow-up to a post that the instructors will create for each step requiring a draft.

b. Review
If you turn in the Draft version, you will get a chance to earn points by reviewing your peers' work . The  review process will mean that you get reviewed by peers and you review multiple submissions. This gets you points for participation and helps you learn from others.

c. Final version
This will be graded by the TAs based on the rubric for validity.

Example case:

You work on Step 2 Draft with your Project Group and post it in Ed Discussion.
You get a review telling you that one of your entities does not make sense and that the data type for one of your attributes is wrong.
You include this review in your Step 2 Final version submission. You justify the entity but decide to act on the feedback about the wrong data type.
You also change the data type in the Outline that you are submitting for Final version.
You get feedback from the grader that another attribute that you have should have a different data type.
You fix (or don’t fix and mention the reason) the data type in your Outline when turning in Step 2. Thus for Step 2, not only does your ERD and Schema reflect this change in Project, but you also change your Database Outline.
 

Step 4 
For Steps 4, 5, and 6 there are only TWO submissions:

a. Draft version

You get points simply for posting a Draft version.

b. Reviews

For every project step draft, there will be a post in Ed Discussion (created by the instructors) where groups can post links to their drafts.

If you turn in the Draft version, you will get a chance to earn points by reviewing other groups' drafts. Find any two drafts and post your suggestions and comments as a reply. The graders will read your reviews and give you points accordingly. This counts toward your participation grade.

 

Step 7
For Step 7, you turn in a completely working website URL and the accompanying PDF as described above. You will be graded by the graders and get points based on the rubric.

 

Groups
Project Group
This is the group you work in to create the CS340 Project. You decide whom you want to team up to work on the Project by the end of Week 1 and submit on Canvas. A Project Group can have maximum 2 students*. Both members will get equal points for every Steps' Final Version but the points for Draft and Reviews will be based on individual participation.

If you don't choose a team mate, you will be assigned randomly with another student who doesn't have a team mate.

You can change your group only once through the term and to change you need to find another student willing to swap. To swap, email the instructor while copying team mates from both groups.

If your group member drops the class, contact the instructor and we will help you find a new group.

*Exceptions will be made in special circumstances. 

Frequently asked Questions
Q. How do I work on the Project? I don't understand/know HTML/ERD/Schema/this spec about M-to-M relationship updating/other such specs.

A.My advice is to keep an eye on the bigger picture but work on one Step at a time. The reason we implement the Project in multiple steps in this class is so that it's easy to take on this mammoth one step at a time. Don't worry about web development until you get to that week since your project is going to evolve with each step, reviews and feedback that you receive from your peers as well as graders. As your project evolves and we progress further in the class, many of the specs and how to implement something in your project will become clearer.

Q. I have a question about the specs for this Step...what do I do ?

A. Ask in office hours/Ed Discussion , describing the relevant details of your Project so that we can help you. Implementations are hard to describe in generic manner and it always helps to talk in terms of examples.

Q. How should my final website look like ?

A. The looks don't matter much for the Project. I would advise worrying about the design of your database and your queries right now and take care of the the HTML in the later weeks.

Q. Can I use X technology and Y framework to build the website for my CS340 Project?

A. Yes, you can use any technology and any framework to build your web app for the project in this class as long as you write all the queries yourself and do not use anything like an ORM to interact with your database. For example, Django defaults to using ORM for database layer, so you might want to avoid using that unless you can figure out a way to around it.

The class will officially host content on NodeJS as well as a bit of Python and also provide sample code that you can build upon but I am happy to help with Python, PHP as well as Ruby. But do not completely rely on the TAs or me to debug your code or figure out a way to do something with any technology. It's your choice of technology and your job to figure out how to do things using it! :)

Q. I am getting my data from a live source (e.g. a web API). Do I still need to provide CREATE functionality?

A. No, however there should be at least two tables in your database that offer CREATE functionality. If at most two of your tables don't have it because the data is coming from a web API then that's OK as long as the other tables do. 


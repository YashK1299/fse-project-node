**CS 5500 Foundations of Software Engineering** Project Plan

Team 47

Members:

- Yash Kothari
- Ankur Yadav
- Praguna Singh
- Tarun Vishal

**Problem Statement:**

Our Tuiter program currently does not have a page where users may view trending and popular tuits customized to their preferences, as well as see what subjects and hashtags are being discussed. For a better overall user experience, creating a separate page where the user may inspect this would be sensible. We also propose that the Bookmark screen be implemented, where the user can see all of the tutorials that have been bookmarked.

A separate explore page will allow users to go deeper into themes of interest and current events, as well as explore the tools and content associated with those topics. All of the topics discussed by Tuiter users can be displayed on the screen. They don't have to follow other people to see what other users are saying about particular topics.

A Bookmarks screen will be necessary for a better viewing experience of all the tutorials that the user needs to save for later reference and can revisit at their leisure. It can also assist users in tracking statistics related to specific tuits, such as their likes, re-tuits, and shares, for data analysis related to either user preference or a topic of their choice.

**User Stories:**

|**Epic**|**User Story**|**Acceptance Criteria**|
| - | - | - |
|As a Tuiter User, I need to access the Explore Page after logging into my account so that I could browse my tuits with topics of interest.|1. As a Tuiter user, I need to see various tuits with topics of interest that all the other Tuiter users are posting about.|<p>Ensure Tuiter user is able to:</p><p>- Login to Tuiter Account</p><p>- Navigate to Explore Page</p><p>- Able to see various tuits with topics of interest that all the other Tuiter users are posting about</p>|
||2. As a Tuiter user, I need to select a topic under which I will be able to see various people’s opinion on it even if I do not follow them.|<p>Ensure Tuiter user is able to:</p><p>- Login to Tuiter Account</p><p>- Able to select a topic and switch to a different one when required</p><p>- Able to see related tuits by other users in the topic selected</p>|

||3. As a Tuiter user, I need to select a topic of the tuit I am viewing and be able to view other tuits witha a similar topic|<p>Ensure Tuiter user is able to:</p><p>- Login to Tuiter Account</p><p>- Able to select a topic of a tuit and switch to the new topic when required</p><p>- Able to see related tuits by other users in the topic selected</p>|
| :- | :- | - |
|In order to view the tuits that I could at a particular point in time, I can access my Bookmarks and revisit all the saved feed, and that too at my convenience.|4. A Tuiter user can save other tuits for a reference later and can revisit it at their convenience.|<p>Ensure Tuiter user is able to:</p><p>- Login to Tuiter Account</p><p>- Navigate to Home or Explore Page</p><p>- Able to bookmark a particular tuit</p>|
||5. A Tuiter user can track statistics related to certain tuits for example their likes, retuits, shares for data analysis related to either user preference or a topic of user’s choice.|<p>Ensure Tuiter user is able to:</p><p>- Login to Tuiter Account</p><p>- Able to view bookmarked tuits at any time</p><p>- Able to view statistics related to certain tuits</p>|
||6. A Tuiter user can unsave a tuit from his list of bookmarked tuits and can remove it from his list of favorite tuits, or tuits he would like to revisit later.|<p>Ensure Tuiter user is able to:</p><p>- Login to Tuiter Account</p><p>- Navigate to Home or Explore Page</p><p>- Able to unbookmark a particular tuit</p>|


**High-Level Architecture:**

![](./HighLevel%20Diagram.jpeg)

In our system, the user will be interacting with the application via a user interface. Apart from the already implemented components, UI will include components/screen for ‘User Login/Register’, Bookmarks and Explore. To fetch/manipulate data UI we will make HTTP calls to the backend. Each of these calls is routed through an Authentication Middleware which checks if the user making the HTTP call has proper authorization. Once authenticated, the call reaches the controllers- Users, Bookmarks, TopicTuits. Each of these controllers will include separate HTTP endpoints for each HTTP method. These controllers call specific DAO methods that interact with the database to fetch/manipulate the data.

**Work Breakdown and Schedule:** 

### Initial Sprint Splits:

Sprint 1: 1st April - 14 April Sprint 2: 15 April - 29 April

| S.No | Task | User Story | Task Type | Sprint | Dependencies | Member Assigned |
| --- | --- | --- | --- | --- | --- | :--- |
|1|Creating project plan with User story and project plans|-|Documentation|1|None|Yash Ankur Praguna Tarun|
|2|React component for User login/registration|All|Implementation|1|None|Yash|
|3|React component to show topic-specific tuits list|1|Implementation|1|None|Tarun|
|4|React component for Topic tabs|2|Implementation|1|3|Tarun|
|5|React component for container topic tabs|3|Implementation|1|4|Tarun|
|6|Testing of UI component for topic-specific tuits with mock data|1|Testing|1|3,4,5|Tarun|
|7|Testing component for user login and registration with mock data|All|Testing|1|2|Yash|
|8|Implement endpoint for topic creation, deletion|1|Implementation|1|None|Ankur|
|9|Implement endpoint for filtering tuits for a specific topic|1|Implementation|1|None|Ankur|
|10|Testing endpoint for topic deletion and creation|1|Testing|1|8|Ankur|
|11|Testing endpoint for filtering tuits for a specific topic|1|Testing|1|9|Ankur|
|12|React component changes for bookmarking tuits in existing components|4|Implementation|1|None|Yash|
|13|Testing UI for bookmarking tuits with mock data|4|Testing|1|12|Yash|
|14|React component to view bookmarked tuits|5|Implementation|1|None|Praguna|
|15|Testing component to view bookmarked tuits using mock data|5|Testing|2|14|Praguna|
|16|Implement endpoint for creating, deleting a bookmark|5|Implementation|1|None|Praguna|
|17|Testing endpoint for creating, deleting bookmark|5|Testing|2|16|Praguna|
|18|Implement endpoint for login, registering user|All|Implementation|2|None|Yash|
|19|Connecting login frontend with backend API|All|Implementation|2|2,18|Yash|
|20|Testing user login and registration flow|All|Testing|2|19|Yash|
|21|Connecting UI for topic-specific tuits with backend API|1|Implementation|2|4,8|Tarun, Ankur|
|22|Testing user flow for explore screen|1|Testing|2|21|Tarun, Ankur|
|23|Connecting UI for bookmarking tuits with backend API|4|Implementation|2|14, 16|Praguna|
|24|Testing user flow for bookmarking tuits|4|Testing|2|23|Praguna|

### Final Sprints:
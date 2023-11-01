
## Date of Submission

  

Submission Date: [Insert Submission Date]

  

## Instructions to Run Assignment Locally

  

To run this Realtime Chat application locally, follow the steps below:

  

1. Clone this repository to your local machine.

  

```bash

git clone https://github.com/senayudha97/vouch-realtime-chat.git

```

  

2. Navigate to the project's root directory.

```bash

cd vouch-realtime-chat

```

  

3. Start the application using Docker Compose.

```bash

docker-compose up -d

```

4. The Realtime Chat application should now be accessible at http://localhost:5173.

  

## Time Spent

The time spent on this assignment was approximately 10 hours.

  

## Assumptions Made

- Users are able to create and join rooms.

- Users are able to send and receive messages.

  

## Shortcuts/Compromises made:

- The application does not currently implement any security measures.
- Not implementing database caching

  

## Assume your application will go into production

  

- #### Testing: To ensure that the application is ready for production, I would perform the following tests:
	- Unit tests: To test individual components of the application.
	-   Integration tests: To test how the different components of the application work together.
- #### How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?
	 To ensure a smooth user experience for 1000s of simultaneous users, I would use a load balancer to distribute traffic across multiple servers. I would also use a caching mechanism to reduce the number of database queries.
- ### What key steps would you take to ensure application security?
	- Input validation: To prevent users from entering malicious code into the application.
	- Session management: To prevent unauthorized users from accessing the application.
	- Database encryption: To protect user data from unauthorized access.
## What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
- Private messaging between users.
-  Notification system for new messages.
-   User status (online/offline) indicators.
## Other Information About Your Submission
The Realtime Chat application is designed to provide a basic chat experience. Further enhancements, testing, and security measures should be considered for a production-ready application.
## Your Feedback on This Technical Challenge
I thought this technical challenge was well-designed and challenging. I enjoyed working on it and I learned a lot.

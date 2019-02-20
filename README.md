# SpectVR

### Team Members

 - Charles Ruan
 - Helaina Love
 - Romina Saravi

### What is it

SpectVR is an online concert viewing website, where people will be able to purchase and watch concerts happening anywhere through VR. The viewer will purchase a VR ticket for the concert of their liking. Once the concert date comes the concert will be available to watch from their account. The video will be available for 24 hrs this will take care of any scheduling and timezone issues. In addition will give the opportunity to those fans that have already been to the concert to relive the experience. With VR they are able to live the full more realistic experience, with a great seat in the venue. Concert creators will be able to schedule, post and upload their concert onto the website which then would be available to purchase by viewers. Viewers will also be able to browse and see recommend upcoming concerts.

### Beta Features

- View VR videos in browser from server
- Restrict access based on timing and purchases
- "Purchase" tickets for content to be able to view, consequently must have a way to browse/search videos 
- Time restricted videos 
- Account creation/management/updating for viewrs and creators having a creator key
- Uploading videos by creators, include sections for titles/timing/description

### Additional Final Features

- Option to post what you're viewing to social media
- Process Payments with Stripe
- "Featured" section with video recommendations

### Technologies
- Node.js as our framework
- HTML5 for content displaying
- CSS for styling of content 
- React for UI/frontend development
- React-vr-player for specifically viewing VR content
- Express for server/backend development
- MongoDB for database management
- Stripe for payment processing

### Technical Challenges

- Rendering VR videos requires some investigation, not simple implementation like regular videos
- Working with MongoDB poses some challenges, such as starting the database seperately from the server
- Multiple account types with their own UI's and functionality
- Payment processing is something to learn, possible security concerns
- Restricting content access based on timing, purchase, limits

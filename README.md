## Project: Shopify CustomPayd App

### Overview

This project is a custom Shopify app with an admin interface and client-side checkout extension using Shopify’s App Bridge, Admin API, and UI Extensions. The app serves as a **custom payment solution** that enables store owners to generate personalized payment links via Payd Restful APIs, making it easier for clients to transact directly on the Shopify platform. By integrating both an admin interface and a client-facing checkout extension, the app showcases how to seamlessly bridge functionality between the store admin and the end customer.

### Key Features

1. **Admin Interface for API Credentials Setup**  
   The app includes an admin dashboard where store owners can configure API credentials required for payment processing. This setup is only accessible to administrators and securely stores credentials in the app’s backend, ensuring that sensitive information remains protected.

2. **Callback Viewing**  
   Admins can access a history of generated links along with their associated callbacks. This functionality provides a convenient way for admins to track payments and confirm payment status without leaving the Shopify admin.

3. **Client-Facing Checkout Extension**  
   The app includes a custom checkout extension that customers can use to generate their own payment link directly at checkout. This link is configured with customer details and specific order information, allowing for a personalized and secure payment experience.

### Technical Details

- **Frontend**  
  - Remix Framework: Used for server-side rendering and routing, ensuring a responsive, scalable interface.
  - Shopify Polaris and App Bridge: Provides a seamless Shopify admin experience, with intuitive UI components and deep Shopify store integration.
  - Checkout UI Extensions: Enables custom interactions on the client’s checkout page, allowing customers to generate payment links at checkout.
  - Provides a dynamic form at checkout that retrieves order details, allowing customers to generate a unique payment link.

- **Backend**  
  - Prisma ORM: Used to securely store and manage API credentials, link generation data, and callback information in a database.
  - GraphQL and REST APIs: Enables flexibility in data retrieval for both complex queries and simpler, RESTful actions.
  - API Security: All API requests are secured through Shopify App Bridge authentication, ensuring that only authorized users can access sensitive operations.
  - Handles callback tracking and displays the links created for admin review.

### Usage Instructions

1. **Admin Setup**  
   Upon installing the app, the admin will be prompted to set up API credentials required for payment processing. Admins can:
   - Enter their API username, password, and wallet details.
   - Generate CustomPayd payment links and view generated links with associated callbacks.

2. **Customer Experience**  
   - At checkout, the app provides customers with a button to generate a payment link.
   - Customers can follow the generated link to complete the transaction, with the callback providing payment confirmation.

### Technologies Used

- **Shopify API and App Bridge** for integration with Shopify stores.
- **Shopify UI Extensions** to build a custom, embedded client experience in the Shopify checkout.
- **Node.js & Express** for server-side credential storage and API handling.
- **React** for building a dynamic admin interface and extension component.

### Setup and Installation

1. Clone this repository.
2. Install the dependencies with `npm install`.
3. Start the backend server with `npm start`.
4. Configure your Shopify app settings in the Shopify Partner Dashboard, setting up the URL to direct to this app.
5. Install the app on a test Shopify store, where you can access the admin interface and the client extension.

### Security Notes

This app ensures that API credentials are stored securely on the server and are not exposed to the client side. Only authorized admins can view and update these credentials.

### Future Improvements

- **Customizable Payment Links**: Allow admins to set custom payment conditions or templates for payment link generation.
- **Extended Callback Functionality**: Improve the callback system for more detailed reporting.

---

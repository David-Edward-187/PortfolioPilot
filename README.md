
# PortfolioPilot

This is a Next.js project bootstrapped with `create-next-app`, designed as a modern developer portfolio with AI-powered resume assistance.

## Getting Started

First, ensure you have Node.js (version 18 or later recommended) and npm/yarn installed.

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Environment Variables

Create a `.env.local` file in the root of the project. This file is crucial for storing sensitive information like API keys. Copy the contents of `.env` (if it exists and has a template) or create it from scratch.

**For the contact form to send emails, you MUST configure the following variables:**

```
# .env.local

# Resend API Key
# 1. Sign up at https://resend.com
# 2. Create an API Key in your Resend dashboard.
# 3. Paste the API key here.
RESEND_API_KEY=your_resend_api_key_here

# Contact Form Recipient Email
# This is the email address where you want to receive messages from the contact form.
CONTACT_FORM_RECIPIENT_EMAIL=your_personal_email@example.com

# (Optional but Recommended for Production) Resend Verified Domain
# For sending emails from your own domain (e.g., contact@yourdomain.com),
# you need to verify your domain in Resend.
# See: https://resend.com/docs/authentication/domains
# If you don't have a verified domain, Resend might use a default sender like onboarding@resend.dev.
# The `from` address in `src/app/actions/contact-form-actions.ts` is initially set to onboarding@resend.dev.
# Update it if you use a verified domain.
```

Refer to the `.env` file for a template if one is provided.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies (this includes `resend` for email functionality):
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

To run the Next.js development server:

```bash
npm run dev
# or
yarn dev
```

This will start the development server, typically on [http://localhost:9002](http://localhost:9002). The port is configured in `package.json`.

**Important for Contact Form:** Ensure your `.env.local` file is correctly set up with `RESEND_API_KEY` and `CONTACT_FORM_RECIPIENT_EMAIL` for the contact form to send emails.

### Running Genkit Development Server

If your project uses Genkit for AI functionalities, you can run the Genkit development server. This usually runs alongside your Next.js dev server.

To start Genkit in development mode (rebuilds on file changes):

```bash
npm run genkit:watch
# or
yarn genkit:watch
```

Alternatively, to start it once:
```bash
npm run genkit:dev
# or
yarn genkit:dev
```

The Genkit development UI will typically be available on [http://localhost:4000](http://localhost:4000).

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This command creates an optimized production build in the `.next` folder.

## Starting the Production Server

After building, you can start the production server:

```bash
npm run start
# or
yarn start
```

## Linting and Type Checking

To lint the codebase:

```bash
npm run lint
# or
yarn lint
```

To perform a TypeScript type check:

```bash
npm run typecheck
# or
yarn typecheck
```

## Project Structure

- **`src/app`**: Contains the main application routes using the Next.js App Router.
  - **`src/app/actions`**: Server Actions for form submissions and data mutations.
- **`src/components`**: Reusable UI components.
  - **`src/components/ui`**: ShadCN UI components.
- **`src/ai`**: Genkit related code, including flows and prompts.
  - **`src/ai/flows`**: Genkit flows for AI functionalities.
- **`src/data`**: Static data files, like `resume.json`.
- **`src/hooks`**: Custom React hooks.
- **`src/lib`**: Utility functions and shared libraries.
- **`src/types`**: TypeScript type definitions.
- **`public`**: Static assets that are served directly.

## Key Technologies

- **Next.js 15**: React framework for server-side rendering and static site generation.
- **TypeScript**: Superset of JavaScript for type safety.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ShadCN UI**: Reusable UI components built with Radix UI and Tailwind CSS.
- **Genkit**: Toolkit for building AI-powered features.
- **React Hook Form & Zod**: For form handling and validation.
- **Resend**: Email sending service.
- **Lucide React**: Icon library.

## Contact Form Setup (Resend)

The contact form uses Resend to send emails. To make it work:

1.  **Install Resend**: This is already included in `package.json` and will be installed with `npm install` or `yarn install`.
    ```bash
    npm install resend
    # or
    yarn add resend
    ```
2.  **Sign up for Resend**: Go to [resend.com](https://resend.com) and create an account.
3.  **Create an API Key**: In your Resend dashboard, navigate to API Keys and create a new API key.
4.  **Set Environment Variables**:
    *   Create a `.env.local` file in the root of your project (if it doesn't exist).
    *   Add your Resend API key:
        ```
        RESEND_API_KEY=your_actual_api_key_from_resend
        ```
    *   Add the email address where you want to receive contact form submissions:
        ```
        CONTACT_FORM_RECIPIENT_EMAIL=your_email_address@example.com
        ```
5.  **(Recommended for Production) Verify Your Domain**:
    *   To send emails from your own domain (e.g., `contact@yourdomain.com`) and improve deliverability, you need to verify your domain with Resend. Follow their documentation: [Resend Domain Verification](https://resend.com/docs/authentication/domains).
    *   After verifying your domain, update the `from` email address in `src/app/actions/contact-form-actions.ts` to use an email from your verified domain. For testing without a verified domain, Resend allows sending from `onboarding@resend.dev`, which is the current default in the code.

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or Firebase Hosting. Ensure your build process and environment variables (especially `RESEND_API_KEY` and `CONTACT_FORM_RECIPIENT_EMAIL`) are configured correctly on your chosen platform.

## Customization

- **Theme**: Modify `src/app/globals.css` to adjust the color palette and base styles. The theme uses HSL CSS variables.
- **Resume Data**: Update `src/data/resume.json` to personalize the portfolio content.
- **Components**: Customize or add new components in the `src/components` directory.
- **AI Features**: Extend or modify AI functionalities in the `src/ai` directory using Genkit.
```
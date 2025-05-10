
# PortfolioPilot: How to Use This Application

This guide provides detailed instructions on how to set up, run, customize, and understand the PortfolioPilot application.

## 1. Introduction

PortfolioPilot is a modern developer portfolio built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI components. It allows developers to showcase their skills, experience, projects, and provide a way for potential employers or collaborators to get in touch via a contact form.

## 2. Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js**: Version 18.x or later is recommended. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm** (Node Package Manager) or **yarn**: These package managers come bundled with Node.js or can be installed separately.

## 3. Environment Setup

Proper environment setup is crucial, especially for features like the contact form.

### 3.1. Create `.env.local` File

This file stores sensitive information and local configuration.

1.  In the root directory of the project, create a new file named `.env.local`.
2.  Copy the contents of the `.env` file (if it exists as a template) into `.env.local`, or create it from scratch.

### 3.2. Configure Environment Variables

The following variables **must** be set in your `.env.local` file for the contact form to function:

```env
# .env.local

# Resend API Key
# 1. Sign up for a free account at https://resend.com
# 2. Navigate to the API Keys section in your Resend dashboard.
# 3. Create a new API Key.
# 4. Copy the generated API key and paste it here.
RESEND_API_KEY=your_resend_api_key_here

# Contact Form Recipient Email
# This is the email address where you want to receive messages
# submitted through the contact form on your portfolio.
CONTACT_FORM_RECIPIENT_EMAIL=your_personal_email@example.com

# (Optional but Recommended for Production) Resend Verified Domain Email Sender
# To send emails from your own domain (e.g., contact@yourdomain.com)
# and improve deliverability, you need to:
# 1. Verify your domain in Resend (see: https://resend.com/docs/authentication/domains).
# 2. Update the `from` email address in `src/app/actions/contact-form-actions.ts`
#    (currently defaults to 'PortfolioPilot Contact Form <onboarding@resend.dev>').
# If you don't set this up, emails will be sent from onboarding@resend.dev by default.
```

**Important Notes on Resend:**
*   For testing without a verified domain, Resend allows sending emails from `onboarding@resend.dev`. The application is pre-configured to use this as the sender.
*   For production, it's highly recommended to verify your domain with Resend and update the `from` address in `src/app/actions/contact-form-actions.ts` to an email address associated with your verified domain (e.g., `noreply@yourdomain.com` or `contact@yourdomain.com`).

## 4. Installation

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd portfolio-pilot # Or your project directory name
    ```

2.  **Install Dependencies:**
    Open your terminal in the project directory and run:
    ```bash
    npm install
    ```
    or, if you use yarn:
    ```bash
    yarn install
    ```
    This command installs all necessary packages defined in `package.json`, including Next.js, React, Tailwind CSS, ShadCN UI components, Resend, and other utilities.

## 5. Running the Application

### 5.1. Development Server

To start the Next.js development server:

```bash
npm run dev
```
or
```bash
yarn dev
```

This will typically start the application on [http://localhost:9002](http://localhost:9002) (the port is configured in `package.json`). The development server supports hot reloading, so changes you make to the code will be reflected in the browser automatically.

**Ensure your `.env.local` file is correctly configured before running the development server if you intend to test the contact form.**

## 6. Building and Starting for Production

### 6.1. Build the Application

To create an optimized production build:

```bash
npm run build
```
or
```bash
yarn build
```
This command compiles your Next.js application and outputs the production-ready files into the `.next` directory.

### 6.2. Start the Production Server

After a successful build, start the production server:

```bash
npm run start
```
or
```bash
yarn start
```
This will serve the optimized application, typically on the same port as development (e.g., `http://localhost:9002`, unless configured differently for production).

## 7. Project Structure

Understanding the project structure will help you navigate and customize the application:

-   **`public/`**: Static assets like images, fonts (if not using `next/font`), and `mycv.pdf` (your resume PDF).
-   **`src/`**: Main source code for the application.
    -   **`app/`**: Next.js App Router directory.
        -   **`(pages)/`**: Contains main page routes (e.g., `page.tsx` for the homepage).
        -   **`actions/`**: Server Actions, such as `contact-form-actions.ts` for handling contact form submissions.
        -   **`globals.css`**: Global stylesheets, including Tailwind CSS setup and ShadCN UI theme variables.
        -   **`layout.tsx`**: The root layout for the application.
    -   **`components/`**: Reusable React components.
        -   **`ui/`**: ShadCN UI components (e.g., Button, Card, Input).
        -   **`contact-form.tsx`**: The client-side contact form component.
        -   **`navbar.tsx`**: The application's navigation bar.
        -   **`profile-section.tsx`**: Component to display the profile information.
        -   **`resume-section.tsx`**: Component to display resume details (experience, education, skills, projects).
        -   **`theme-provider.tsx`**: Manages light/dark theme switching.
        -   **`theme-toggle.tsx`**: UI element for changing the theme.
    -   **`data/`**: Static data files.
        -   **`resume.ts`**: TypeScript file containing all your resume information. This is the primary file to edit for portfolio content.
    -   **`hooks/`**: Custom React hooks.
        -   **`use-mobile.tsx`**: Hook to detect if the application is being viewed on a mobile device.
        -   **`use-toast.ts`**: Hook for displaying toast notifications.
    -   **`lib/`**: Utility functions and library configurations.
        -   **`utils.ts`**: General utility functions (e.g., `cn` for class names).
        -   **`actions.ts`**: Can be used for general server actions.
    -   **`types/`**: TypeScript type definitions.
        -   **`resume.ts`**: Defines the structure for `ResumeData`.
-   **`components.json`**: ShadCN UI configuration file.
-   **`next.config.ts`**: Next.js configuration file.
-   **`package.json`**: Lists project dependencies and scripts.
-   **`tailwind.config.ts`**: Tailwind CSS configuration.
-   **`tsconfig.json`**: TypeScript configuration.

## 8. Key Features & How They Work

### 8.1. Portfolio Display

-   **Data Source**: All portfolio content (name, title, bio, experience, education, skills, projects) is sourced from `src/data/resume.ts`.
-   **Rendering**:
    -   The main page (`src/app/page.tsx`) imports `resumeData` from `src/data/resume.ts`.
    -   This data is then passed as props to specialized components:
        -   `ProfileSection` (`src/components/profile-section.tsx`): Displays your name, title, bio, headshot, and contact links.
        -   `ResumeSection` (`src/components/resume-section.tsx`): Displays detailed sections for experience, education, skills, and projects.
-   **Resume PDF**: The "Download CV" button in `ResumeSection` links to `/mycv.pdf`. Place your actual resume PDF in the `public/` directory and name it `mycv.pdf`, or update the link accordingly.

### 8.2. Contact Form

The contact form allows visitors to send you messages directly.

-   **Client-Side (`src/components/contact-form.tsx`):**
    -   Uses `react-hook-form` for form state management and validation.
    -   Uses `zod` for schema-based validation of form fields (name, email, subject, message) on the client side.
    -   On submission, it calls the `sendContactEmail` server action.
    -   Displays loading states and feedback (success/error messages) using `useToast`.

-   **Server-Side (`src/app/actions/contact-form-actions.ts`):**
    -   This is a Next.js Server Action.
    -   It re-validates the received form data using the same `zod` schema for security.
    -   It retrieves `RESEND_API_KEY` and `CONTACT_FORM_RECIPIENT_EMAIL` from environment variables.
    -   It initializes the `Resend` client with your API key.
    -   It constructs and sends an email using `resend.emails.send()`. The email content is formatted HTML.
        -   **Sender**: By default, `PortfolioPilot Contact Form <onboarding@resend.dev>`. Change this in the action file if using a verified domain.
        -   **Recipient**: The email address specified in `CONTACT_FORM_RECIPIENT_EMAIL`.
        -   **Reply-To**: Set to the visitor's email address from the form.
    -   Returns a success or error status to the client.

**Troubleshooting Contact Form:**
*   **Not receiving emails?**
    1.  Double-check `RESEND_API_KEY` in `.env.local`. Is it correct and active?
    2.  Double-check `CONTACT_FORM_RECIPIENT_EMAIL` in `.env.local`. Is it your correct email address?
    3.  Check your Resend dashboard for any sending errors or logs.
    4.  Check your spam/junk folder in the recipient email account.
    5.  Ensure the Next.js server (dev or prod) has access to the environment variables (restart the server after changing `.env.local`).

### 8.3. Theme Toggle (Light/Dark/System)

-   **Provider (`src/components/theme-provider.tsx`):** Uses `next-themes` library to manage theme state.
-   **Toggle UI (`src/components/theme-toggle.tsx`):** Provides a dropdown menu to switch between "Light", "Dark", and "System" themes.
-   **Styling (`src/app/globals.css`):** Contains CSS variables for both light and dark themes. These variables are used by Tailwind CSS and ShadCN UI components.

## 9. Customization

### 9.1. Portfolio Content (Most Important)

-   **Edit `src/data/resume.ts`**: This is the central place for all your personal and professional information. Update the `resumeData` object with your details:
    -   `name`, `title`, `bio`, `headshotUrl` (use a direct link to an image or place an image in `public/` and use a relative path like `/images/my-headshot.jpg`).
    -   `contact`: Your email, LinkedIn, and GitHub profile URLs.
    -   `education`: Your educational background.
    -   `experience`: Your work experience. Ensure descriptions are concise bullet points.
    -   `skills`: Categorize your skills (e.g., "Languages", "Frameworks & Libraries").
    -   `projects`: Your notable projects, including descriptions, technologies used, and links.
-   **Replace `public/mycv.pdf`**: Put your actual resume PDF in the `public` folder and name it `mycv.pdf`. If you use a different name, update the download link in `src/components/resume-section.tsx`.

### 9.2. Styling and Theme

-   **Global Styles (`src/app/globals.css`):**
    -   **Theme Colors**: Modify the HSL CSS variables under `:root` (for light theme) and `.dark` (for dark theme) to change the color palette (background, foreground, primary, accent, etc.).
    -   **Base Styles**: Adjust base typography (font sizes for h1, p, etc.) and other global styles.
-   **Tailwind CSS (`tailwind.config.ts`):**
    -   Extend Tailwind's default theme, add custom utility classes, or configure plugins if needed.
-   **ShadCN UI Components (`src/components/ui/`):**
    -   These components are styled using Tailwind CSS and the theme variables in `globals.css`. You can customize their appearance by overriding Tailwind classes or modifying the theme variables.

### 9.3. Components

-   Modify existing components in `src/components/` to change their structure or behavior.
-   Create new components and integrate them into your pages.

### 9.4. Navigation

-   Edit `src/components/navbar.tsx` to change navigation links (`navLinks` array) or the overall navbar appearance.

### 9.5. Headshot Image

-   The `headshotUrl` in `src/data/resume.ts` points to `https://picsum.photos/seed/developer/200/200` by default.
-   To use your own headshot:
    1.  Place your headshot image (e.g., `my-headshot.jpg`) in the `public/images/` directory (create `images` folder if it doesn't exist).
    2.  Update `headshotUrl` in `src/data/resume.ts` to `"/images/my-headshot.jpg"`.
    3.  Alternatively, host your image online and use the direct URL.

## 10. Linting and Type Checking

-   **Linting**: Run `npm run lint` or `yarn lint` to check for code style issues using ESLint.
-   **Type Checking**: Run `npm run typecheck` or `yarn typecheck` to perform a TypeScript type check.

## 11. Deployment

This Next.js application can be deployed to various platforms that support Node.js applications, such as:

-   **Vercel** (Recommended for Next.js projects)
-   **Netlify**
-   **AWS Amplify**
-   **Google Cloud Run**
-   **DigitalOcean App Platform**
-   A traditional server with Node.js installed.

**Key Deployment Considerations:**
1.  **Environment Variables**: Ensure all necessary environment variables (especially `RESEND_API_KEY` and `CONTACT_FORM_RECIPIENT_EMAIL`) are configured on your deployment platform. Most platforms provide a way to set these securely.
2.  **Build Command**: Set the build command to `npm run build` (or `yarn build`).
3.  **Start Command**: Typically, the platform will detect it's a Next.js app. If manual configuration is needed, the start command is often `npm run start` (or `yarn start`).
4.  **Node.js Version**: Ensure your deployment platform uses a compatible Node.js version (18.x or later).

This guide should provide a comprehensive overview of how to work with PortfolioPilot. If you encounter any issues, refer to the Next.js and Resend documentation or open an issue in the project repository if applicable.

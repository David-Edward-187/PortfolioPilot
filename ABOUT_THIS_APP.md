# About PortfolioPilot: An A-to-Z Guide

Welcome to PortfolioPilot! This document provides a comprehensive overview of your new portfolio website, from its core technologies to detailed customization instructions.

## 1. What is This Project?

PortfolioPilot is a modern, high-performance, and easily customizable developer portfolio. It's built with the latest web technologies to help you create a professional online presence that is both beautiful and fast. The design is clean, responsive, and focuses on showcasing your skills, experience, and projects in the best possible light.

---

## 2. Technology Stack (The "A to Z" of the Tech)

This project leverages a curated set of modern tools to ensure a great developer experience and an excellent end-user experience.

-   **Framework**: **Next.js 15** (using the App Router). This provides features like Server Components, Server Actions, and static site generation for optimal performance.
-   **Language**: **TypeScript**. For robust, type-safe code that is easier to maintain and scale.
-   **Styling**:
    -   **Tailwind CSS**: A utility-first CSS framework for rapid and consistent styling.
    -   **ShadCN UI**: A collection of beautifully designed, reusable UI components built on top of Radix UI and Tailwind CSS.
-   **Form Management**:
    -   **React Hook Form**: For performant and flexible form state management.
    -   **Zod**: For powerful schema-based validation on both the client and server.
-   **Email Delivery**: **Resend**. Used by the contact form to reliably send messages to your inbox.
-   **Icons**: **Lucide React**. A comprehensive and clean set of SVG icons.
-   **Theming**: **`next-themes`**. Provides seamless support for light, dark, and system-preference themes.
-   **Animations**: Built-in animations using CSS transitions and keyframes, defined in `tailwind.config.ts` and `globals.css`.
-   **Deployment**: Configured for static export (`output: 'export'`), making it perfect for deployment on static hosting platforms like Vercel, Netlify, or GitHub Pages.

---

## 3. Key Features Explained

#### A. Fully Responsive Design
The entire layout adapts beautifully to any screen size, from mobile phones to widescreen desktops.

#### B. Dynamic Sections
-   **Hero Section**: A powerful introduction with your name, professional title, and clear call-to-action buttons ("Let's Connect" and "Download CV").
-   **About Me**: A dedicated section featuring your professional headshot and a detailed biography.
-   **Skills**: A visually organized display of your technical skills, grouped by category and enhanced with icons for quick scanning.
-   **Experience**: A clean, timeline-style presentation of your professional work history.
-   **Projects**: An elegant grid of project cards, each with an image, description, list of technologies, and a link to the live project or repository.

#### C. Interactive Contact Form
-   **Client-Side Validation**: Provides instant feedback to the user as they type, powered by React Hook Form and Zod.
-   **Server-Side Security**: Uses a Next.js Server Action (`/src/app/actions/contact-form-actions.ts`) to re-validate the data on the server before sending the email. This prevents malicious submissions.
-   **Reliable Emailing**: Integrates with the Resend API to send formatted HTML emails to your specified inbox.
-   **User Feedback**: Uses toast notifications to inform the user of success or failure after submission.

#### D. Light & Dark Mode
A theme toggle in the navbar allows users to switch between a light theme, a dark theme, or their system's default preference. The theme is persisted across sessions.

#### E. SEO and Performance Optimized
Built with Next.js best practices, the site is statically generated, ensuring fast load times and good search engine visibility. Images are handled by `next/image` for automatic optimization.

---

## 4. How to Make It Your Own (Customization Guide)

This portfolio is designed to be easily personalized. Follow these steps to get it set up with your information.

### Step 1: Set Up Environment Variables (Crucial for Contact Form)
1.  Find the `.env` file in the project root.
2.  Create a copy of it and name it `.env.local`. **This file is private and should not be committed to Git.**
3.  **Sign up for Resend**: Go to [resend.com](https://resend.com), create a free account, and generate an API key.
4.  **Update `.env.local`**:
    ```env
    # Paste your Resend API key here
    RESEND_API_KEY=your_resend_api_key_here

    # Enter the email address where you want to receive messages
    CONTACT_FORM_RECIPIENT_EMAIL=your_personal_email@example.com
    ```
    > **Note**: The server must be restarted after changing `.env.local`.

### Step 2: Personalize All Content (The Most Important Step)
All the text, links, and images for your portfolio are controlled from a single file: `src/data/resume.ts`.

1.  **Open `src/data/resume.ts`**.
2.  **Update Personal Info**: Change `name`, `title`, and `bio`.
3.  **Update Headshot**: Change the `headshotUrl` to a direct link of your photo. A good size is 240x240 pixels. You can also place an image in `public/images/` and use a relative path like `"/images/my-photo.jpg"`.
4.  **Update Contact Links**: Fill in your `email`, `linkedin`, and `github` URLs.
5.  **Fill in Your Experience**: Update the `experience` array with your job history.
6.  **Update Your Skills**: Modify the `skills` object to reflect your technical abilities.
7.  **Showcase Your Projects**:
    -   Update the `projects` array with your best work.
    -   For each project, provide a name, description, and list of technologies.
    -   Update the `link` to point to the live site or GitHub repo.
    -   Change the `imageUrl` to a screenshot of your project. A good aspect ratio is 16:9 (e.g., 600x338 pixels).

### Step 3: Add Your Resume PDF
1.  Prepare your resume as a PDF file.
2.  Name it `mycv.pdf`.
3.  Place this file inside the `public/` directory, replacing the existing placeholder file. The "Download CV" button is already configured to link to this file.

### Step 4: Customize the Look & Feel (Optional)
-   **Colors**: To change the theme colors (primary blue, accent teal, etc.), edit the CSS variables in `src/app/globals.css`. You'll find variables for both the light (`:root`) and dark (`.dark`) themes.
-   **Fonts**: The default font is "Inter", configured in `src/app/layout.tsx`. You can change this using `next/font`.

### Step 5: Run and Test
1.  Open your terminal.
2.  Run `npm install` to install all dependencies.
3.  Run `npm run dev` to start the development server.
4.  Open [http://localhost:9002](http://localhost:9002) in your browser to see your portfolio.
5.  Test the contact form to ensure your environment variables are set up correctly.

---

## 5. Deployment

This app is configured for static export. When you're ready to go live:

1.  Run `npm run build`. This command will generate a production-ready, static version of your site in the `out` folder.
2.  Deploy the contents of the `out` folder to any static hosting provider like **Vercel**, **Netlify**, or **GitHub Pages**.

That's it! You now have a complete guide to understanding, customizing, and deploying your new portfolio.

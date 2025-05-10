# PortfolioPilot

This is a Next.js project bootstrapped with `create-next-app`, designed as a modern developer portfolio with AI-powered resume assistance.

## Getting Started

First, ensure you have Node.js (version 18 or later recommended) and npm/yarn installed.

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Environment Variables

Create a `.env.local` file in the root of the project and add any necessary environment variables. For example, if you integrate an email service like Resend, you would add your API key here:

```
RESEND_API_KEY=your_resend_api_key
CONTACT_FORM_RECIPIENT_EMAIL=your_email@example.com
```

Refer to the `.env` file for a template.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
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
- **Lucide React**: Icon library.

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or Firebase Hosting. Ensure your build process and environment variables are configured correctly on your chosen platform.

## Customization

- **Theme**: Modify `src/app/globals.css` to adjust the color palette and base styles. The theme uses HSL CSS variables.
- **Resume Data**: Update `src/data/resume.json` to personalize the portfolio content.
- **Components**: Customize or add new components in the `src/components` directory.
- **AI Features**: Extend or modify AI functionalities in the `src/ai` directory using Genkit.
```
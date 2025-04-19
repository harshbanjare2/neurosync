# Healthaware - Mental Health Assessment Platform

Healthaware is a web application for mental health assessment and tracking. It provides users with personalized insights into their mental well-being through AI-powered analysis.

## Features

- **User Authentication:** Secure signup and login system
- **Mental Health Assessment:** Comprehensive questionnaire covering key mental health factors
- **Personalized Analysis:** AI-powered insights based on user responses
- **Results Dashboard:** Intuitive visualization of assessment results
- **Responsive Design:** Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS
- **Design Patterns:** Neumorphism, Glassmorphism, and Skeuomorphism
- **Animation:** Framer Motion
- **Icons:** React Icons

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/healthaware.git
   cd healthaware
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Next.js App Router structure
- `src/app/page.tsx` - Landing page
- `src/app/login/` - Login page
- `src/app/signup/` - Signup page
- `src/app/dashboard/` - Protected dashboard area
- `src/contexts/` - React contexts (Auth)
- `src/types/` - TypeScript type definitions

## Future Enhancements

- Integration with OpenAI API for more advanced analysis
- User data history and trend visualization
- Appointment scheduling with mental health professionals
- Community support features

## License

This project is licensed under the MIT License.

## Acknowledgments

- This project is for educational purposes and is not a substitute for professional mental health advice
- Icons and illustrations from various free sources
- Design inspiration from modern health applications

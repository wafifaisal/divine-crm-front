# Divine CRM Frontend

Modern CRM system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Contact & Lead Management** - Manage your contacts and leads efficiently
- 💬 **Chat Interface** - Real-time chat with AI and human agents
- 🤖 **AI Integration** - Support for multiple AI engines (OpenAI, Deepseek, Grok, Gemini)
- 📊 **Analytics Dashboard** - Track performance and metrics
- 🔗 **Multi-Platform** - WhatsApp, Telegram, Instagram integration
- 🎨 **Modern UI** - Clean and responsive interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Date Handling**: date-fns
- **State Management**: Zustand

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on http://localhost:3002 (or configure .env)

## Installation

1. Clone the repository:
```bash
cd divine-crm-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3002
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
divine-crm-frontend/
├── src/
│   ├── components/          # Reusable components
│   │   └── Layout.tsx       # Main layout with sidebar
│   ├── lib/                 # Utilities and services
│   │   ├── api.ts          # Axios configuration
│   │   └── services.ts     # API service functions
│   ├── pages/              # Next.js pages
│   │   ├── masterdata/     # Masterdata pages
│   │   │   ├── leads-contacts.tsx
│   │   │   ├── products.tsx
│   │   │   ├── chat-labels.tsx
│   │   │   ├── ai-configuration.tsx
│   │   │   ├── connected-platforms.tsx
│   │   │   └── ai-agents.tsx
│   │   ├── chat.tsx        # Chat interface
│   │   ├── analytics.tsx   # Analytics dashboard
│   │   ├── balance.tsx     # Token balance
│   │   ├── login.tsx       # Login page
│   │   ├── index.tsx       # Landing page
│   │   ├── _app.tsx        # App wrapper
│   │   └── _document.tsx   # Document wrapper
│   ├── styles/             # Global styles
│   │   └── globals.css     # Tailwind and custom CSS
│   └── types/              # TypeScript type definitions
│       └── index.ts        # All type definitions
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Available Pages

### Authentication
- `/` - Landing page with service selection
- `/login` - Login page

### Masterdata
- `/masterdata/leads-contacts` - Manage leads and contacts
- `/masterdata/products` - Product management
- `/masterdata/chat-labels` - Chat label configuration
- `/masterdata/ai-configuration` - AI engine setup
- `/masterdata/connected-platforms` - Platform integrations
- `/masterdata/ai-agents` - AI agent configuration
- `/masterdata/human-agents` - Human agent management
- `/masterdata/broadcast-templates` - Broadcast templates

### Main Features
- `/chat` - Chat interface with status filters
- `/analytics` - Performance dashboard
- `/balance` - Token balance monitoring
- `/broadcast` - Broadcast messages
- `/quick-reply` - Quick reply management
- `/api-setting` - API settings

## API Integration

The frontend communicates with the backend API through the following services:

- **Contacts API**: CRUD operations for contacts
- **Leads API**: Lead management
- **Products API**: Product catalog
- **Chats API**: Chat messages and assignments
- **AI API**: AI processing and token management
- **Analytics API**: Performance metrics

All API calls are authenticated using JWT tokens stored in localStorage.

## Styling

The project uses Tailwind CSS with custom utility classes:

- `.btn` - Button styles
- `.card` - Card container
- `.input` - Form input
- `.label` - Form label
- `.badge` - Status badge
- `.table` - Table styles

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:3002 |

## Features Implementation Status

### ✅ Completed
- Landing page with service selection
- Login page
- Layout with sidebar navigation
- Leads & Contacts page
- Products page
- Chat Labels page
- AI Configuration page
- Connected Platforms page
- AI Agents page
- Chat interface with status tabs
- Analytics dashboard
- Token balance page
- Type-safe API integration
- Responsive design

### 🚧 To Be Implemented
- Human Agents page
- Broadcast Templates page
- Broadcast functionality
- Quick Reply page
- API Settings page
- Create/Edit modals for all entities
- Real-time chat updates
- File upload support
- Advanced filtering
- Chart visualizations
- Export functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For support, email support@divine-crm.com or create an issue in the repository.

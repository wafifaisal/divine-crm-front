# Divine CRM - Complete Setup Guide

## 🚀 Quick Start

### Backend Setup (Go/Fiber)

1. **Install Go Dependencies**
```bash
# Navigate to backend directory (where main.go is)
cd /path/to/backend

# Initialize Go modules if not already done
go mod init divine-crm

# Install required dependencies
go get github.com/gofiber/fiber/v2
go get github.com/gofiber/fiber/v2/middleware/cors
go get github.com/gofiber/fiber/v2/middleware/logger
go get github.com/golang-jwt/jwt/v5
go get github.com/joho/godotenv
go get gorm.io/driver/postgres
go get gorm.io/gorm

# Download all dependencies
go mod tidy
```

2. **Setup Database**
```bash
# Install PostgreSQL if not already installed
# Create database
createdb divine_crm

# Or using psql
psql -U postgres
CREATE DATABASE divine_crm;
\q
```

3. **Configure Environment Variables**
Create `.env` file in backend directory:
```env
DATABASE_URL=host=localhost user=postgres password=postgres dbname=divine_crm port=5432 sslmode=disable
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
WHATSAPP_VERIFY_TOKEN=divine-crm-webhook-2024
PORT=3002
```

4. **Run Backend**
```bash
go run main.go

# Or build and run
go build -o divine-crm
./divine-crm
```

Backend will start on `http://localhost:3002`

### Frontend Setup (Next.js/TypeScript)

1. **Navigate to Frontend Directory**
```bash
cd divine-crm-frontend
```

2. **Install Dependencies**
```bash
npm install

# Or using yarn
yarn install
```

3. **Configure Environment**
Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

4. **Run Development Server**
```bash
npm run dev

# Or using yarn
yarn dev
```

Frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
divine-crm/
├── backend/
│   ├── main.go                 # Backend Go application
│   ├── .env                    # Backend environment variables
│   └── go.mod                  # Go dependencies
│
└── divine-crm-frontend/
    ├── src/
    │   ├── components/         # React components
    │   │   └── Layout.tsx      # Main layout with sidebar
    │   ├── lib/               # Utilities
    │   │   ├── api.ts         # Axios configuration
    │   │   └── services.ts    # API services
    │   ├── pages/             # Next.js pages
    │   │   ├── masterdata/    # Masterdata pages
    │   │   ├── chat.tsx       # Chat interface
    │   │   ├── analytics.tsx  # Analytics dashboard
    │   │   ├── balance.tsx    # Token balance
    │   │   └── login.tsx      # Login page
    │   ├── styles/            # CSS styles
    │   │   └── globals.css    # Global styles
    │   └── types/             # TypeScript types
    │       └── index.ts       # Type definitions
    ├── package.json           # Dependencies
    ├── tsconfig.json          # TypeScript config
    ├── tailwind.config.js     # Tailwind config
    └── next.config.js         # Next.js config
```

## 🔧 Configuration Guide

### WhatsApp Integration

1. **Get WhatsApp Business API Access**
   - Create a Facebook Developer account
   - Create a WhatsApp Business App
   - Get Phone Number ID and Access Token

2. **Configure Backend**
   Add to database via API or directly:
   ```sql
   INSERT INTO connected_platforms (platform, token, phone_number_id, active)
   VALUES ('WhatsApp', 'YOUR_ACCESS_TOKEN', 'YOUR_PHONE_NUMBER_ID', true);
   ```

3. **Setup Webhook**
   - Set webhook URL: `https://your-domain.com/api/v1/webhooks/whatsapp`
   - Set verify token: `divine-crm-webhook-2024`
   - Subscribe to `messages` event

### AI Configuration

1. **OpenAI**
   ```sql
   INSERT INTO ai_configurations (ai_engine, token, endpoint, model, active)
   VALUES ('Open AI', 'sk-your-openai-key', 'https://api.openai.com/v1/chat/completions', 'gpt-4', true);
   ```

2. **Create AI Agent**
   ```sql
   INSERT INTO ai_agents (name, ai_engine, basic_prompt, active)
   VALUES ('Diva', 'Open AI', 'Kamu adalah customer service dari toko online kami...', true);
   ```

## 🎯 Features Overview

### ✅ Implemented Features

1. **Landing Page**
   - Service selection (CRM, WMS, HRIS, etc.)
   - Package selection (Startup, Factory, Enterprise)

2. **Authentication**
   - Login page with JWT
   - Protected routes

3. **Masterdata Management**
   - Leads & Contacts
   - Products
   - Chat Labels
   - AI Configuration
   - Connected Platforms
   - AI Agents
   - Human Agents
   - Broadcast Templates

4. **Chat System**
   - Multi-status tabs (Unassigned, Pending, Assigned, Resolved)
   - Real-time chat interface
   - Take Over functionality
   - AI/Human assignment

5. **Analytics**
   - Overview dashboard
   - Performance metrics

6. **Token Balance**
   - AI token tracking
   - Usage monitoring

### 🚧 To Be Implemented

- [ ] Create/Edit modals for all entities
- [ ] Real-time WebSocket connection
- [ ] File upload support
- [ ] Advanced search and filters
- [ ] Chart visualizations
- [ ] Export to CSV/Excel
- [ ] Broadcast functionality
- [ ] Quick Reply system
- [ ] API Settings page

## 🔐 Security Notes

1. **Change Default Values**
   - Update JWT_SECRET in production
   - Use strong database passwords
   - Change WHATSAPP_VERIFY_TOKEN

2. **Environment Variables**
   - Never commit `.env` files
   - Use different credentials for dev/prod

3. **Database**
   - Use SSL in production
   - Regular backups
   - Proper user permissions

## 📊 Database Schema

Tables automatically created by GORM:
- `contacts` - Customer contacts
- `leads` - Sales leads
- `products` - Product catalog
- `chat_messages` - Chat history
- `chat_labels` - Chat categorization
- `quick_replies` - Pre-defined responses
- `broadcast_templates` - Broadcast messages
- `ai_configurations` - AI engine settings
- `ai_agents` - AI agent configuration
- `token_balances` - Token usage tracking
- `connected_platforms` - Platform integrations

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql -U postgres -d divine_crm
```

**Port Already in Use**
```bash
# Find process using port 3002
lsof -i :3002

# Kill the process
kill -9 <PID>
```

### Frontend Issues

**Module Not Found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API Connection Error**
- Check backend is running on port 3002
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check CORS configuration in backend

## 📞 Testing

### Test WhatsApp Connection

```bash
curl -X POST http://localhost:3002/api/v1/test-whatsapp \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "6281234567890",
    "message": "Test message from Divine CRM"
  }'
```

### Test AI Processing

```bash
curl -X POST http://localhost:3002/api/v1/ai/process \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Halo, saya mau order",
    "agent_id": 1
  }'
```

## 🚀 Deployment

### Backend Deployment

1. **Build Binary**
```bash
go build -o divine-crm-backend
```

2. **Using Docker**
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o divine-crm

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/divine-crm .
EXPOSE 3002
CMD ["./divine-crm"]
```

### Frontend Deployment

1. **Build for Production**
```bash
npm run build
```

2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📝 API Documentation

### Authentication
- `POST /api/v1/auth/login` - Login

### Masterdata
- `GET /api/v1/masterdata/contacts` - Get all contacts
- `POST /api/v1/masterdata/contacts` - Create contact
- `PUT /api/v1/masterdata/contacts/:id` - Update contact
- `DELETE /api/v1/masterdata/contacts/:id` - Delete contact

*(Similar endpoints for leads, products, etc.)*

### Chat
- `GET /api/v1/chats` - Get all chats
- `POST /api/v1/chats/:id/assign` - Assign chat
- `POST /api/v1/chats/:id/resolve` - Resolve chat

### Webhooks
- `GET /api/v1/webhooks/whatsapp` - Verify webhook
- `POST /api/v1/webhooks/whatsapp` - Receive messages

## 🤝 Support

For issues or questions:
1. Check this guide first
2. Review the code comments
3. Check console for error messages
4. Create an issue in the repository

## 📄 License

Proprietary - All rights reserved

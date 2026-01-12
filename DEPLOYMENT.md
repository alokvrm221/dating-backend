# Deployment Guide

Complete guide for deploying the Dating App Backend to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Deployment Options](#deployment-options)
5. [Post-Deployment](#post-deployment)
6. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Pre-Deployment Checklist

### Security

- [ ] Change all default passwords and secrets
- [ ] Generate strong JWT secrets (min 64 characters)
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS for production domains only
- [ ] Review and update rate limits
- [ ] Enable security headers (Helmet)
- [ ] Set up firewall rules
- [ ] Configure environment variables securely

### Database

- [ ] Set up MongoDB replica set for high availability
- [ ] Configure database backups
- [ ] Create database indexes
- [ ] Set up database monitoring
- [ ] Configure connection pooling
- [ ] Enable database authentication

### Application

- [ ] Set NODE_ENV=production
- [ ] Remove development dependencies
- [ ] Configure logging for production
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure email service
- [ ] Set up Cloudinary for production
- [ ] Configure Redis for caching

### Testing

- [ ] Run all tests
- [ ] Perform load testing
- [ ] Test all API endpoints
- [ ] Verify authentication flows
- [ ] Test file uploads
- [ ] Verify email delivery

---

## Environment Setup

### Production Environment Variables

Create a `.env.production` file:

```env
# Server
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dating-app?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-64-characters-long-random-string
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret-min-64-characters-long
JWT_REFRESH_EXPIRE=30d

# Redis
REDIS_HOST=your-redis-host.com
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# App URLs
CLIENT_URL=https://yourdomain.com

# Logging
LOG_LEVEL=info
```

---

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free or paid cluster

2. **Configure Database**
   ```bash
   # Create database user
   # Username: datingapp
   # Password: <strong-password>
   
   # Whitelist IP addresses
   # Add your server's IP or 0.0.0.0/0 for all (not recommended)
   ```

3. **Get Connection String**
   ```
   mongodb+srv://datingapp:<password>@cluster.mongodb.net/dating-app?retryWrites=true&w=majority
   ```

4. **Create Indexes**
   ```javascript
   // Connect to MongoDB and run:
   db.users.createIndex({ email: 1 }, { unique: true })
   db.users.createIndex({ "location.coordinates": "2dsphere" })
   db.swipes.createIndex({ swiperId: 1, swipedUserId: 1 }, { unique: true })
   db.matches.createIndex({ users: 1, status: 1 })
   ```

### Self-Hosted MongoDB

```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Create database and user
mongo
> use dating-app
> db.createUser({
    user: "datingapp",
    pwd: "strong-password",
    roles: [{ role: "readWrite", db: "dating-app" }]
  })
```

---

## Deployment Options

### Option 1: AWS EC2

1. **Launch EC2 Instance**
   ```bash
   # Choose Ubuntu Server 22.04 LTS
   # Instance type: t2.medium or higher
   # Configure security group: Allow ports 22, 80, 443, 5000
   ```

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install -y nginx
   ```

4. **Deploy Application**
   ```bash
   # Clone repository
   git clone <your-repo-url>
   cd dating-app-backend
   
   # Install dependencies
   npm install --production
   
   # Create .env file
   nano .env
   # Paste production environment variables
   
   # Start with PM2
   pm2 start src/server.js --name dating-app
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/dating-app
   ```
   
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```
   
   ```bash
   sudo ln -s /etc/nginx/sites-available/dating-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Add MongoDB Add-on**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret
   # ... set all other variables
   ```

5. **Create Procfile**
   ```
   web: node src/server.js
   ```

6. **Deploy**
   ```bash
   git push heroku main
   heroku logs --tail
   ```

### Option 3: DigitalOcean App Platform

1. **Create Account** at [digitalocean.com](https://www.digitalocean.com)

2. **Create New App**
   - Connect GitHub repository
   - Select Node.js environment
   - Configure build command: `npm install`
   - Configure run command: `node src/server.js`

3. **Add MongoDB Database**
   - Create managed MongoDB database
   - Add connection string to environment variables

4. **Configure Environment Variables**
   - Add all production variables in App Settings

5. **Deploy**
   - Click "Deploy" button
   - Monitor deployment logs

### Option 4: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   
   EXPOSE 5000
   
   CMD ["node", "src/server.js"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   
   services:
     app:
       build: .
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
       env_file:
         - .env.production
       depends_on:
         - mongodb
         - redis
       restart: unless-stopped
     
     mongodb:
       image: mongo:6
       volumes:
         - mongodb_data:/data/db
       environment:
         - MONGO_INITDB_ROOT_USERNAME=admin
         - MONGO_INITDB_ROOT_PASSWORD=password
       restart: unless-stopped
     
     redis:
       image: redis:7-alpine
       volumes:
         - redis_data:/data
       restart: unless-stopped
   
   volumes:
     mongodb_data:
     redis_data:
   ```

3. **Deploy**
   ```bash
   docker-compose up -d
   ```

---

## Post-Deployment

### Verify Deployment

1. **Health Check**
   ```bash
   curl https://yourdomain.com/api/v1/health
   ```

2. **Test Authentication**
   ```bash
   # Register a test user
   curl -X POST https://yourdomain.com/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"firstName":"Test","lastName":"User",...}'
   ```

3. **Monitor Logs**
   ```bash
   # PM2
   pm2 logs dating-app
   
   # Docker
   docker-compose logs -f
   
   # Heroku
   heroku logs --tail
   ```

### Setup Monitoring

1. **PM2 Monitoring**
   ```bash
   pm2 install pm2-logrotate
   pm2 set pm2-logrotate:max_size 10M
   pm2 set pm2-logrotate:retain 7
   ```

2. **Setup Uptime Monitoring**
   - Use services like UptimeRobot, Pingdom, or StatusCake
   - Monitor: https://yourdomain.com/api/v1/health

3. **Error Tracking**
   - Integrate Sentry or similar service
   - Add to application:
   ```javascript
   const Sentry = require("@sentry/node");
   Sentry.init({ dsn: "your-sentry-dsn" });
   ```

### Backup Strategy

1. **Database Backups**
   ```bash
   # MongoDB Atlas: Enable automatic backups in dashboard
   
   # Self-hosted: Setup cron job
   0 2 * * * mongodump --uri="mongodb://..." --out=/backups/$(date +\%Y-\%m-\%d)
   ```

2. **Application Backups**
   ```bash
   # Backup uploaded files (if not using Cloudinary)
   rsync -avz /path/to/uploads/ backup-server:/backups/uploads/
   ```

---

## Monitoring & Maintenance

### Performance Monitoring

1. **Application Metrics**
   - Response times
   - Request rates
   - Error rates
   - Memory usage
   - CPU usage

2. **Database Metrics**
   - Query performance
   - Connection pool usage
   - Index usage
   - Storage size

3. **Tools**
   - New Relic
   - Datadog
   - PM2 Plus
   - MongoDB Atlas Monitoring

### Regular Maintenance

1. **Weekly**
   - Review error logs
   - Check disk space
   - Monitor API usage
   - Review security alerts

2. **Monthly**
   - Update dependencies
   - Review and optimize database queries
   - Analyze user metrics
   - Review and adjust rate limits

3. **Quarterly**
   - Security audit
   - Performance optimization
   - Backup restoration test
   - Disaster recovery drill

### Scaling

1. **Vertical Scaling**
   - Increase server resources (CPU, RAM)
   - Upgrade database tier

2. **Horizontal Scaling**
   - Add more application servers
   - Setup load balancer
   - Implement database replication
   - Use Redis cluster

3. **Optimization**
   - Enable caching
   - Optimize database queries
   - Implement CDN for static assets
   - Use connection pooling

---

## Troubleshooting

### Common Issues

1. **Application Won't Start**
   ```bash
   # Check logs
   pm2 logs dating-app --lines 100
   
   # Verify environment variables
   pm2 env 0
   
   # Check port availability
   sudo netstat -tulpn | grep 5000
   ```

2. **Database Connection Issues**
   ```bash
   # Test MongoDB connection
   mongo "mongodb://..." --eval "db.adminCommand('ping')"
   
   # Check firewall rules
   sudo ufw status
   ```

3. **High Memory Usage**
   ```bash
   # Check PM2 status
   pm2 status
   
   # Restart application
   pm2 restart dating-app
   
   # Clear logs
   pm2 flush
   ```

### Support

For deployment support, contact: devops@yourdomain.com

---

**Last Updated:** January 2026


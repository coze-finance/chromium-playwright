FROM mcr.microsoft.com/playwright:v1.50.0-noble

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json tsconfig.json  ./

# Install dependencies
RUN npm ci --ignore-scripts

# Copy source files
COPY src ./src

# Build the application
RUN npm run build
# RUN npx playwright install chromium

# Expose the default Playwright browser server port
EXPOSE 9222

# Start the browser server
CMD ["npm", "start"]

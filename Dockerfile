# Use the lightweight official Nginx Alpine image
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy all files from your project into the Nginx web root
COPY . /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

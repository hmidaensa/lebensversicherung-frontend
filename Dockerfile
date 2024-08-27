# Use official node image as the base image
FROM node:20-alpine3.20 AS build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1-alpine3.18

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/lebensversicherung/browser /usr/share/nginx/html
COPY --from=build /usr/local/app/dist/lebensversicherung/browser/index.csr.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80


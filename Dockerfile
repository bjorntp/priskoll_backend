# Use a base image with a Java Runtime Environment (JRE)
FROM openjdk:21-jdk-slim-bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy the build artifact from the host to the container.
# Assuming you have already run ./gradlew build to create the JAR file.
COPY build/libs/*.jar /app/app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Run the application when the container starts.
# The -jar flag runs the specified JAR file.
# The --spring.profiles.active=dev part sets the active profile to "dev".
# The --server.port=8080 part ensures the application runs on port 8080 inside the container.
ENTRYPOINT ["java", "-jar", "app.jar"]

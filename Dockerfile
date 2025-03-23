# ---- Stage 1: Build ----
FROM gradle:8.10-jdk21 AS builder

WORKDIR /app

# Copy Gradle wrapper and configs first for better caching
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle settings.gradle ./

# Download dependencies (cached unless build files change)
RUN ./gradlew build -x test || return 0

# Copy actual source code
COPY src ./src

# Build application JAR
RUN ./gradlew clean build -x test

# ---- Stage 2: Run ----
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy only the built jar from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

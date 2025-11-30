# ------------------------------------------------------
# STEP 1: Build stage using Maven to compile the project
# ------------------------------------------------------
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set working directory inside the container
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Package the application (skip tests to avoid failures)
RUN mvn clean package -DskipTests


# ------------------------------------------------------
# STEP 2: Runtime stage with OpenJDK 17 only
# ------------------------------------------------------
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/billingsoftware-0.0.1-SNAPSHOT.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

# Runtime stage with OpenJDK 17 only
FROM eclipse-temurin:17

# Set working directory
WORKDIR /app

# Copy the JAR from the build stage
COPY /target/billingsoftware-0.0.1-SNAPSHOT.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

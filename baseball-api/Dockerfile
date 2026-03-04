FROM amazoncorretto:23-alpine-jdk

WORKDIR /app

COPY build/libs/baseball-api-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
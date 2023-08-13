# Build step
FROM golang:1.20-alpine AS builder
ENV GOPROXY=https://goproxy.cn,direct
RUN mkdir -p /build
WORKDIR /build
COPY . .
RUN go build -o app .

# Final step
FROM alpine
EXPOSE 8080
EXPOSE 8081
COPY --from=builder /build/app /bin/app
ENTRYPOINT ["/bin/app"]
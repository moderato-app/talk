# Build step
FROM golang:1.20-alpine AS builder

COPY ${PWD} /app
WORKDIR /app

RUN go build -o appbin cmd/talk/talk.go

# Final step
FROM alpine

# Following commands are for installing CA certs (for proper functioning of HTTPS and other TLS)
RUN apk --update add ca-certificates && \
    rm -rf /var/cache/apk/*

RUN adduser -D appuser
USER appuser

COPY --from=builder /app /home/appuser/app

WORKDIR /home/appuser/app

EXPOSE 8000

CMD ["./appbin"]
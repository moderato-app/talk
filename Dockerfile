# Use Node.js official image as base
FROM node:20-alpine AS webBuilder

# Install git
RUN apk update && apk add --no-cache git

# Clone the repository
WORKDIR /app
RUN git clone --depth 1 --branch v1.0.0 --single-branch https://github.com/proxoar/talk-web .

# Install dependencies and build
RUN yarn install
RUN yarn build

FROM golang:1.21-alpine AS builder

COPY ${PWD} /app
WORKDIR /app

COPY --from=webBuilder /app/dist web/html

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
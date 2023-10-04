# Use Node.js official image as base
FROM node:20-alpine AS webBuilder

# Name of a branch or a tag of proxoar/talk-web
ARG TALK_WEB_VERSION=main

ENV TALK_WEB_VERSION=${TALK_WEB_VERSION}

# Install git, make
RUN apk update && apk add --no-cache git make

# Clone the repository
WORKDIR /app
RUN git clone --depth 1 --branch $TALK_WEB_VERSION --single-branch https://github.com/proxoar/talk-web .

# Install dependencies and build
RUN make build

FROM golang:1.21-alpine AS builder

# Install git, make
RUN apk update && apk add --no-cache make

COPY ${PWD} /app
WORKDIR /app

COPY --from=webBuilder /app/build/dist web/html

RUN make build

# Final step
FROM alpine

# Following commands are for installing CA certs (for proper functioning of HTTPS and other TLS)
RUN apk --update add ca-certificates && \
    rm -rf /var/cache/apk/*

RUN adduser -D appuser
USER appuser

WORKDIR /home/appuser/app

COPY --from=builder /app/talk /home/appuser/app/appbin

EXPOSE 8000

CMD ["./appbin"]
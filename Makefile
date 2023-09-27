ENTRY = cmd/talk/talk.go
BINARY = talk

.PHONY: build
build:
	go mod download
	go build ${ENTRY}

.PHONY: test
test:
	go test -v ./...

.PHONY: run
run:
	make build
	./${BINARY}

.PHONY: release
release:
	go mod download
	GOOS=linux GOARCH=amd64 go build -o build/${BINARY}-linux-amd64 ${ENTRY};
	GOOS=linux GOARCH=arm64 go build -o build/${BINARY}-linux-arm64 ${ENTRY};
	GOOS=darwin GOARCH=amd64 go build -o build/${BINARY}-darwin-amd64 ${ENTRY};
	GOOS=darwin GOARCH=arm64 go build -o build/${BINARY}-darwin-arm64 ${ENTRY};
	GOOS=windows GOARCH=amd64 go build -o build/${BINARY}-windows-amd64.exe ${ENTRY};
	cd build; \
	tar -zcvf ${BINARY}-linux-amd64.tar.gz ${BINARY}-linux-amd64; \
	tar -zcvf ${BINARY}-linux-arm64.tar.gz ${BINARY}-linux-arm64; \
	tar -zcvf ${BINARY}-darwin-amd64.tar.gz ${BINARY}-darwin-amd64; \
	tar -zcvf ${BINARY}-darwin-arm64.tar.gz ${BINARY}-darwin-arm64; \
	zip -r ${BINARY}-windows-amd64.exe.zip ${BINARY}-windows-amd64.exe;

.PHONY: clean
clean:
	echo "Cleaning up..."
	rm -f ${BINARY}
	rm -rf build
	go clean
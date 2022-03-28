lint:
	npx eslint
develop:
	npx webpack serve --open

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

.PHONY: test
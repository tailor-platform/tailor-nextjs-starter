SHELL = /usr/bin/env bash
TAILORCTL := /Users/mistat/go/bin/tailorctl

export
APP_HTTP_SCHEMA := http
PLATFORM_URL := http://mini.tailor.tech:18090
TAILOR_TOKEN := tpp_11111111111111111111111111111111

.PHONY: init
init:
	${TAILORCTL} alpha workspace create --name teams-$(shell date +%s)

.PHONY: apply
apply:
	${TAILORCTL} alpha workspace apply -m ./workspace.cue

.PHONY: seed
seed:
	rm -rf ./teams/seed/tmp
	mkdir -p ./teams/seed/tmp
	cue eval ./teams/seed/*.cue -e Tenants --out json > ./teams/seed/tmp/tenants.json
	cue eval ./teams/seed/*.cue -e Employees --out json > ./teams/seed/tmp/employees.json
	cue eval ./teams/seed/*.cue -e Roles --out json > ./teams/seed/tmp/roles.json
	${TAILORCTL} alpha workspace tailordb import --namespace teams --type Tenant --json ./teams/seed/tmp/tenants.json
	${TAILORCTL} alpha workspace tailordb import --namespace teams --type Role --json ./teams/seed/tmp/roles.json
	${TAILORCTL} alpha workspace tailordb import --namespace teams --type Employee --json ./teams/seed/tmp/employees.json

.PHONY: destroy
destroy:
	${TAILORCTL} alpha workspace destroy
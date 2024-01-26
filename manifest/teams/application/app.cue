package application

import (
	"github.com/tailor-platform/tailorctl/schema/v2/application"
	"github.com/tailor-platform/tailorctl/schema/v2/common"

	authSvc "github.com/tailor-inc/teams/services/auth"
	"github.com/tailor-inc/teams/services/teamsdb"
)

application.#Spec & {
	name: "teams"
	cors: [
		"http://localhost:8080",
		"http://localhost:8081",
		"http://tailor.localhost:3000",
	]
	auth: application.#Auth & {
		namespace: authSvc.namespace
		idProviderConfigName: authSvc.idProviderConfigs[0].name
	}
	subgraphs: [
		{type: common.#TailorDB, name:  teamsdb.namespace},
	]
}

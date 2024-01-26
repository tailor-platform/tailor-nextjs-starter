package teams

import (
	"github.com/tailor-platform/tailorctl/schema/v2"

	"github.com/tailor-inc/teams/application"
	"github.com/tailor-inc/teams/services/auth"
	"github.com/tailor-inc/teams/services/teamsdb"
)

v2.#Workspace & {
	apps: [
		application,
	]
	services: [auth, teamsdb]
}

package teamsdb

import (
	"github.com/tailor-platform/tailorctl/schema/v2/tailordb"

	"github.com/tailor-inc/teams/services/teamsdb/type"
)

tailordb.#Spec & {
	namespace: "teams"
	types: [
		{type.Employee},
		{type.EmployeeProfile},
		{type.Tenant},
		{type.Role},
	]
}

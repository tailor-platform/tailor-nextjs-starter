package auth

import (
	"github.com/tailor-platform/tailorctl/schema/v2/auth"

	"github.com/tailor-inc/teams/seed"
	"github.com/tailor-inc/teams/services/teamsdb"
	ttype "github.com/tailor-inc/teams/services/teamsdb/type"
)

auth.#Spec & {
	namespace: "teams-auth"
	idProviderConfigs: [
		auth.#IDProviderConfig & {
			name: "firebase"
			config: auth.#IDToken & {
				providerURL: "https://securetoken.google.com/teams-411717",
				clientID: 	 "teams-411717"
			}
		}
	]
	tenantProvider: auth.#TenantProviderType.TailorDB
	  tenantProviderConfig: auth.#TenantTailorDBProviderConfig & {
		namespace: 				teamsdb.namespace
		type:      				ttype.Tenant.name
		signatureField: 	"signature"
	}
	userProfileProvider: auth.#UserProfileProviderType.TailorDB
	userProfileProviderConfig: auth.#UserProfileTailorDBProviderConfig & {
		namespace:     teamsdb.namespace
		type:          ttype.Employee.name
		usernameField: "username"
		tenantIdField: "tenantId"
		attributesFields: ["roles"]
	}
	machineUsers: [
		auth.#MachineUser & {
			name: "r2d2"
			attributes: [
				seed.RoleMap.EmployeeManager.id,
				seed.RoleMap.TenantManager.id,
			]
		},
	]
}

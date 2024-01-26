package type

import (
	"github.com/tailor-platform/tailorctl/schema/v2/tailordb"

	"github.com/tailor-inc/teams/seed"
)

tenantAdminRoles: [
	{id: seed.RoleMap.Administrator.id, permit: tailordb.#Permit.Allow},
	{id: seed.RoleMap.TenantManager.id, permit: tailordb.#Permit.Allow},
]

Tenant: tailordb.#Type & {
	name:        "Tenant"
	description: "Tenant"
	fields: {
		name: {
			type:        tailordb.#TypeString
			description: "Tenant name"
			index:       true
			required:    true
		}
		signature: {
			type:        tailordb.#TypeString
			description: "Tenant signature"
			index:       true
			required:    true
		}
	}
	typePermission: {
		create: [
			...tenantAdminRoles,
		]
		read: [
			{id: tailordb.#Everyone, permit: tailordb.#Permit.Allow},
		]
		update: [
			...tenantAdminRoles,
		]
		delete: [
			...tenantAdminRoles,
		]
		admin: [
			...tenantAdminRoles,
		]
	}
}

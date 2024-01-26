package type

import (
	"github.com/tailor-platform/tailorctl/schema/v2/tailordb"

	"github.com/tailor-inc/teams/seed"
)

roleAdminRoles: [
	{id: seed.RoleMap.Administrator.id, 	permit: tailordb.#Permit.Allow},
]

Role: tailordb.#Type & {
	name:        "Role"
	description: "Role"
	fields: {
		name: {
			type:        tailordb.#TypeString
			description: "Name"
			index:       true
			required:    true
		}
		description: {
			type:        tailordb.#TypeString
			description: "Description"
			index:       false
			required:    false
		}
		tenantId: {
			type:        tailordb.#TypeUUID
			description: "tenant id of the employee"
			index:       true
			required:    true
		}
	}
	typePermission: {
		create: [
			...roleAdminRoles,
		]
		read: [
			{id: seed.RoleMap.EmployeeManager.id, permit: tailordb.#Permit.Allow},
			{id: seed.RoleMap.TenantManager.id,   permit: tailordb.#Permit.Allow},
			...roleAdminRoles,
		]
		update: [
			...roleAdminRoles,
		]
		delete: [
			...roleAdminRoles,
		]
		admin: [
			...roleAdminRoles,
		]
	}
}

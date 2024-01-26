package seed

import (
	"github.com/tailor-inc/teams/seed/constant"
)

RoleMap: {
	Administrator: {
		id: constant.Uuid & {_, #type: "roles", #value: "Administrator"}
		name: "administrator",
		description: "Administrator"
	},
	EmployeeManager: {
		id: constant.Uuid & {_, #type: "roles", #value: "UserManager"}
		name: "user manager",
		description: "User manager"
	},
	TenantManager: {
		id: constant.Uuid & {_, #type: "roles", #value: "TenantManager"}
		name: "tenant manager",
		description: "Tenant manager"
	},
}

Roles: [for k, v in RoleMap {
		id: 					v.id,
		tenantId: 		v.tenantId,
		name: 				v.name,
	 	description: 	v.description
	}
]
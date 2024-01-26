package type

import (
	"github.com/tailor-platform/tailorctl/schema/v2/tailordb"

	"github.com/tailor-inc/teams/seed"
)

employeeAdminRoles: [
	{id: seed.RoleMap.Administrator.id, 	permit: tailordb.#Permit.Allow},
	{id: seed.RoleMap.EmployeeManager.id, permit: tailordb.#Permit.Allow},
]

Employee: tailordb.#Type & {
	name:        "Employee"
	description: "Employee"
	fields: {
		username: {
			type:        tailordb.#TypeString
			description: "username of the employee"
			index:       true
			required:    true
		}
		tenantId: {
			type:        tailordb.#TypeUUID
			description: "tenant id of the employee"
			index:       true
			required:    true
		}
		roles: {
			type:        tailordb.#TypeUUID
			description: "Role IDs of the employee"
			array:       true
		}
		profileID: {
			type:           tailordb.#TypeUUID
			description:    "profile ID of the Employee"
			index:          true
			required:       true
			foreignKey:     true
			foreignKeyType: "EmployeeProfile"
		}
		profile: {
			type:        "EmployeeProfile"
			description: "EmployeeProfile of the Employee"
			sourceId:    "profileID"
		}
	}
	typePermission: {
		create: [
			...employeeAdminRoles,
		]
		read: [
			...employeeAdminRoles,
		]
		update: [
			...employeeAdminRoles,
		]
		delete: [
			...employeeAdminRoles,
		]
		admin: [
			...employeeAdminRoles,
		]
	}
}

EmployeeProfile: {
	name:        "EmployeeProfile"
	description: "EmployeeProfile"
	fields: {
		employeeId: {
			type:        tailordb.#TypeUUID
			description: "employee id of the employee profile"
			index:       true
			required:    true
		}
		birthday: {
			type:        tailordb.#TypeDate
			description: "birthday of the employee"
		}
		gender: {
			type: 				tailordb.#TypeEnum
			description: 	"genders of the employee"
			values: 			["unspecified", "male", "female", "unknown"]
			hooks: {
				createExpr: "'unspecified'"
			}
		}
		avatar: {
			type:        tailordb.#TypeString
			description: "avatar of the employee profile"
		}
		phone: {
			type:        tailordb.#TypeString
			description: "phone of the employee profile"
		}
		email: {
			type:        tailordb.#TypeString
			description: "email of the employee profile"
		}
	}
	typePermission: {
		create: [
			...employeeAdminRoles,
		]
		read: [
			{id: tailordb.#LoggedInUser, permit: tailordb.#Permit.Allow},
		]
		update: [
			{id: tailordb.#LoggedInUser, permit: tailordb.#Permit.Allow},
		]
		delete: [
			{id: tailordb.#LoggedInUser, permit: tailordb.#Permit.Allow},
		]
		admin: [
			{id: tailordb.#LoggedInUser, permit: tailordb.#Permit.Allow},
		]
	}
}

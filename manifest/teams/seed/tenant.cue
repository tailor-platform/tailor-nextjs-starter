package seed

import (
	"github.com/tailor-inc/teams/seed/constant"
)

TenantMap: {
	Tailor: {
		id: constant.Uuid & {_, #type: "Tenants", #value: "tailor"}
		name: "tailor"
		signature: "tailor-zwnkv"
	}
}

Tenants: [for k, v in TenantMap {id: v.id, name: v.name, signature: v.signature}]


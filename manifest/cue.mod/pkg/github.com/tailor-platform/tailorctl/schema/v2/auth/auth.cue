package auth

import (
	"github.com/tailor-platform/tailorctl/schema/v2/common"
	"github.com/tailor-platform/tailorctl/schema/v2/secretmanager"
)

#Spec: {
	common.#WithKind
	common.#WithVersion
	common.#WithNamespace

	kind: common.#Auth
	idProviderConfigs: [...#IDProviderConfig]
	userProfileProvider:       string & !=""
	userProfileProviderConfig: [
					if (userProfileProviderConfig).kind == #UserProfileProviderType.TailorDB {#UserProfileTailorDBProviderConfig | #TailorDBProviderConfig }
	][0]
	if (userProfileProviderConfig).kind == #UserProfileProviderType.TailorDB {
		tailorDBProviderConfig: (userProfileProviderConfig)
	}
	tenantProvider: string | *"" // allow empty string if tenant is not used
	tenantProviderConfig: [
					if (tenantProviderConfig).kind == #TenantProviderType.TailorDB {#TenantTailorDBProviderConfig},
	][0] | *null // allow empty string if tenant is not used
	machineUsers: [...#MachineUser]
}

#MachineUser: {
	name: string & !=""
	attributes: [...common.#UUID]
}

#IDProviderConfig: {
	name:   string & !=""
	config: [// see. https://cuetorials.com/patterns/switch/
		if (config).kind == #AuthType.OIDC {#OIDC},
		if (config).kind == #AuthType.SAML {#SAML},
		if (config).kind == #AuthType.IDToken {#IDToken},
	][0]
	if (config).kind == #AuthType.OIDC {
		oidcConfig: (config)
	}
	if (config).kind == #AuthType.SAML {
		samlConfig: (config)
	}
	if (config).kind == #AuthType.IDToken {
		idTokenConfig: (config)
	}
}

#AuthType: {
	OIDC: "OIDC"
	SAML: "SAML"
	IDToken: "IDToken"
}

#OIDC: {
	kind:         #AuthType.OIDC
	clientID:     string
	clientSecret: secretmanager.#SecretValue
	providerURL:  string
}

#SAML: {
	kind:         #AuthType.SAML
	metadataURL:  string
	spCertBase64: secretmanager.#SecretValue
	spKeyBase64:  secretmanager.#SecretValue
}

#IDToken: {
	kind:         #AuthType.IDToken
	providerURL:  string
	clientID: 		string
}

#UserProfileProviderType: {
	TailorDB: "TAILORDB"
}

#UserProfileTailorDBProviderConfig: {
	kind:          #UserProfileProviderType.TailorDB
	namespace:     string & !=""
	type:          string & !=""
	usernameField: string & !=""
	tenantIdField: string | *""  // allow empty string if tenant is not used
	attributesFields: [...string] & !=null
}

#TailorDBProviderConfig: {
	kind:          #UserProfileProviderType.TailorDB
	namespace:     string & !=""
	type:          string & !=""
	usernameField: string & !=""
	attributesFields: [...string] & !=null
}

#TenantProviderType: {
	TailorDB: "TAILORDB"
}

#TenantTailorDBProviderConfig: {
	kind:          	#TenantProviderType.TailorDB
	namespace:     	string & !=""
	type:          	string & !=""
	signatureField: string & !=""
}

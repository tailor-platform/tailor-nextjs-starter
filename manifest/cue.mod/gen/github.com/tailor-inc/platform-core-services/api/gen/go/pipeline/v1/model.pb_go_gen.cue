// Code generated by cue get go. DO NOT EDIT.

//cue:generate cue get go github.com/tailor-inc/platform-core-services/api/gen/go/pipeline/v1

package pipelinev1

import "google.golang.org/protobuf/types/known/structpb"

#PipelineEventType: int32 // #enumPipelineEventType

#enumPipelineEventType:
	#PipelineEventType_PIPELINE_EXECUTED |
	#PipelineEventType_PIPELINE_ERROR

#values_PipelineEventType: {
	PipelineEventType_PIPELINE_EXECUTED: #PipelineEventType_PIPELINE_EXECUTED
	PipelineEventType_PIPELINE_ERROR:    #PipelineEventType_PIPELINE_ERROR
}

#PipelineEventType_PIPELINE_EXECUTED: #PipelineEventType & 0
#PipelineEventType_PIPELINE_ERROR:    #PipelineEventType & 1

#Namespace: {
	name?: string @go(Name) @protobuf(1,bytes,opt,proto3)
}

#SyncNamespace: {
	name?: string @go(Name) @protobuf(1,bytes,opt,proto3)
}

#DeleteNamespace: {
	name?: string @go(Name) @protobuf(1,bytes,opt,proto3)
}

#Manifests: {
	namespace?:   string        @go(Namespace) @protobuf(1,bytes,opt,proto3)
	invoker?:     null | string @go(Invoker,*string) @protobuf(2,bytes,opt,proto3,oneof)
	description?: string        @go(Description) @protobuf(3,bytes,opt,proto3)
	sdl?:         string        @go(Sdl) @protobuf(4,bytes,opt,proto3)
	resolverMap?: {[string]: null | #Resolver} @go(ResolverMap,map[string]*Resolver) @protobuf(5,map[bytes]bytes,rep,name=resolver_map,json=resolverMap,proto3)
}

#Type: {
	kind?: string @go(Kind) @protobuf(1,bytes,opt,proto3)
	name?: string @go(Name) @protobuf(2,bytes,opt,proto3)
	values?: [...string] @go(Values,[]string) @protobuf(3,bytes,rep,proto3)
	fields?: [...null | #Field] @go(Fields,[]*Field) @protobuf(4,bytes,rep,proto3)
	required?: bool @go(Required) @protobuf(5,varint,opt,proto3)
}

#Field: {
	name?:     string       @go(Name) @protobuf(1,bytes,opt,proto3)
	type?:     null | #Type @go(Type,*Type) @protobuf(2,bytes,opt,proto3)
	array?:    bool         @go(Array) @protobuf(3,varint,opt,proto3)
	required?: bool         @go(Required) @protobuf(4,varint,opt,proto3)
}

#Resolver: {
	id?:            string        @go(Id) @protobuf(1,bytes,opt,proto3)
	name?:          string        @go(Name) @protobuf(2,bytes,opt,proto3)
	description?:   string        @go(Description) @protobuf(3,bytes,opt,proto3)
	authorization?: string        @go(Authorization) @protobuf(4,bytes,opt,proto3)
	preScript?:     null | string @go(PreScript,*string) @protobuf(5,bytes,opt,name=pre_script,json=preScript,proto3,oneof)
	postScript?:    null | string @go(PostScript,*string) @protobuf(6,bytes,opt,name=post_script,json=postScript,proto3,oneof)
	pipeline?: [...null | #Pipeline] @go(Pipeline,[]*Pipeline) @protobuf(7,bytes,rep,proto3)
	invoker?: null | string @go(Invoker,*string) @protobuf(8,bytes,opt,proto3,oneof)
	onError?: null | string @go(OnError,*string) @protobuf(9,bytes,opt,name=on_error,json=onError,proto3,oneof)
	inputs?: [...null | #Field] @go(Inputs,[]*Field) @protobuf(10,bytes,rep,proto3)
	response?:      null | #Field @go(Response,*Field) @protobuf(11,bytes,opt,proto3,oneof)
	operationType?: null | string @go(OperationType,*string) @protobuf(12,bytes,opt,name=operation_type,json=operationType,proto3,oneof)
}

#Pipeline: {
	id?:             string        @go(Id) @protobuf(1,bytes,opt,proto3)
	name?:           string        @go(Name) @protobuf(2,bytes,opt,proto3)
	description?:    string        @go(Description) @protobuf(3,bytes,opt,proto3)
	url?:            null | string @go(Url,*string) @protobuf(5,bytes,opt,proto3,oneof)
	graphqlQuery?:   null | string @go(GraphqlQuery,*string) @protobuf(6,bytes,opt,name=graphql_query,json=graphqlQuery,proto3,oneof)
	skipGqlError?:   null | bool   @go(SkipGqlError,*bool) @protobuf(7,varint,opt,name=skip_gql_error,json=skipGqlError,proto3,oneof)
	test?:           null | string @go(Test,*string) @protobuf(8,bytes,opt,proto3,oneof)
	preValidation?:  null | string @go(PreValidation,*string) @protobuf(9,bytes,opt,name=pre_validation,json=preValidation,proto3,oneof)
	preScript?:      null | string @go(PreScript,*string) @protobuf(10,bytes,opt,name=pre_script,json=preScript,proto3,oneof)
	postScript?:     null | string @go(PostScript,*string) @protobuf(11,bytes,opt,name=post_script,json=postScript,proto3,oneof)
	postValidation?: null | string @go(PostValidation,*string) @protobuf(12,bytes,opt,name=post_validation,json=postValidation,proto3,oneof)
	contextData?:    null | string @go(ContextData,*string) @protobuf(13,bytes,opt,name=context_data,json=contextData,proto3,oneof)
	forEach?:        null | string @go(ForEach,*string) @protobuf(14,bytes,opt,name=for_each,json=forEach,proto3,oneof)
}

#PipelineExecuted: {
	result?: null | structpb.#Struct @go(Result,*structpb.Struct) @protobuf(1,bytes,opt,proto3)
}

#PipelineError: {
	message?:     string                  @go(Message) @protobuf(1,bytes,opt,proto3)
	contextData?: null | structpb.#Struct @go(ContextData,*structpb.Struct) @protobuf(2,bytes,opt,name=context_data,json=contextData,proto3)
}

#PipelineEvent: {
	eventType?:  #PipelineEventType @go(EventType) @protobuf(1,varint,opt,name=event_type,json=eventType,proto3,enum=pipeline.v1.PipelineEventType)
	namespace?:  string             @go(Namespace) @protobuf(2,bytes,opt,proto3)
	pipelineId?: string             @go(PipelineId) @protobuf(3,bytes,opt,name=pipeline_id,json=pipelineId,proto3)

	// Types that are assignable to Detail:
	//
	//	*PipelineEvent_PipelineExecuted
	//	*PipelineEvent_PipelineError
	Detail: _#isPipelineEvent_Detail
}

_#isPipelineEvent_Detail: _

#PipelineEvent_PipelineExecuted: {
	pipelineExecuted?: null | #PipelineExecuted @go(PipelineExecuted,*PipelineExecuted) @protobuf(4,bytes,opt,name=pipeline_executed,json=pipelineExecuted,proto3,oneof)
}

#PipelineEvent_PipelineError: {
	pipelineError?: null | #PipelineError @go(PipelineError,*PipelineError) @protobuf(5,bytes,opt,name=pipeline_error,json=pipelineError,proto3,oneof)
}

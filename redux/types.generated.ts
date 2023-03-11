export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ActionInputField = {
  __typename?: 'ActionInputField';
  deleted?: Maybe<Scalars['Int']>;
  fieldSourceApi?: Maybe<Scalars['String']>;
  fieldSourceType?: Maybe<Scalars['Int']>;
  fieldType?: Maybe<Scalars['Int']>;
  helperText?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  keyName?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  serviceApiActionId?: Maybe<Scalars['Int']>;
};

export type ActionInputFieldInput = {
  deleted?: InputMaybe<Scalars['Int']>;
  fieldSourceApi?: InputMaybe<Scalars['String']>;
  fieldSourceType?: InputMaybe<Scalars['Int']>;
  fieldType?: InputMaybe<Scalars['Int']>;
  helperText?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  keyName?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  serviceApiActionId?: InputMaybe<Scalars['Int']>;
};

export type ActionOutputField = {
  __typename?: 'ActionOutputField';
  deleted?: Maybe<Scalars['Int']>;
  fieldType?: Maybe<Scalars['Int']>;
  helperText?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  keyName?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  parserPath?: Maybe<Scalars['String']>;
  serviceApiActionId?: Maybe<Scalars['Int']>;
};

export type ActionOutputFieldInput = {
  deleted?: InputMaybe<Scalars['Int']>;
  fieldType?: InputMaybe<Scalars['Int']>;
  helperText?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  keyName?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  parserPath?: InputMaybe<Scalars['String']>;
  serviceApiActionId?: InputMaybe<Scalars['Int']>;
};

export type AutoFlow = {
  __typename?: 'AutoFlow';
  actionId?: Maybe<Scalars['Int']>;
  actionInfo?: Maybe<Scalars['String']>;
  archived?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  triggerId?: Maybe<Scalars['Int']>;
  triggerInfo?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

export type AutoFlowInput = {
  actionId?: InputMaybe<Scalars['Int']>;
  actionInfo?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Int']>;
  code?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  triggerId?: InputMaybe<Scalars['Int']>;
  triggerInfo?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type ExposeField = {
  __typename?: 'ExposeField';
  deleted?: Maybe<Scalars['Int']>;
  fieldType?: Maybe<Scalars['Int']>;
  helperText?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  keyName?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  parserPath?: Maybe<Scalars['String']>;
  serviceTriggerId?: Maybe<Scalars['Int']>;
};

export type ExposeFieldInput = {
  deleted?: InputMaybe<Scalars['Int']>;
  fieldType?: InputMaybe<Scalars['Int']>;
  helperText?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  keyName?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  parserPath?: InputMaybe<Scalars['String']>;
  serviceTriggerId?: InputMaybe<Scalars['Int']>;
};

export type FieldMappingItem = {
  __typename?: 'FieldMappingItem';
  actionInputFieldId?: Maybe<Scalars['Int']>;
  exposeFieldId?: Maybe<Scalars['Int']>;
  exposeLabel?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

export type FieldMappingItemInput = {
  actionInputFieldId?: InputMaybe<Scalars['Int']>;
  exposeFieldId?: InputMaybe<Scalars['Int']>;
  exposeLabel?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  value?: InputMaybe<Scalars['String']>;
};

export type FieldOption = {
  __typename?: 'FieldOption';
  actionId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  triggerId?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

export type FieldOptionInput = {
  actionId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  label?: InputMaybe<Scalars['String']>;
  triggerId?: InputMaybe<Scalars['Int']>;
  value?: InputMaybe<Scalars['String']>;
};

export type MostSearchedServiceType = {
  __typename?: 'MostSearchedServiceType';
  createdBy?: Maybe<Scalars['Int']>;
  deleted?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  serviceType?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateFlow: Scalars['Boolean'];
  addActionInputField?: Maybe<ActionInputField>;
  addActionOutputField?: Maybe<ActionOutputField>;
  addAutoFlow?: Maybe<AutoFlow>;
  addExposeField?: Maybe<ExposeField>;
  addExposeFields: Scalars['Int'];
  addFieldMappingItems: Scalars['Int'];
  addFieldOptions?: Maybe<Scalars['Int']>;
  addService: Service;
  addServiceAction?: Maybe<ServiceAction>;
  addServiceApi: ServiceApi;
  addServiceAuth: ServiceAuth;
  addServiceTrigger?: Maybe<ServiceTrigger>;
  addTriggerField?: Maybe<TriggerField>;
  addTriggerFields?: Maybe<Scalars['Int']>;
  addUser?: Maybe<UserInfo>;
  createUpdateFieldMappingItems?: Maybe<Scalars['Int']>;
  deleteActionOutputField?: Maybe<ActionOutputField>;
  deleteFieldMappingItem?: Maybe<FieldMappingItem>;
  deleteServiceAction?: Maybe<ServiceAction>;
  loginIn: Scalars['String'];
  removeActionInputField?: Maybe<ActionInputField>;
  removeAutoFlow?: Maybe<AutoFlow>;
  removeExposeField?: Maybe<ExposeField>;
  removeServiceTrigger: Scalars['Boolean'];
  removeTriggerField: Scalars['Boolean'];
  signIn: Scalars['String'];
  testCode: Scalars['Boolean'];
  updateActionInputField?: Maybe<ActionInputField>;
  updateActionOutputField?: Maybe<ActionOutputField>;
  updateAutoFlow?: Maybe<AutoFlow>;
  updateExposeField?: Maybe<ExposeField>;
  updateFieldMappingItem?: Maybe<FieldMappingItem>;
  updateFieldOption?: Maybe<FieldOption>;
  updateMostSearchedService: Scalars['Boolean'];
  updateService: Service;
  updateServiceAction?: Maybe<ServiceAction>;
  updateServiceApi?: Maybe<ServiceApi>;
  updateServiceAuth?: Maybe<ServiceAuth>;
  updateServiceTrigger?: Maybe<ServiceTrigger>;
  updateTriggerField?: Maybe<TriggerField>;
};

export type MutationActivateFlowArgs = {
  flowId: Scalars['Int'];
};

export type MutationAddActionInputFieldArgs = {
  actionInputField: ActionInputFieldInput;
};

export type MutationAddActionOutputFieldArgs = {
  actionOutputField: ActionOutputFieldInput;
};

export type MutationAddAutoFlowArgs = {
  af: AutoFlowInput;
};

export type MutationAddExposeFieldArgs = {
  exposeField: ExposeFieldInput;
};

export type MutationAddExposeFieldsArgs = {
  exposeFields: Array<ExposeFieldInput>;
};

export type MutationAddFieldMappingItemsArgs = {
  mappingItems: Array<FieldMappingItemInput>;
};

export type MutationAddFieldOptionsArgs = {
  options: Array<FieldOptionInput>;
};

export type MutationAddServiceArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type MutationAddServiceActionArgs = {
  serviceAction: ServiceActionInput;
};

export type MutationAddServiceApiArgs = {
  serviceApi: ServiceApiInput;
};

export type MutationAddServiceAuthArgs = {
  service: ServiceAuthInput;
};

export type MutationAddServiceTriggerArgs = {
  serviceTrigger: ServiceTriggerInput;
};

export type MutationAddTriggerFieldArgs = {
  triggerField: TriggerFieldInput;
};

export type MutationAddTriggerFieldsArgs = {
  triggerFieldList: Array<TriggerFieldInput>;
};

export type MutationAddUserArgs = {
  user: UserInfoInput;
};

export type MutationCreateUpdateFieldMappingItemsArgs = {
  mappingItems: Array<FieldMappingItemInput>;
};

export type MutationDeleteActionOutputFieldArgs = {
  actionOutputFieldId: Scalars['Int'];
};

export type MutationDeleteFieldMappingItemArgs = {
  mappingId: Scalars['Int'];
};

export type MutationDeleteServiceActionArgs = {
  serviceActionId: Scalars['Int'];
};

export type MutationLoginInArgs = {
  userInfo: UserInfoInput;
};

export type MutationRemoveActionInputFieldArgs = {
  actionInputFieldId: Scalars['Int'];
};

export type MutationRemoveAutoFlowArgs = {
  autoFlowId: Scalars['Int'];
};

export type MutationRemoveExposeFieldArgs = {
  fieldId: Scalars['Int'];
};

export type MutationRemoveServiceTriggerArgs = {
  triggerId: Scalars['Int'];
};

export type MutationRemoveTriggerFieldArgs = {
  triggerFieldId: Scalars['Int'];
};

export type MutationSignInArgs = {
  userInfo: UserInfoInput;
};

export type MutationUpdateActionInputFieldArgs = {
  actionInputField: ActionInputFieldInput;
};

export type MutationUpdateActionOutputFieldArgs = {
  actionOutputField: ActionOutputFieldInput;
};

export type MutationUpdateAutoFlowArgs = {
  af: AutoFlowInput;
};

export type MutationUpdateExposeFieldArgs = {
  exposeField: ExposeFieldInput;
};

export type MutationUpdateFieldMappingItemArgs = {
  mappingItem: FieldMappingItemInput;
};

export type MutationUpdateFieldOptionArgs = {
  option: FieldOptionInput;
};

export type MutationUpdateMostSearchedServiceArgs = {
  serviceType: Scalars['String'];
};

export type MutationUpdateServiceArgs = {
  deleted?: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  searchItems?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateServiceActionArgs = {
  serviceAction: ServiceActionInput;
};

export type MutationUpdateServiceApiArgs = {
  serviceApi: ServiceApiInput;
};

export type MutationUpdateServiceAuthArgs = {
  service: ServiceAuthInput;
};

export type MutationUpdateServiceTriggerArgs = {
  serviceTriggerInput: ServiceTriggerInput;
};

export type MutationUpdateTriggerFieldArgs = {
  triggerField: TriggerFieldInput;
};

export type Query = {
  __typename?: 'Query';
  actionInputField?: Maybe<ActionInputField>;
  actionInputFields?: Maybe<Array<ActionInputField>>;
  actionOutputField?: Maybe<ActionOutputField>;
  actions?: Maybe<Array<ServiceAction>>;
  autoFlow?: Maybe<AutoFlow>;
  currentUserInfo?: Maybe<UserInfo>;
  exposeField?: Maybe<ExposeField>;
  fieldMappingItems?: Maybe<Array<FieldMappingItem>>;
  fieldMappingItemsByFieldId?: Maybe<Array<FieldMappingItem>>;
  fieldOptionsByType?: Maybe<Array<FieldOption>>;
  flowsByService?: Maybe<Array<AutoFlow>>;
  getExposeFields?: Maybe<Array<ExposeField>>;
  mostSearchServices?: Maybe<Array<MostSearchedServiceType>>;
  permission: Scalars['String'];
  searchServices?: Maybe<Array<Service>>;
  service: Service;
  serviceAction?: Maybe<ServiceAction>;
  serviceApi?: Maybe<ServiceApi>;
  serviceApis: Array<ServiceApi>;
  serviceAuthBy?: Maybe<ServiceAuth>;
  serviceAuthByTrigger?: Maybe<ServiceAuth>;
  serviceAuthsBy: Array<ServiceAuth>;
  services: Array<Service>;
  servicesByType?: Maybe<Array<Service>>;
  servicesByUserId?: Maybe<Array<Service>>;
  triggerField?: Maybe<TriggerField>;
  triggerFieldsBy?: Maybe<Array<TriggerField>>;
  triggers?: Maybe<Array<ServiceTrigger>>;
  userinfo?: Maybe<UserInfo>;
};

export type QueryActionInputFieldArgs = {
  actionInputFieldId: Scalars['Int'];
};

export type QueryActionInputFieldsArgs = {
  actionId: Scalars['Int'];
};

export type QueryActionOutputFieldArgs = {
  actionOutputFieldId: Scalars['Int'];
};

export type QueryActionsArgs = {
  serviceId: Scalars['Int'];
};

export type QueryAutoFlowArgs = {
  flowId: Scalars['Int'];
};

export type QueryExposeFieldArgs = {
  exposeFieldId: Scalars['Int'];
};

export type QueryFieldMappingItemsArgs = {
  actionInputFieldIds: Array<Scalars['Int']>;
};

export type QueryFieldMappingItemsByFieldIdArgs = {
  actionInputFieldId: Scalars['Int'];
};

export type QueryFieldOptionsByTypeArgs = {
  relationId: Scalars['Int'];
  typeId: Scalars['Int'];
};

export type QueryFlowsByServiceArgs = {
  serviceId: Scalars['Int'];
};

export type QueryGetExposeFieldsArgs = {
  triggerId: Scalars['Int'];
};

export type QuerySearchServicesArgs = {
  name: Scalars['String'];
  requestCount: Scalars['Int'];
  sinceId?: InputMaybe<Scalars['Int']>;
  untilId?: InputMaybe<Scalars['Int']>;
};

export type QueryServiceArgs = {
  id: Scalars['Int'];
};

export type QueryServiceActionArgs = {
  serviceActionId: Scalars['Int'];
};

export type QueryServiceApiArgs = {
  serviceApiId: Scalars['Int'];
};

export type QueryServiceApisArgs = {
  serviceId: Scalars['Int'];
};

export type QueryServiceAuthByArgs = {
  serviceId: Scalars['Int'];
};

export type QueryServiceAuthByTriggerArgs = {
  triggerId: Scalars['Int'];
};

export type QueryServiceAuthsByArgs = {
  serviceId: Scalars['Int'];
};

export type QueryServicesByTypeArgs = {
  serviceType: Scalars['String'];
};

export type QueryTriggerFieldArgs = {
  triggerFieldId: Scalars['Int'];
};

export type QueryTriggerFieldsByArgs = {
  triggerId: Scalars['Int'];
};

export type QueryTriggersArgs = {
  serviceId: Scalars['Int'];
};

export type QueryUserinfoArgs = {
  email: Scalars['String'];
};

export type Service = {
  __typename?: 'Service';
  connected?: Maybe<Scalars['Boolean']>;
  deleted: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  searchItems?: Maybe<Array<Scalars['String']>>;
  serviceAPIs?: Maybe<Array<ServiceApi>>;
  serviceAuths?: Maybe<Array<ServiceAuth>>;
};

export type ServiceApi = {
  __typename?: 'ServiceAPI';
  category?: Maybe<Scalars['Int']>;
  deleted?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  inviteUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  serviceId?: Maybe<Scalars['Int']>;
  servicePath?: Maybe<Scalars['String']>;
  serviceTriggers?: Maybe<Array<ServiceTrigger>>;
  supportMail?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ServiceApiInput = {
  category?: InputMaybe<Scalars['Int']>;
  deleted?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  inviteUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  serviceId: Scalars['Int'];
  servicePath?: InputMaybe<Scalars['String']>;
  supportMail?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ServiceAction = {
  __typename?: 'ServiceAction';
  description?: Maybe<Scalars['String']>;
  endpointPath?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  inputFields?: Maybe<Array<ActionInputField>>;
  name?: Maybe<Scalars['String']>;
  outputFields?: Maybe<Array<ActionOutputField>>;
  serviceApiId?: Maybe<Scalars['Int']>;
};

export type ServiceActionInput = {
  description?: InputMaybe<Scalars['String']>;
  endpointPath?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  inputFields?: InputMaybe<Array<ActionInputFieldInput>>;
  name?: InputMaybe<Scalars['String']>;
  outputFields?: InputMaybe<Array<ActionOutputFieldInput>>;
  serviceApiId?: InputMaybe<Scalars['Int']>;
};

export type ServiceAuth = {
  __typename?: 'ServiceAuth';
  accessToken?: Maybe<Scalars['String']>;
  accessTokenTtl?: Maybe<Scalars['Float']>;
  authorizationUrl?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['Int']>;
  clientId?: Maybe<Scalars['String']>;
  clientSecret?: Maybe<Scalars['String']>;
  demoAccountLogin?: Maybe<Scalars['String']>;
  demoAccountNotes?: Maybe<Scalars['String']>;
  demoAccountPassword?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  providerName?: Maybe<Scalars['String']>;
  redirectUrl?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  refreshTokenTtl?: Maybe<Scalars['Float']>;
  scope?: Maybe<Scalars['String']>;
  serviceId?: Maybe<Scalars['Int']>;
  tokenSecret?: Maybe<Scalars['String']>;
  tokenUrl?: Maybe<Scalars['String']>;
};

export type ServiceAuthInput = {
  accessToken?: InputMaybe<Scalars['String']>;
  accessTokenTtl?: InputMaybe<Scalars['Float']>;
  authorizationUrl?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['Int']>;
  clientId?: InputMaybe<Scalars['String']>;
  clientSecret?: InputMaybe<Scalars['String']>;
  demoAccountLogin?: InputMaybe<Scalars['String']>;
  demoAccountNotes?: InputMaybe<Scalars['String']>;
  demoAccountPassword?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  providerName?: InputMaybe<Scalars['String']>;
  redirectUrl?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  refreshTokenTtl?: InputMaybe<Scalars['Float']>;
  scope?: InputMaybe<Scalars['String']>;
  serviceId: Scalars['Int'];
  tokenSecret?: InputMaybe<Scalars['String']>;
  tokenUrl?: InputMaybe<Scalars['String']>;
};

export type ServiceTrigger = {
  __typename?: 'ServiceTrigger';
  description?: Maybe<Scalars['String']>;
  endpointPath: Scalars['String'];
  endpointType?: Maybe<Scalars['Int']>;
  fields?: Maybe<Array<TriggerField>>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  serviceApiId?: Maybe<Scalars['Int']>;
};

export type ServiceTriggerInput = {
  description?: InputMaybe<Scalars['String']>;
  endpointPath?: InputMaybe<Scalars['String']>;
  endpointType?: InputMaybe<Scalars['Int']>;
  fields?: InputMaybe<Array<TriggerFieldInput>>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  serviceApiId: Scalars['Int'];
};

export type TriggerField = {
  __typename?: 'TriggerField';
  deleted?: Maybe<Scalars['Int']>;
  helperText?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  inputSourceApi?: Maybe<Scalars['String']>;
  inputSourceType?: Maybe<Scalars['Int']>;
  inputType?: Maybe<Scalars['Int']>;
  keyName?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  serviceTriggerId?: Maybe<Scalars['Int']>;
  validationRequired?: Maybe<Scalars['Boolean']>;
  validationRule?: Maybe<Scalars['Int']>;
};

export type TriggerFieldInput = {
  deleted?: InputMaybe<Scalars['Int']>;
  helperText?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  inputSourceApi?: InputMaybe<Scalars['String']>;
  inputSourceType?: InputMaybe<Scalars['Int']>;
  inputType?: InputMaybe<Scalars['Int']>;
  keyName?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  serviceTriggerId?: InputMaybe<Scalars['Int']>;
  validationRequired?: InputMaybe<Scalars['Boolean']>;
  validationRule?: InputMaybe<Scalars['Int']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserInfoInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

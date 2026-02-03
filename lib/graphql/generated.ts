import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { fetcher } from '@/lib/graphql/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  apartment?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  company?: Maybe<Company>;
  floor?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  neighborhood?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  person?: Maybe<Person>;
  reference?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type BusinessCategory = {
  __typename?: 'BusinessCategory';
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  subCategories?: Maybe<Array<BusinessSubCategory>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BusinessSubCategory = {
  __typename?: 'BusinessSubCategory';
  businessCategoryId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type City = {
  __typename?: 'City';
  addresses?: Maybe<Array<Address>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  province?: Maybe<Province>;
};

export type Company = {
  __typename?: 'Company';
  businessCategory?: Maybe<BusinessCategory>;
  businessCategoryId?: Maybe<Scalars['Float']['output']>;
  businessName?: Maybe<Scalars['String']['output']>;
  contacts?: Maybe<Array<Contact>>;
  createdAt: Scalars['DateTime']['output'];
  cuit: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  type: ContactType;
  value: Scalars['String']['output'];
};

export type ContactFilterInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
};

export enum ContactType {
  Email = 'EMAIL',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Other = 'OTHER',
  Phone = 'PHONE',
  Telegram = 'TELEGRAM',
  Whatsapp = 'WHATSAPP'
}

export type Country = {
  __typename?: 'Country';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  provinces?: Maybe<Array<Province>>;
};

export type CreateAddressInput = {
  apartment?: InputMaybe<Scalars['String']['input']>;
  cityId: Scalars['Int']['input'];
  companyId?: InputMaybe<Scalars['Int']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCityInput = {
  name: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  provinceId: Scalars['Int']['input'];
};

export type CreateContactInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  information?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
  type: ContactType;
  value: Scalars['String']['input'];
};

export type Employee = {
  __typename?: 'Employee';
  category?: Maybe<EmployeeCategory>;
  company?: Maybe<Company>;
  companyId: Scalars['Int']['output'];
  employeeCode: Scalars['String']['output'];
  hireDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  person: Person;
  personId: Scalars['Int']['output'];
  position?: Maybe<EmployeePosition>;
  status: EmployeeStatus;
};

export type EmployeeCategory = {
  __typename?: 'EmployeeCategory';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EmployeePosition = {
  __typename?: 'EmployeePosition';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum EmployeeStatus {
  Active = 'ACTIVE',
  Suspended = 'SUSPENDED',
  Terminated = 'TERMINATED'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export enum MaritalStatus {
  Divorced = 'DIVORCED',
  Married = 'MARRIED',
  Single = 'SINGLE',
  Widowed = 'WIDOWED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAddress: Address;
  createCity: City;
  createContact: Contact;
  deleteAddress: Address;
  deleteCity: City;
  deleteContact: Contact;
  hardDeleteAddress: Address;
  hardDeleteBusinessCategory: BusinessCategory;
  hardDeleteBusinessSubCategory: BusinessSubCategory;
  hardDeleteCity: City;
  hardDeleteCompany: Company;
  hardDeleteContact: Contact;
  hardDeleteCountry: Country;
  hardDeleteEmployee: Employee;
  hardDeleteEmployeeCategory: EmployeeCategory;
  hardDeleteEmployeePosition: EmployeePosition;
  hardDeletePerson: Person;
  hardDeleteProvince: Province;
  removeAddress: Address;
  removeBusinessCategory: BusinessCategory;
  removeBusinessSubCategory: BusinessSubCategory;
  removeCity: City;
  removeCompany: Company;
  removeContact: Contact;
  removeCountry: Country;
  removeEmployee: Employee;
  removeEmployeeCategory: EmployeeCategory;
  removeEmployeePosition: EmployeePosition;
  removePerson: Person;
  removeProvince: Province;
  restoreAddress: Address;
  restoreBusinessCategory: BusinessCategory;
  restoreBusinessSubCategory: BusinessSubCategory;
  restoreCity: City;
  restoreCompany: Company;
  restoreContact: Contact;
  restoreCountry: Country;
  restoreEmployee: Employee;
  restoreEmployeeCategory: EmployeeCategory;
  restoreEmployeePosition: EmployeePosition;
  restorePerson: Person;
  restoreProvince: Province;
  updateAddress: Address;
  updateCity: City;
  updateContact: Contact;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateCityArgs = {
  input: CreateCityInput;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteCityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteCountryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEmployeeCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEmployeePositionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeletePersonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCountryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEmployeeCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEmployeePositionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePersonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreCityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreCountryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEmployeeCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEmployeePositionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestorePersonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateAddressArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAddressInput;
};


export type MutationUpdateCityArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCityInput;
};


export type MutationUpdateContactArgs = {
  id: Scalars['Int']['input'];
  input: UpdateContactInput;
};

export type PaginatedAddress = {
  __typename?: 'PaginatedAddress';
  data: Array<Address>;
  meta: PaginationMeta;
};

export type PaginatedBusinessCategory = {
  __typename?: 'PaginatedBusinessCategory';
  data: Array<BusinessCategory>;
  meta: PaginationMeta;
};

export type PaginatedBusinessSubCategory = {
  __typename?: 'PaginatedBusinessSubCategory';
  data: Array<BusinessSubCategory>;
  meta: PaginationMeta;
};

export type PaginatedCity = {
  __typename?: 'PaginatedCity';
  data: Array<City>;
  meta: PaginationMeta;
};

export type PaginatedCompany = {
  __typename?: 'PaginatedCompany';
  data: Array<Company>;
  meta: PaginationMeta;
};

export type PaginatedContact = {
  __typename?: 'PaginatedContact';
  data: Array<Contact>;
  meta: PaginationMeta;
};

export type PaginatedCountry = {
  __typename?: 'PaginatedCountry';
  data: Array<Country>;
  meta: PaginationMeta;
};

export type PaginatedEmployee = {
  __typename?: 'PaginatedEmployee';
  data: Array<Employee>;
  meta: PaginationMeta;
};

export type PaginatedEmployeeCategory = {
  __typename?: 'PaginatedEmployeeCategory';
  data: Array<EmployeeCategory>;
  meta: PaginationMeta;
};

export type PaginatedEmployeePosition = {
  __typename?: 'PaginatedEmployeePosition';
  data: Array<EmployeePosition>;
  meta: PaginationMeta;
};

export type PaginatedPerson = {
  __typename?: 'PaginatedPerson';
  data: Array<Person>;
  meta: PaginationMeta;
};

export type PaginatedProvince = {
  __typename?: 'PaginatedProvince';
  data: Array<Province>;
  meta: PaginationMeta;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Person = {
  __typename?: 'Person';
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  contacts?: Maybe<Array<Contact>>;
  cuil?: Maybe<Scalars['String']['output']>;
  dni: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender?: Maybe<Gender>;
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  maritalStatus?: Maybe<MaritalStatus>;
  status: PersonStatus;
};

export enum PersonStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Province = {
  __typename?: 'Province';
  cities?: Maybe<Array<City>>;
  country?: Maybe<Country>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAddresses: PaginatedAddress;
  findAllAddresss: Array<Address>;
  findAllBusinessCategories: PaginatedBusinessCategory;
  findAllBusinessCategorys: Array<BusinessCategory>;
  findAllBusinessSubCategories: PaginatedBusinessSubCategory;
  findAllBusinessSubCategorys: Array<BusinessSubCategory>;
  findAllCitys: Array<City>;
  findAllCompanies: PaginatedCompany;
  findAllCompanys: Array<Company>;
  findAllContacts: Array<Contact>;
  findAllCountrys: Array<Country>;
  findAllEmployeeCategories: PaginatedEmployeeCategory;
  findAllEmployeeCategorys: Array<EmployeeCategory>;
  findAllEmployeePositions: PaginatedEmployeePosition;
  findAllEmployees: PaginatedEmployee;
  findAllPersons: PaginatedPerson;
  findAllProvinces: Array<Province>;
  findCities: PaginatedCity;
  findContacts: PaginatedContact;
  findCountries: PaginatedCountry;
  findOneAddress: Address;
  findOneBusinessCategory: BusinessCategory;
  findOneBusinessSubCategory: BusinessSubCategory;
  findOneCity: City;
  findOneCompany: Company;
  findOneContact: Contact;
  findOneCountry: Country;
  findOneEmployee: Employee;
  findOneEmployeeCategory: EmployeeCategory;
  findOneEmployeePosition: EmployeePosition;
  findOnePerson: Person;
  findOneProvince: Province;
  findProvinces: PaginatedProvince;
};


export type QueryFindAddressesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllAddresssArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllBusinessCategoriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllBusinessCategorysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllBusinessSubCategoriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllBusinessSubCategorysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllCitysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllCompaniesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllCompanysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllContactsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllCountrysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEmployeeCategoriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEmployeeCategorysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEmployeePositionsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEmployeesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllPersonsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllProvincesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindCitiesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindContactsArgs = {
  filter?: InputMaybe<ContactFilterInput>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindCountriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindOneAddressArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneCityArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneContactArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneCountryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEmployeeCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEmployeePositionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOnePersonArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindProvincesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAddressInput = {
  apartment?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCityInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  provinceId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateContactInput = {
  information?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ContactType>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type FindAddressesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindAddressesQuery = { __typename?: 'Query', findAddresses: { __typename?: 'PaginatedAddress', data: Array<{ __typename?: 'Address', id: number, street?: string | null, number?: string | null, floor?: string | null, apartment?: string | null, neighborhood?: string | null, reference?: string | null, latitude?: number | null, longitude?: number | null, isActive: boolean, city?: { __typename?: 'City', id: number, name: string, province?: { __typename?: 'Province', id: number, name: string, country?: { __typename?: 'Country', id: number, name: string } | null } | null } | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type CreateAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'Address', id: number, street?: string | null, number?: string | null, city?: { __typename?: 'City', id: number, name: string } | null } };

export type UpdateAddressMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateAddressInput;
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress: { __typename?: 'Address', id: number, street?: string | null, number?: string | null, city?: { __typename?: 'City', id: number, name: string } | null } };

export type DeleteAddressMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteAddressMutation = { __typename?: 'Mutation', deleteAddress: { __typename?: 'Address', id: number } };

export type FindCitiesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindCitiesQuery = { __typename?: 'Query', findCities: { __typename?: 'PaginatedCity', data: Array<{ __typename?: 'City', id: number, name: string, postalCode: string, province?: { __typename?: 'Province', id: number, name: string, country?: { __typename?: 'Country', id: number, name: string } | null } | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type CreateCityMutationVariables = Exact<{
  input: CreateCityInput;
}>;


export type CreateCityMutation = { __typename?: 'Mutation', createCity: { __typename?: 'City', id: number, name: string, postalCode: string, province?: { __typename?: 'Province', id: number, name: string } | null } };

export type UpdateCityMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateCityInput;
}>;


export type UpdateCityMutation = { __typename?: 'Mutation', updateCity: { __typename?: 'City', id: number, name: string, postalCode: string, province?: { __typename?: 'Province', id: number, name: string } | null } };

export type DeleteCityMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCityMutation = { __typename?: 'Mutation', deleteCity: { __typename?: 'City', id: number } };

export type FindContactsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ContactFilterInput>;
}>;


export type FindContactsQuery = { __typename?: 'Query', findContacts: { __typename?: 'PaginatedContact', data: Array<{ __typename?: 'Contact', id: number, type: ContactType, value: string, label?: string | null, information?: string | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type CreateContactMutationVariables = Exact<{
  input: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', id: number, type: ContactType, value: string, label?: string | null, information?: string | null } };

export type UpdateContactMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateContactInput;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact: { __typename?: 'Contact', id: number, type: ContactType, value: string, label?: string | null, information?: string | null } };

export type DeleteContactMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact: { __typename?: 'Contact', id: number } };

export type FindCountriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindCountriesQuery = { __typename?: 'Query', findCountries: { __typename?: 'PaginatedCountry', data: Array<{ __typename?: 'Country', id: number, name: string, provinces?: Array<{ __typename?: 'Province', id: number, name: string }> | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type GetEmployeesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEmployeesQuery = { __typename?: 'Query', findAllEmployees: { __typename?: 'PaginatedEmployee', data: Array<{ __typename?: 'Employee', id: number, employeeCode: string, status: EmployeeStatus, hireDate: any, personId: number, companyId: number, person: { __typename?: 'Person', firstName: string, lastName: string }, company?: { __typename?: 'Company', name: string } | null, category?: { __typename?: 'EmployeeCategory', name: string } | null, position?: { __typename?: 'EmployeePosition', name: string } | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type GetPersonsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPersonsQuery = { __typename?: 'Query', findAllPersons: { __typename?: 'PaginatedPerson', data: Array<{ __typename?: 'Person', id: number, firstName: string, lastName: string, dni: string, cuil?: string | null, status: PersonStatus, birthDate?: any | null, gender?: Gender | null, maritalStatus?: MaritalStatus | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type FindProvincesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindProvincesQuery = { __typename?: 'Query', findProvinces: { __typename?: 'PaginatedProvince', data: Array<{ __typename?: 'Province', id: number, name: string, country?: { __typename?: 'Country', id: number, name: string } | null, cities?: Array<{ __typename?: 'City', id: number, name: string, postalCode: string }> | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };



export const FindAddressesDocument = `
    query FindAddresses($skip: Int, $take: Int, $q: String) {
  findAddresses(skip: $skip, take: $take, q: $q) {
    data {
      id
      street
      number
      floor
      apartment
      neighborhood
      reference
      latitude
      longitude
      isActive
      city {
        id
        name
        province {
          id
          name
          country {
            id
            name
          }
        }
      }
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useFindAddressesQuery = <
      TData = FindAddressesQuery,
      TError = unknown
    >(
      variables?: FindAddressesQueryVariables,
      options?: Omit<UseQueryOptions<FindAddressesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindAddressesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindAddressesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindAddresses'] : ['FindAddresses', variables],
    queryFn: fetcher<FindAddressesQuery, FindAddressesQueryVariables>(FindAddressesDocument, variables),
    ...options
  }
    )};

useFindAddressesQuery.getKey = (variables?: FindAddressesQueryVariables) => variables === undefined ? ['FindAddresses'] : ['FindAddresses', variables];


useFindAddressesQuery.fetcher = (variables?: FindAddressesQueryVariables, options?: RequestInit['headers']) => fetcher<FindAddressesQuery, FindAddressesQueryVariables>(FindAddressesDocument, variables, options);

export const CreateAddressDocument = `
    mutation CreateAddress($input: CreateAddressInput!) {
  createAddress(input: $input) {
    id
    street
    number
    city {
      id
      name
    }
  }
}
    `;

export const useCreateAddressMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateAddressMutation, TError, CreateAddressMutationVariables, TContext>) => {
    
    return useMutation<CreateAddressMutation, TError, CreateAddressMutationVariables, TContext>(
      {
    mutationKey: ['CreateAddress'],
    mutationFn: (variables?: CreateAddressMutationVariables) => fetcher<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, variables)(),
    ...options
  }
    )};


useCreateAddressMutation.fetcher = (variables: CreateAddressMutationVariables, options?: RequestInit['headers']) => fetcher<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, variables, options);

export const UpdateAddressDocument = `
    mutation UpdateAddress($id: Int!, $input: UpdateAddressInput!) {
  updateAddress(id: $id, input: $input) {
    id
    street
    number
    city {
      id
      name
    }
  }
}
    `;

export const useUpdateAddressMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateAddressMutation, TError, UpdateAddressMutationVariables, TContext>) => {
    
    return useMutation<UpdateAddressMutation, TError, UpdateAddressMutationVariables, TContext>(
      {
    mutationKey: ['UpdateAddress'],
    mutationFn: (variables?: UpdateAddressMutationVariables) => fetcher<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, variables)(),
    ...options
  }
    )};


useUpdateAddressMutation.fetcher = (variables: UpdateAddressMutationVariables, options?: RequestInit['headers']) => fetcher<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, variables, options);

export const DeleteAddressDocument = `
    mutation DeleteAddress($id: Int!) {
  deleteAddress(id: $id) {
    id
  }
}
    `;

export const useDeleteAddressMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteAddressMutation, TError, DeleteAddressMutationVariables, TContext>) => {
    
    return useMutation<DeleteAddressMutation, TError, DeleteAddressMutationVariables, TContext>(
      {
    mutationKey: ['DeleteAddress'],
    mutationFn: (variables?: DeleteAddressMutationVariables) => fetcher<DeleteAddressMutation, DeleteAddressMutationVariables>(DeleteAddressDocument, variables)(),
    ...options
  }
    )};


useDeleteAddressMutation.fetcher = (variables: DeleteAddressMutationVariables, options?: RequestInit['headers']) => fetcher<DeleteAddressMutation, DeleteAddressMutationVariables>(DeleteAddressDocument, variables, options);

export const FindCitiesDocument = `
    query FindCities($skip: Int, $take: Int, $q: String) {
  findCities(skip: $skip, take: $take, q: $q) {
    data {
      id
      name
      postalCode
      province {
        id
        name
        country {
          id
          name
        }
      }
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useFindCitiesQuery = <
      TData = FindCitiesQuery,
      TError = unknown
    >(
      variables?: FindCitiesQueryVariables,
      options?: Omit<UseQueryOptions<FindCitiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindCitiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindCitiesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindCities'] : ['FindCities', variables],
    queryFn: fetcher<FindCitiesQuery, FindCitiesQueryVariables>(FindCitiesDocument, variables),
    ...options
  }
    )};

useFindCitiesQuery.getKey = (variables?: FindCitiesQueryVariables) => variables === undefined ? ['FindCities'] : ['FindCities', variables];


useFindCitiesQuery.fetcher = (variables?: FindCitiesQueryVariables, options?: RequestInit['headers']) => fetcher<FindCitiesQuery, FindCitiesQueryVariables>(FindCitiesDocument, variables, options);

export const CreateCityDocument = `
    mutation CreateCity($input: CreateCityInput!) {
  createCity(input: $input) {
    id
    name
    postalCode
    province {
      id
      name
    }
  }
}
    `;

export const useCreateCityMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCityMutation, TError, CreateCityMutationVariables, TContext>) => {
    
    return useMutation<CreateCityMutation, TError, CreateCityMutationVariables, TContext>(
      {
    mutationKey: ['CreateCity'],
    mutationFn: (variables?: CreateCityMutationVariables) => fetcher<CreateCityMutation, CreateCityMutationVariables>(CreateCityDocument, variables)(),
    ...options
  }
    )};


useCreateCityMutation.fetcher = (variables: CreateCityMutationVariables, options?: RequestInit['headers']) => fetcher<CreateCityMutation, CreateCityMutationVariables>(CreateCityDocument, variables, options);

export const UpdateCityDocument = `
    mutation UpdateCity($id: Int!, $input: UpdateCityInput!) {
  updateCity(id: $id, input: $input) {
    id
    name
    postalCode
    province {
      id
      name
    }
  }
}
    `;

export const useUpdateCityMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCityMutation, TError, UpdateCityMutationVariables, TContext>) => {
    
    return useMutation<UpdateCityMutation, TError, UpdateCityMutationVariables, TContext>(
      {
    mutationKey: ['UpdateCity'],
    mutationFn: (variables?: UpdateCityMutationVariables) => fetcher<UpdateCityMutation, UpdateCityMutationVariables>(UpdateCityDocument, variables)(),
    ...options
  }
    )};


useUpdateCityMutation.fetcher = (variables: UpdateCityMutationVariables, options?: RequestInit['headers']) => fetcher<UpdateCityMutation, UpdateCityMutationVariables>(UpdateCityDocument, variables, options);

export const DeleteCityDocument = `
    mutation DeleteCity($id: Int!) {
  deleteCity(id: $id) {
    id
  }
}
    `;

export const useDeleteCityMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteCityMutation, TError, DeleteCityMutationVariables, TContext>) => {
    
    return useMutation<DeleteCityMutation, TError, DeleteCityMutationVariables, TContext>(
      {
    mutationKey: ['DeleteCity'],
    mutationFn: (variables?: DeleteCityMutationVariables) => fetcher<DeleteCityMutation, DeleteCityMutationVariables>(DeleteCityDocument, variables)(),
    ...options
  }
    )};


useDeleteCityMutation.fetcher = (variables: DeleteCityMutationVariables, options?: RequestInit['headers']) => fetcher<DeleteCityMutation, DeleteCityMutationVariables>(DeleteCityDocument, variables, options);

export const FindContactsDocument = `
    query FindContacts($skip: Int, $take: Int, $q: String, $filter: ContactFilterInput) {
  findContacts(skip: $skip, take: $take, q: $q, filter: $filter) {
    data {
      id
      type
      value
      label
      information
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useFindContactsQuery = <
      TData = FindContactsQuery,
      TError = unknown
    >(
      variables?: FindContactsQueryVariables,
      options?: Omit<UseQueryOptions<FindContactsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindContactsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindContactsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindContacts'] : ['FindContacts', variables],
    queryFn: fetcher<FindContactsQuery, FindContactsQueryVariables>(FindContactsDocument, variables),
    ...options
  }
    )};

useFindContactsQuery.getKey = (variables?: FindContactsQueryVariables) => variables === undefined ? ['FindContacts'] : ['FindContacts', variables];


useFindContactsQuery.fetcher = (variables?: FindContactsQueryVariables, options?: RequestInit['headers']) => fetcher<FindContactsQuery, FindContactsQueryVariables>(FindContactsDocument, variables, options);

export const CreateContactDocument = `
    mutation CreateContact($input: CreateContactInput!) {
  createContact(input: $input) {
    id
    type
    value
    label
    information
  }
}
    `;

export const useCreateContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateContactMutation, TError, CreateContactMutationVariables, TContext>) => {
    
    return useMutation<CreateContactMutation, TError, CreateContactMutationVariables, TContext>(
      {
    mutationKey: ['CreateContact'],
    mutationFn: (variables?: CreateContactMutationVariables) => fetcher<CreateContactMutation, CreateContactMutationVariables>(CreateContactDocument, variables)(),
    ...options
  }
    )};


useCreateContactMutation.fetcher = (variables: CreateContactMutationVariables, options?: RequestInit['headers']) => fetcher<CreateContactMutation, CreateContactMutationVariables>(CreateContactDocument, variables, options);

export const UpdateContactDocument = `
    mutation UpdateContact($id: Int!, $input: UpdateContactInput!) {
  updateContact(id: $id, input: $input) {
    id
    type
    value
    label
    information
  }
}
    `;

export const useUpdateContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateContactMutation, TError, UpdateContactMutationVariables, TContext>) => {
    
    return useMutation<UpdateContactMutation, TError, UpdateContactMutationVariables, TContext>(
      {
    mutationKey: ['UpdateContact'],
    mutationFn: (variables?: UpdateContactMutationVariables) => fetcher<UpdateContactMutation, UpdateContactMutationVariables>(UpdateContactDocument, variables)(),
    ...options
  }
    )};


useUpdateContactMutation.fetcher = (variables: UpdateContactMutationVariables, options?: RequestInit['headers']) => fetcher<UpdateContactMutation, UpdateContactMutationVariables>(UpdateContactDocument, variables, options);

export const DeleteContactDocument = `
    mutation DeleteContact($id: Int!) {
  deleteContact(id: $id) {
    id
  }
}
    `;

export const useDeleteContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteContactMutation, TError, DeleteContactMutationVariables, TContext>) => {
    
    return useMutation<DeleteContactMutation, TError, DeleteContactMutationVariables, TContext>(
      {
    mutationKey: ['DeleteContact'],
    mutationFn: (variables?: DeleteContactMutationVariables) => fetcher<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, variables)(),
    ...options
  }
    )};


useDeleteContactMutation.fetcher = (variables: DeleteContactMutationVariables, options?: RequestInit['headers']) => fetcher<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, variables, options);

export const FindCountriesDocument = `
    query FindCountries($skip: Int, $take: Int, $q: String) {
  findCountries(skip: $skip, take: $take, q: $q) {
    data {
      id
      name
      provinces {
        id
        name
      }
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useFindCountriesQuery = <
      TData = FindCountriesQuery,
      TError = unknown
    >(
      variables?: FindCountriesQueryVariables,
      options?: Omit<UseQueryOptions<FindCountriesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindCountriesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindCountriesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindCountries'] : ['FindCountries', variables],
    queryFn: fetcher<FindCountriesQuery, FindCountriesQueryVariables>(FindCountriesDocument, variables),
    ...options
  }
    )};

useFindCountriesQuery.getKey = (variables?: FindCountriesQueryVariables) => variables === undefined ? ['FindCountries'] : ['FindCountries', variables];


useFindCountriesQuery.fetcher = (variables?: FindCountriesQueryVariables, options?: RequestInit['headers']) => fetcher<FindCountriesQuery, FindCountriesQueryVariables>(FindCountriesDocument, variables, options);

export const GetEmployeesDocument = `
    query GetEmployees($skip: Int, $take: Int, $where: String, $orderBy: String) {
  findAllEmployees(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
    data {
      id
      employeeCode
      status
      hireDate
      personId
      person {
        firstName
        lastName
      }
      companyId
      company {
        name
      }
      category {
        name
      }
      position {
        name
      }
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useGetEmployeesQuery = <
      TData = GetEmployeesQuery,
      TError = unknown
    >(
      variables?: GetEmployeesQueryVariables,
      options?: Omit<UseQueryOptions<GetEmployeesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetEmployeesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetEmployeesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetEmployees'] : ['GetEmployees', variables],
    queryFn: fetcher<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, variables),
    ...options
  }
    )};

useGetEmployeesQuery.getKey = (variables?: GetEmployeesQueryVariables) => variables === undefined ? ['GetEmployees'] : ['GetEmployees', variables];


useGetEmployeesQuery.fetcher = (variables?: GetEmployeesQueryVariables, options?: RequestInit['headers']) => fetcher<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, variables, options);

export const GetPersonsDocument = `
    query GetPersons($skip: Int, $take: Int, $where: String, $orderBy: String) {
  findAllPersons(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
    data {
      id
      firstName
      lastName
      dni
      cuil
      status
      birthDate
      gender
      maritalStatus
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useGetPersonsQuery = <
      TData = GetPersonsQuery,
      TError = unknown
    >(
      variables?: GetPersonsQueryVariables,
      options?: Omit<UseQueryOptions<GetPersonsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPersonsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPersonsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPersons'] : ['GetPersons', variables],
    queryFn: fetcher<GetPersonsQuery, GetPersonsQueryVariables>(GetPersonsDocument, variables),
    ...options
  }
    )};

useGetPersonsQuery.getKey = (variables?: GetPersonsQueryVariables) => variables === undefined ? ['GetPersons'] : ['GetPersons', variables];


useGetPersonsQuery.fetcher = (variables?: GetPersonsQueryVariables, options?: RequestInit['headers']) => fetcher<GetPersonsQuery, GetPersonsQueryVariables>(GetPersonsDocument, variables, options);

export const FindProvincesDocument = `
    query FindProvinces($skip: Int, $take: Int, $q: String) {
  findProvinces(skip: $skip, take: $take, q: $q) {
    data {
      id
      name
      country {
        id
        name
      }
      cities {
        id
        name
        postalCode
      }
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useFindProvincesQuery = <
      TData = FindProvincesQuery,
      TError = unknown
    >(
      variables?: FindProvincesQueryVariables,
      options?: Omit<UseQueryOptions<FindProvincesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindProvincesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindProvincesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindProvinces'] : ['FindProvinces', variables],
    queryFn: fetcher<FindProvincesQuery, FindProvincesQueryVariables>(FindProvincesDocument, variables),
    ...options
  }
    )};

useFindProvincesQuery.getKey = (variables?: FindProvincesQueryVariables) => variables === undefined ? ['FindProvinces'] : ['FindProvinces', variables];


useFindProvincesQuery.fetcher = (variables?: FindProvincesQueryVariables, options?: RequestInit['headers']) => fetcher<FindProvincesQuery, FindProvincesQueryVariables>(FindProvincesDocument, variables, options);

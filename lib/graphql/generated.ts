import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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

export type Company = {
  __typename?: 'Company';
  businessCategory?: Maybe<BusinessCategory>;
  businessCategoryId?: Maybe<Scalars['Float']['output']>;
  businessName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  cuit: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  hardDeleteBusinessCategory: BusinessCategory;
  hardDeleteBusinessSubCategory: BusinessSubCategory;
  hardDeleteCompany: Company;
  hardDeleteEmployee: Employee;
  hardDeleteEmployeeCategory: EmployeeCategory;
  hardDeleteEmployeePosition: EmployeePosition;
  hardDeletePerson: Person;
  removeBusinessCategory: BusinessCategory;
  removeBusinessSubCategory: BusinessSubCategory;
  removeCompany: Company;
  removeEmployee: Employee;
  removeEmployeeCategory: EmployeeCategory;
  removeEmployeePosition: EmployeePosition;
  removePerson: Person;
  restoreBusinessCategory: BusinessCategory;
  restoreBusinessSubCategory: BusinessSubCategory;
  restoreCompany: Company;
  restoreEmployee: Employee;
  restoreEmployeeCategory: EmployeeCategory;
  restoreEmployeePosition: EmployeePosition;
  restorePerson: Person;
};


export type MutationHardDeleteBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteCompanyArgs = {
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


export type MutationRemoveBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCompanyArgs = {
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


export type MutationRestoreBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreCompanyArgs = {
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

export type PaginatedCompany = {
  __typename?: 'PaginatedCompany';
  data: Array<Company>;
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

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Person = {
  __typename?: 'Person';
  birthDate?: Maybe<Scalars['DateTime']['output']>;
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

export type Query = {
  __typename?: 'Query';
  findAllBusinessCategories: PaginatedBusinessCategory;
  findAllBusinessCategorys: Array<BusinessCategory>;
  findAllBusinessSubCategories: PaginatedBusinessSubCategory;
  findAllBusinessSubCategorys: Array<BusinessSubCategory>;
  findAllCompanies: PaginatedCompany;
  findAllCompanys: Array<Company>;
  findAllEmployeeCategories: PaginatedEmployeeCategory;
  findAllEmployeeCategorys: Array<EmployeeCategory>;
  findAllEmployeePositions: PaginatedEmployeePosition;
  findAllEmployees: PaginatedEmployee;
  findAllPersons: PaginatedPerson;
  findOneBusinessCategory: BusinessCategory;
  findOneBusinessSubCategory: BusinessSubCategory;
  findOneCompany: Company;
  findOneEmployee: Employee;
  findOneEmployeeCategory: EmployeeCategory;
  findOneEmployeePosition: EmployeePosition;
  findOnePerson: Person;
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


export type QueryFindOneBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneCompanyArgs = {
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

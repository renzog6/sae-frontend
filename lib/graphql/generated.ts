import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by ECMA-404 */
  JSON: { input: any; output: any; }
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

export type AddressFilterInput = {
  cityId?: InputMaybe<Scalars['Int']['input']>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
};

export enum AxleType {
  Drive = 'DRIVE',
  Front = 'FRONT',
  Tag = 'TAG',
  Trailer = 'TRAILER'
}

export type Brand = {
  __typename?: 'Brand';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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

export type CreateBrandDto = {
  code: Scalars['String']['input'];
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  information?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCityInput = {
  name: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  provinceId: Scalars['Int']['input'];
};

export type CreateCompanyDto = {
  businessCategoryId?: InputMaybe<Scalars['Int']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  cuit: Scalars['String']['input'];
  information?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateContactInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  information?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
  type: ContactType;
  value: Scalars['String']['input'];
};

export type CreateEmployeeDto = {
  categoryId: Scalars['Int']['input'];
  companyId?: InputMaybe<Scalars['Int']['input']>;
  employeeCode?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  hireDate: Scalars['String']['input'];
  information?: InputMaybe<Scalars['String']['input']>;
  personId: Scalars['Int']['input'];
  positionId: Scalars['Int']['input'];
  status?: InputMaybe<EmployeeStatus>;
};

export type CreateEquipmentDto = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  chassis?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  engine?: InputMaybe<Scalars['String']['input']>;
  fuelType?: InputMaybe<FuelType>;
  internalCode?: InputMaybe<Scalars['String']['input']>;
  licensePlate?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  observation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EquipmentStatus>;
  typeId?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateTireEventDto = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  kmAtEvent?: InputMaybe<Scalars['Int']['input']>;
  tireId: Scalars['Int']['input'];
  type: TireEventType;
};

export type CreateTireInspectionDto = {
  inspectionDate?: InputMaybe<Scalars['DateTime']['input']>;
  observation?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['Float']['input']>;
  tireId: Scalars['Int']['input'];
  treadDepth?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateTirePositionDto = {
  axleId: Scalars['Int']['input'];
  isDual: Scalars['Boolean']['input'];
  positionKey: Scalars['String']['input'];
  side: TireSide;
};

export type CreateTireRecapDto = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  kmAtRecap?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  recapType?: InputMaybe<Scalars['String']['input']>;
  tireId: Scalars['Int']['input'];
};

export type CreateTireRotationDto = {
  fromEquipmentId?: InputMaybe<Scalars['Int']['input']>;
  fromPosition?: InputMaybe<TirePosition>;
  kmAtRotation?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  rotationDate?: InputMaybe<Scalars['DateTime']['input']>;
  tireId: Scalars['Int']['input'];
  toEquipmentId?: InputMaybe<Scalars['Int']['input']>;
  toPosition?: InputMaybe<TirePosition>;
};

export type CreateUnitDto = {
  abbreviation: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export enum Currency {
  Ars = 'ARS',
  Eur = 'EUR',
  Usd = 'USD'
}

export type Employee = {
  __typename?: 'Employee';
  category?: Maybe<EmployeeCategory>;
  categoryId: Scalars['Int']['output'];
  company?: Maybe<Company>;
  companyId: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  employeeCode: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  hireDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  person?: Maybe<Person>;
  personId: Scalars['Int']['output'];
  position?: Maybe<EmployeePosition>;
  positionId: Scalars['Int']['output'];
  status: EmployeeStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type EmployeeVacation = {
  __typename?: 'EmployeeVacation';
  days: Scalars['Int']['output'];
  employee?: Maybe<Employee>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
  type: VacationType;
  year?: Maybe<Scalars['Int']['output']>;
};

export type Equipment = {
  __typename?: 'Equipment';
  axles?: Maybe<Array<EquipmentAxle>>;
  category?: Maybe<EquipmentCategory>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  chassis?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  engine?: Maybe<Scalars['String']['output']>;
  fuelType?: Maybe<FuelType>;
  id: Scalars['Int']['output'];
  internalCode?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  licensePlate?: Maybe<Scalars['String']['output']>;
  maintenances?: Maybe<Array<EquipmentMaintenance>>;
  model?: Maybe<EquipmentModel>;
  modelId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  observation?: Maybe<Scalars['String']['output']>;
  status: EquipmentStatus;
  transactions?: Maybe<Array<EquipmentTransaction>>;
  type?: Maybe<EquipmentType>;
  typeId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type EquipmentAxle = {
  __typename?: 'EquipmentAxle';
  axleType: AxleType;
  description?: Maybe<Scalars['String']['output']>;
  equipment?: Maybe<Equipment>;
  equipmentId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  tirePositions?: Maybe<Array<TirePositionConfig>>;
  wheelCount: Scalars['Int']['output'];
};

export type EquipmentCategory = {
  __typename?: 'EquipmentCategory';
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type EquipmentFilterInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  modelId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EquipmentStatus>;
  typeId?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type EquipmentMaintenance = {
  __typename?: 'EquipmentMaintenance';
  cost?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  equipment?: Maybe<Equipment>;
  equipmentId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
  technician?: Maybe<Scalars['String']['output']>;
  type: MaintenanceType;
  updatedAt: Scalars['DateTime']['output'];
  warranty?: Maybe<Scalars['Boolean']['output']>;
};

export type EquipmentModel = {
  __typename?: 'EquipmentModel';
  brand?: Maybe<Brand>;
  brandId?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<EquipmentType>;
  typeId?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export enum EquipmentStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Maintenance = 'MAINTENANCE',
  Retired = 'RETIRED',
  Sold = 'SOLD'
}

export type EquipmentTransaction = {
  __typename?: 'EquipmentTransaction';
  amount: Scalars['Float']['output'];
  company?: Maybe<Company>;
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  equipment?: Maybe<Equipment>;
  equipmentId: Scalars['Int']['output'];
  exchangeRate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  observation?: Maybe<Scalars['String']['output']>;
  transactionDate: Scalars['DateTime']['output'];
  type: EquipmentTransactionType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum EquipmentTransactionType {
  Purchase = 'PURCHASE',
  Sale = 'SALE'
}

export type EquipmentType = {
  __typename?: 'EquipmentType';
  category?: Maybe<EquipmentCategory>;
  categoryId: Scalars['Int']['output'];
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export enum FuelType {
  Cng = 'CNG',
  Diesel = 'DIESEL',
  Electric = 'ELECTRIC',
  Gasoline = 'GASOLINE',
  Hybrid = 'HYBRID',
  Lpg = 'LPG',
  None = 'NONE'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type HistoryLog = {
  __typename?: 'HistoryLog';
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  employee?: Maybe<Employee>;
  employeeId?: Maybe<Scalars['Int']['output']>;
  equipment?: Maybe<Equipment>;
  equipmentId?: Maybe<Scalars['Int']['output']>;
  eventDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  person?: Maybe<Person>;
  personId?: Maybe<Scalars['Int']['output']>;
  severity: SeverityLevel;
  title: Scalars['String']['output'];
  type: HistoryType;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum HistoryType {
  CompanyEvent = 'COMPANY_EVENT',
  CompanyReminder = 'COMPANY_REMINDER',
  EmployeeAchievement = 'EMPLOYEE_ACHIEVEMENT',
  EmployeeHire = 'EMPLOYEE_HIRE',
  EmployeeIllness = 'EMPLOYEE_ILLNESS',
  EmployeeWarning = 'EMPLOYEE_WARNING',
  EquipmentAccident = 'EQUIPMENT_ACCIDENT',
  EquipmentMaintenance = 'EQUIPMENT_MAINTENANCE',
  EquipmentRepair = 'EQUIPMENT_REPAIR',
  GeneralNote = 'GENERAL_NOTE',
  PersonalEvent = 'PERSONAL_EVENT',
  VacationAssigned = 'VACATION_ASSIGNED',
  VacationTaken = 'VACATION_TAKEN'
}

export type Inspection = {
  __typename?: 'Inspection';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  employee?: Maybe<Employee>;
  employeeId: Scalars['Int']['output'];
  equipment?: Maybe<Equipment>;
  equipmentId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  inspectionTypeId: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  observation?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum MaintenanceType {
  AccidentRepair = 'ACCIDENT_REPAIR',
  Corrective = 'CORRECTIVE',
  Preventive = 'PREVENTIVE',
  RoutineCheck = 'ROUTINE_CHECK'
}

export enum MaritalStatus {
  Divorced = 'DIVORCED',
  Married = 'MARRIED',
  Single = 'SINGLE',
  Widowed = 'WIDOWED'
}

export type MountTireDto = {
  equipmentId?: InputMaybe<Scalars['Int']['input']>;
  kmAtStart?: InputMaybe<Scalars['Int']['input']>;
  mountDate?: InputMaybe<Scalars['DateTime']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  positionConfigId: Scalars['Int']['input'];
  tireId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress: Address;
  createBrand: Brand;
  createCity: City;
  createCompany: Company;
  createContact: Contact;
  createEmployee: Employee;
  createEmployeeVacation: EmployeeVacation;
  createEquipment: Equipment;
  createEquipmentAxle: EquipmentAxle;
  createEquipmentCategory: EquipmentCategory;
  createEquipmentMaintenance: EquipmentMaintenance;
  createEquipmentModel: EquipmentModel;
  createEquipmentTransaction: EquipmentTransaction;
  createEquipmentType: EquipmentType;
  createHistoryLog: HistoryLog;
  createInspection: Inspection;
  createTire: Tire;
  createTireEvent: TireEvent;
  createTireInspection: TireInspection;
  createTireModel: TireModel;
  createTirePosition: TirePositionConfig;
  createTireRecap: TireRecap;
  createTireRotation: TireRotation;
  createTireSize: TireSize;
  createUnit: Unit;
  createUser: User;
  deleteAddress: Address;
  deleteCity: City;
  deleteContact: Contact;
  hardDeleteAddress?: Maybe<Address>;
  hardDeleteBrand?: Maybe<Brand>;
  hardDeleteBusinessCategory?: Maybe<BusinessCategory>;
  hardDeleteBusinessSubCategory?: Maybe<BusinessSubCategory>;
  hardDeleteCity?: Maybe<City>;
  hardDeleteCompany?: Maybe<Company>;
  hardDeleteContact?: Maybe<Contact>;
  hardDeleteCountry?: Maybe<Country>;
  hardDeleteEmployee?: Maybe<Employee>;
  hardDeleteEmployeeCategory?: Maybe<EmployeeCategory>;
  hardDeleteEmployeePosition?: Maybe<EmployeePosition>;
  hardDeleteEmployeeVacation?: Maybe<EmployeeVacation>;
  hardDeleteEquipment?: Maybe<Equipment>;
  hardDeleteEquipmentAxle?: Maybe<EquipmentAxle>;
  hardDeleteEquipmentCategory?: Maybe<EquipmentCategory>;
  hardDeleteEquipmentMaintenance?: Maybe<EquipmentMaintenance>;
  hardDeleteEquipmentModel?: Maybe<EquipmentModel>;
  hardDeleteEquipmentTransaction?: Maybe<EquipmentTransaction>;
  hardDeleteEquipmentType?: Maybe<EquipmentType>;
  hardDeleteHistoryLog?: Maybe<HistoryLog>;
  hardDeleteInspection?: Maybe<Inspection>;
  hardDeletePerson?: Maybe<Person>;
  hardDeleteProvince?: Maybe<Province>;
  hardDeleteTire?: Maybe<Tire>;
  hardDeleteTireModel?: Maybe<TireModel>;
  hardDeleteTireSize?: Maybe<TireSize>;
  hardDeleteUnit?: Maybe<Unit>;
  hardDeleteUser?: Maybe<User>;
  mountTire: TireAssignment;
  registerTireEvent: TireEvent;
  removeAddress: Address;
  removeBrand: Brand;
  removeBusinessCategory: BusinessCategory;
  removeBusinessSubCategory: BusinessSubCategory;
  removeCity: City;
  removeCompany: Company;
  removeContact: Contact;
  removeCountry: Country;
  removeEmployee: Employee;
  removeEmployeeCategory: EmployeeCategory;
  removeEmployeePosition: EmployeePosition;
  removeEmployeeVacation: EmployeeVacation;
  removeEquipment: Equipment;
  removeEquipmentAxle: EquipmentAxle;
  removeEquipmentCategory: EquipmentCategory;
  removeEquipmentMaintenance: EquipmentMaintenance;
  removeEquipmentModel: EquipmentModel;
  removeEquipmentTransaction: EquipmentTransaction;
  removeEquipmentType: EquipmentType;
  removeHistoryLog: HistoryLog;
  removeInspection: Inspection;
  removePerson: Person;
  removeProvince: Province;
  removeTire: Tire;
  removeTireEvent: Scalars['Boolean']['output'];
  removeTireInspection: Scalars['Boolean']['output'];
  removeTireModel: TireModel;
  removeTirePosition: Scalars['Boolean']['output'];
  removeTireRecap: Scalars['Boolean']['output'];
  removeTireRotation: Scalars['Boolean']['output'];
  removeTireSize: TireSize;
  removeUnit: Unit;
  removeUser: User;
  restoreAddress: Address;
  restoreBrand: Brand;
  restoreBusinessCategory: BusinessCategory;
  restoreBusinessSubCategory: BusinessSubCategory;
  restoreCity: City;
  restoreCompany: Company;
  restoreContact: Contact;
  restoreCountry: Country;
  restoreEmployee: Employee;
  restoreEmployeeCategory: EmployeeCategory;
  restoreEmployeePosition: EmployeePosition;
  restoreEmployeeVacation: EmployeeVacation;
  restoreEquipment: Equipment;
  restoreEquipmentAxle: EquipmentAxle;
  restoreEquipmentCategory: EquipmentCategory;
  restoreEquipmentMaintenance: EquipmentMaintenance;
  restoreEquipmentModel: EquipmentModel;
  restoreEquipmentTransaction: EquipmentTransaction;
  restoreEquipmentType: EquipmentType;
  restoreHistoryLog: HistoryLog;
  restoreInspection: Inspection;
  restorePerson: Person;
  restoreProvince: Province;
  restoreTire: Tire;
  restoreTireModel: TireModel;
  restoreTireSize: TireSize;
  restoreUnit: Unit;
  restoreUser: User;
  unmountTire: Scalars['Boolean']['output'];
  updateAddress: Address;
  updateBrand: Brand;
  updateCity: City;
  updateCompany: Company;
  updateContact: Contact;
  updateEmployee: Employee;
  updateEmployeeVacation: EmployeeVacation;
  updateEquipment: Equipment;
  updateEquipmentAxle: EquipmentAxle;
  updateEquipmentCategory: EquipmentCategory;
  updateEquipmentMaintenance: EquipmentMaintenance;
  updateEquipmentModel: EquipmentModel;
  updateEquipmentTransaction: EquipmentTransaction;
  updateEquipmentType: EquipmentType;
  updateHistoryLog: HistoryLog;
  updateInspection: Inspection;
  updateLastLogin: Scalars['Boolean']['output'];
  updateTire: Tire;
  updateTireInspection: TireInspection;
  updateTireModel: TireModel;
  updateTirePosition: TirePositionConfig;
  updateTireRecap: TireRecap;
  updateTireRotation: TireRotation;
  updateTireSize: TireSize;
  updateUnit: Unit;
  updateUser: User;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateBrandArgs = {
  input: CreateBrandDto;
};


export type MutationCreateCityArgs = {
  input: CreateCityInput;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyDto;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationCreateEmployeeArgs = {
  input: CreateEmployeeDto;
};


export type MutationCreateEquipmentArgs = {
  input: CreateEquipmentDto;
};


export type MutationCreateTireEventArgs = {
  input: CreateTireEventDto;
};


export type MutationCreateTireInspectionArgs = {
  input: CreateTireInspectionDto;
};


export type MutationCreateTirePositionArgs = {
  input: CreateTirePositionDto;
};


export type MutationCreateTireRecapArgs = {
  input: CreateTireRecapDto;
};


export type MutationCreateTireRotationArgs = {
  input: CreateTireRotationDto;
};


export type MutationCreateUnitArgs = {
  input: CreateUnitDto;
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


export type MutationHardDeleteBrandArgs = {
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


export type MutationHardDeleteEmployeeVacationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentAxleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentMaintenanceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteHistoryLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeletePersonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteTireArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteUnitArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationMountTireArgs = {
  input: MountTireDto;
};


export type MutationRegisterTireEventArgs = {
  data?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  kmAtEvent?: InputMaybe<Scalars['Int']['input']>;
  tireId: Scalars['Int']['input'];
  type: TireEventType;
};


export type MutationRemoveAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBrandArgs = {
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


export type MutationRemoveEmployeeVacationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentAxleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentMaintenanceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveHistoryLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePersonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTirePositionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireRecapArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireRotationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUnitArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreBrandArgs = {
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


export type MutationRestoreEmployeeVacationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentAxleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentMaintenanceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreHistoryLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestorePersonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreTireArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreUnitArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUnmountTireArgs = {
  input: UnmountTireDto;
};


export type MutationUpdateAddressArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAddressInput;
};


export type MutationUpdateBrandArgs = {
  id: Scalars['Int']['input'];
  input: UpdateBrandDto;
};


export type MutationUpdateCityArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCityInput;
};


export type MutationUpdateCompanyArgs = {
  id: Scalars['String']['input'];
  input: UpdateCompanyDto;
};


export type MutationUpdateContactArgs = {
  id: Scalars['Int']['input'];
  input: UpdateContactInput;
};


export type MutationUpdateEmployeeArgs = {
  id: Scalars['Int']['input'];
  input: UpdateEmployeeDto;
};


export type MutationUpdateEquipmentArgs = {
  id: Scalars['Int']['input'];
  input: UpdateEquipmentDto;
};


export type MutationUpdateLastLoginArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUpdateTireInspectionArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTireInspectionDto;
};


export type MutationUpdateTirePositionArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTirePositionDto;
};


export type MutationUpdateTireRecapArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTireRecapDto;
};


export type MutationUpdateTireRotationArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTireRotationDto;
};


export type MutationUpdateUnitArgs = {
  id: Scalars['Int']['input'];
  input: UpdateUnitDto;
};

export type PaginatedAddress = {
  __typename?: 'PaginatedAddress';
  data: Array<Address>;
  meta: PaginationMeta;
};

export type PaginatedBrand = {
  __typename?: 'PaginatedBrand';
  data: Array<Brand>;
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

export type PaginatedEquipment = {
  __typename?: 'PaginatedEquipment';
  data: Array<Equipment>;
  meta: PaginationMeta;
};

export type PaginatedEquipmentCategory = {
  __typename?: 'PaginatedEquipmentCategory';
  data: Array<EquipmentCategory>;
  meta: PaginationMeta;
};

export type PaginatedEquipmentModel = {
  __typename?: 'PaginatedEquipmentModel';
  data: Array<EquipmentModel>;
  meta: PaginationMeta;
};

export type PaginatedEquipmentType = {
  __typename?: 'PaginatedEquipmentType';
  data: Array<EquipmentType>;
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

export type PaginatedTire = {
  __typename?: 'PaginatedTire';
  data: Array<Tire>;
  meta: PaginationMeta;
};

export type PaginatedTireInspection = {
  __typename?: 'PaginatedTireInspection';
  data: Array<TireInspection>;
  meta: PaginationMeta;
};

export type PaginatedTireModel = {
  __typename?: 'PaginatedTireModel';
  data: Array<TireModel>;
  meta: PaginationMeta;
};

export type PaginatedTireSize = {
  __typename?: 'PaginatedTireSize';
  data: Array<TireSize>;
  meta: PaginationMeta;
};

export type PaginatedUnit = {
  __typename?: 'PaginatedUnit';
  data: Array<Unit>;
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
  findAllBrands: PaginatedBrand;
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
  findAllEmployeeVacations: Array<EmployeeVacation>;
  findAllEmployees: PaginatedEmployee;
  findAllEquipment: PaginatedEquipment;
  findAllEquipmentAxles: Array<EquipmentAxle>;
  findAllEquipmentCategories: PaginatedEquipmentCategory;
  findAllEquipmentCategorys: Array<EquipmentCategory>;
  findAllEquipmentMaintenances: Array<EquipmentMaintenance>;
  findAllEquipmentModels: PaginatedEquipmentModel;
  findAllEquipmentTransactions: Array<EquipmentTransaction>;
  findAllEquipmentTypes: PaginatedEquipmentType;
  findAllEquipments: Array<Equipment>;
  findAllHistoryLogs: Array<HistoryLog>;
  findAllInspections: Array<Inspection>;
  findAllPersons: PaginatedPerson;
  findAllProvinces: Array<Province>;
  findAllTireEvents: Array<TireEvent>;
  findAllTireInspections: PaginatedTireInspection;
  findAllTireModels: PaginatedTireModel;
  findAllTirePositions: Array<TirePositionConfig>;
  findAllTireRecaps: Array<TireRecap>;
  findAllTireRotations: Array<TireRotation>;
  findAllTireSizes: PaginatedTireSize;
  findAllTires: PaginatedTire;
  findAllUnits: PaginatedUnit;
  findAllUsers: Array<User>;
  findCities: PaginatedCity;
  findContacts: PaginatedContact;
  findCountries: PaginatedCountry;
  findOneAddress?: Maybe<Address>;
  findOneBrand?: Maybe<Brand>;
  findOneBusinessCategory?: Maybe<BusinessCategory>;
  findOneBusinessSubCategory?: Maybe<BusinessSubCategory>;
  findOneCity?: Maybe<City>;
  findOneCompany?: Maybe<Company>;
  findOneContact?: Maybe<Contact>;
  findOneCountry?: Maybe<Country>;
  findOneEmployee?: Maybe<Employee>;
  findOneEmployeeCategory?: Maybe<EmployeeCategory>;
  findOneEmployeePosition?: Maybe<EmployeePosition>;
  findOneEmployeeVacation?: Maybe<EmployeeVacation>;
  findOneEquipment?: Maybe<Equipment>;
  findOneEquipmentAxle?: Maybe<EquipmentAxle>;
  findOneEquipmentCategory?: Maybe<EquipmentCategory>;
  findOneEquipmentMaintenance?: Maybe<EquipmentMaintenance>;
  findOneEquipmentModel?: Maybe<EquipmentModel>;
  findOneEquipmentTransaction?: Maybe<EquipmentTransaction>;
  findOneEquipmentType?: Maybe<EquipmentType>;
  findOneHistoryLog?: Maybe<HistoryLog>;
  findOneInspection?: Maybe<Inspection>;
  findOnePerson?: Maybe<Person>;
  findOneProvince?: Maybe<Province>;
  findOneTire?: Maybe<Tire>;
  findOneTireEvent?: Maybe<TireEvent>;
  findOneTireInspection?: Maybe<TireInspection>;
  findOneTireModel?: Maybe<TireModel>;
  findOneTirePosition?: Maybe<TirePositionConfig>;
  findOneTireRotation?: Maybe<TireRotation>;
  findOneTireSize?: Maybe<TireSize>;
  findOneUnit?: Maybe<Unit>;
  findOneUser?: Maybe<User>;
  findOpenTireAssignments: Array<TireAssignment>;
  findOpenTireAssignmentsByEquipment: Array<TireAssignment>;
  findProvinces: PaginatedProvince;
  findTireAssignmentsByTire: Array<TireAssignment>;
  findTireEventsByTire: Array<TireEvent>;
  findTireEventsByTireAndType: Array<TireEvent>;
  findTireInspectionsByTire: Array<TireInspection>;
  findTireRecapsByTire: Array<TireRecap>;
  findTireRotationsByTire: Array<TireRotation>;
  findUserByEmail?: Maybe<User>;
};


export type QueryFindAddressesArgs = {
  filter?: InputMaybe<AddressFilterInput>;
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


export type QueryFindAllBrandsArgs = {
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


export type QueryFindAllEmployeeVacationsArgs = {
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


export type QueryFindAllEquipmentArgs = {
  filter?: InputMaybe<EquipmentFilterInput>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentAxlesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentCategoriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentCategorysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentMaintenancesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentModelsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentTransactionsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentTypesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllHistoryLogsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllInspectionsArgs = {
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


export type QueryFindAllTireInspectionsArgs = {
  query?: InputMaybe<TireInspectionsQueryDto>;
};


export type QueryFindAllTireModelsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllTirePositionsArgs = {
  axleId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindAllTireSizesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllTiresArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllUnitsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllUsersArgs = {
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


export type QueryFindOneBrandArgs = {
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


export type QueryFindOneEmployeeVacationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentAxleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentMaintenanceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentTypeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneHistoryLogArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOnePersonArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireEventArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTirePositionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireRotationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneUnitArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOpenTireAssignmentsByEquipmentArgs = {
  equipmentId: Scalars['Int']['input'];
};


export type QueryFindProvincesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindTireAssignmentsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindTireEventsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindTireEventsByTireAndTypeArgs = {
  tireId: Scalars['Int']['input'];
  type: TireEventType;
};


export type QueryFindTireInspectionsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindTireRecapsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindTireRotationsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindUserByEmailArgs = {
  email: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum SeverityLevel {
  Critical = 'CRITICAL',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type Tire = {
  __typename?: 'Tire';
  assignments?: Maybe<Array<TireAssignment>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  events?: Maybe<Array<TireEvent>>;
  id: Scalars['Int']['output'];
  inspections?: Maybe<Array<TireInspection>>;
  isActive: Scalars['Boolean']['output'];
  lastRecapAt?: Maybe<Scalars['DateTime']['output']>;
  lastRecapId?: Maybe<Scalars['Int']['output']>;
  model?: Maybe<TireModel>;
  modelId: Scalars['Int']['output'];
  position?: Maybe<TirePosition>;
  recapCount?: Maybe<Scalars['Int']['output']>;
  recaps?: Maybe<Array<TireRecap>>;
  rotations?: Maybe<Array<TireRotation>>;
  serialNumber: Scalars['String']['output'];
  status: TireStatus;
  totalKm?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TireAssignment = {
  __typename?: 'TireAssignment';
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  kmAtEnd?: Maybe<Scalars['Int']['output']>;
  kmAtStart?: Maybe<Scalars['Int']['output']>;
  positionConfig?: Maybe<TirePositionConfig>;
  positionConfigId: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
};

export type TireEvent = {
  __typename?: 'TireEvent';
  description?: Maybe<Scalars['String']['output']>;
  eventDate: Scalars['DateTime']['output'];
  eventType: TireEventType;
  id: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum TireEventType {
  Assignment = 'ASSIGNMENT',
  Discard = 'DISCARD',
  Inspection = 'INSPECTION',
  Other = 'OTHER',
  Recap = 'RECAP',
  Rotation = 'ROTATION',
  Unassignment = 'UNASSIGNMENT'
}

export type TireInspection = {
  __typename?: 'TireInspection';
  id: Scalars['Int']['output'];
  inspectionDate: Scalars['DateTime']['output'];
  observation?: Maybe<Scalars['String']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
  treadDepth?: Maybe<Scalars['Float']['output']>;
};

export type TireInspectionsQueryDto = {
  equipmentId?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  minPressure?: InputMaybe<Scalars['Float']['input']>;
  minTreadDepth?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  tireId?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TireModel = {
  __typename?: 'TireModel';
  brand?: Maybe<Brand>;
  brandId: Scalars['Int']['output'];
  construction?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  loadIndex?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  plyRating?: Maybe<Scalars['String']['output']>;
  size?: Maybe<TireSize>;
  sizeId: Scalars['Int']['output'];
  speedSymbol?: Maybe<Scalars['String']['output']>;
  treadPattern?: Maybe<Scalars['String']['output']>;
};

export enum TirePosition {
  Dd = 'DD',
  Di = 'DI',
  E1D = 'E1D',
  E1Dd = 'E1DD',
  E1Di = 'E1DI',
  E1I = 'E1I',
  E1Id = 'E1ID',
  E1Ii = 'E1II',
  E2D = 'E2D',
  E2Dd = 'E2DD',
  E2Di = 'E2DI',
  E2I = 'E2I',
  E2Id = 'E2ID',
  E2Ii = 'E2II',
  E3D = 'E3D',
  E3Dd = 'E3DD',
  E3Di = 'E3DI',
  E3I = 'E3I',
  E3Id = 'E3ID',
  E3Ii = 'E3II',
  E4D = 'E4D',
  E4Dd = 'E4DD',
  E4Di = 'E4DI',
  E4I = 'E4I',
  E4Id = 'E4ID',
  E4Ii = 'E4II',
  Spare = 'SPARE',
  Unknown = 'UNKNOWN'
}

export type TirePositionConfig = {
  __typename?: 'TirePositionConfig';
  assignments?: Maybe<Array<TireAssignment>>;
  axle?: Maybe<EquipmentAxle>;
  axleId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isDual: Scalars['Boolean']['output'];
  positionKey: Scalars['String']['output'];
  side: TireSide;
};

export type TireRecap = {
  __typename?: 'TireRecap';
  cost?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  kmAtRecap?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  recapDate: Scalars['DateTime']['output'];
  recapNumber: Scalars['Int']['output'];
  recapType?: Maybe<Scalars['String']['output']>;
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
};

export type TireRotation = {
  __typename?: 'TireRotation';
  fromEquipmentId?: Maybe<Scalars['Int']['output']>;
  fromPosition?: Maybe<TirePosition>;
  id: Scalars['Int']['output'];
  kmAtRotation?: Maybe<Scalars['Int']['output']>;
  rotationDate: Scalars['DateTime']['output'];
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
  toEquipmentId?: Maybe<Scalars['Int']['output']>;
  toPosition?: Maybe<TirePosition>;
};

export enum TireSide {
  Inner = 'INNER',
  Left = 'LEFT',
  Outer = 'OUTER',
  Right = 'RIGHT'
}

export type TireSize = {
  __typename?: 'TireSize';
  aspectRatio?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  mainCode: Scalars['String']['output'];
  rimDiameter?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export enum TireStatus {
  Discarded = 'DISCARDED',
  InStock = 'IN_STOCK',
  InUse = 'IN_USE',
  Recap = 'RECAP',
  UnderRepair = 'UNDER_REPAIR'
}

export type Unit = {
  __typename?: 'Unit';
  abbreviation: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type UnmountTireDto = {
  assignmentId: Scalars['Int']['input'];
  kmAtEnd?: InputMaybe<Scalars['Int']['input']>;
  newStatus?: InputMaybe<TireStatus>;
  note?: InputMaybe<Scalars['String']['input']>;
  unmountDate?: InputMaybe<Scalars['DateTime']['input']>;
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

export type UpdateBrandDto = {
  code?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  information?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCityInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  provinceId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCompanyDto = {
  businessCategoryId?: InputMaybe<Scalars['Int']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  cuit?: InputMaybe<Scalars['String']['input']>;
  information?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContactInput = {
  information?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ContactType>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmployeeDto = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  employeeCode?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  hireDate?: InputMaybe<Scalars['String']['input']>;
  information?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
  positionId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EmployeeStatus>;
};

export type UpdateEquipmentDto = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  chassis?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  engine?: InputMaybe<Scalars['String']['input']>;
  fuelType?: InputMaybe<FuelType>;
  internalCode?: InputMaybe<Scalars['String']['input']>;
  licensePlate?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  observation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EquipmentStatus>;
  typeId?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTireInspectionDto = {
  inspectionDate?: InputMaybe<Scalars['DateTime']['input']>;
  observation?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['Float']['input']>;
  tireId?: InputMaybe<Scalars['Int']['input']>;
  treadDepth?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateTirePositionDto = {
  axleId?: InputMaybe<Scalars['Int']['input']>;
  isDual?: InputMaybe<Scalars['Boolean']['input']>;
  positionKey?: InputMaybe<Scalars['String']['input']>;
  side?: InputMaybe<TireSide>;
};

export type UpdateTireRecapDto = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  kmAtRecap?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  recapType?: InputMaybe<Scalars['String']['input']>;
  tireId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTireRotationDto = {
  fromEquipmentId?: InputMaybe<Scalars['Int']['input']>;
  fromPosition?: InputMaybe<TirePosition>;
  kmAtRotation?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  rotationDate?: InputMaybe<Scalars['DateTime']['input']>;
  tireId?: InputMaybe<Scalars['Int']['input']>;
  toEquipmentId?: InputMaybe<Scalars['Int']['input']>;
  toPosition?: InputMaybe<TirePosition>;
};

export type UpdateUnitDto = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  preferences?: Maybe<Scalars['JSON']['output']>;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export enum VacationType {
  Assigned = 'ASSIGNED',
  Taken = 'TAKEN'
}

export type FindAllBusinessCategoriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindAllBusinessCategoriesQuery = { __typename?: 'Query', findAllBusinessCategories: { __typename?: 'PaginatedBusinessCategory', data: Array<{ __typename?: 'BusinessCategory', id: number, name: string, code?: string | null, information?: string | null, isActive: boolean, createdAt: any, updatedAt: any }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type FindOneBusinessCategoryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneBusinessCategoryQuery = { __typename?: 'Query', findOneBusinessCategory?: { __typename?: 'BusinessCategory', id: number, name: string, code?: string | null, information?: string | null, isActive: boolean, createdAt: any, updatedAt: any } | null };

export type FindAllBusinessSubCategoriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindAllBusinessSubCategoriesQuery = { __typename?: 'Query', findAllBusinessSubCategories: { __typename?: 'PaginatedBusinessSubCategory', data: Array<{ __typename?: 'BusinessSubCategory', id: number, name: string, description?: string | null, businessCategoryId: number, isActive: boolean, createdAt: any, updatedAt: any }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type FindOneBusinessSubCategoryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneBusinessSubCategoryQuery = { __typename?: 'Query', findOneBusinessSubCategory?: { __typename?: 'BusinessSubCategory', id: number, name: string, description?: string | null, businessCategoryId: number, isActive: boolean, createdAt: any, updatedAt: any } | null };

export type FindAddressesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AddressFilterInput>;
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

export type FindAllBrandsQueryVariables = Exact<{
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindAllBrandsQuery = { __typename?: 'Query', findAllBrands: { __typename?: 'PaginatedBrand', data: Array<{ __typename?: 'Brand', id: number, name: string, code: string, isActive: boolean, information?: string | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type FindOneBrandQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneBrandQuery = { __typename?: 'Query', findOneBrand?: { __typename?: 'Brand', id: number, name: string, code: string, isActive: boolean, information?: string | null } | null };

export type CreateBrandMutationVariables = Exact<{
  input: CreateBrandDto;
}>;


export type CreateBrandMutation = { __typename?: 'Mutation', createBrand: { __typename?: 'Brand', id: number, name: string, code: string } };

export type UpdateBrandMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateBrandDto;
}>;


export type UpdateBrandMutation = { __typename?: 'Mutation', updateBrand: { __typename?: 'Brand', id: number, name: string, code: string } };

export type RemoveBrandMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveBrandMutation = { __typename?: 'Mutation', removeBrand: { __typename?: 'Brand', id: number } };

export type RestoreBrandMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RestoreBrandMutation = { __typename?: 'Mutation', restoreBrand: { __typename?: 'Brand', id: number } };

export type HardDeleteBrandMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type HardDeleteBrandMutation = { __typename?: 'Mutation', hardDeleteBrand?: { __typename?: 'Brand', id: number } | null };

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

export type FindAllCompaniesQueryVariables = Exact<{
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindAllCompaniesQuery = { __typename?: 'Query', findAllCompanies: { __typename?: 'PaginatedCompany', data: Array<{ __typename?: 'Company', id: number, name: string, businessName?: string | null, cuit: string, isActive: boolean, createdAt: any, businessCategory?: { __typename?: 'BusinessCategory', id: number, name: string } | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type FindOneCompanyQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneCompanyQuery = { __typename?: 'Query', findOneCompany?: { __typename?: 'Company', id: number, name: string, businessName?: string | null, cuit: string, isActive: boolean, information?: string | null, businessCategoryId?: number | null, businessCategory?: { __typename?: 'BusinessCategory', id: number, name: string, subCategories?: Array<{ __typename?: 'BusinessSubCategory', id: number, name: string }> | null } | null, contacts?: Array<{ __typename?: 'Contact', id: number, type: ContactType, value: string, label?: string | null }> | null } | null };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyDto;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', id: number, name: string, businessName?: string | null, cuit: string } };

export type UpdateCompanyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCompanyDto;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', id: number, name: string, businessName?: string | null, cuit: string } };

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutation', removeCompany: { __typename?: 'Company', id: number } };

export type RestoreCompanyMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RestoreCompanyMutation = { __typename?: 'Mutation', restoreCompany: { __typename?: 'Company', id: number } };

export type HardDeleteCompanyMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type HardDeleteCompanyMutation = { __typename?: 'Mutation', hardDeleteCompany?: { __typename?: 'Company', id: number } | null };

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

export type FindAllEquipmentQueryVariables = Exact<{
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<EquipmentFilterInput>;
}>;


export type FindAllEquipmentQuery = { __typename?: 'Query', findAllEquipment: { __typename?: 'PaginatedEquipment', data: Array<{ __typename?: 'Equipment', id: number, name?: string | null, internalCode?: string | null, licensePlate?: string | null, status: EquipmentStatus, year?: number | null, type?: { __typename?: 'EquipmentType', id: number, name: string } | null, model?: { __typename?: 'EquipmentModel', id: number, name: string, brand?: { __typename?: 'Brand', id: number, name: string } | null } | null, category?: { __typename?: 'EquipmentCategory', id: number, name: string } | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type FindOneEquipmentQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneEquipmentQuery = { __typename?: 'Query', findOneEquipment?: { __typename?: 'Equipment', id: number, name?: string | null, internalCode?: string | null, licensePlate?: string | null, chassis?: string | null, engine?: string | null, color?: string | null, year?: number | null, status: EquipmentStatus, observation?: string | null, description?: string | null, typeId?: number | null, modelId?: number | null, categoryId?: number | null, companyId?: number | null, type?: { __typename?: 'EquipmentType', id: number, name: string } | null, model?: { __typename?: 'EquipmentModel', id: number, name: string, brand?: { __typename?: 'Brand', id: number, name: string } | null } | null, category?: { __typename?: 'EquipmentCategory', id: number, name: string } | null, company?: { __typename?: 'Company', id: number, name: string } | null, axles?: Array<{ __typename?: 'EquipmentAxle', id: number, axleType: AxleType, order: number, wheelCount: number, tirePositions?: Array<{ __typename?: 'TirePositionConfig', id: number, positionKey: string, side: TireSide, isDual: boolean }> | null }> | null } | null };

export type RemoveEquipmentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveEquipmentMutation = { __typename?: 'Mutation', removeEquipment: { __typename?: 'Equipment', id: number } };

export type RestoreEquipmentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RestoreEquipmentMutation = { __typename?: 'Mutation', restoreEquipment: { __typename?: 'Equipment', id: number } };

export type HardDeleteEquipmentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type HardDeleteEquipmentMutation = { __typename?: 'Mutation', hardDeleteEquipment?: { __typename?: 'Equipment', id: number } | null };

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

export type FindAllUnitsQueryVariables = Exact<{
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindAllUnitsQuery = { __typename?: 'Query', findAllUnits: { __typename?: 'PaginatedUnit', data: Array<{ __typename?: 'Unit', id: number, name: string, abbreviation: string, isActive: boolean }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number } } };

export type FindOneUnitQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneUnitQuery = { __typename?: 'Query', findOneUnit?: { __typename?: 'Unit', id: number, name: string, abbreviation: string, isActive: boolean } | null };

export type CreateUnitMutationVariables = Exact<{
  input: CreateUnitDto;
}>;


export type CreateUnitMutation = { __typename?: 'Mutation', createUnit: { __typename?: 'Unit', id: number, name: string, abbreviation: string } };

export type UpdateUnitMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateUnitDto;
}>;


export type UpdateUnitMutation = { __typename?: 'Mutation', updateUnit: { __typename?: 'Unit', id: number, name: string, abbreviation: string } };

export type RemoveUnitMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveUnitMutation = { __typename?: 'Mutation', removeUnit: { __typename?: 'Unit', id: number } };

export type RestoreUnitMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RestoreUnitMutation = { __typename?: 'Mutation', restoreUnit: { __typename?: 'Unit', id: number } };

export type HardDeleteUnitMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type HardDeleteUnitMutation = { __typename?: 'Mutation', hardDeleteUnit?: { __typename?: 'Unit', id: number } | null };



export const FindAllBusinessCategoriesDocument = `
    query FindAllBusinessCategories($skip: Int, $take: Int, $q: String, $where: String, $orderBy: String) {
  findAllBusinessCategories(
    skip: $skip
    take: $take
    q: $q
    where: $where
    orderBy: $orderBy
  ) {
    data {
      id
      name
      code
      information
      isActive
      createdAt
      updatedAt
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useFindAllBusinessCategoriesQuery = <
      TData = FindAllBusinessCategoriesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindAllBusinessCategoriesQueryVariables,
      options?: Omit<UseQueryOptions<FindAllBusinessCategoriesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindAllBusinessCategoriesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindAllBusinessCategoriesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindAllBusinessCategories'] : ['FindAllBusinessCategories', variables],
    queryFn: fetcher<FindAllBusinessCategoriesQuery, FindAllBusinessCategoriesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindAllBusinessCategoriesDocument, variables),
    ...options
  }
    )};

useFindAllBusinessCategoriesQuery.getKey = (variables?: FindAllBusinessCategoriesQueryVariables) => variables === undefined ? ['FindAllBusinessCategories'] : ['FindAllBusinessCategories', variables];

export const FindOneBusinessCategoryDocument = `
    query FindOneBusinessCategory($id: Int!) {
  findOneBusinessCategory(id: $id) {
    id
    name
    code
    information
    isActive
    createdAt
    updatedAt
  }
}
    `;

export const useFindOneBusinessCategoryQuery = <
      TData = FindOneBusinessCategoryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: FindOneBusinessCategoryQueryVariables,
      options?: Omit<UseQueryOptions<FindOneBusinessCategoryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindOneBusinessCategoryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindOneBusinessCategoryQuery, TError, TData>(
      {
    queryKey: ['FindOneBusinessCategory', variables],
    queryFn: fetcher<FindOneBusinessCategoryQuery, FindOneBusinessCategoryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindOneBusinessCategoryDocument, variables),
    ...options
  }
    )};

useFindOneBusinessCategoryQuery.getKey = (variables: FindOneBusinessCategoryQueryVariables) => ['FindOneBusinessCategory', variables];

export const FindAllBusinessSubCategoriesDocument = `
    query FindAllBusinessSubCategories($skip: Int, $take: Int, $q: String, $where: String, $orderBy: String) {
  findAllBusinessSubCategories(
    skip: $skip
    take: $take
    q: $q
    where: $where
    orderBy: $orderBy
  ) {
    data {
      id
      name
      description
      businessCategoryId
      isActive
      createdAt
      updatedAt
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useFindAllBusinessSubCategoriesQuery = <
      TData = FindAllBusinessSubCategoriesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindAllBusinessSubCategoriesQueryVariables,
      options?: Omit<UseQueryOptions<FindAllBusinessSubCategoriesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindAllBusinessSubCategoriesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindAllBusinessSubCategoriesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindAllBusinessSubCategories'] : ['FindAllBusinessSubCategories', variables],
    queryFn: fetcher<FindAllBusinessSubCategoriesQuery, FindAllBusinessSubCategoriesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindAllBusinessSubCategoriesDocument, variables),
    ...options
  }
    )};

useFindAllBusinessSubCategoriesQuery.getKey = (variables?: FindAllBusinessSubCategoriesQueryVariables) => variables === undefined ? ['FindAllBusinessSubCategories'] : ['FindAllBusinessSubCategories', variables];

export const FindOneBusinessSubCategoryDocument = `
    query FindOneBusinessSubCategory($id: Int!) {
  findOneBusinessSubCategory(id: $id) {
    id
    name
    description
    businessCategoryId
    isActive
    createdAt
    updatedAt
  }
}
    `;

export const useFindOneBusinessSubCategoryQuery = <
      TData = FindOneBusinessSubCategoryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: FindOneBusinessSubCategoryQueryVariables,
      options?: Omit<UseQueryOptions<FindOneBusinessSubCategoryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindOneBusinessSubCategoryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindOneBusinessSubCategoryQuery, TError, TData>(
      {
    queryKey: ['FindOneBusinessSubCategory', variables],
    queryFn: fetcher<FindOneBusinessSubCategoryQuery, FindOneBusinessSubCategoryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindOneBusinessSubCategoryDocument, variables),
    ...options
  }
    )};

useFindOneBusinessSubCategoryQuery.getKey = (variables: FindOneBusinessSubCategoryQueryVariables) => ['FindOneBusinessSubCategory', variables];

export const FindAddressesDocument = `
    query FindAddresses($skip: Int, $take: Int, $q: String, $filter: AddressFilterInput) {
  findAddresses(skip: $skip, take: $take, q: $q, filter: $filter) {
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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindAddressesQueryVariables,
      options?: Omit<UseQueryOptions<FindAddressesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindAddressesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindAddressesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindAddresses'] : ['FindAddresses', variables],
    queryFn: fetcher<FindAddressesQuery, FindAddressesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindAddressesDocument, variables),
    ...options
  }
    )};

useFindAddressesQuery.getKey = (variables?: FindAddressesQueryVariables) => variables === undefined ? ['FindAddresses'] : ['FindAddresses', variables];

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
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateAddressMutation, TError, CreateAddressMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateAddressMutation, TError, CreateAddressMutationVariables, TContext>(
      {
    mutationKey: ['CreateAddress'],
    mutationFn: (variables?: CreateAddressMutationVariables) => fetcher<CreateAddressMutation, CreateAddressMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateAddressDocument, variables)(),
    ...options
  }
    )};

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
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateAddressMutation, TError, UpdateAddressMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateAddressMutation, TError, UpdateAddressMutationVariables, TContext>(
      {
    mutationKey: ['UpdateAddress'],
    mutationFn: (variables?: UpdateAddressMutationVariables) => fetcher<UpdateAddressMutation, UpdateAddressMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateAddressDocument, variables)(),
    ...options
  }
    )};

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
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteAddressMutation, TError, DeleteAddressMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteAddressMutation, TError, DeleteAddressMutationVariables, TContext>(
      {
    mutationKey: ['DeleteAddress'],
    mutationFn: (variables?: DeleteAddressMutationVariables) => fetcher<DeleteAddressMutation, DeleteAddressMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteAddressDocument, variables)(),
    ...options
  }
    )};

export const FindAllBrandsDocument = `
    query FindAllBrands($skip: Int! = 0, $take: Int! = 10, $orderBy: String, $q: String, $where: String) {
  findAllBrands(skip: $skip, take: $take, orderBy: $orderBy, q: $q, where: $where) {
    data {
      id
      name
      code
      isActive
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

export const useFindAllBrandsQuery = <
      TData = FindAllBrandsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindAllBrandsQueryVariables,
      options?: Omit<UseQueryOptions<FindAllBrandsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindAllBrandsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindAllBrandsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindAllBrands'] : ['FindAllBrands', variables],
    queryFn: fetcher<FindAllBrandsQuery, FindAllBrandsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindAllBrandsDocument, variables),
    ...options
  }
    )};

useFindAllBrandsQuery.getKey = (variables?: FindAllBrandsQueryVariables) => variables === undefined ? ['FindAllBrands'] : ['FindAllBrands', variables];

export const FindOneBrandDocument = `
    query FindOneBrand($id: Int!) {
  findOneBrand(id: $id) {
    id
    name
    code
    isActive
    information
  }
}
    `;

export const useFindOneBrandQuery = <
      TData = FindOneBrandQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: FindOneBrandQueryVariables,
      options?: Omit<UseQueryOptions<FindOneBrandQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindOneBrandQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindOneBrandQuery, TError, TData>(
      {
    queryKey: ['FindOneBrand', variables],
    queryFn: fetcher<FindOneBrandQuery, FindOneBrandQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindOneBrandDocument, variables),
    ...options
  }
    )};

useFindOneBrandQuery.getKey = (variables: FindOneBrandQueryVariables) => ['FindOneBrand', variables];

export const CreateBrandDocument = `
    mutation CreateBrand($input: CreateBrandDto!) {
  createBrand(input: $input) {
    id
    name
    code
  }
}
    `;

export const useCreateBrandMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateBrandMutation, TError, CreateBrandMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateBrandMutation, TError, CreateBrandMutationVariables, TContext>(
      {
    mutationKey: ['CreateBrand'],
    mutationFn: (variables?: CreateBrandMutationVariables) => fetcher<CreateBrandMutation, CreateBrandMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateBrandDocument, variables)(),
    ...options
  }
    )};

export const UpdateBrandDocument = `
    mutation UpdateBrand($id: Int!, $input: UpdateBrandDto!) {
  updateBrand(id: $id, input: $input) {
    id
    name
    code
  }
}
    `;

export const useUpdateBrandMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateBrandMutation, TError, UpdateBrandMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateBrandMutation, TError, UpdateBrandMutationVariables, TContext>(
      {
    mutationKey: ['UpdateBrand'],
    mutationFn: (variables?: UpdateBrandMutationVariables) => fetcher<UpdateBrandMutation, UpdateBrandMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateBrandDocument, variables)(),
    ...options
  }
    )};

export const RemoveBrandDocument = `
    mutation RemoveBrand($id: Int!) {
  removeBrand(id: $id) {
    id
  }
}
    `;

export const useRemoveBrandMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RemoveBrandMutation, TError, RemoveBrandMutationVariables, TContext>
    ) => {
    
    return useMutation<RemoveBrandMutation, TError, RemoveBrandMutationVariables, TContext>(
      {
    mutationKey: ['RemoveBrand'],
    mutationFn: (variables?: RemoveBrandMutationVariables) => fetcher<RemoveBrandMutation, RemoveBrandMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RemoveBrandDocument, variables)(),
    ...options
  }
    )};

export const RestoreBrandDocument = `
    mutation RestoreBrand($id: Int!) {
  restoreBrand(id: $id) {
    id
  }
}
    `;

export const useRestoreBrandMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RestoreBrandMutation, TError, RestoreBrandMutationVariables, TContext>
    ) => {
    
    return useMutation<RestoreBrandMutation, TError, RestoreBrandMutationVariables, TContext>(
      {
    mutationKey: ['RestoreBrand'],
    mutationFn: (variables?: RestoreBrandMutationVariables) => fetcher<RestoreBrandMutation, RestoreBrandMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RestoreBrandDocument, variables)(),
    ...options
  }
    )};

export const HardDeleteBrandDocument = `
    mutation HardDeleteBrand($id: Int!) {
  hardDeleteBrand(id: $id) {
    id
  }
}
    `;

export const useHardDeleteBrandMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<HardDeleteBrandMutation, TError, HardDeleteBrandMutationVariables, TContext>
    ) => {
    
    return useMutation<HardDeleteBrandMutation, TError, HardDeleteBrandMutationVariables, TContext>(
      {
    mutationKey: ['HardDeleteBrand'],
    mutationFn: (variables?: HardDeleteBrandMutationVariables) => fetcher<HardDeleteBrandMutation, HardDeleteBrandMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, HardDeleteBrandDocument, variables)(),
    ...options
  }
    )};

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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindCitiesQueryVariables,
      options?: Omit<UseQueryOptions<FindCitiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindCitiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindCitiesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindCities'] : ['FindCities', variables],
    queryFn: fetcher<FindCitiesQuery, FindCitiesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindCitiesDocument, variables),
    ...options
  }
    )};

useFindCitiesQuery.getKey = (variables?: FindCitiesQueryVariables) => variables === undefined ? ['FindCities'] : ['FindCities', variables];

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
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateCityMutation, TError, CreateCityMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateCityMutation, TError, CreateCityMutationVariables, TContext>(
      {
    mutationKey: ['CreateCity'],
    mutationFn: (variables?: CreateCityMutationVariables) => fetcher<CreateCityMutation, CreateCityMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateCityDocument, variables)(),
    ...options
  }
    )};

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
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateCityMutation, TError, UpdateCityMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateCityMutation, TError, UpdateCityMutationVariables, TContext>(
      {
    mutationKey: ['UpdateCity'],
    mutationFn: (variables?: UpdateCityMutationVariables) => fetcher<UpdateCityMutation, UpdateCityMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateCityDocument, variables)(),
    ...options
  }
    )};

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
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteCityMutation, TError, DeleteCityMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteCityMutation, TError, DeleteCityMutationVariables, TContext>(
      {
    mutationKey: ['DeleteCity'],
    mutationFn: (variables?: DeleteCityMutationVariables) => fetcher<DeleteCityMutation, DeleteCityMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteCityDocument, variables)(),
    ...options
  }
    )};

export const FindAllCompaniesDocument = `
    query FindAllCompanies($skip: Int! = 0, $take: Int! = 10, $orderBy: String, $q: String, $where: String) {
  findAllCompanies(
    skip: $skip
    take: $take
    orderBy: $orderBy
    q: $q
    where: $where
  ) {
    data {
      id
      name
      businessName
      cuit
      isActive
      createdAt
      businessCategory {
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

export const useFindAllCompaniesQuery = <
      TData = FindAllCompaniesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindAllCompaniesQueryVariables,
      options?: Omit<UseQueryOptions<FindAllCompaniesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindAllCompaniesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindAllCompaniesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindAllCompanies'] : ['FindAllCompanies', variables],
    queryFn: fetcher<FindAllCompaniesQuery, FindAllCompaniesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindAllCompaniesDocument, variables),
    ...options
  }
    )};

useFindAllCompaniesQuery.getKey = (variables?: FindAllCompaniesQueryVariables) => variables === undefined ? ['FindAllCompanies'] : ['FindAllCompanies', variables];

export const FindOneCompanyDocument = `
    query FindOneCompany($id: Int!) {
  findOneCompany(id: $id) {
    id
    name
    businessName
    cuit
    isActive
    information
    businessCategoryId
    businessCategory {
      id
      name
      subCategories {
        id
        name
      }
    }
    contacts {
      id
      type
      value
      label
    }
  }
}
    `;

export const useFindOneCompanyQuery = <
      TData = FindOneCompanyQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: FindOneCompanyQueryVariables,
      options?: Omit<UseQueryOptions<FindOneCompanyQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindOneCompanyQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindOneCompanyQuery, TError, TData>(
      {
    queryKey: ['FindOneCompany', variables],
    queryFn: fetcher<FindOneCompanyQuery, FindOneCompanyQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindOneCompanyDocument, variables),
    ...options
  }
    )};

useFindOneCompanyQuery.getKey = (variables: FindOneCompanyQueryVariables) => ['FindOneCompany', variables];

export const CreateCompanyDocument = `
    mutation CreateCompany($input: CreateCompanyDto!) {
  createCompany(input: $input) {
    id
    name
    businessName
    cuit
  }
}
    `;

export const useCreateCompanyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateCompanyMutation, TError, CreateCompanyMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateCompanyMutation, TError, CreateCompanyMutationVariables, TContext>(
      {
    mutationKey: ['CreateCompany'],
    mutationFn: (variables?: CreateCompanyMutationVariables) => fetcher<CreateCompanyMutation, CreateCompanyMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateCompanyDocument, variables)(),
    ...options
  }
    )};

export const UpdateCompanyDocument = `
    mutation UpdateCompany($id: String!, $input: UpdateCompanyDto!) {
  updateCompany(id: $id, input: $input) {
    id
    name
    businessName
    cuit
  }
}
    `;

export const useUpdateCompanyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateCompanyMutation, TError, UpdateCompanyMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateCompanyMutation, TError, UpdateCompanyMutationVariables, TContext>(
      {
    mutationKey: ['UpdateCompany'],
    mutationFn: (variables?: UpdateCompanyMutationVariables) => fetcher<UpdateCompanyMutation, UpdateCompanyMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateCompanyDocument, variables)(),
    ...options
  }
    )};

export const RemoveCompanyDocument = `
    mutation RemoveCompany($id: Int!) {
  removeCompany(id: $id) {
    id
  }
}
    `;

export const useRemoveCompanyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RemoveCompanyMutation, TError, RemoveCompanyMutationVariables, TContext>
    ) => {
    
    return useMutation<RemoveCompanyMutation, TError, RemoveCompanyMutationVariables, TContext>(
      {
    mutationKey: ['RemoveCompany'],
    mutationFn: (variables?: RemoveCompanyMutationVariables) => fetcher<RemoveCompanyMutation, RemoveCompanyMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RemoveCompanyDocument, variables)(),
    ...options
  }
    )};

export const RestoreCompanyDocument = `
    mutation RestoreCompany($id: Int!) {
  restoreCompany(id: $id) {
    id
  }
}
    `;

export const useRestoreCompanyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RestoreCompanyMutation, TError, RestoreCompanyMutationVariables, TContext>
    ) => {
    
    return useMutation<RestoreCompanyMutation, TError, RestoreCompanyMutationVariables, TContext>(
      {
    mutationKey: ['RestoreCompany'],
    mutationFn: (variables?: RestoreCompanyMutationVariables) => fetcher<RestoreCompanyMutation, RestoreCompanyMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RestoreCompanyDocument, variables)(),
    ...options
  }
    )};

export const HardDeleteCompanyDocument = `
    mutation HardDeleteCompany($id: Int!) {
  hardDeleteCompany(id: $id) {
    id
  }
}
    `;

export const useHardDeleteCompanyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<HardDeleteCompanyMutation, TError, HardDeleteCompanyMutationVariables, TContext>
    ) => {
    
    return useMutation<HardDeleteCompanyMutation, TError, HardDeleteCompanyMutationVariables, TContext>(
      {
    mutationKey: ['HardDeleteCompany'],
    mutationFn: (variables?: HardDeleteCompanyMutationVariables) => fetcher<HardDeleteCompanyMutation, HardDeleteCompanyMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, HardDeleteCompanyDocument, variables)(),
    ...options
  }
    )};

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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindContactsQueryVariables,
      options?: Omit<UseQueryOptions<FindContactsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindContactsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindContactsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindContacts'] : ['FindContacts', variables],
    queryFn: fetcher<FindContactsQuery, FindContactsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindContactsDocument, variables),
    ...options
  }
    )};

useFindContactsQuery.getKey = (variables?: FindContactsQueryVariables) => variables === undefined ? ['FindContacts'] : ['FindContacts', variables];

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
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateContactMutation, TError, CreateContactMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateContactMutation, TError, CreateContactMutationVariables, TContext>(
      {
    mutationKey: ['CreateContact'],
    mutationFn: (variables?: CreateContactMutationVariables) => fetcher<CreateContactMutation, CreateContactMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateContactDocument, variables)(),
    ...options
  }
    )};

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
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateContactMutation, TError, UpdateContactMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateContactMutation, TError, UpdateContactMutationVariables, TContext>(
      {
    mutationKey: ['UpdateContact'],
    mutationFn: (variables?: UpdateContactMutationVariables) => fetcher<UpdateContactMutation, UpdateContactMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateContactDocument, variables)(),
    ...options
  }
    )};

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
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteContactMutation, TError, DeleteContactMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteContactMutation, TError, DeleteContactMutationVariables, TContext>(
      {
    mutationKey: ['DeleteContact'],
    mutationFn: (variables?: DeleteContactMutationVariables) => fetcher<DeleteContactMutation, DeleteContactMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteContactDocument, variables)(),
    ...options
  }
    )};

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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindCountriesQueryVariables,
      options?: Omit<UseQueryOptions<FindCountriesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindCountriesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindCountriesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindCountries'] : ['FindCountries', variables],
    queryFn: fetcher<FindCountriesQuery, FindCountriesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindCountriesDocument, variables),
    ...options
  }
    )};

useFindCountriesQuery.getKey = (variables?: FindCountriesQueryVariables) => variables === undefined ? ['FindCountries'] : ['FindCountries', variables];

export const FindAllEquipmentDocument = `
    query FindAllEquipment($skip: Int! = 0, $take: Int! = 10, $orderBy: String, $q: String, $where: String, $filter: EquipmentFilterInput) {
  findAllEquipment(
    skip: $skip
    take: $take
    orderBy: $orderBy
    q: $q
    where: $where
    filter: $filter
  ) {
    data {
      id
      name
      internalCode
      licensePlate
      status
      year
      type {
        id
        name
      }
      model {
        id
        name
        brand {
          id
          name
        }
      }
      category {
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

export const useFindAllEquipmentQuery = <
      TData = FindAllEquipmentQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindAllEquipmentQueryVariables,
      options?: Omit<UseQueryOptions<FindAllEquipmentQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindAllEquipmentQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindAllEquipmentQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindAllEquipment'] : ['FindAllEquipment', variables],
    queryFn: fetcher<FindAllEquipmentQuery, FindAllEquipmentQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindAllEquipmentDocument, variables),
    ...options
  }
    )};

useFindAllEquipmentQuery.getKey = (variables?: FindAllEquipmentQueryVariables) => variables === undefined ? ['FindAllEquipment'] : ['FindAllEquipment', variables];

export const FindOneEquipmentDocument = `
    query FindOneEquipment($id: Int!) {
  findOneEquipment(id: $id) {
    id
    name
    internalCode
    licensePlate
    chassis
    engine
    color
    year
    status
    observation
    description
    typeId
    modelId
    categoryId
    companyId
    type {
      id
      name
    }
    model {
      id
      name
      brand {
        id
        name
      }
    }
    category {
      id
      name
    }
    company {
      id
      name
    }
    axles {
      id
      axleType
      order
      wheelCount
      tirePositions {
        id
        positionKey
        side
        isDual
      }
    }
  }
}
    `;

export const useFindOneEquipmentQuery = <
      TData = FindOneEquipmentQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: FindOneEquipmentQueryVariables,
      options?: Omit<UseQueryOptions<FindOneEquipmentQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindOneEquipmentQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindOneEquipmentQuery, TError, TData>(
      {
    queryKey: ['FindOneEquipment', variables],
    queryFn: fetcher<FindOneEquipmentQuery, FindOneEquipmentQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindOneEquipmentDocument, variables),
    ...options
  }
    )};

useFindOneEquipmentQuery.getKey = (variables: FindOneEquipmentQueryVariables) => ['FindOneEquipment', variables];

export const RemoveEquipmentDocument = `
    mutation RemoveEquipment($id: Int!) {
  removeEquipment(id: $id) {
    id
  }
}
    `;

export const useRemoveEquipmentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RemoveEquipmentMutation, TError, RemoveEquipmentMutationVariables, TContext>
    ) => {
    
    return useMutation<RemoveEquipmentMutation, TError, RemoveEquipmentMutationVariables, TContext>(
      {
    mutationKey: ['RemoveEquipment'],
    mutationFn: (variables?: RemoveEquipmentMutationVariables) => fetcher<RemoveEquipmentMutation, RemoveEquipmentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RemoveEquipmentDocument, variables)(),
    ...options
  }
    )};

export const RestoreEquipmentDocument = `
    mutation RestoreEquipment($id: Int!) {
  restoreEquipment(id: $id) {
    id
  }
}
    `;

export const useRestoreEquipmentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RestoreEquipmentMutation, TError, RestoreEquipmentMutationVariables, TContext>
    ) => {
    
    return useMutation<RestoreEquipmentMutation, TError, RestoreEquipmentMutationVariables, TContext>(
      {
    mutationKey: ['RestoreEquipment'],
    mutationFn: (variables?: RestoreEquipmentMutationVariables) => fetcher<RestoreEquipmentMutation, RestoreEquipmentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RestoreEquipmentDocument, variables)(),
    ...options
  }
    )};

export const HardDeleteEquipmentDocument = `
    mutation HardDeleteEquipment($id: Int!) {
  hardDeleteEquipment(id: $id) {
    id
  }
}
    `;

export const useHardDeleteEquipmentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<HardDeleteEquipmentMutation, TError, HardDeleteEquipmentMutationVariables, TContext>
    ) => {
    
    return useMutation<HardDeleteEquipmentMutation, TError, HardDeleteEquipmentMutationVariables, TContext>(
      {
    mutationKey: ['HardDeleteEquipment'],
    mutationFn: (variables?: HardDeleteEquipmentMutationVariables) => fetcher<HardDeleteEquipmentMutation, HardDeleteEquipmentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, HardDeleteEquipmentDocument, variables)(),
    ...options
  }
    )};

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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetPersonsQueryVariables,
      options?: Omit<UseQueryOptions<GetPersonsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPersonsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPersonsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPersons'] : ['GetPersons', variables],
    queryFn: fetcher<GetPersonsQuery, GetPersonsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPersonsDocument, variables),
    ...options
  }
    )};

useGetPersonsQuery.getKey = (variables?: GetPersonsQueryVariables) => variables === undefined ? ['GetPersons'] : ['GetPersons', variables];

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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindProvincesQueryVariables,
      options?: Omit<UseQueryOptions<FindProvincesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindProvincesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindProvincesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindProvinces'] : ['FindProvinces', variables],
    queryFn: fetcher<FindProvincesQuery, FindProvincesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindProvincesDocument, variables),
    ...options
  }
    )};

useFindProvincesQuery.getKey = (variables?: FindProvincesQueryVariables) => variables === undefined ? ['FindProvinces'] : ['FindProvinces', variables];

export const FindAllUnitsDocument = `
    query FindAllUnits($skip: Int! = 0, $take: Int! = 10, $orderBy: String, $q: String, $where: String) {
  findAllUnits(skip: $skip, take: $take, orderBy: $orderBy, q: $q, where: $where) {
    data {
      id
      name
      abbreviation
      isActive
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

export const useFindAllUnitsQuery = <
      TData = FindAllUnitsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindAllUnitsQueryVariables,
      options?: Omit<UseQueryOptions<FindAllUnitsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindAllUnitsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindAllUnitsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindAllUnits'] : ['FindAllUnits', variables],
    queryFn: fetcher<FindAllUnitsQuery, FindAllUnitsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindAllUnitsDocument, variables),
    ...options
  }
    )};

useFindAllUnitsQuery.getKey = (variables?: FindAllUnitsQueryVariables) => variables === undefined ? ['FindAllUnits'] : ['FindAllUnits', variables];

export const FindOneUnitDocument = `
    query FindOneUnit($id: Int!) {
  findOneUnit(id: $id) {
    id
    name
    abbreviation
    isActive
  }
}
    `;

export const useFindOneUnitQuery = <
      TData = FindOneUnitQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: FindOneUnitQueryVariables,
      options?: Omit<UseQueryOptions<FindOneUnitQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindOneUnitQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindOneUnitQuery, TError, TData>(
      {
    queryKey: ['FindOneUnit', variables],
    queryFn: fetcher<FindOneUnitQuery, FindOneUnitQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindOneUnitDocument, variables),
    ...options
  }
    )};

useFindOneUnitQuery.getKey = (variables: FindOneUnitQueryVariables) => ['FindOneUnit', variables];

export const CreateUnitDocument = `
    mutation CreateUnit($input: CreateUnitDto!) {
  createUnit(input: $input) {
    id
    name
    abbreviation
  }
}
    `;

export const useCreateUnitMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateUnitMutation, TError, CreateUnitMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateUnitMutation, TError, CreateUnitMutationVariables, TContext>(
      {
    mutationKey: ['CreateUnit'],
    mutationFn: (variables?: CreateUnitMutationVariables) => fetcher<CreateUnitMutation, CreateUnitMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateUnitDocument, variables)(),
    ...options
  }
    )};

export const UpdateUnitDocument = `
    mutation UpdateUnit($id: Int!, $input: UpdateUnitDto!) {
  updateUnit(id: $id, input: $input) {
    id
    name
    abbreviation
  }
}
    `;

export const useUpdateUnitMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUnitMutation, TError, UpdateUnitMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateUnitMutation, TError, UpdateUnitMutationVariables, TContext>(
      {
    mutationKey: ['UpdateUnit'],
    mutationFn: (variables?: UpdateUnitMutationVariables) => fetcher<UpdateUnitMutation, UpdateUnitMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUnitDocument, variables)(),
    ...options
  }
    )};

export const RemoveUnitDocument = `
    mutation RemoveUnit($id: Int!) {
  removeUnit(id: $id) {
    id
  }
}
    `;

export const useRemoveUnitMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RemoveUnitMutation, TError, RemoveUnitMutationVariables, TContext>
    ) => {
    
    return useMutation<RemoveUnitMutation, TError, RemoveUnitMutationVariables, TContext>(
      {
    mutationKey: ['RemoveUnit'],
    mutationFn: (variables?: RemoveUnitMutationVariables) => fetcher<RemoveUnitMutation, RemoveUnitMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RemoveUnitDocument, variables)(),
    ...options
  }
    )};

export const RestoreUnitDocument = `
    mutation RestoreUnit($id: Int!) {
  restoreUnit(id: $id) {
    id
  }
}
    `;

export const useRestoreUnitMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RestoreUnitMutation, TError, RestoreUnitMutationVariables, TContext>
    ) => {
    
    return useMutation<RestoreUnitMutation, TError, RestoreUnitMutationVariables, TContext>(
      {
    mutationKey: ['RestoreUnit'],
    mutationFn: (variables?: RestoreUnitMutationVariables) => fetcher<RestoreUnitMutation, RestoreUnitMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RestoreUnitDocument, variables)(),
    ...options
  }
    )};

export const HardDeleteUnitDocument = `
    mutation HardDeleteUnit($id: Int!) {
  hardDeleteUnit(id: $id) {
    id
  }
}
    `;

export const useHardDeleteUnitMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<HardDeleteUnitMutation, TError, HardDeleteUnitMutationVariables, TContext>
    ) => {
    
    return useMutation<HardDeleteUnitMutation, TError, HardDeleteUnitMutationVariables, TContext>(
      {
    mutationKey: ['HardDeleteUnit'],
    mutationFn: (variables?: HardDeleteUnitMutationVariables) => fetcher<HardDeleteUnitMutation, HardDeleteUnitMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, HardDeleteUnitDocument, variables)(),
    ...options
  }
    )};

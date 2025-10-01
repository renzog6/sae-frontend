// filepath: sae-frontend/lib/hooks/useLocations.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LocationsService } from "@/lib/api/locations";
import { City, Province, Address } from "@/types/location";
import { CityFormData, AddressFormData } from "@/lib/validations/location";

// List all cities
export function useCities(accessToken: string) {
  return useQuery<City[], Error>({
    queryKey: ["cities"],
    queryFn: () => LocationsService.getCities(accessToken),
    enabled: !!accessToken,
  });
}

// ===== Provinces (read-only) =====
export function useProvinces(accessToken: string) {
  return useQuery<Province[], Error>({
    queryKey: ["provinces"],
    queryFn: () => LocationsService.getProvinces(accessToken),
    enabled: !!accessToken,
  });
}

export function useProvince(accessToken: string, id: number) {
  return useQuery<Province, Error>({
    queryKey: ["province", id],
    queryFn: () => LocationsService.getProvinceById(id, accessToken),
    enabled: !!accessToken && !!id,
  });
}

export function useProvinceByCode(accessToken: string, code: string) {
  return useQuery<Province, Error>({
    queryKey: ["provinceByCode", code],
    queryFn: () => LocationsService.getProvinceByCode(code, accessToken),
    enabled: !!accessToken && !!code,
  });
}

export function useProvincesByCountry(accessToken: string, countryId: number) {
  return useQuery<Province[], Error>({
    queryKey: ["provincesByCountry", countryId],
    queryFn: () => LocationsService.getProvincesByCountryId(countryId, accessToken),
    enabled: !!accessToken && !!countryId,
  });
}

// ===== Addresses =====
export function useAddresses(accessToken: string) {
  return useQuery<Address[], Error>({
    queryKey: ["addresses"],
    queryFn: () => LocationsService.getAddresses(accessToken),
    enabled: !!accessToken,
  });
}

export function useAddress(accessToken: string, id: number) {
  return useQuery<Address, Error>({
    queryKey: ["address", id],
    queryFn: () => LocationsService.getAddressById(id, accessToken),
    enabled: !!accessToken && !!id,
  });
}

export function useCreateAddress(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddressFormData) =>
      LocationsService.createAddress(data, accessToken),
    onSuccess: (_data, variables) => {
      // Invalidate generic addresses and all company-scoped address lists
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      // Invalidate any "addressesByCompany" queries regardless of companyId
      queryClient.invalidateQueries({ queryKey: ["addressesByCompany"] });
      // Invalidate any "addressesByPerson" queries regardless of personId
      queryClient.invalidateQueries({ queryKey: ["addressesByPerson"] });
      // Optional: if we have companyId in the payload, we can target it as well
      if (variables?.companyId) {
        queryClient.invalidateQueries({ queryKey: ["addressesByCompany", variables.companyId] });
      }
      if (variables?.personId) {
        queryClient.invalidateQueries({ queryKey: ["addressesByPerson", variables.personId] });
      }
    },
  });
}

export function useUpdateAddress(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) =>
      LocationsService.updateAddress(id, data, accessToken),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["address", variables.id] });
      // Also invalidate all company-scoped address lists (we might not know the companyId here)
      queryClient.invalidateQueries({ queryKey: ["addressesByCompany"] });
      // Also invalidate all person-scoped address lists
      queryClient.invalidateQueries({ queryKey: ["addressesByPerson"] });
    },
  });
}

export function useDeleteAddress(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => LocationsService.deleteAddress(id, accessToken),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["address", id] });
      // Also invalidate all company-scoped address lists
      queryClient.invalidateQueries({ queryKey: ["addressesByCompany"] });
      // Also invalidate all person-scoped address lists
      queryClient.invalidateQueries({ queryKey: ["addressesByPerson"] });
    },
  });
}

export function useAddressesByCity(accessToken: string, cityId: number) {
  return useQuery<Address[], Error>({
    queryKey: ["addressesByCity", cityId],
    queryFn: () => LocationsService.getAddressesByCity(cityId, accessToken),
    enabled: !!accessToken && !!cityId,
  });
}

export function useAddressesByCompany(accessToken: string, companyId: number) {
  return useQuery<Address[], Error>({
    queryKey: ["addressesByCompany", companyId],
    queryFn: () => LocationsService.getAddressesByCompany(companyId, accessToken),
    enabled: !!accessToken && !!companyId,
  });
}

export function useAddressesByPerson(accessToken: string, personId: number) {
  return useQuery<Address[], Error>({
    queryKey: ["addressesByPerson", personId],
    queryFn: () => LocationsService.getAddressesByPerson(personId, accessToken),
    enabled: !!accessToken && !!personId,
  });
}

// Get a single city by ID
export function useCity(accessToken: string, id: number) {
  return useQuery<City, Error>({
    queryKey: ["city", id],
    queryFn: () => LocationsService.getCityById(id, accessToken),
    enabled: !!accessToken && !!id,
  });
}

// Create a city
export function useCreateCity(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cityData: CityFormData) =>
      LocationsService.createCity(cityData, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });
}

// Update a city
export function useUpdateCity(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, cityData }: { id: number; cityData: Partial<City> }) =>
      LocationsService.updateCity(id, cityData, accessToken),
    onSuccess: (_data, variables) => {
      // Invalidate list and the specific city cache
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      queryClient.invalidateQueries({ queryKey: ["city", variables.id] });
    },
  });
}

// Delete a city
export function useDeleteCity(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => LocationsService.deleteCity(id, accessToken),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      queryClient.invalidateQueries({ queryKey: ["city", id] });
    },
  });
}

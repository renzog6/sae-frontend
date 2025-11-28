// filepath: sae-frontend/lib/hooks/useLocations.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LocationsService } from "@/lib/api/locations/locations.service";
import { City, Province, Address } from "@/lib/types/shared/location";
import { CityFormData, AddressFormData } from "@/lib/validations/location";

// List all cities
export function useCities() {
  return useQuery<City[], Error>({
    queryKey: ["cities"],
    queryFn: () => LocationsService.getCities(),
  });
}

// ===== Provinces (read-only) =====
export function useProvinces() {
  return useQuery<Province[], Error>({
    queryKey: ["provinces"],
    queryFn: () => LocationsService.getProvinces(),
  });
}

export function useProvince(id: number) {
  return useQuery<Province, Error>({
    queryKey: ["province", id],
    queryFn: () => LocationsService.getProvinceById(id),
    enabled: !!id,
  });
}

export function useProvinceByCode(code: string) {
  return useQuery<Province, Error>({
    queryKey: ["provinceByCode", code],
    queryFn: () => LocationsService.getProvinceByCode(code),
    enabled: !!code,
  });
}

export function useProvincesByCountry(countryId: number) {
  return useQuery<Province[], Error>({
    queryKey: ["provincesByCountry", countryId],
    queryFn: () => LocationsService.getProvincesByCountryId(countryId),
    enabled: !!countryId,
  });
}

// ===== Addresses =====
export function useAddresses() {
  return useQuery<Address[], Error>({
    queryKey: ["addresses"],
    queryFn: () => LocationsService.getAddresses(),
  });
}

export function useAddress(id: number) {
  return useQuery<Address, Error>({
    queryKey: ["address", id],
    queryFn: () => LocationsService.getAddressById(id),
    enabled: !!id,
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddressFormData) => LocationsService.createAddress(data),
    onSuccess: (_data, variables) => {
      // Invalidate generic addresses and all company-scoped address lists
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      // Invalidate any "addressesByCompany" queries regardless of companyId
      queryClient.invalidateQueries({ queryKey: ["addressesByCompany"] });
      // Invalidate any "addressesByPerson" queries regardless of personId
      queryClient.invalidateQueries({ queryKey: ["addressesByPerson"] });
      // Optional: if we have companyId in the payload, we can target it as well
      if (variables?.companyId) {
        queryClient.invalidateQueries({
          queryKey: ["addressesByCompany", variables.companyId],
        });
      }
      if (variables?.personId) {
        queryClient.invalidateQueries({
          queryKey: ["addressesByPerson", variables.personId],
        });
      }
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) =>
      LocationsService.updateAddress(id, data),
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

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => LocationsService.deleteAddress(id),
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

export function useAddressesByCity(cityId: number) {
  return useQuery<Address[], Error>({
    queryKey: ["addressesByCity", cityId],
    queryFn: () => LocationsService.getAddressesByCity(cityId),
    enabled: !!cityId,
  });
}

export function useAddressesByCompany(companyId: number) {
  return useQuery<Address[], Error>({
    queryKey: ["addressesByCompany", companyId],
    queryFn: () => LocationsService.getAddressesByCompany(companyId),
    enabled: !!companyId,
  });
}

export function useAddressesByPerson(personId: number) {
  return useQuery<Address[], Error>({
    queryKey: ["addressesByPerson", personId],
    queryFn: () => LocationsService.getAddressesByPerson(personId),
    enabled: !!personId,
  });
}

// Get a single city by ID
export function useCity(id: number) {
  return useQuery<City, Error>({
    queryKey: ["city", id],
    queryFn: () => LocationsService.getCityById(id),
    enabled: !!id,
  });
}

// Create a city
export function useCreateCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cityData: CityFormData) =>
      LocationsService.createCity(cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });
}

// Update a city
export function useUpdateCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, cityData }: { id: number; cityData: Partial<City> }) =>
      LocationsService.updateCity(id, cityData),
    onSuccess: (_data, variables) => {
      // Invalidate list and the specific city cache
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      queryClient.invalidateQueries({ queryKey: ["city", variables.id] });
    },
  });
}

// Delete a city
export function useDeleteCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => LocationsService.deleteCity(id),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      queryClient.invalidateQueries({ queryKey: ["city", id] });
    },
  });
}

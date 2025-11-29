// filepath: sae-frontend/lib/hooks/useLocations.ts
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { useQuery } from "@tanstack/react-query";
import {
  ProvincesService,
  CitiesService,
  AddressesService,
} from "@/lib/api/locations";

// ===== Addresses =====
export const useAddresses = () => {
  const base = createApiHooks(AddressesService, "addresses");

  const useByCity = (cityId: number) =>
    useQuery({
      queryKey: ["addresses", "byCity", cityId],
      queryFn: () => AddressesService.getByCity(cityId),
      enabled: !!cityId,
    });

  const useByCompany = (companyId: number) =>
    useQuery({
      queryKey: ["addresses", "byCompany", companyId],
      queryFn: () => AddressesService.getByCompany(companyId),
      enabled: !!companyId,
    });

  const useByPerson = (personId: number) =>
    useQuery({
      queryKey: ["addresses", "byPerson", personId],
      queryFn: () => AddressesService.getByPerson(personId),
      enabled: !!personId,
    });

  return {
    ...base,
    useByCity,
    useByCompany,
    useByPerson,
  };
};

// ===== Cities =====
export const useCities = () => {
  const base = createApiHooks(CitiesService, "cities");

  return {
    ...base,
  };
};

// ===== Provinces (read-only) =====
export const useProvinces = () => {
  const useGetAll = () =>
    useQuery({
      queryKey: ["provinces", "all"],
      queryFn: () => ProvincesService.getAll(),
    });

  const useGetById = (id: number) =>
    useQuery({
      queryKey: ["provinces", "byId", id],
      queryFn: () => ProvincesService.getById(id),
      enabled: !!id,
    });

  const useGetByCode = (code: string) =>
    useQuery({
      queryKey: ["provinces", "byCode", code],
      queryFn: () => ProvincesService.getByCode(code),
      enabled: !!code,
    });

  const useGetByCountry = (countryId: number) =>
    useQuery({
      queryKey: ["provinces", "byCountry", countryId],
      queryFn: () => ProvincesService.getByCountryId(countryId),
      enabled: !!countryId,
    });

  return {
    useGetAll,
    useGetById,
    useGetByCode,
    useGetByCountry,
  };
};

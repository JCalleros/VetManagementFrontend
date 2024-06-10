import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPets,
  createPet,
  removePet,
  editPet,
  setFilter,
} from "./petsSlice";

export function usePets() {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets.data);
  const loading = useSelector((state) => state.pets.loading);
  const error = useSelector((state) => state.pets.error);
  const filter = useSelector((state) => state.pets.currentFilter);

  useEffect(() => {
    dispatch(fetchPets());
    dispatch(setFilter({ search: "", species: "", sex: "" }));
  }, [dispatch]);

  const handleAddPet = (pet) => {
    dispatch(createPet(pet));
  };

  const handleUpdatePet = (pet) => {
    dispatch(editPet(pet));
  };

  const handleDeletePet = (petId) => {
    dispatch(removePet(petId));
  };

  const handleSetFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch = filter.search
        ? pet.name.toLowerCase().includes(filter.search.toLowerCase())
        : true;
      const matchesSpecies = filter.species
        ? pet.species.toLowerCase() === filter.species.toLowerCase()
        : true;
      const matchesSex = filter.sex
        ? pet.sex.toLowerCase() === filter.sex.toLowerCase().charAt(0)
        : true;

      return matchesSearch && matchesSpecies && matchesSex;
    });
  }, [pets, filter]);

  return {
    pets: filteredPets,
    loading,
    error,
    filter,
    handleAddPet,
    handleUpdatePet,
    handleDeletePet,
    handleSetFilter,
  };
}

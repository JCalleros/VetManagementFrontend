import { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  fetchOwners,
  createOwner,
  removeOwner,
  editOwner,
  setFilter,
} from "./ownersSlice";

export function useOwners() {
  const dispatch = useDispatch();
  const owners = useSelector((state) => state.owners.data);
  const loading = useSelector((state) => state.owners.loading);
  const error = useSelector((state) => state.owners.error);
  const filter = useSelector((state) => state.owners.currentFilter);

  useEffect(() => {
    dispatch(fetchOwners());
  }, [dispatch]); // Only fetch owners once on mount

  const handleAddOwner = useCallback(
    async (owner) => {
      try {
        const resultAction = await dispatch(createOwner(owner));
        return unwrapResult(resultAction); // Returns the created owner
      } catch (err) {
        console.error("Failed to create owner: ", err);
        throw err;
      }
    },
    [dispatch]
  );

  const handleUpdateOwner = (owner) => {
    dispatch(editOwner(owner));
  };

  const handleDeleteOwner = (ownerId) => {
    dispatch(removeOwner(ownerId));
  };

  const handleSetFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  const filteredOwners = useMemo(() => {
    return owners.filter((owner) => {
      const matchesSearch = filter.search
        ? owner.name.toLowerCase().includes(filter.search.toLowerCase())
        : true;
      const matchesPhone = filter.phone
        ? owner.phone.toLowerCase() === filter.phone.toLowerCase()
        : true;

      return matchesSearch && matchesPhone;
    });
  }, [owners, filter]);

  return {
    owners: filteredOwners,
    loading,
    error,
    filter,
    handleAddOwner,
    handleUpdateOwner,
    handleDeleteOwner,
    handleSetFilter,
  };
}

"use client";

import { useEffect } from "react";
import { useEntryStore } from "../hooks/useEntryStore";

const Hydration = () => {
  useEffect(() => {
    useEntryStore.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;

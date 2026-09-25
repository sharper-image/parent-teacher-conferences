import { useEffect } from "react";
import { rehydrateConference } from "@/lib/store";

export function PersistGate() {
  useEffect(() => {
    rehydrateConference();
  }, []);
  return null;
}

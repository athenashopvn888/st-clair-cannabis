"use client";

import { createContext, useContext } from "react";
import { CODED_BANNERS, CODED_NAP } from "../lib/fleet/coded";
import type { Nap, ResolvedBanner } from "../lib/fleet/types";

export type PublicFleet = {
  active: boolean;
  version: string;
  nap: Nap;
  banners: ResolvedBanner[];
};

const CODED: PublicFleet = {
  active: false,
  version: "STC01:coded",
  nap: CODED_NAP,
  banners: CODED_BANNERS,
};

const FleetContentContext = createContext<PublicFleet>(CODED);

export default function FleetContentProvider({
  value,
  children,
}: {
  value: PublicFleet;
  children: React.ReactNode;
}) {
  return <FleetContentContext.Provider value={value}>{children}</FleetContentContext.Provider>;
}

export function useFleetContent(): PublicFleet {
  return useContext(FleetContentContext);
}

import { IClient } from "../clients/IClient";

export type MapRoom = Map<string, IClient[]>;

export type Nullable<T> = T | null | undefined;
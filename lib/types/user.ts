export type UserRole =
  | "field_officer"
  | "mcs_supervisor"
  | "maintenance_unit"
  | "maintenance_officer";

export type UserEntity = "jmto" | "jmj" | "jmtm";

export interface User {
  id: number;
  identity_code: string;
  name: string;
  position: string;
  entity: UserEntity;
  role: UserRole;
}

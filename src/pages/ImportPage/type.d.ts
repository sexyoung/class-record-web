import { StudentStatus } from "domain/type";

export interface StudentRow {
  name: string;
  plan: string;
  depositDay: string;
  status: StudentStatus;
}

export interface PlanRow {
  name: string;
  money: number;
  times: number;
  expiresDays: number;
}

export interface RollCallRow {
  datetime: string;
  student: string;
}
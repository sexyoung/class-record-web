import { IPlanData } from "domain/type/res/plan";

export interface IPlanEdit {
  plan: IPlanData,
  editPlan: (params: IPlanData) => Promise<void>;
}
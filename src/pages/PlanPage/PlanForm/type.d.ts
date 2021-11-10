import { IPlanData } from "domain/type/res/plan";

export interface IPlanForm {
  title: string;
  plan?: IPlanData;
  submitText: string;
  postPlan: (params: IPlanData) => Promise<void>;
}
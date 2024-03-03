export const MAX_LIMIT = 500;

export enum StatusEnum {
  Pending = 0,
  Accepted = 1,
  InProcess = 2,
  Completed = 3,
  Cancelled = 4,
}

export const StatusLabelReportEnum: any = {
  total_Pending: "Total pending",
  total_Accepted: "Total accepted",
  total_InProcess: "Total in process",
  total_Completed: "Total completed",
  total_Cancelled: "Total cancelled",
};

export const StatusOptions = [
  {
    label: "Pending",
    value: StatusEnum.Pending,
  },
  {
    label: "Accepted",
    value: StatusEnum.Accepted,
  },
  {
    label: "In process",
    value: StatusEnum.InProcess,
  },
  {
    label: "Completed",
    value: StatusEnum.Completed,
  },
  {
    label: "Cancelled",
    value: StatusEnum.Cancelled,
  },
];

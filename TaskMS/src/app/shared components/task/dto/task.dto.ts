export interface TaskDto {
    _id:string;
    taskId?:number;
    taskName?:string;
    taskDescription?:string;
    taskStartDate?:Date;
    taskDueDate?:Date;
    taskStatus?:string;
    taskAssignedMembers?:any[];
    taskActivityHistory?:any[]
}
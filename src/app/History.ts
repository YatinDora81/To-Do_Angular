export class History {
    id : string;
    title: string;
    desc: string;
    operation : string;
    status: "To-do" | "Completed" | "In-Progress";
    createdAt: Date;
    priority: "1" | "2" | "3";
    updateAt : Date;
  
    constructor(
        id : string,
      title: string,
      desc: string,
      operation : string,
      status : "To-do" | "Completed" | "In-Progress",
      priority: "1" | "2" | "3",
      createdAt = new Date(), // Set default to current date and time
      updateAt = new Date()
    ) {
        this.id= id;
      this.title = title;
      this.desc = desc;
      this.operation = operation
      this.status = status;
      this.priority = priority;
      this.createdAt = createdAt;
      this.updateAt = updateAt
    }
}
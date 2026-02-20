export type Task = {
    id:string;
    content:string;
    sectionId:string;
    createdAt?:string;
    syncStatus?: "synced" | "pending" | "error";
}
import type { Task } from "../types/task";

export const TASKS:Task[]=[
    {id:"1",content:"set up vite",sectionId:"done",createdAt:new Date().toISOString(),},
    {id:"2",content:"set up tailwind",sectionId:"done",createdAt:new Date().toISOString(),},
    {id:"3",content:"create components",sectionId:"doing",createdAt:new Date().toISOString(),},
    {id:"4",content:"finish UI",sectionId:"todo",createdAt:new Date().toISOString(),},
]
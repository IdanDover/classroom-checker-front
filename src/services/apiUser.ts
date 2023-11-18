import axiosInstance from "../libs/Axios";
import { Task } from "../models/Task";
import { Classroom } from "../models/classroom";

export async function getAllClassrooms(time?: "old" | "noon" | "evening") {
  const query = `?time=eq;${time}`;
  return axiosInstance.get(`/classroom${query}`);
}

export async function addClassroom(classroom: Classroom) {
  return axiosInstance.post(`/classroom`, classroom);
}

export async function updateClassroom(classroom: Classroom) {
  return axiosInstance.put(`/classroom/${classroom.id}`, classroom);
}

export async function deleteClassroom(classroomId: string) {
  return axiosInstance.delete(`/classroom/${classroomId}`);
}

export async function getAllTasks() {
  return axiosInstance.get(`/task`);
}

export async function addTask(task: Task) {
  return axiosInstance.post(`/task`, task);
}

export async function updateTask(task: Task) {
  return axiosInstance.put(`/task/${task.id}`, task);
}

export async function deleteTask(TaskId: string) {
  return axiosInstance.delete(`/task/${TaskId}`);
}

export async function getFloors(time?: "old" | "noon" | "evening") {
  const query = `?time=eq;${time}&sort=classNum`;
  return axiosInstance.get(`/floors${query}`);
}

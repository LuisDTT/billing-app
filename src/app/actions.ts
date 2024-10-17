"use server";
import { revalidatePath } from "next/cache";

export async function revalidateCustomers() {
  revalidatePath("/customers");
}

export async function revalidateInvoices() {
  revalidatePath("/billing");
}

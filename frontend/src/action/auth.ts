"use server";

import bcrypt from "bcrypt";

import prisma from "@/lib/db/client";
import { SignupFormSchema } from "@/lib/definitions";
import { createSession } from "@/lib/session";
import type { SignupInput } from "@/lib/form/definitions";
import { redirect } from "next/navigation";

export async function signUp(signupForm: SignupInput) {
  // const signupForm: SignupInput = await request.json();

  // Validation
  const validatedFields = SignupFormSchema.safeParse(signupForm);

  if (!validatedFields.success) return validatedFields.error.flatten().fieldErrors;

  // Auth
  const hashedPassword = await bcrypt.hash(signupForm.password, 10)

  const user = await prisma.user.create({
    data: {
      name: signupForm.username,
      email: signupForm.email,
      password: hashedPassword
    },
  });

  // Session
  await createSession(user.id.toString());

  redirect("/Formulas");
}
'use server';

import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: 'All fields are required.' };
  }

  console.log('MOCK: Contact form submitted:', { name, email, message });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  revalidatePath('/');
  return { success: 'Message sent successfully! (Hardcoded Mode)' };
}

export async function incrementPageView(path: string) {
  console.log('MOCK: Increment page view for:', path);
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log('MOCK: Login attempt:', { email, password });

  // Simple hardcoded check for demo purposes if needed
  if (email === 'admin@example.com' && password === 'admin123') {
    revalidatePath('/admin', 'layout');
    return { success: true };
  }

  return { error: 'Invalid credentials. (Hardcoded Mode: admin@example.com / admin123)' };
}

export async function addProject(formData: FormData) {
  const title = formData.get('title') as string;
  console.log('MOCK: Add project:', title);

  // In a real hardcoded mode, we can't persist new projects to the file system easily via client actions 
  // without a backend. Since this is a static-first request, we'll just return success.
  
  return { success: true };
}

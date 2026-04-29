'use server';

import { createServerSideClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: FormData) {
  const supabase = await createServerSideClient();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: 'All fields are required.' };
  }

  const { error } = await supabase
    .from('contacts')
    .insert([{ name, email, message }]);

  if (error) {
    console.error('Submission error:', error);
    return { error: 'Failed to send message. Please try again.' };
  }

  revalidatePath('/');
  return { success: 'Message sent successfully!' };
}

export async function incrementPageView(path: string) {
  const supabase = await createServerSideClient();

  // This is a simple upsert logic for analytics
  const { data, error: fetchError } = await supabase
    .from('site_analytics')
    .select('view_count')
    .eq('page_path', path)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    return;
  }

  if (data) {
    await supabase
      .from('site_analytics')
      .update({ view_count: data.view_count + 1, last_visited: new Date().toISOString() })
      .eq('page_path', path);
  } else {
    await supabase
      .from('site_analytics')
      .insert([{ page_path: path, view_count: 1 }]);
  }
}

export async function login(formData: FormData) {
  const supabase = await createServerSideClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin', 'layout');
  return { success: true };
}

export async function addProject(formData: FormData) {
  const supabase = await createServerSideClient();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const image_url = formData.get('image_url') as string;
  const live_url = formData.get('live_url') as string;
  const repo_url = formData.get('repo_url') as string;
  const tags = (formData.get('tags') as string).split(',').map(t => t.trim());

  const { error } = await supabase
    .from('projects')
    .insert([{ title, description, image_url, live_url, repo_url, tags }]);

  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin/dashboard');
  return { success: true };
}

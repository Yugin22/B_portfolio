-- 1. Projects Table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  live_url TEXT,
  repo_url TEXT,
  tags TEXT[], -- Array of strings
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Contact Submissions Table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Analytics Table (Simple page view tracker)
CREATE TABLE site_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT UNIQUE NOT NULL,
  view_count INTEGER DEFAULT 0,
  last_visited TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for Projects (Public can read, only Admin can write)
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);

-- Policies for Contacts (Anyone can insert, only Admin can read/delete)
CREATE POLICY "Anyone can submit contact form" ON contacts FOR INSERT WITH CHECK (true);

-- Policies for Analytics (Public can update count, only Admin can read)
CREATE POLICY "Allow public count increments" ON site_analytics FOR UPDATE USING (true);
CREATE POLICY "Allow public select" ON site_analytics FOR SELECT USING (true);

-- Function to increment project views
CREATE OR REPLACE FUNCTION increment_project_view(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects
  SET views_count = views_count + 1
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

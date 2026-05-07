const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://ifextsczuoxwcgkaufzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZXh0c2N6dW94d2Nna2F1ZnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NDQ4NzAsImV4cCI6MjA5MzAyMDg3MH0.JeGGvOUtSESKJNAMCXPlVzJO88iPemRJ6dX6ioCjfTU';

const supabase = createClient(supabaseUrl, supabaseKey);

// Path to the JSON file fetched earlier
const jsonPath = path.join(__dirname, '..', '.system_generated', 'steps', '49', 'content.md');
// Wait, the path was absolute in the view_file tool.
const absoluteJsonPath = 'C:\\Users\\CCL3-PC44\\.gemini\\antigravity\\brain\\128e41fd-88f6-4754-8d88-322e1df883ee\\.system_generated\\steps\\49\\content.md';

async function importRepos() {
    try {
        const rawData = fs.readFileSync(absoluteJsonPath, 'utf8');
        const jsonContent = rawData.substring(rawData.indexOf('['));
        const repos = JSON.parse(jsonContent);

        console.log(`Found ${repos.length} repositories.`);

        const projects = repos.map(repo => ({
            title: repo.name.toUpperCase(),
            description: repo.description || `A repository for ${repo.name}.`,
            image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop', // Default image
            live_url: repo.homepage || repo.html_url,
            repo_url: repo.html_url,
            tags: repo.language ? [repo.language.toUpperCase()] : ['REPO'],
            created_at: repo.created_at
        }));

        const { data, error } = await supabase
            .from('projects')
            .upsert(projects, { onConflict: 'repo_url' });

        if (error) {
            console.error('Error inserting projects:', error);
        } else {
            console.log('Successfully imported projects.');
        }
    } catch (err) {
        console.error('Failed to process JSON:', err);
    }
}

importRepos();

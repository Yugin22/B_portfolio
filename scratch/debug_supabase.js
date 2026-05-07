const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ifextsczuoxwcgkaufzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZXh0c2N6dW94d2Nna2F1ZnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NDQ4NzAsImV4cCI6MjA5MzAyMDg3MH0.JeGGvOUtSESKJNAMCXPlVzJO88iPemRJ6dX6ioCjfTU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
    const { data, error } = await supabase.rpc('get_tables'); // If there's a custom RPC
    if (error) {
        // Try direct query if possible, but anon key might not have permission
        const { data: data2, error: error2 } = await supabase.from('site_analytics').select('*').limit(1);
        console.log('Site Analytics fetch:', { data: data2, error: error2 });
    } else {
        console.log('Tables:', data);
    }
}

listTables();

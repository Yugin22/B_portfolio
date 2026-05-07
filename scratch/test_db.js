const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ifextsczuoxwcgkaufzk.supabase.co/rest/v1/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZXh0c2N6dW94d2Nna2F1ZnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NDQ4NzAsImV4cCI6MjA5MzAyMDg3MH0.JeGGvOUtSESKJNAMCXPlVzJO88iPemRJ6dX6ioCjfTU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSelect() {
    const { data, error } = await supabase.from('projects').select('*').limit(1);
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Success:', data);
    }
}

testSelect();

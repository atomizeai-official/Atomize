import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function SupabaseTestPage() {
  // Fetch only the count from the 'companies' table for efficiency (head: true)
  const { count, error } = await supabase
    .from('companies')
    .select('*', { count: 'exact', head: true });

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>
        Supabase Connection Test
      </h1>
      
      {error ? (
        <div style={{ color: 'red', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <strong>❌ Connection Failed</strong>
          <code>{error.message}</code>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Hint: Check your connection strings, table name ('companies'), or RLS policies.
          </p>
        </div>
      ) : (
        <div style={{ color: 'green', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <strong>✅ Connection Successful!</strong>
          <span style={{ fontSize: '1.25rem' }}>
            Database Connected: <strong>{count}</strong> companies found.
          </span>
        </div>
      )}
    </div>
  );
}

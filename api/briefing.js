const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 160;
const MAX_CONTEXT_LENGTH = 1000;

function json(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function clean(value, maxLength = MAX_LENGTH) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });

  let payload = req.body;
  if (typeof payload === 'string') {
    try { payload = JSON.parse(payload); } catch { return json(res, 400, { error: 'Invalid request body.' }); }
  }

  // Quietly discard obvious bot submissions without exposing database behavior.
  if (clean(payload?.website)) return json(res, 200, { ok: true });

  const name = clean(payload?.name);
  const corporateEmail = clean(payload?.email).toLowerCase();
  const helpType = clean(payload?.helpType);
  const region = clean(payload?.region);
  const context = clean(payload?.context, MAX_CONTEXT_LENGTH);

  if (!name || !corporateEmail || !helpType) return json(res, 400, { error: 'Name, corporate email and what you need help with are required.' });
  if (!EMAIL_PATTERN.test(corporateEmail)) return json(res, 400, { error: 'Enter a valid corporate email.' });

  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceRoleKey) return json(res, 500, { error: 'The briefing database is not configured.' });

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/briefing_requests`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        name,
        corporate_email: corporateEmail,
        help_type: helpType,
        region: region || null,
        context: context || null,
        source: 'tcnconsultants.com'
      })
    });

    if (!response.ok) {
      console.error('Supabase insert failed:', response.status, await response.text());
      return json(res, 502, { error: 'The briefing could not be saved. Please email tracy@tcnconsultants.com.' });
    }

    return json(res, 201, { ok: true });
  } catch (error) {
    console.error('Briefing persistence error:', error);
    return json(res, 502, { error: 'The briefing could not be saved. Please email tracy@tcnconsultants.com.' });
  }
};

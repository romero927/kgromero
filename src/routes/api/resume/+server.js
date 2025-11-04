import { json } from '@sveltejs/kit';
import resumeData from '../../../../static/kgromero.json';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  // Set CORS headers to allow cross-origin requests
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=3600'
  };

  return json(resumeData, { headers });
}

/** @type {import('./$types').RequestHandler} */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

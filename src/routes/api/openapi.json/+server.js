import { json } from '@sveltejs/kit';

const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Kyle Romero Resume API',
    description: 'API for accessing Kyle Romero\'s professional resume in JSON Resume format',
    version: '1.0.0',
    contact: {
      name: 'Kyle Romero',
      email: 'kgromero@gmail.com',
      url: 'https://kgromero.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'https://kgromero.com',
      description: 'Production server'
    },
    {
      url: 'http://localhost:5173',
      description: 'Development server'
    }
  ],
  paths: {
    '/api/resume': {
      get: {
        summary: 'Get Resume',
        description: 'Retrieves Kyle Romero\'s complete professional resume in JSON Resume format',
        operationId: 'getResume',
        tags: ['Resume'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Resume'
                }
              }
            }
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Resume: {
        type: 'object',
        description: 'JSON Resume Schema (https://jsonresume.org/schema/)',
        properties: {
          basics: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Kyle Romero' },
              label: { type: 'string', example: 'Director of Software Development' },
              email: { type: 'string', format: 'email', example: 'kgromero@gmail.com' },
              phone: { type: 'string', example: '(281) 857-9006' },
              website: { type: 'string', format: 'uri', example: 'https://kgromero.com' },
              summary: { type: 'string' },
              location: {
                type: 'object',
                properties: {
                  city: { type: 'string' },
                  region: { type: 'string' },
                  countryCode: { type: 'string' },
                  address: { type: 'string' },
                  postalCode: { type: 'string' }
                }
              },
              profiles: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    network: { type: 'string' },
                    username: { type: 'string' },
                    url: { type: 'string', format: 'uri' }
                  }
                }
              }
            }
          },
          work: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                company: { type: 'string' },
                position: { type: 'string' },
                website: { type: 'string', format: 'uri' },
                startDate: { type: 'string', format: 'date' },
                endDate: { type: 'string', format: 'date' },
                summary: { type: 'string' },
                highlights: {
                  type: 'array',
                  items: { type: 'string' }
                }
              }
            }
          },
          education: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                institution: { type: 'string' },
                area: { type: 'string' },
                studyType: { type: 'string' },
                location: { type: 'string' },
                endDate: { type: 'string', format: 'date' }
              }
            }
          },
          references: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' }
              }
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Resume',
      description: 'Resume data operations'
    }
  ]
};

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=3600'
  };

  return json(openApiSpec, { headers });
}

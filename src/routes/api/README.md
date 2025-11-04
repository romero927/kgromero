# Resume API Documentation

This API provides programmatic access to Kyle Romero's professional resume in JSON Resume format.

## Base URL

- **Production**: `https://kgromero.com`
- **Development**: `http://localhost:5173`

## Endpoints

### Get Resume

Retrieves the complete resume data in JSON Resume format.

**Endpoint**: `GET /api/resume`

**Response**: `200 OK`

```json
{
  "basics": {
    "name": "Kyle Romero",
    "label": "Director of Software Development",
    "email": "kgromero@gmail.com",
    "phone": "(281) 857-9006",
    "website": "https://kgromero.com",
    "summary": "...",
    "location": { ... },
    "profiles": [ ... ]
  },
  "work": [ ... ],
  "education": [ ... ],
  "references": [ ... ]
}
```

**Headers**:
- `Content-Type: application/json`
- `Access-Control-Allow-Origin: *` (CORS enabled)
- `Cache-Control: public, max-age=3600`

### Get OpenAPI Specification

Retrieves the OpenAPI 3.0 specification for this API.

**Endpoint**: `GET /api/openapi.json`

**Response**: `200 OK`

Returns the complete OpenAPI specification document describing all available endpoints.

## Usage Examples

### cURL

```bash
# Get resume data
curl https://kgromero.com/api/resume

# Get resume data with pretty formatting
curl https://kgromero.com/api/resume | jq '.'

# Get specific section (e.g., work experience)
curl https://kgromero.com/api/resume | jq '.work'
```

### JavaScript/Fetch

```javascript
// Fetch resume data
const response = await fetch('https://kgromero.com/api/resume');
const resume = await response.json();

console.log(resume.basics.name); // "Kyle Romero"
console.log(resume.work); // Array of work experience
```

### Python

```python
import requests

response = requests.get('https://kgromero.com/api/resume')
resume = response.json()

print(resume['basics']['name'])  # Kyle Romero
print(len(resume['work']))  # Number of work experiences
```

## JSON Resume Schema

This API follows the [JSON Resume](https://jsonresume.org/schema/) standard schema, which is a community-driven open source initiative to create a JSON-based standard for resumes.

## Rate Limiting

Currently, there are no rate limits on these endpoints. However, please be respectful of the service and avoid excessive requests.

## CORS

CORS is enabled for all origins, allowing the API to be called from any domain.

## Caching

Responses are cached for 1 hour (3600 seconds) to improve performance. If you need fresh data more frequently, use appropriate cache-busting techniques.

## Support

For questions or issues, please contact:
- Email: kgromero@gmail.com
- GitHub: https://github.com/romero927

## License

MIT License - Feel free to use this API for legitimate purposes.

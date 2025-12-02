import { KimaiApi } from '../../credentials/KimaiApi.credentials';

describe('KimaiApi Credentials', () => {
	let credentials: KimaiApi;

	beforeEach(() => {
		credentials = new KimaiApi();
	});

	describe('Credential Type Metadata', () => {
		it('should have correct credential type name', () => {
			expect(credentials.name).toBe('kimaiApi');
		});

		it('should have correct display name', () => {
			expect(credentials.displayName).toBe('Kimai API');
		});

		it('should have documentation URL', () => {
			expect(credentials.documentationUrl).toBe('https://www.kimai.org/documentation/rest-api.html');
		});
	});

	describe('Properties Configuration', () => {
		it('should have apiUrl property', () => {
			const apiUrlProp = credentials.properties.find(p => p.name === 'apiUrl');
			expect(apiUrlProp).toBeDefined();
			expect(apiUrlProp?.displayName).toBe('API URL');
			expect(apiUrlProp?.type).toBe('string');
			expect(apiUrlProp?.required).toBe(true);
			expect(apiUrlProp?.placeholder).toBe('https://kimai.example.com');
		});

		it('should have apiToken property', () => {
			const apiTokenProp = credentials.properties.find(p => p.name === 'apiToken');
			expect(apiTokenProp).toBeDefined();
			expect(apiTokenProp?.displayName).toBe('API Token');
			expect(apiTokenProp?.type).toBe('string');
			expect(apiTokenProp?.required).toBe(true);
			expect(apiTokenProp?.typeOptions?.password).toBe(true);
		});

		it('should have exactly 2 properties', () => {
			expect(credentials.properties).toHaveLength(2);
		});
	});

	describe('Authentication Configuration', () => {
		it('should use generic authentication type', () => {
			expect(credentials.authenticate.type).toBe('generic');
		});

		it('should set Bearer token in Authorization header', () => {
			const headers = credentials.authenticate.properties.headers;
			expect(headers).toBeDefined();
			expect(headers.Authorization).toBe('=Bearer {{$credentials.apiToken}}');
		});
	});

	describe('Credential Test Configuration', () => {
		it('should have test request configuration', () => {
			expect(credentials.test).toBeDefined();
			expect(credentials.test.request).toBeDefined();
		});

		it('should test with ping endpoint', () => {
			expect(credentials.test.request.url).toBe('/api/ping');
		});

		it('should use credentials baseURL for test', () => {
			expect(credentials.test.request.baseURL).toBe('={{$credentials?.apiUrl}}');
		});
	});

	describe('Authentication Header Construction', () => {
		it('should construct proper Bearer token format', () => {
			const mockCredentials = {
				apiToken: 'test_token_12345',
			};
			
			// Simulate the credential interpolation
			const authHeader = credentials.authenticate.properties.headers.Authorization;
			const expectedPattern = /=Bearer {{.*apiToken.*}}/;
			expect(authHeader).toMatch(expectedPattern);
		});
	});

	describe('Required Fields Validation', () => {
		it('should mark apiUrl as required', () => {
			const apiUrlProp = credentials.properties.find(p => p.name === 'apiUrl');
			expect(apiUrlProp?.required).toBe(true);
		});

		it('should mark apiToken as required', () => {
			const apiTokenProp = credentials.properties.find(p => p.name === 'apiToken');
			expect(apiTokenProp?.required).toBe(true);
		});
	});

	describe('Security Configuration', () => {
		it('should mask API token as password field', () => {
			const apiTokenProp = credentials.properties.find(p => p.name === 'apiToken');
			expect(apiTokenProp?.typeOptions?.password).toBe(true);
		});
	});
});


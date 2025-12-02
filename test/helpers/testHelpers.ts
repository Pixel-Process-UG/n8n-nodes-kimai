import { ICredentialDataDecryptedObject, INode, INodeExecutionData } from 'n8n-workflow';

/**
 * Mock credentials for testing
 */
export function mockCredentials(overrides?: Partial<ICredentialDataDecryptedObject>): ICredentialDataDecryptedObject {
	return {
		apiUrl: 'https://test.kimai.local',
		apiToken: 'test_token_12345',
		...overrides,
	};
}

/**
 * Mock node parameters for testing
 */
export function mockNodeParameters(params: Record<string, any>): Record<string, any> {
	return {
		resource: 'timesheet',
		operation: 'getAll',
		...params,
	};
}

/**
 * Create mock node for testing
 */
export function mockNode(overrides?: Partial<INode>): INode {
	return {
		id: 'test-node-id',
		name: 'Kimai',
		typeVersion: 1,
		type: 'n8n-nodes-kimai.kimai',
		position: [0, 0],
		parameters: {},
		...overrides,
	};
}

/**
 * Mock API response data
 */
export function mockApiResponse(data: any, statusCode: number = 200): any {
	return {
		statusCode,
		body: data,
		headers: {
			'content-type': 'application/json',
		},
	};
}

/**
 * Create mock input data
 */
export function mockInputData(data: any[] = []): INodeExecutionData[][] {
	if (data.length === 0) {
		return [[{ json: {} }]];
	}
	return [data.map(item => ({ json: item }))];
}

/**
 * Assert request URL matches expected pattern
 */
export function assertRequestUrl(url: string, expectedPath: string, baseUrl: string = 'https://test.kimai.local'): void {
	const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
	expect(fullUrl).toContain(expectedPath);
}

/**
 * Assert request method
 */
export function assertRequestMethod(method: string, expected: string): void {
	expect(method.toUpperCase()).toBe(expected.toUpperCase());
}

/**
 * Assert request body contains expected fields
 */
export function assertRequestBody(body: any, expectedFields: Record<string, any>): void {
	for (const [key, value] of Object.entries(expectedFields)) {
		expect(body).toHaveProperty(key);
		if (value !== undefined) {
			expect(body[key]).toBe(value);
		}
	}
}

/**
 * Assert query parameters
 */
export function assertQueryParams(qs: any, expectedParams: Record<string, any>): void {
	for (const [key, value] of Object.entries(expectedParams)) {
		if (value !== undefined && value !== '') {
			expect(qs).toHaveProperty(key, value);
		}
	}
}

/**
 * Mock activity data
 */
export function mockActivity(overrides?: any) {
	return {
		id: 1,
		name: 'Test Activity',
		project: 1,
		visible: true,
		billable: true,
		color: '#000000',
		...overrides,
	};
}

/**
 * Mock customer data
 */
export function mockCustomer(overrides?: any) {
	return {
		id: 1,
		name: 'Test Customer',
		country: 'DE',
		currency: 'EUR',
		timezone: 'Europe/Berlin',
		visible: true,
		...overrides,
	};
}

/**
 * Mock project data
 */
export function mockProject(overrides?: any) {
	return {
		id: 1,
		name: 'Test Project',
		customer: 1,
		visible: true,
		billable: true,
		...overrides,
	};
}

/**
 * Mock timesheet data
 */
export function mockTimesheet(overrides?: any) {
	return {
		id: 1,
		begin: '2024-01-01T10:00:00',
		end: '2024-01-01T12:00:00',
		project: 1,
		activity: 1,
		description: 'Test work',
		billable: true,
		...overrides,
	};
}

/**
 * Mock user data
 */
export function mockUser(overrides?: any) {
	return {
		id: 1,
		username: 'testuser',
		email: 'test@example.com',
		enabled: true,
		...overrides,
	};
}

/**
 * Mock team data
 */
export function mockTeam(overrides?: any) {
	return {
		id: 1,
		name: 'Test Team',
		members: [{ user: 1, teamlead: false }],
		...overrides,
	};
}

/**
 * Mock tag data
 */
export function mockTag(overrides?: any) {
	return {
		id: 1,
		name: 'Test Tag',
		color: '#000000',
		visible: true,
		...overrides,
	};
}

/**
 * Mock invoice data
 */
export function mockInvoice(overrides?: any) {
	return {
		id: 1,
		customer: 1,
		status: 'new',
		total: 1000,
		...overrides,
	};
}


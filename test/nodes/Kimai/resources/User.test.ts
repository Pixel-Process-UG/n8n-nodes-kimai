import { Kimai } from '../../../../nodes/Kimai/Kimai.node';
import { mockUser } from '../../../helpers/testHelpers';

describe('Kimai Node - User Resource', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Create User', () => {
		it('should have correct routing for create operation', () => {
			const operation = findOperation('user', 'create');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('/api/users');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should require username, email, language, locale, timezone, and plainPassword', () => {
			const usernameParam = findParameter('username', 'user', 'create');
			const emailParam = findParameter('email', 'user', 'create');
			const languageParam = findParameter('language', 'user', 'create');
			const localeParam = findParameter('locale', 'user', 'create');
			const timezoneParam = findParameter('timezone', 'user', 'create');
			const passwordParam = findParameter('plainPassword', 'user', 'create');
			
			expect(usernameParam?.required).toBe(true);
			expect(emailParam?.required).toBe(true);
			expect(languageParam?.required).toBe(true);
			expect(localeParam?.required).toBe(true);
			expect(timezoneParam?.required).toBe(true);
			expect(passwordParam?.required).toBe(true);
		});

		it('should have password field as password type', () => {
			const passwordParam = findParameter('plainPassword', 'user', 'create');
			expect(passwordParam?.typeOptions?.password).toBe(true);
		});

		it('should have default values', () => {
			const languageParam = findParameter('language', 'user', 'create');
			const localeParam = findParameter('locale', 'user', 'create');
			const timezoneParam = findParameter('timezone', 'user', 'create');
			const enabledParam = findParameter('enabled', 'user', 'create');
			
			expect(languageParam?.default).toBe('en');
			expect(localeParam?.default).toBe('en_US');
			expect(timezoneParam?.default).toBe('Europe/Berlin');
			expect(enabledParam?.default).toBe(true);
		});

		it('should have roles as JSON field', () => {
			const rolesParam = findParameter('roles', 'user', 'create');
			expect(rolesParam?.type).toBe('json');
			expect(rolesParam?.default).toBe('[]');
		});
	});

	describe('Get User', () => {
		it('should have correct routing for get operation', () => {
			const operation = findOperation('user', 'get');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/users/{{$parameter["id"]}}');
		});

		it('should require user ID', () => {
			const idParam = findParameter('id', 'user', 'get');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get All Users', () => {
		it('should have correct routing for getAll operation', () => {
			const operation = findOperation('user', 'getAll');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/users');
		});

		it('should support query parameters', () => {
			const operation = findOperation('user', 'getAll');
			const qs = operation.routing?.request?.qs;
			
			expect(qs).toHaveProperty('visible');
			expect(qs).toHaveProperty('orderBy');
			expect(qs).toHaveProperty('order');
			expect(qs).toHaveProperty('term');
			expect(qs).toHaveProperty('full');
		});

		it('should have visible options', () => {
			const visibleParam = findParameter('visible', 'user', 'getAll');
			expect(visibleParam?.type).toBe('options');
			expect(visibleParam?.default).toBe('1');
		});

		it('should have orderBy with default username', () => {
			const orderByParam = findParameter('orderBy', 'user', 'getAll');
			expect(orderByParam?.default).toBe('username');
		});

		it('should have order with default ASC', () => {
			const orderParam = findParameter('order', 'user', 'getAll');
			expect(orderParam?.default).toBe('ASC');
		});
	});

	describe('Get Me', () => {
		it('should have correct routing for getMe operation', () => {
			const operation = findOperation('user', 'getMe');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/users/me');
		});
	});

	describe('Update User', () => {
		it('should have correct routing for update operation', () => {
			const operation = findOperation('user', 'update');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/users/{{$parameter["id"]}}');
		});

		it('should require user ID, email, language, locale, and timezone', () => {
			const idParam = findParameter('id', 'user', 'update');
			const emailParam = findParameter('email', 'user', 'update');
			const languageParam = findParameter('language', 'user', 'update');
			const localeParam = findParameter('locale', 'user', 'update');
			const timezoneParam = findParameter('timezone', 'user', 'update');
			
			expect(idParam?.required).toBe(true);
			expect(emailParam?.required).toBe(true);
			expect(languageParam?.required).toBe(true);
			expect(localeParam?.required).toBe(true);
			expect(timezoneParam?.required).toBe(true);
		});
	});

	describe('Update Preferences', () => {
		it('should have correct routing for updatePreferences operation', () => {
			const operation = findOperation('user', 'updatePreferences');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/users/{{$parameter["id"]}}/preferences');
		});

		it('should require preferences JSON', () => {
			const preferencesParam = findParameter('preferences', 'user', 'updatePreferences');
			expect(preferencesParam?.required).toBe(true);
			expect(preferencesParam?.type).toBe('json');
		});
	});

	describe('Delete API Token', () => {
		it('should have correct routing for deleteApiToken operation', () => {
			const operation = findOperation('user', 'deleteApiToken');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/users/api-token/{{$parameter["tokenId"]}}');
		});

		it('should require token ID', () => {
			const tokenIdParam = findParameter('tokenId', 'user', 'deleteApiToken');
			expect(tokenIdParam?.required).toBe(true);
		});
	});

	describe('User Fields', () => {
		it('should have alias field', () => {
			const aliasParam = findParameter('alias', 'user', 'create');
			expect(aliasParam).toBeDefined();
		});

		it('should have title field', () => {
			const titleParam = findParameter('title', 'user', 'create');
			expect(titleParam).toBeDefined();
		});

		it('should have accountNumber field', () => {
			const accountNumberParam = findParameter('accountNumber', 'user', 'create');
			expect(accountNumberParam).toBeDefined();
		});

		it('should have color field', () => {
			const colorParam = findParameter('color', 'user', 'create');
			expect(colorParam).toBeDefined();
		});

		it('should have supervisor field', () => {
			const supervisorParam = findParameter('supervisor', 'user', 'create');
			expect(supervisorParam).toBeDefined();
		});

		it('should have systemAccount boolean field', () => {
			const systemAccountParam = findParameter('systemAccount', 'user', 'create');
			expect(systemAccountParam).toBeDefined();
			expect(systemAccountParam?.type).toBe('boolean');
			expect(systemAccountParam?.default).toBe(false);
		});

		it('should have requiresPasswordReset boolean field', () => {
			const requiresPasswordResetParam = findParameter('requiresPasswordReset', 'user', 'create');
			expect(requiresPasswordResetParam).toBeDefined();
			expect(requiresPasswordResetParam?.type).toBe('boolean');
			expect(requiresPasswordResetParam?.default).toBe(false);
		});

		it('should have plainApiToken field', () => {
			const plainApiTokenParam = findParameter('plainApiToken', 'user', 'create');
			expect(plainApiTokenParam).toBeDefined();
		});
	});

	// Helper functions
	function findOperation(resource: string, operation: string): any {
		const operationParam = node.description.properties.find(
			p => p.name === 'operation' && 
			p.displayOptions?.show?.resource?.includes(resource)
		);
		const options = operationParam?.options as any[];
		return options?.find((opt: any) => opt.value === operation);
	}

	function findParameter(paramName: string, resource: string, operation: string): any {
		return node.description.properties.find(
			p => p.name === paramName && 
			p.displayOptions?.show?.resource?.includes(resource) &&
			p.displayOptions?.show?.operation?.includes(operation)
		);
	}
});


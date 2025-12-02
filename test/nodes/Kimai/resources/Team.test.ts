import { Kimai } from '../../../../nodes/Kimai/Kimai.node';
import { mockTeam } from '../../../helpers/testHelpers';

describe('Kimai Node - Team Resource', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Create Team', () => {
		it('should have correct routing for create operation', () => {
			const operation = findOperation('team', 'create');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('/api/teams');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should require name and members', () => {
			const nameParam = findParameter('name', 'team', 'create');
			const membersParam = findParameter('members', 'team', 'create');
			
			expect(nameParam?.required).toBe(true);
			expect(membersParam?.required).toBe(true);
		});

		it('should have members as JSON type', () => {
			const membersParam = findParameter('members', 'team', 'create');
			expect(membersParam?.type).toBe('json');
			expect(membersParam?.default).toBe('[{"user": 1, "teamlead": false}]');
		});

		it('should include color field', () => {
			const colorParam = findParameter('color', 'team', 'create');
			expect(colorParam).toBeDefined();
		});
	});

	describe('Delete Team', () => {
		it('should have correct routing for delete operation', () => {
			const operation = findOperation('team', 'delete');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}');
		});

		it('should require team ID', () => {
			const idParam = findParameter('id', 'team', 'delete');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get Team', () => {
		it('should have correct routing for get operation', () => {
			const operation = findOperation('team', 'get');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}');
		});

		it('should require team ID', () => {
			const idParam = findParameter('id', 'team', 'get');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get All Teams', () => {
		it('should have correct routing for getAll operation', () => {
			const operation = findOperation('team', 'getAll');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/teams');
		});
	});

	describe('Update Team', () => {
		it('should have correct routing for update operation', () => {
			const operation = findOperation('team', 'update');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}');
		});

		it('should require team ID and name', () => {
			const idParam = findParameter('id', 'team', 'update');
			const nameParam = findParameter('name', 'team', 'update');
			
			expect(idParam?.required).toBe(true);
			expect(nameParam?.required).toBe(true);
		});
	});

	describe('Add Member', () => {
		it('should have correct routing for addMember operation', () => {
			const operation = findOperation('team', 'addMember');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}/members/{{$parameter["userId"]}}');
		});

		it('should require team ID and user ID', () => {
			const idParam = findParameter('id', 'team', 'addMember');
			const userIdParam = findParameter('userId', 'team', 'addMember');
			
			expect(idParam?.required).toBe(true);
			expect(userIdParam?.required).toBe(true);
		});
	});

	describe('Remove Member', () => {
		it('should have correct routing for removeMember operation', () => {
			const operation = findOperation('team', 'removeMember');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}/members/{{$parameter["userId"]}}');
		});

		it('should require team ID and user ID', () => {
			const idParam = findParameter('id', 'team', 'removeMember');
			const userIdParam = findParameter('userId', 'team', 'removeMember');
			
			expect(idParam?.required).toBe(true);
			expect(userIdParam?.required).toBe(true);
		});
	});

	describe('Grant Customer Access', () => {
		it('should have correct routing for grantCustomer operation', () => {
			const operation = findOperation('team', 'grantCustomer');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}/customers/{{$parameter["customerId"]}}');
		});

		it('should require team ID and customer ID', () => {
			const idParam = findParameter('id', 'team', 'grantCustomer');
			const customerIdParam = findParameter('customerId', 'team', 'grantCustomer');
			
			expect(idParam?.required).toBe(true);
			expect(customerIdParam?.required).toBe(true);
		});
	});

	describe('Revoke Customer Access', () => {
		it('should have correct routing for revokeCustomer operation', () => {
			const operation = findOperation('team', 'revokeCustomer');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}/customers/{{$parameter["customerId"]}}');
		});

		it('should require team ID and customer ID', () => {
			const idParam = findParameter('id', 'team', 'revokeCustomer');
			const customerIdParam = findParameter('customerId', 'team', 'revokeCustomer');
			
			expect(idParam?.required).toBe(true);
			expect(customerIdParam?.required).toBe(true);
		});
	});

	describe('Grant Project Access', () => {
		it('should have correct routing for grantProject operation', () => {
			const operation = findOperation('team', 'grantProject');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}/projects/{{$parameter["projectId"]}}');
		});

		it('should require team ID and project ID', () => {
			const idParam = findParameter('id', 'team', 'grantProject');
			const projectIdParam = findParameter('projectId', 'team', 'grantProject');
			
			expect(idParam?.required).toBe(true);
			expect(projectIdParam?.required).toBe(true);
		});
	});

	describe('Revoke Project Access', () => {
		it('should have correct routing for revokeProject operation', () => {
			const operation = findOperation('team', 'revokeProject');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}/projects/{{$parameter["projectId"]}}');
		});
	});

	describe('Grant Activity Access', () => {
		it('should have correct routing for grantActivity operation', () => {
			const operation = findOperation('team', 'grantActivity');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}/activities/{{$parameter["activityId"]}}');
		});

		it('should require team ID and activity ID', () => {
			const idParam = findParameter('id', 'team', 'grantActivity');
			const activityIdParam = findParameter('activityId', 'team', 'grantActivity');
			
			expect(idParam?.required).toBe(true);
			expect(activityIdParam?.required).toBe(true);
		});
	});

	describe('Revoke Activity Access', () => {
		it('should have correct routing for revokeActivity operation', () => {
			const operation = findOperation('team', 'revokeActivity');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/teams/{{$parameter["id"]}}/activities/{{$parameter["activityId"]}}');
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


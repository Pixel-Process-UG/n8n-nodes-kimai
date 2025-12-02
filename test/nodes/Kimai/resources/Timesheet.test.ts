import { Kimai } from '../../../../nodes/Kimai/Kimai.node';
import { mockTimesheet } from '../../../helpers/testHelpers';

describe('Kimai Node - Timesheet Resource', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Create Timesheet', () => {
		it('should have correct routing for create operation', () => {
			const operation = findOperation('timesheet', 'create');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('/api/timesheets');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should require project and activity', () => {
			const projectParam = findParameter('project', 'timesheet', 'create');
			const activityParam = findParameter('activity', 'timesheet', 'create');
			
			expect(projectParam?.required).toBe(true);
			expect(activityParam?.required).toBe(true);
		});

		it('should include timesheet fields in request body', () => {
			const operation = findOperation('timesheet', 'create');
			const body = operation.routing?.request?.body;
			
			expect(body).toHaveProperty('begin');
			expect(body).toHaveProperty('end');
			expect(body).toHaveProperty('project');
			expect(body).toHaveProperty('activity');
			expect(body).toHaveProperty('description');
			expect(body).toHaveProperty('billable');
		});

		it('should have billable default as true', () => {
			const billableParam = findParameter('billable', 'timesheet', 'create');
			expect(billableParam?.default).toBe(true);
		});
	});

	describe('Delete Timesheet', () => {
		it('should have correct routing for delete operation', () => {
			const operation = findOperation('timesheet', 'delete');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/timesheets/{{$parameter["id"]}}');
		});

		it('should require timesheet ID', () => {
			const idParam = findParameter('id', 'timesheet', 'delete');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get Timesheet', () => {
		it('should have correct routing for get operation', () => {
			const operation = findOperation('timesheet', 'get');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/timesheets/{{$parameter["id"]}}');
		});
	});

	describe('Get All Timesheets', () => {
		it('should have correct routing for getAll operation', () => {
			const operation = findOperation('timesheet', 'getAll');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/timesheets');
		});

		it('should support pagination parameters', () => {
			const pageParam = findParameter('page', 'timesheet', 'getAll');
			const sizeParam = findParameter('size', 'timesheet', 'getAll');
			
			expect(pageParam).toBeDefined();
			expect(pageParam?.default).toBe(1);
			expect(sizeParam).toBeDefined();
			expect(sizeParam?.default).toBe(50);
		});

		it('should support filter parameters', () => {
			const exportedParam = findParameter('exported', 'timesheet', 'getAll');
			const activeParam = findParameter('active', 'timesheet', 'getAll');
			const billableParam = findParameter('billable', 'timesheet', 'getAll');
			
			expect(exportedParam).toBeDefined();
			expect(activeParam).toBeDefined();
			expect(billableParam).toBeDefined();
		});

		it('should support array parameters', () => {
			const usersParam = findParameter('users', 'timesheet', 'getAll');
			const customersParam = findParameter('customers', 'timesheet', 'getAll');
			const projectsParam = findParameter('projects', 'timesheet', 'getAll');
			const activitiesParam = findParameter('activities', 'timesheet', 'getAll');
			
			expect(usersParam).toBeDefined();
			expect(customersParam).toBeDefined();
			expect(projectsParam).toBeDefined();
			expect(activitiesParam).toBeDefined();
		});

		it('should have orderBy with default "begin"', () => {
			const orderByParam = findParameter('orderBy', 'timesheet', 'getAll');
			expect(orderByParam?.default).toBe('begin');
		});

		it('should have order with default "DESC"', () => {
			const orderParam = findParameter('order', 'timesheet', 'getAll');
			expect(orderParam?.default).toBe('DESC');
		});
	});

	describe('Update Timesheet', () => {
		it('should have correct routing for update operation', () => {
			const operation = findOperation('timesheet', 'update');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/timesheets/{{$parameter["id"]}}');
		});

		it('should require timesheet ID, project, and activity', () => {
			const idParam = findParameter('id', 'timesheet', 'update');
			const projectParam = findParameter('project', 'timesheet', 'update');
			const activityParam = findParameter('activity', 'timesheet', 'update');
			
			expect(idParam?.required).toBe(true);
			expect(projectParam?.required).toBe(true);
			expect(activityParam?.required).toBe(true);
		});
	});

	describe('Stop Timesheet', () => {
		it('should have correct routing for stop operation', () => {
			const operation = findOperation('timesheet', 'stop');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/timesheets/{{$parameter["id"]}}/stop');
		});

		it('should require timesheet ID', () => {
			const idParam = findParameter('id', 'timesheet', 'stop');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Restart Timesheet', () => {
		it('should have correct routing for restart operation', () => {
			const operation = findOperation('timesheet', 'restart');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/timesheets/{{$parameter["id"]}}/restart');
		});

		it('should have copy parameter', () => {
			const copyParam = findParameter('copy', 'timesheet', 'restart');
			expect(copyParam).toBeDefined();
			expect(copyParam?.description).toContain('all');
		});

		it('should have begin parameter', () => {
			const beginParam = findParameter('begin', 'timesheet', 'restart');
			expect(beginParam).toBeDefined();
			expect(beginParam?.type).toBe('dateTime');
		});
	});

	describe('Duplicate Timesheet', () => {
		it('should have correct routing for duplicate operation', () => {
			const operation = findOperation('timesheet', 'duplicate');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/timesheets/{{$parameter["id"]}}/duplicate');
		});
	});

	describe('Toggle Export', () => {
		it('should have correct routing for toggleExport operation', () => {
			const operation = findOperation('timesheet', 'toggleExport');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/timesheets/{{$parameter["id"]}}/export');
		});
	});

	describe('Update Meta', () => {
		it('should have correct routing for updateMeta operation', () => {
			const operation = findOperation('timesheet', 'updateMeta');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/timesheets/{{$parameter["id"]}}/meta');
		});

		it('should require meta field name and value', () => {
			const metaNameParam = findParameter('metaName', 'timesheet', 'updateMeta');
			const metaValueParam = findParameter('metaValue', 'timesheet', 'updateMeta');
			
			expect(metaNameParam?.required).toBe(true);
			expect(metaValueParam?.required).toBe(true);
		});
	});

	describe('Get Recent', () => {
		it('should have correct routing for getRecent operation', () => {
			const operation = findOperation('timesheet', 'getRecent');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/timesheets/recent');
		});

		it('should support begin and size parameters', () => {
			const beginParam = findParameter('begin', 'timesheet', 'getRecent');
			const sizeParam = findParameter('size', 'timesheet', 'getRecent');
			
			expect(beginParam).toBeDefined();
			expect(sizeParam).toBeDefined();
		});
	});

	describe('Get Active', () => {
		it('should have correct routing for getActive operation', () => {
			const operation = findOperation('timesheet', 'getActive');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/timesheets/active');
		});
	});

	describe('Date-Time Parameters', () => {
		it('should have begin parameter as dateTime', () => {
			const beginParam = findParameter('begin', 'timesheet', 'create');
			expect(beginParam?.type).toBe('dateTime');
		});

		it('should have end parameter as dateTime', () => {
			const endParam = findParameter('end', 'timesheet', 'create');
			expect(endParam?.type).toBe('dateTime');
		});

		it('should have modifiedAfter parameter', () => {
			const modifiedAfterParam = findParameter('modifiedAfter', 'timesheet', 'getAll');
			expect(modifiedAfterParam).toBeDefined();
			expect(modifiedAfterParam?.type).toBe('dateTime');
		});
	});

	describe('Rate Parameters', () => {
		it('should have fixedRate parameter', () => {
			const fixedRateParam = findParameter('fixedRate', 'timesheet', 'create');
			expect(fixedRateParam).toBeDefined();
			expect(fixedRateParam?.type).toBe('number');
		});

		it('should have hourlyRate parameter', () => {
			const hourlyRateParam = findParameter('hourlyRate', 'timesheet', 'create');
			expect(hourlyRateParam).toBeDefined();
			expect(hourlyRateParam?.type).toBe('number');
		});
	});

	describe('Tags Parameter', () => {
		it('should have tags parameter', () => {
			const tagsParam = findParameter('tags', 'timesheet', 'create');
			expect(tagsParam).toBeDefined();
			expect(tagsParam?.description).toContain('Comma-separated');
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


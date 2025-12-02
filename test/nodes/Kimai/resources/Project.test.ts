import { Kimai } from '../../../../nodes/Kimai/Kimai.node';
import { mockProject } from '../../../helpers/testHelpers';

describe('Kimai Node - Project Resource', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Create Project', () => {
		it('should have correct routing for create operation', () => {
			const operation = findOperation('project', 'create');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('/api/projects');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should require name and customer', () => {
			const nameParam = findParameter('name', 'project', 'create');
			const customerParam = findParameter('customer', 'project', 'create');
			
			expect(nameParam?.required).toBe(true);
			expect(customerParam?.required).toBe(true);
		});

		it('should include project fields in request body', () => {
			const operation = findOperation('project', 'create');
			const body = operation.routing?.request?.body;
			
			expect(body).toHaveProperty('name');
			expect(body).toHaveProperty('customer');
			expect(body).toHaveProperty('visible');
			expect(body).toHaveProperty('billable');
			expect(body).toHaveProperty('start');
			expect(body).toHaveProperty('end');
		});

		it('should have default for globalActivities', () => {
			const globalActivitiesParam = findParameter('globalActivities', 'project', 'create');
			expect(globalActivitiesParam?.default).toBe(true);
		});
	});

	describe('Delete Project', () => {
		it('should have correct routing for delete operation', () => {
			const operation = findOperation('project', 'delete');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/projects/{{$parameter["id"]}}');
		});

		it('should require project ID', () => {
			const idParam = findParameter('id', 'project', 'delete');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get Project', () => {
		it('should have correct routing for get operation', () => {
			const operation = findOperation('project', 'get');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/projects/{{$parameter["id"]}}');
		});

		it('should require project ID', () => {
			const idParam = findParameter('id', 'project', 'get');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get All Projects', () => {
		it('should have correct routing for getAll operation', () => {
			const operation = findOperation('project', 'getAll');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/projects');
		});

		it('should support query parameters', () => {
			const operation = findOperation('project', 'getAll');
			const qs = operation.routing?.request?.qs;
			
			expect(qs).toHaveProperty('customer');
			expect(qs).toHaveProperty('visible');
			expect(qs).toHaveProperty('start');
			expect(qs).toHaveProperty('end');
			expect(qs).toHaveProperty('orderBy');
		});

		it('should have customers array parameter', () => {
			const customersParam = findParameter('customers', 'project', 'getAll');
			expect(customersParam).toBeDefined();
			expect(customersParam?.description).toContain('Comma-separated');
		});

		it('should have ignoreDates parameter', () => {
			const ignoreDatesParam = findParameter('ignoreDates', 'project', 'getAll');
			expect(ignoreDatesParam).toBeDefined();
			expect(ignoreDatesParam?.type).toBe('boolean');
			expect(ignoreDatesParam?.default).toBe(false);
		});
	});

	describe('Update Project', () => {
		it('should have correct routing for update operation', () => {
			const operation = findOperation('project', 'update');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/projects/{{$parameter["id"]}}');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should require project ID and name', () => {
			const idParam = findParameter('id', 'project', 'update');
			const nameParam = findParameter('name', 'project', 'update');
			
			expect(idParam?.required).toBe(true);
			expect(nameParam?.required).toBe(true);
		});
	});

	describe('Update Meta', () => {
		it('should have correct routing for updateMeta operation', () => {
			const operation = findOperation('project', 'updateMeta');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/projects/{{$parameter["id"]}}/meta');
		});

		it('should require meta field name and value', () => {
			const metaNameParam = findParameter('metaName', 'project', 'updateMeta');
			const metaValueParam = findParameter('metaValue', 'project', 'updateMeta');
			
			expect(metaNameParam?.required).toBe(true);
			expect(metaValueParam?.required).toBe(true);
		});
	});

	describe('Get Rates', () => {
		it('should have correct routing for getRates operation', () => {
			const operation = findOperation('project', 'getRates');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/projects/{{$parameter["id"]}}/rates');
		});
	});

	describe('Add Rate', () => {
		it('should have correct routing for addRate operation', () => {
			const operation = findOperation('project', 'addRate');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('=/api/projects/{{$parameter["id"]}}/rates');
		});

		it('should require rate parameter', () => {
			const rateParam = findParameter('rate', 'project', 'addRate');
			expect(rateParam?.required).toBe(true);
			expect(rateParam?.type).toBe('number');
		});
	});

	describe('Delete Rate', () => {
		it('should have correct routing for deleteRate operation', () => {
			const operation = findOperation('project', 'deleteRate');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/projects/{{$parameter["id"]}}/rates/{{$parameter["rateId"]}}');
		});
	});

	describe('Date Fields', () => {
		it('should have start date parameter', () => {
			const startParam = findParameter('start', 'project', 'create');
			expect(startParam).toBeDefined();
			expect(startParam?.type).toBe('dateTime');
		});

		it('should have end date parameter', () => {
			const endParam = findParameter('end', 'project', 'create');
			expect(endParam).toBeDefined();
			expect(endParam?.type).toBe('dateTime');
		});

		it('should have order date parameter', () => {
			const orderDateParam = findParameter('orderDate', 'project', 'create');
			expect(orderDateParam).toBeDefined();
			expect(orderDateParam?.type).toBe('dateTime');
		});
	});

	describe('Project Fields', () => {
		it('should have number field', () => {
			const numberParam = findParameter('number', 'project', 'create');
			expect(numberParam).toBeDefined();
		});

		it('should have comment field', () => {
			const commentParam = findParameter('comment', 'project', 'create');
			expect(commentParam).toBeDefined();
		});

		it('should have invoiceText field', () => {
			const invoiceTextParam = findParameter('invoiceText', 'project', 'create');
			expect(invoiceTextParam).toBeDefined();
		});

		it('should have orderNumber field', () => {
			const orderNumberParam = findParameter('orderNumber', 'project', 'create');
			expect(orderNumberParam).toBeDefined();
		});

		it('should have color field', () => {
			const colorParam = findParameter('color', 'project', 'create');
			expect(colorParam).toBeDefined();
		});

		it('should have visible field with default true', () => {
			const visibleParam = findParameter('visible', 'project', 'create');
			expect(visibleParam?.default).toBe(true);
			expect(visibleParam?.type).toBe('boolean');
		});

		it('should have billable field with default true', () => {
			const billableParam = findParameter('billable', 'project', 'create');
			expect(billableParam?.default).toBe(true);
			expect(billableParam?.type).toBe('boolean');
		});
	});

	describe('Order and Filter Options', () => {
		it('should have orderBy options', () => {
			const orderByParam = findParameter('orderBy', 'project', 'getAll');
			expect(orderByParam?.type).toBe('options');
			expect(orderByParam?.default).toBe('name');
		});

		it('should have order options', () => {
			const orderParam = findParameter('order', 'project', 'getAll');
			expect(orderParam?.type).toBe('options');
			expect(orderParam?.default).toBe('ASC');
		});

		it('should have search term parameter', () => {
			const termParam = findParameter('term', 'project', 'getAll');
			expect(termParam).toBeDefined();
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


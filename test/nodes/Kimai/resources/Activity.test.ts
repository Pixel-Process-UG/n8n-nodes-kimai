import { Kimai } from '../../../../nodes/Kimai/Kimai.node';
import { mockActivity } from '../../../helpers/testHelpers';

describe('Kimai Node - Activity Resource', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Create Activity', () => {
		it('should have correct routing for create operation', () => {
			const operation = findOperation('activity', 'create');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('/api/activities');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should include required fields in request body', () => {
			const operation = findOperation('activity', 'create');
			const body = operation.routing?.request?.body;
			
			expect(body).toHaveProperty('name');
			expect(body).toHaveProperty('project');
			expect(body).toHaveProperty('billable');
			expect(body).toHaveProperty('visible');
		});

		it('should have name parameter as required', () => {
			const nameParam = node.description.properties.find(
				p => p.name === 'name' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('create')
			);
			
			expect(nameParam?.required).toBe(true);
		});
	});

	describe('Delete Activity', () => {
		it('should have correct routing for delete operation', () => {
			const operation = findOperation('activity', 'delete');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/activities/{{$parameter["id"]}}');
		});

		it('should require activity ID', () => {
			const idParam = node.description.properties.find(
				p => p.name === 'id' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('delete')
			);
			
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get Activity', () => {
		it('should have correct routing for get operation', () => {
			const operation = findOperation('activity', 'get');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/activities/{{$parameter["id"]}}');
		});

		it('should require activity ID', () => {
			const idParam = node.description.properties.find(
				p => p.name === 'id' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('get')
			);
			
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get All Activities', () => {
		it('should have correct routing for getAll operation', () => {
			const operation = findOperation('activity', 'getAll');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/activities');
		});

		it('should support query parameters', () => {
			const operation = findOperation('activity', 'getAll');
			const qs = operation.routing?.request?.qs;
			
			expect(qs).toHaveProperty('project');
			expect(qs).toHaveProperty('visible');
			expect(qs).toHaveProperty('orderBy');
			expect(qs).toHaveProperty('order');
		});

		it('should have projects array parameter', () => {
			const projectsParam = node.description.properties.find(
				p => p.name === 'projects' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('getAll')
			);
			
			expect(projectsParam).toBeDefined();
			expect(projectsParam?.description).toContain('Comma-separated');
		});

		it('should have visible options parameter', () => {
			const visibleParam = node.description.properties.find(
				p => p.name === 'visible' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('getAll')
			);
			
			expect(visibleParam?.type).toBe('options');
			expect(visibleParam?.options).toBeDefined();
		});
	});

	describe('Update Activity', () => {
		it('should have correct routing for update operation', () => {
			const operation = findOperation('activity', 'update');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/activities/{{$parameter["id"]}}');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should require activity ID and name', () => {
			const idParam = node.description.properties.find(
				p => p.name === 'id' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('update')
			);
			
			const nameParam = node.description.properties.find(
				p => p.name === 'name' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('update')
			);
			
			expect(idParam?.required).toBe(true);
			expect(nameParam?.required).toBe(true);
		});
	});

	describe('Update Meta', () => {
		it('should have correct routing for updateMeta operation', () => {
			const operation = findOperation('activity', 'updateMeta');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/activities/{{$parameter["id"]}}/meta');
		});

		it('should require meta field name and value', () => {
			const metaNameParam = node.description.properties.find(
				p => p.name === 'metaName' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('updateMeta')
			);
			
			const metaValueParam = node.description.properties.find(
				p => p.name === 'metaValue' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('updateMeta')
			);
			
			expect(metaNameParam?.required).toBe(true);
			expect(metaValueParam?.required).toBe(true);
		});
	});

	describe('Get Rates', () => {
		it('should have correct routing for getRates operation', () => {
			const operation = findOperation('activity', 'getRates');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/activities/{{$parameter["id"]}}/rates');
		});
	});

	describe('Add Rate', () => {
		it('should have correct routing for addRate operation', () => {
			const operation = findOperation('activity', 'addRate');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('=/api/activities/{{$parameter["id"]}}/rates');
		});

		it('should require rate parameter', () => {
			const rateParam = node.description.properties.find(
				p => p.name === 'rate' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('addRate')
			);
			
			expect(rateParam?.required).toBe(true);
			expect(rateParam?.type).toBe('number');
		});

		it('should include rate fields in request body', () => {
			const operation = findOperation('activity', 'addRate');
			const body = operation.routing?.request?.body;
			
			expect(body).toHaveProperty('rate');
			expect(body).toHaveProperty('internalRate');
			expect(body).toHaveProperty('isFixed');
		});
	});

	describe('Delete Rate', () => {
		it('should have correct routing for deleteRate operation', () => {
			const operation = findOperation('activity', 'deleteRate');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/activities/{{$parameter["id"]}}/rates/{{$parameter["rateId"]}}');
		});

		it('should require activity ID and rate ID', () => {
			const idParam = node.description.properties.find(
				p => p.name === 'id' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('deleteRate')
			);
			
			const rateIdParam = node.description.properties.find(
				p => p.name === 'rateId' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('deleteRate')
			);
			
			expect(idParam?.required).toBe(true);
			expect(rateIdParam?.required).toBe(true);
		});
	});

	describe('Parameter Types and Defaults', () => {
		it('should have correct default for billable parameter', () => {
			const billableParam = node.description.properties.find(
				p => p.name === 'billable' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('create')
			);
			
			expect(billableParam?.default).toBe(true);
			expect(billableParam?.type).toBe('boolean');
		});

		it('should have correct default for visible parameter', () => {
			const visibleParam = node.description.properties.find(
				p => p.name === 'visible' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('create')
			);
			
			expect(visibleParam?.default).toBe(true);
			expect(visibleParam?.type).toBe('boolean');
		});

		it('should have correct default for orderBy parameter', () => {
			const orderByParam = node.description.properties.find(
				p => p.name === 'orderBy' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('getAll')
			);
			
			expect(orderByParam?.default).toBe('name');
		});

		it('should have correct default for order parameter', () => {
			const orderParam = node.description.properties.find(
				p => p.name === 'order' && 
				p.displayOptions?.show?.resource?.includes('activity') &&
				p.displayOptions?.show?.operation?.includes('getAll')
			);
			
			expect(orderParam?.default).toBe('ASC');
		});
	});

	// Helper function
	function findOperation(resource: string, operation: string): any {
		const operationParam = node.description.properties.find(
			p => p.name === 'operation' && 
			p.displayOptions?.show?.resource?.includes(resource)
		);
		const options = operationParam?.options as any[];
		return options?.find((opt: any) => opt.value === operation);
	}
});


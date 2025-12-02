import { Kimai } from '../../../../nodes/Kimai/Kimai.node';
import { mockTag } from '../../../helpers/testHelpers';

describe('Kimai Node - Tag Resource', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Create Tag', () => {
		it('should have correct routing for create operation', () => {
			const operation = findOperation('tag', 'create');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('/api/tags');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should require name', () => {
			const nameParam = findParameter('name', 'tag', 'create');
			expect(nameParam?.required).toBe(true);
		});

		it('should include tag fields in request body', () => {
			const operation = findOperation('tag', 'create');
			const body = operation.routing?.request?.body;
			
			expect(body).toHaveProperty('name');
			expect(body).toHaveProperty('color');
			expect(body).toHaveProperty('visible');
		});

		it('should have default visible value true', () => {
			const visibleParam = findParameter('visible', 'tag', 'create');
			expect(visibleParam?.default).toBe(true);
			expect(visibleParam?.type).toBe('boolean');
		});

		it('should have color parameter', () => {
			const colorParam = findParameter('color', 'tag', 'create');
			expect(colorParam).toBeDefined();
			expect(colorParam?.type).toBe('string');
		});
	});

	describe('Delete Tag', () => {
		it('should have correct routing for delete operation', () => {
			const operation = findOperation('tag', 'delete');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/tags/{{$parameter["id"]}}');
		});

		it('should require tag ID', () => {
			const idParam = findParameter('id', 'tag', 'delete');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get All Tags', () => {
		it('should have correct routing for getAll operation', () => {
			const operation = findOperation('tag', 'getAll');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/tags/find');
		});

		it('should support name query parameter', () => {
			const operation = findOperation('tag', 'getAll');
			const qs = operation.routing?.request?.qs;
			
			expect(qs).toHaveProperty('name');
		});

		it('should have optional name parameter for filtering', () => {
			const nameParam = findParameter('name', 'tag', 'getAll');
			expect(nameParam).toBeDefined();
			expect(nameParam?.required).toBeFalsy();
		});
	});

	describe('Default Operation', () => {
		it('should have getAll as default operation', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('tag')
			);
			expect(operationParam?.default).toBe('getAll');
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


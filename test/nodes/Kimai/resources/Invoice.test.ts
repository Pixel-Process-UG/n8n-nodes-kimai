import { Kimai } from '../../../../nodes/Kimai/Kimai.node';
import { mockInvoice } from '../../../helpers/testHelpers';

describe('Kimai Node - Invoice Resource', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Get Invoice', () => {
		it('should have correct routing for get operation', () => {
			const operation = findOperation('invoice', 'get');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/invoices/{{$parameter["id"]}}');
		});

		it('should require invoice ID', () => {
			const idParam = findParameter('id', 'invoice', 'get');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get All Invoices', () => {
		it('should have correct routing for getAll operation', () => {
			const operation = findOperation('invoice', 'getAll');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/invoices');
		});

		it('should support query parameters', () => {
			const operation = findOperation('invoice', 'getAll');
			const qs = operation.routing?.request?.qs;
			
			expect(qs).toHaveProperty('begin');
			expect(qs).toHaveProperty('end');
			expect(qs['customers[]']).toBeDefined();
			expect(qs['status[]']).toBeDefined();
			expect(qs).toHaveProperty('page');
			expect(qs).toHaveProperty('size');
		});

		it('should have date parameters', () => {
			const beginParam = findParameter('begin', 'invoice', 'getAll');
			const endParam = findParameter('end', 'invoice', 'getAll');
			
			expect(beginParam).toBeDefined();
			expect(beginParam?.type).toBe('dateTime');
			expect(endParam).toBeDefined();
			expect(endParam?.type).toBe('dateTime');
		});

		it('should have customers array parameter', () => {
			const customersParam = findParameter('customers', 'invoice', 'getAll');
			expect(customersParam).toBeDefined();
			expect(customersParam?.description).toContain('Comma-separated');
		});

		it('should have status array parameter', () => {
			const statusParam = findParameter('status', 'invoice', 'getAll');
			expect(statusParam).toBeDefined();
			expect(statusParam?.description).toContain('pending, paid, canceled, new');
		});

		it('should have pagination parameters', () => {
			const pageParam = findParameter('page', 'invoice', 'getAll');
			const sizeParam = findParameter('size', 'invoice', 'getAll');
			
			expect(pageParam).toBeDefined();
			expect(pageParam?.default).toBe(1);
			expect(sizeParam).toBeDefined();
			expect(sizeParam?.default).toBe(50);
		});
	});

	describe('Default Operation', () => {
		it('should have getAll as default operation', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('invoice')
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


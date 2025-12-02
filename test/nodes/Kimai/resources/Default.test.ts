import { Kimai } from '../../../../nodes/Kimai/Kimai.node';

describe('Kimai Node - Default Resource', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Get Timesheet Config', () => {
		it('should have correct routing for getTimesheetConfig operation', () => {
			const operation = findOperation('default', 'getTimesheetConfig');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/config/timesheet');
		});

		it('should have correct action name', () => {
			const operation = findOperation('default', 'getTimesheetConfig');
			expect(operation.action).toBe('Get timesheet configuration');
		});
	});

	describe('Get Colors', () => {
		it('should have correct routing for getColors operation', () => {
			const operation = findOperation('default', 'getColors');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/config/colors');
		});

		it('should have correct action name', () => {
			const operation = findOperation('default', 'getColors');
			expect(operation.action).toBe('Get configured color codes');
		});
	});

	describe('Ping', () => {
		it('should have correct routing for ping operation', () => {
			const operation = findOperation('default', 'ping');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/ping');
		});

		it('should have correct action name', () => {
			const operation = findOperation('default', 'ping');
			expect(operation.action).toBe('Test API connection');
		});
	});

	describe('Get Version', () => {
		it('should have correct routing for getVersion operation', () => {
			const operation = findOperation('default', 'getVersion');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/version');
		});

		it('should have correct action name', () => {
			const operation = findOperation('default', 'getVersion');
			expect(operation.action).toBe('Get Kimai version');
		});
	});

	describe('Get Plugins', () => {
		it('should have correct routing for getPlugins operation', () => {
			const operation = findOperation('default', 'getPlugins');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/plugins');
		});

		it('should have correct action name', () => {
			const operation = findOperation('default', 'getPlugins');
			expect(operation.action).toBe('Get installed plugins');
		});
	});

	describe('Default Operation', () => {
		it('should have ping as default operation', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('default')
			);
			expect(operationParam?.default).toBe('ping');
		});
	});

	describe('All Operations are GET', () => {
		it('should have all operations as GET requests', () => {
			const operations = ['getTimesheetConfig', 'getColors', 'ping', 'getVersion', 'getPlugins'];
			
			operations.forEach(opName => {
				const operation = findOperation('default', opName);
				expect(operation.routing?.request?.method).toBe('GET');
			});
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


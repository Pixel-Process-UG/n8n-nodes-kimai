import { Kimai } from '../../../nodes/Kimai/Kimai.node';

describe('Kimai Node', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Node Metadata', () => {
		it('should have correct display name', () => {
			expect(node.description.displayName).toBe('Kimai');
		});

		it('should have correct node name', () => {
			expect(node.description.name).toBe('kimai');
		});

		it('should have correct version', () => {
			expect(node.description.version).toBe(1);
		});

		it('should have correct icon', () => {
			expect(node.description.icon).toBe('file:kimai.svg');
		});

		it('should be in transform group', () => {
			expect(node.description.group).toContain('transform');
		});

		it('should have subtitle', () => {
			expect(node.description.subtitle).toBe('={{$parameter["operation"] + ": " + $parameter["resource"]}}');
		});

		it('should have description', () => {
			expect(node.description.description).toBe('Interact with Kimai time-tracking API');
		});

		it('should have default name', () => {
			expect(node.description.defaults.name).toBe('Kimai');
		});
	});

	describe('Node Configuration', () => {
		it('should have one input', () => {
			expect(node.description.inputs).toEqual(['main']);
		});

		it('should have one output', () => {
			expect(node.description.outputs).toEqual(['main']);
		});

		it('should require kimaiApi credentials', () => {
			expect(node.description.credentials).toHaveLength(1);
			expect(node.description.credentials?.[0]).toEqual({
				name: 'kimaiApi',
				required: true,
			});
		});
	});

	describe('Request Defaults', () => {
		it('should have baseURL from credentials', () => {
			expect(node.description.requestDefaults?.baseURL).toBe('={{$credentials?.apiUrl}}');
		});

		it('should have correct default headers', () => {
			expect(node.description.requestDefaults?.headers).toEqual({
				Accept: 'application/json',
				'Content-Type': 'application/json',
			});
		});
	});

	describe('Resource Configuration', () => {
		it('should have resource parameter', () => {
			const resourceParam = node.description.properties.find(p => p.name === 'resource');
			expect(resourceParam).toBeDefined();
			expect(resourceParam?.type).toBe('options');
		});

		it('should have all 9 resources defined', () => {
			const resourceParam = node.description.properties.find(p => p.name === 'resource');
			const options = resourceParam?.options as any[];
			expect(options).toHaveLength(9);
			
			const resourceNames = options.map((opt: any) => opt.value);
			expect(resourceNames).toContain('activity');
			expect(resourceNames).toContain('customer');
			expect(resourceNames).toContain('default');
			expect(resourceNames).toContain('invoice');
			expect(resourceNames).toContain('project');
			expect(resourceNames).toContain('tag');
			expect(resourceNames).toContain('team');
			expect(resourceNames).toContain('timesheet');
			expect(resourceNames).toContain('user');
		});

		it('should have timesheet as default resource', () => {
			const resourceParam = node.description.properties.find(p => p.name === 'resource');
			expect(resourceParam?.default).toBe('timesheet');
		});
	});

	describe('Activity Resource Operations', () => {
		it('should have operation parameter for activity', () => {
			const operationParams = node.description.properties.filter(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('activity')
			);
			expect(operationParams.length).toBeGreaterThan(0);
		});

		it('should have all activity operations', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('activity')
			);
			const options = operationParam?.options as any[];
			const operations = options.map((opt: any) => opt.value);
			
			expect(operations).toContain('create');
			expect(operations).toContain('delete');
			expect(operations).toContain('get');
			expect(operations).toContain('getAll');
			expect(operations).toContain('update');
			expect(operations).toContain('updateMeta');
			expect(operations).toContain('getRates');
			expect(operations).toContain('addRate');
			expect(operations).toContain('deleteRate');
		});
	});

	describe('Customer Resource Operations', () => {
		it('should have all customer operations', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('customer')
			);
			const options = operationParam?.options as any[];
			const operations = options.map((opt: any) => opt.value);
			
			expect(operations).toContain('create');
			expect(operations).toContain('delete');
			expect(operations).toContain('get');
			expect(operations).toContain('getAll');
			expect(operations).toContain('update');
		});
	});

	describe('Project Resource Operations', () => {
		it('should have all project operations', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('project')
			);
			const options = operationParam?.options as any[];
			const operations = options.map((opt: any) => opt.value);
			
			expect(operations).toContain('create');
			expect(operations).toContain('delete');
			expect(operations).toContain('get');
			expect(operations).toContain('getAll');
			expect(operations).toContain('update');
		});
	});

	describe('Timesheet Resource Operations', () => {
		it('should have all timesheet operations', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('timesheet')
			);
			const options = operationParam?.options as any[];
			const operations = options.map((opt: any) => opt.value);
			
			expect(operations).toContain('create');
			expect(operations).toContain('delete');
			expect(operations).toContain('get');
			expect(operations).toContain('getAll');
			expect(operations).toContain('update');
			expect(operations).toContain('stop');
			expect(operations).toContain('restart');
			expect(operations).toContain('duplicate');
		});
	});

	describe('User Resource Operations', () => {
		it('should have all user operations', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('user')
			);
			const options = operationParam?.options as any[];
			const operations = options.map((opt: any) => opt.value);
			
			expect(operations).toContain('create');
			expect(operations).toContain('get');
			expect(operations).toContain('getAll');
			expect(operations).toContain('getMe');
			expect(operations).toContain('update');
		});
	});

	describe('Team Resource Operations', () => {
		it('should have all team operations', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('team')
			);
			const options = operationParam?.options as any[];
			const operations = options.map((opt: any) => opt.value);
			
			expect(operations).toContain('create');
			expect(operations).toContain('delete');
			expect(operations).toContain('get');
			expect(operations).toContain('getAll');
			expect(operations).toContain('update');
			expect(operations).toContain('addMember');
			expect(operations).toContain('removeMember');
		});
	});

	describe('Tag Resource Operations', () => {
		it('should have all tag operations', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('tag')
			);
			const options = operationParam?.options as any[];
			const operations = options.map((opt: any) => opt.value);
			
			expect(operations).toContain('create');
			expect(operations).toContain('delete');
			expect(operations).toContain('getAll');
		});
	});

	describe('Invoice Resource Operations', () => {
		it('should have all invoice operations', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('invoice')
			);
			const options = operationParam?.options as any[];
			const operations = options.map((opt: any) => opt.value);
			
			expect(operations).toContain('get');
			expect(operations).toContain('getAll');
		});
	});

	describe('Default Resource Operations', () => {
		it('should have all default operations', () => {
			const operationParam = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('default')
			);
			const options = operationParam?.options as any[];
			const operations = options.map((opt: any) => opt.value);
			
			expect(operations).toContain('ping');
			expect(operations).toContain('getVersion');
			expect(operations).toContain('getPlugins');
			expect(operations).toContain('getTimesheetConfig');
			expect(operations).toContain('getColors');
		});
	});

	describe('Routing Configuration', () => {
		it('should have routing for activity create', () => {
			const createOp = findOperation('activity', 'create');
			expect(createOp?.routing?.request?.method).toBe('POST');
			expect(createOp?.routing?.request?.url).toBe('/api/activities');
		});

		it('should have routing for timesheet getAll', () => {
			const getAllOp = findOperation('timesheet', 'getAll');
			expect(getAllOp?.routing?.request?.method).toBe('GET');
			expect(getAllOp?.routing?.request?.url).toBe('/api/timesheets');
		});

		it('should have routing for user getMe', () => {
			const getMeOp = findOperation('user', 'getMe');
			expect(getMeOp?.routing?.request?.method).toBe('GET');
			expect(getMeOp?.routing?.request?.url).toBe('/api/users/me');
		});
	});

	// Helper function to find operation configuration
	function findOperation(resource: string, operation: string): any {
		const operationParam = node.description.properties.find(
			p => p.name === 'operation' && 
			p.displayOptions?.show?.resource?.includes(resource)
		);
		const options = operationParam?.options as any[];
		return options?.find((opt: any) => opt.value === operation);
	}
});


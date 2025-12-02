import { Kimai } from '../../../../nodes/Kimai/Kimai.node';
import { mockCustomer } from '../../../helpers/testHelpers';

describe('Kimai Node - Customer Resource', () => {
	let node: Kimai;

	beforeEach(() => {
		node = new Kimai();
	});

	describe('Create Customer', () => {
		it('should have correct routing for create operation', () => {
			const operation = findOperation('customer', 'create');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('/api/customers');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should include all customer fields in request body', () => {
			const operation = findOperation('customer', 'create');
			const body = operation.routing?.request?.body;
			
			expect(body).toHaveProperty('name');
			expect(body).toHaveProperty('country');
			expect(body).toHaveProperty('currency');
			expect(body).toHaveProperty('timezone');
			expect(body).toHaveProperty('email');
			expect(body).toHaveProperty('phone');
			expect(body).toHaveProperty('address_line1');
		});

		it('should require name, country, currency, and timezone', () => {
			const nameParam = findParameter('name', 'customer', 'create');
			const countryParam = findParameter('country', 'customer', 'create');
			const currencyParam = findParameter('currency', 'customer', 'create');
			const timezoneParam = findParameter('timezone', 'customer', 'create');
			
			expect(nameParam?.required).toBe(true);
			expect(countryParam?.required).toBe(true);
			expect(currencyParam?.required).toBe(true);
			expect(timezoneParam?.required).toBe(true);
		});

		it('should have default currency EUR', () => {
			const currencyParam = findParameter('currency', 'customer', 'create');
			expect(currencyParam?.default).toBe('EUR');
		});

		it('should have default timezone Europe/Berlin', () => {
			const timezoneParam = findParameter('timezone', 'customer', 'create');
			expect(timezoneParam?.default).toBe('Europe/Berlin');
		});
	});

	describe('Delete Customer', () => {
		it('should have correct routing for delete operation', () => {
			const operation = findOperation('customer', 'delete');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/customers/{{$parameter["id"]}}');
		});

		it('should require customer ID', () => {
			const idParam = findParameter('id', 'customer', 'delete');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get Customer', () => {
		it('should have correct routing for get operation', () => {
			const operation = findOperation('customer', 'get');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/customers/{{$parameter["id"]}}');
		});

		it('should require customer ID', () => {
			const idParam = findParameter('id', 'customer', 'get');
			expect(idParam?.required).toBe(true);
		});
	});

	describe('Get All Customers', () => {
		it('should have correct routing for getAll operation', () => {
			const operation = findOperation('customer', 'getAll');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('/api/customers');
		});

		it('should support query parameters', () => {
			const operation = findOperation('customer', 'getAll');
			const qs = operation.routing?.request?.qs;
			
			expect(qs).toHaveProperty('visible');
			expect(qs).toHaveProperty('order');
			expect(qs).toHaveProperty('orderBy');
			expect(qs).toHaveProperty('term');
		});

		it('should have visible options', () => {
			const visibleParam = findParameter('visible', 'customer', 'getAll');
			expect(visibleParam?.type).toBe('options');
			expect(visibleParam?.default).toBe('1');
		});
	});

	describe('Update Customer', () => {
		it('should have correct routing for update operation', () => {
			const operation = findOperation('customer', 'update');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/customers/{{$parameter["id"]}}');
			expect(operation.routing?.request?.bodyContentType).toBe('json');
		});

		it('should require customer ID and name', () => {
			const idParam = findParameter('id', 'customer', 'update');
			const nameParam = findParameter('name', 'customer', 'update');
			
			expect(idParam?.required).toBe(true);
			expect(nameParam?.required).toBe(true);
		});
	});

	describe('Update Meta', () => {
		it('should have correct routing for updateMeta operation', () => {
			const operation = findOperation('customer', 'updateMeta');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('PATCH');
			expect(operation.routing?.request?.url).toBe('=/api/customers/{{$parameter["id"]}}/meta');
		});

		it('should require meta field name and value', () => {
			const metaNameParam = findParameter('metaName', 'customer', 'updateMeta');
			const metaValueParam = findParameter('metaValue', 'customer', 'updateMeta');
			
			expect(metaNameParam?.required).toBe(true);
			expect(metaValueParam?.required).toBe(true);
		});
	});

	describe('Get Rates', () => {
		it('should have correct routing for getRates operation', () => {
			const operation = findOperation('customer', 'getRates');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('GET');
			expect(operation.routing?.request?.url).toBe('=/api/customers/{{$parameter["id"]}}/rates');
		});
	});

	describe('Add Rate', () => {
		it('should have correct routing for addRate operation', () => {
			const operation = findOperation('customer', 'addRate');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('POST');
			expect(operation.routing?.request?.url).toBe('=/api/customers/{{$parameter["id"]}}/rates');
		});

		it('should require rate parameter', () => {
			const rateParam = findParameter('rate', 'customer', 'addRate');
			expect(rateParam?.required).toBe(true);
			expect(rateParam?.type).toBe('number');
		});
	});

	describe('Delete Rate', () => {
		it('should have correct routing for deleteRate operation', () => {
			const operation = findOperation('customer', 'deleteRate');
			
			expect(operation).toBeDefined();
			expect(operation.routing?.request?.method).toBe('DELETE');
			expect(operation.routing?.request?.url).toBe('=/api/customers/{{$parameter["id"]}}/rates/{{$parameter["rateId"]}}');
		});

		it('should require customer ID and rate ID', () => {
			const idParam = findParameter('id', 'customer', 'deleteRate');
			const rateIdParam = findParameter('rateId', 'customer', 'deleteRate');
			
			expect(idParam?.required).toBe(true);
			expect(rateIdParam?.required).toBe(true);
		});
	});

	describe('Address Fields', () => {
		it('should have address line fields', () => {
			const addressLine1 = findParameter('addressLine1', 'customer', 'create');
			const addressLine2 = findParameter('addressLine2', 'customer', 'create');
			const addressLine3 = findParameter('addressLine3', 'customer', 'create');
			
			expect(addressLine1).toBeDefined();
			expect(addressLine2).toBeDefined();
			expect(addressLine3).toBeDefined();
		});

		it('should have postcode and city fields', () => {
			const postcodeParam = findParameter('postcode', 'customer', 'create');
			const cityParam = findParameter('city', 'customer', 'create');
			
			expect(postcodeParam).toBeDefined();
			expect(cityParam).toBeDefined();
		});
	});

	describe('Contact Fields', () => {
		it('should have email field', () => {
			const emailParam = findParameter('email', 'customer', 'create');
			expect(emailParam).toBeDefined();
			expect(emailParam?.type).toBe('string');
		});

		it('should have phone, fax, and mobile fields', () => {
			const phoneParam = findParameter('phone', 'customer', 'create');
			const faxParam = findParameter('fax', 'customer', 'create');
			const mobileParam = findParameter('mobile', 'customer', 'create');
			
			expect(phoneParam).toBeDefined();
			expect(faxParam).toBeDefined();
			expect(mobileParam).toBeDefined();
		});

		it('should have homepage field', () => {
			const homepageParam = findParameter('homepage', 'customer', 'create');
			expect(homepageParam).toBeDefined();
		});
	});

	describe('Business Fields', () => {
		it('should have company field', () => {
			const companyParam = findParameter('company', 'customer', 'create');
			expect(companyParam).toBeDefined();
		});

		it('should have VAT ID field', () => {
			const vatIdParam = findParameter('vatId', 'customer', 'create');
			expect(vatIdParam).toBeDefined();
		});

		it('should have invoice fields', () => {
			const invoiceTextParam = findParameter('invoiceText', 'customer', 'create');
			const invoiceTemplateParam = findParameter('invoiceTemplate', 'customer', 'create');
			const buyerReferenceParam = findParameter('buyerReference', 'customer', 'create');
			
			expect(invoiceTextParam).toBeDefined();
			expect(invoiceTemplateParam).toBeDefined();
			expect(buyerReferenceParam).toBeDefined();
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


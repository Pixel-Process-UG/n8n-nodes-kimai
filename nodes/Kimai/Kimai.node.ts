import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Kimai implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Kimai',
		name: 'kimai',
		icon: 'file:kimai.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Kimai time-tracking API',
		defaults: {
			name: 'Kimai',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'kimaiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials?.apiUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Activity',
						value: 'activity',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Default',
						value: 'default',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Team',
						value: 'team',
					},
					{
						name: 'Timesheet',
						value: 'timesheet',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'timesheet',
			},
			// Activity Resource
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['activity'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create an activity',
						routing: {
							request: {
								method: 'POST',
								url: '/api/activities',
								body: {
									name: '={{$parameter["name"]}}',
									project: '={{$parameter["project"]}}',
									number: '={{$parameter["number"]}}',
									comment: '={{$parameter["comment"]}}',
									visible: '={{$parameter["visible"]}}',
									billable: '={{$parameter["billable"]}}',
									color: '={{$parameter["color"]}}',
									invoiceText: '={{$parameter["invoiceText"]}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete an activity',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/activities/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get an activity',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/activities/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all activities',
						routing: {
							request: {
								method: 'GET',
								url: '/api/activities',
								qs: {
									project: '={{$parameter["project"]}}',
									'projects[]': '={{$parameter["projects"]}}',
									visible: '={{$parameter["visible"]}}',
									globals: '={{$parameter["globals"]}}',
									orderBy: '={{$parameter["orderBy"]}}',
									order: '={{$parameter["order"]}}',
									term: '={{$parameter["term"]}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update an activity',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/activities/{{$parameter["id"]}}',
								body: {
									name: '={{$parameter["name"]}}',
									project: '={{$parameter["project"]}}',
									number: '={{$parameter["number"]}}',
									comment: '={{$parameter["comment"]}}',
									visible: '={{$parameter["visible"]}}',
									billable: '={{$parameter["billable"]}}',
									color: '={{$parameter["color"]}}',
									invoiceText: '={{$parameter["invoiceText"]}}',
								},
							},
						},
					},
					{
						name: 'Update Meta',
						value: 'updateMeta',
						action: 'Update activity custom field',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/activities/{{$parameter["id"]}}/meta',
								body: {
									name: '={{$parameter["metaName"]}}',
									value: '={{$parameter["metaValue"]}}',
								},
							},
						},
					},
					{
						name: 'Get Rates',
						value: 'getRates',
						action: 'Get activity rates',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/activities/{{$parameter["id"]}}/rates',
							},
						},
					},
					{
						name: 'Add Rate',
						value: 'addRate',
						action: 'Add rate for activity',
						routing: {
							request: {
								method: 'POST',
								url: '=/api/activities/{{$parameter["id"]}}/rates',
								body: {
									user: '={{$parameter["rateUser"]}}',
									rate: '={{$parameter["rate"]}}',
									internalRate: '={{$parameter["internalRate"]}}',
									isFixed: '={{$parameter["isFixed"]}}',
								},
							},
						},
					},
					{
						name: 'Delete Rate',
						value: 'deleteRate',
						action: 'Delete rate for activity',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/activities/{{$parameter["id"]}}/rates/{{$parameter["rateId"]}}',
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Activity ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['get', 'update', 'delete', 'updateMeta', 'getRates', 'addRate', 'deleteRate'],
					},
				},
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Project ID',
				name: 'project',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['create', 'update', 'getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Projects',
				name: 'projects',
				type: 'string',
				description: 'Comma-separated list of project IDs',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['getAll'],
					},
				},
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'projects[]',
						value: '={{$value.split(",").map(v => v.trim())}}',
					},
				},
			},
			{
				displayName: 'Visible',
				name: 'visible',
				type: 'options',
				options: [
					{ name: 'Visible', value: '1' },
					{ name: 'Hidden', value: '2' },
					{ name: 'All', value: '3' },
				],
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['getAll'],
					},
				},
				default: '1',
			},
			{
				displayName: 'Globals',
				name: 'globals',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['getAll'],
					},
				},
				default: false,
				routing: {
					send: {
						type: 'query',
						property: 'globals',
						value: '={{$value ? "1" : "0"}}',
					},
				},
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'ID', value: 'id' },
					{ name: 'Name', value: 'name' },
					{ name: 'Project', value: 'project' },
				],
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['getAll'],
					},
				},
				default: 'name',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'ASC' },
					{ name: 'Descending', value: 'DESC' },
				],
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['getAll'],
					},
				},
				default: 'ASC',
			},
			{
				displayName: 'Search Term',
				name: 'term',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Billable',
				name: 'billable',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['create', 'update'],
					},
				},
				default: true,
			},
			{
				displayName: 'Visible',
				name: 'visible',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['create', 'update'],
					},
				},
				default: true,
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Invoice Text',
				name: 'invoiceText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Meta Field Name',
				name: 'metaName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['updateMeta'],
					},
				},
				default: '',
			},
			{
				displayName: 'Meta Field Value',
				name: 'metaValue',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['updateMeta'],
					},
				},
				default: '',
			},
			{
				displayName: 'Rate',
				name: 'rate',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['addRate'],
					},
				},
				default: 0,
			},
			{
				displayName: 'Rate User ID',
				name: 'rateUser',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['addRate'],
					},
				},
				default: '',
			},
			{
				displayName: 'Internal Rate',
				name: 'internalRate',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['addRate'],
					},
				},
				default: 0,
			},
			{
				displayName: 'Is Fixed',
				name: 'isFixed',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['addRate'],
					},
				},
				default: false,
			},
			{
				displayName: 'Rate ID',
				name: 'rateId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['deleteRate'],
					},
				},
				default: '',
			},
			// Customer Resource
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['customer'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create a customer',
						routing: {
							request: {
								method: 'POST',
								url: '/api/customers',
								body: {
									name: '={{$parameter["name"]}}',
									number: '={{$parameter["number"]}}',
									comment: '={{$parameter["comment"]}}',
									company: '={{$parameter["company"]}}',
									vatId: '={{$parameter["vatId"]}}',
									contact: '={{$parameter["contact"]}}',
									address_line1: '={{$parameter["addressLine1"]}}',
									address_line2: '={{$parameter["addressLine2"]}}',
									address_line3: '={{$parameter["addressLine3"]}}',
									postcode: '={{$parameter["postcode"]}}',
									city: '={{$parameter["city"]}}',
									country: '={{$parameter["country"]}}',
									currency: '={{$parameter["currency"]}}',
									phone: '={{$parameter["phone"]}}',
									fax: '={{$parameter["fax"]}}',
									mobile: '={{$parameter["mobile"]}}',
									email: '={{$parameter["email"]}}',
									homepage: '={{$parameter["homepage"]}}',
									timezone: '={{$parameter["timezone"]}}',
									invoiceText: '={{$parameter["invoiceText"]}}',
									invoiceTemplate: '={{$parameter["invoiceTemplate"]}}',
									buyerReference: '={{$parameter["buyerReference"]}}',
									color: '={{$parameter["color"]}}',
									visible: '={{$parameter["visible"]}}',
									billable: '={{$parameter["billable"]}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete a customer',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/customers/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get a customer',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/customers/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all customers',
						routing: {
							request: {
								method: 'GET',
								url: '/api/customers',
								qs: {
									visible: '={{$parameter["visible"]}}',
									order: '={{$parameter["order"]}}',
									orderBy: '={{$parameter["orderBy"]}}',
									term: '={{$parameter["term"]}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update a customer',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/customers/{{$parameter["id"]}}',
								body: {
									name: '={{$parameter["name"]}}',
									number: '={{$parameter["number"]}}',
									comment: '={{$parameter["comment"]}}',
									company: '={{$parameter["company"]}}',
									vatId: '={{$parameter["vatId"]}}',
									contact: '={{$parameter["contact"]}}',
									address_line1: '={{$parameter["addressLine1"]}}',
									address_line2: '={{$parameter["addressLine2"]}}',
									address_line3: '={{$parameter["addressLine3"]}}',
									postcode: '={{$parameter["postcode"]}}',
									city: '={{$parameter["city"]}}',
									country: '={{$parameter["country"]}}',
									currency: '={{$parameter["currency"]}}',
									phone: '={{$parameter["phone"]}}',
									fax: '={{$parameter["fax"]}}',
									mobile: '={{$parameter["mobile"]}}',
									email: '={{$parameter["email"]}}',
									homepage: '={{$parameter["homepage"]}}',
									timezone: '={{$parameter["timezone"]}}',
									invoiceText: '={{$parameter["invoiceText"]}}',
									invoiceTemplate: '={{$parameter["invoiceTemplate"]}}',
									buyerReference: '={{$parameter["buyerReference"]}}',
									color: '={{$parameter["color"]}}',
									visible: '={{$parameter["visible"]}}',
									billable: '={{$parameter["billable"]}}',
								},
							},
						},
					},
					{
						name: 'Update Meta',
						value: 'updateMeta',
						action: 'Update customer custom field',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/customers/{{$parameter["id"]}}/meta',
								body: {
									name: '={{$parameter["metaName"]}}',
									value: '={{$parameter["metaValue"]}}',
								},
							},
						},
					},
					{
						name: 'Get Rates',
						value: 'getRates',
						action: 'Get customer rates',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/customers/{{$parameter["id"]}}/rates',
							},
						},
					},
					{
						name: 'Add Rate',
						value: 'addRate',
						action: 'Add rate for customer',
						routing: {
							request: {
								method: 'POST',
								url: '=/api/customers/{{$parameter["id"]}}/rates',
								body: {
									user: '={{$parameter["rateUser"]}}',
									rate: '={{$parameter["rate"]}}',
									internalRate: '={{$parameter["internalRate"]}}',
									isFixed: '={{$parameter["isFixed"]}}',
								},
							},
						},
					},
					{
						name: 'Delete Rate',
						value: 'deleteRate',
						action: 'Delete rate for customer',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/customers/{{$parameter["id"]}}/rates/{{$parameter["rateId"]}}',
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Customer ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['get', 'update', 'delete', 'updateMeta', 'getRates', 'addRate', 'deleteRate'],
					},
				},
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create'],
					},
				},
				default: 'EUR',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create'],
					},
				},
				default: 'Europe/Berlin',
			},
			{
				displayName: 'Visible',
				name: 'visible',
				type: 'options',
				options: [
					{ name: 'Visible', value: '1' },
					{ name: 'Hidden', value: '2' },
					{ name: 'Both', value: '3' },
				],
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['getAll'],
					},
				},
				default: '1',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'ASC' },
					{ name: 'Descending', value: 'DESC' },
				],
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['getAll'],
					},
				},
				default: 'ASC',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'ID', value: 'id' },
					{ name: 'Name', value: 'name' },
				],
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['getAll'],
					},
				},
				default: 'name',
			},
			{
				displayName: 'Search Term',
				name: 'term',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'VAT ID',
				name: 'vatId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Contact',
				name: 'contact',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Address Line 1',
				name: 'addressLine1',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Address Line 2',
				name: 'addressLine2',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Address Line 3',
				name: 'addressLine3',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Postcode',
				name: 'postcode',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['update'],
					},
				},
				default: 'EUR',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Fax',
				name: 'fax',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Mobile',
				name: 'mobile',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Homepage',
				name: 'homepage',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Invoice Text',
				name: 'invoiceText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Invoice Template',
				name: 'invoiceTemplate',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Buyer Reference',
				name: 'buyerReference',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Visible',
				name: 'visible',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: true,
			},
			{
				displayName: 'Billable',
				name: 'billable',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: true,
			},
			{
				displayName: 'Meta Field Name',
				name: 'metaName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['updateMeta'],
					},
				},
				default: '',
			},
			{
				displayName: 'Meta Field Value',
				name: 'metaValue',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['updateMeta'],
					},
				},
				default: '',
			},
			{
				displayName: 'Rate',
				name: 'rate',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['addRate'],
					},
				},
				default: 0,
			},
			{
				displayName: 'Rate User ID',
				name: 'rateUser',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['addRate'],
					},
				},
				default: '',
			},
			{
				displayName: 'Internal Rate',
				name: 'internalRate',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['addRate'],
					},
				},
				default: 0,
			},
			{
				displayName: 'Is Fixed',
				name: 'isFixed',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['addRate'],
					},
				},
				default: false,
			},
			{
				displayName: 'Rate ID',
				name: 'rateId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['deleteRate'],
					},
				},
				default: '',
			},
			// Project Resource
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['project'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create a project',
						routing: {
							request: {
								method: 'POST',
								url: '/api/projects',
								body: {
									name: '={{$parameter["name"]}}',
									customer: '={{$parameter["customer"]}}',
									number: '={{$parameter["number"]}}',
									comment: '={{$parameter["comment"]}}',
									invoiceText: '={{$parameter["invoiceText"]}}',
									orderNumber: '={{$parameter["orderNumber"]}}',
									orderDate: '={{$parameter["orderDate"]}}',
									start: '={{$parameter["start"]}}',
									end: '={{$parameter["end"]}}',
									color: '={{$parameter["color"]}}',
									globalActivities: '={{$parameter["globalActivities"]}}',
									visible: '={{$parameter["visible"]}}',
									billable: '={{$parameter["billable"]}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete a project',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/projects/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get a project',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/projects/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all projects',
						routing: {
							request: {
								method: 'GET',
								url: '/api/projects',
								qs: {
									customer: '={{$parameter["customer"]}}',
									'customers[]': '={{$parameter["customers"]}}',
									visible: '={{$parameter["visible"]}}',
									start: '={{$parameter["start"]}}',
									end: '={{$parameter["end"]}}',
									ignoreDates: '={{$parameter["ignoreDates"]}}',
									globalActivities: '={{$parameter["globalActivities"]}}',
									order: '={{$parameter["order"]}}',
									orderBy: '={{$parameter["orderBy"]}}',
									term: '={{$parameter["term"]}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update a project',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/projects/{{$parameter["id"]}}',
								body: {
									name: '={{$parameter["name"]}}',
									customer: '={{$parameter["customer"]}}',
									number: '={{$parameter["number"]}}',
									comment: '={{$parameter["comment"]}}',
									invoiceText: '={{$parameter["invoiceText"]}}',
									orderNumber: '={{$parameter["orderNumber"]}}',
									orderDate: '={{$parameter["orderDate"]}}',
									start: '={{$parameter["start"]}}',
									end: '={{$parameter["end"]}}',
									color: '={{$parameter["color"]}}',
									globalActivities: '={{$parameter["globalActivities"]}}',
									visible: '={{$parameter["visible"]}}',
									billable: '={{$parameter["billable"]}}',
								},
							},
						},
					},
					{
						name: 'Update Meta',
						value: 'updateMeta',
						action: 'Update project custom field',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/projects/{{$parameter["id"]}}/meta',
								body: {
									name: '={{$parameter["metaName"]}}',
									value: '={{$parameter["metaValue"]}}',
								},
							},
						},
					},
					{
						name: 'Get Rates',
						value: 'getRates',
						action: 'Get project rates',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/projects/{{$parameter["id"]}}/rates',
							},
						},
					},
					{
						name: 'Add Rate',
						value: 'addRate',
						action: 'Add rate for project',
						routing: {
							request: {
								method: 'POST',
								url: '=/api/projects/{{$parameter["id"]}}/rates',
								body: {
									user: '={{$parameter["rateUser"]}}',
									rate: '={{$parameter["rate"]}}',
									internalRate: '={{$parameter["internalRate"]}}',
									isFixed: '={{$parameter["isFixed"]}}',
								},
							},
						},
					},
					{
						name: 'Delete Rate',
						value: 'deleteRate',
						action: 'Delete rate for project',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/projects/{{$parameter["id"]}}/rates/{{$parameter["rateId"]}}',
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Project ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['get', 'update', 'delete', 'updateMeta', 'getRates', 'addRate', 'deleteRate'],
					},
				},
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Customer ID',
				name: 'customer',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Customer ID',
				name: 'customer',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Customers',
				name: 'customers',
				type: 'string',
				description: 'Comma-separated list of customer IDs',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll'],
					},
				},
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'customers[]',
						value: '={{$value.split(",").map(v => v.trim())}}',
					},
				},
			},
			{
				displayName: 'Visible',
				name: 'visible',
				type: 'options',
				options: [
					{ name: 'Visible', value: '1' },
					{ name: 'Hidden', value: '2' },
					{ name: 'Both', value: '3' },
				],
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll'],
					},
				},
				default: '1',
			},
			{
				displayName: 'Start Date',
				name: 'start',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll', 'create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'End Date',
				name: 'end',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll', 'create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Ignore Dates',
				name: 'ignoreDates',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll'],
					},
				},
				default: false,
				routing: {
					send: {
						type: 'query',
						property: 'ignoreDates',
						value: '={{$value ? "1" : ""}}',
					},
				},
			},
			{
				displayName: 'Global Activities',
				name: 'globalActivities',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll', 'create', 'update'],
					},
				},
				default: true,
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'ASC' },
					{ name: 'Descending', value: 'DESC' },
				],
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll'],
					},
				},
				default: 'ASC',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'ID', value: 'id' },
					{ name: 'Name', value: 'name' },
					{ name: 'Customer', value: 'customer' },
				],
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll'],
					},
				},
				default: 'name',
			},
			{
				displayName: 'Search Term',
				name: 'term',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Invoice Text',
				name: 'invoiceText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Order Number',
				name: 'orderNumber',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Order Date',
				name: 'orderDate',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Visible',
				name: 'visible',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: true,
			},
			{
				displayName: 'Billable',
				name: 'billable',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: true,
			},
			{
				displayName: 'Meta Field Name',
				name: 'metaName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['updateMeta'],
					},
				},
				default: '',
			},
			{
				displayName: 'Meta Field Value',
				name: 'metaValue',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['updateMeta'],
					},
				},
				default: '',
			},
			{
				displayName: 'Rate',
				name: 'rate',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['addRate'],
					},
				},
				default: 0,
			},
			{
				displayName: 'Rate User ID',
				name: 'rateUser',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['addRate'],
					},
				},
				default: '',
			},
			{
				displayName: 'Internal Rate',
				name: 'internalRate',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['addRate'],
					},
				},
				default: 0,
			},
			{
				displayName: 'Is Fixed',
				name: 'isFixed',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['addRate'],
					},
				},
				default: false,
			},
			{
				displayName: 'Rate ID',
				name: 'rateId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['deleteRate'],
					},
				},
				default: '',
			},
			// Tag Resource
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tag'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create a tag',
						routing: {
							request: {
								method: 'POST',
								url: '/api/tags',
								body: {
									name: '={{$parameter["name"]}}',
									color: '={{$parameter["color"]}}',
									visible: '={{$parameter["visible"]}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete a tag',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/tags/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all tags',
						routing: {
							request: {
								method: 'GET',
								url: '/api/tags/find',
								qs: {
									name: '={{$parameter["name"]}}',
								},
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Tag ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['delete'],
					},
				},
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Visible',
				name: 'visible',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				default: true,
			},
			// Team Resource
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['team'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create a team',
						routing: {
							request: {
								method: 'POST',
								url: '/api/teams',
								body: {
									name: '={{$parameter["name"]}}',
									members: '={{$parameter["members"]}}',
									color: '={{$parameter["color"]}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete a team',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/teams/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get a team',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/teams/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all teams',
						routing: {
							request: {
								method: 'GET',
								url: '/api/teams',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update a team',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/teams/{{$parameter["id"]}}',
								body: {
									name: '={{$parameter["name"]}}',
									members: '={{$parameter["members"]}}',
									color: '={{$parameter["color"]}}',
								},
							},
						},
					},
					{
						name: 'Add Member',
						value: 'addMember',
						action: 'Add team member',
						routing: {
							request: {
								method: 'POST',
								url: '=/api/teams/{{$parameter["id"]}}/members/{{$parameter["userId"]}}',
							},
						},
					},
					{
						name: 'Remove Member',
						value: 'removeMember',
						action: 'Remove team member',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/teams/{{$parameter["id"]}}/members/{{$parameter["userId"]}}',
							},
						},
					},
					{
						name: 'Grant Customer Access',
						value: 'grantCustomer',
						action: 'Grant team access to customer',
						routing: {
							request: {
								method: 'POST',
								url: '=/api/teams/{{$parameter["id"]}}/customers/{{$parameter["customerId"]}}',
							},
						},
					},
					{
						name: 'Revoke Customer Access',
						value: 'revokeCustomer',
						action: 'Revoke customer access from team',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/teams/{{$parameter["id"]}}/customers/{{$parameter["customerId"]}}',
							},
						},
					},
					{
						name: 'Grant Project Access',
						value: 'grantProject',
						action: 'Grant team access to project',
						routing: {
							request: {
								method: 'POST',
								url: '=/api/teams/{{$parameter["id"]}}/projects/{{$parameter["projectId"]}}',
							},
						},
					},
					{
						name: 'Revoke Project Access',
						value: 'revokeProject',
						action: 'Revoke project access from team',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/teams/{{$parameter["id"]}}/projects/{{$parameter["projectId"]}}',
							},
						},
					},
					{
						name: 'Grant Activity Access',
						value: 'grantActivity',
						action: 'Grant team access to activity',
						routing: {
							request: {
								method: 'POST',
								url: '=/api/teams/{{$parameter["id"]}}/activities/{{$parameter["activityId"]}}',
							},
						},
					},
					{
						name: 'Revoke Activity Access',
						value: 'revokeActivity',
						action: 'Revoke activity access from team',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/teams/{{$parameter["id"]}}/activities/{{$parameter["activityId"]}}',
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Team ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['get', 'update', 'delete', 'addMember', 'removeMember', 'grantCustomer', 'revokeCustomer', 'grantProject', 'revokeProject', 'grantActivity', 'revokeActivity'],
					},
				},
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Members',
				name: 'members',
				type: 'json',
				required: true,
				description: 'Array of team members with user ID and teamlead flag',
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['create', 'update'],
					},
				},
				default: '[{"user": 1, "teamlead": false}]',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['addMember', 'removeMember'],
					},
				},
				default: '',
			},
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['grantCustomer', 'revokeCustomer'],
					},
				},
				default: '',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['grantProject', 'revokeProject'],
					},
				},
				default: '',
			},
			{
				displayName: 'Activity ID',
				name: 'activityId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['grantActivity', 'revokeActivity'],
					},
				},
				default: '',
			},
			// Timesheet Resource
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['timesheet'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create a timesheet',
						routing: {
							request: {
								method: 'POST',
								url: '/api/timesheets',
								qs: {
									full: '={{$parameter["full"]}}',
								},
								body: {
									begin: '={{$parameter["begin"]}}',
									end: '={{$parameter["end"]}}',
									project: '={{$parameter["project"]}}',
									activity: '={{$parameter["activity"]}}',
									description: '={{$parameter["description"]}}',
									fixedRate: '={{$parameter["fixedRate"]}}',
									hourlyRate: '={{$parameter["hourlyRate"]}}',
									user: '={{$parameter["user"]}}',
									tags: '={{$parameter["tags"]}}',
									exported: '={{$parameter["exported"]}}',
									billable: '={{$parameter["billable"]}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete a timesheet',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/timesheets/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get a timesheet',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/timesheets/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all timesheets',
						routing: {
							request: {
								method: 'GET',
								url: '/api/timesheets',
								qs: {
									user: '={{$parameter["user"]}}',
									customer: '={{$parameter["customer"]}}',
									project: '={{$parameter["project"]}}',
									activity: '={{$parameter["activity"]}}',
									page: '={{$parameter["page"]}}',
									size: '={{$parameter["size"]}}',
									orderBy: '={{$parameter["orderBy"]}}',
									order: '={{$parameter["order"]}}',
									begin: '={{$parameter["begin"]}}',
									end: '={{$parameter["end"]}}',
									exported: '={{$parameter["exported"]}}',
									active: '={{$parameter["active"]}}',
									billable: '={{$parameter["billable"]}}',
									full: '={{$parameter["full"]}}',
									term: '={{$parameter["term"]}}',
									modified_after: '={{$parameter["modifiedAfter"]}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update a timesheet',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/timesheets/{{$parameter["id"]}}',
								body: {
									begin: '={{$parameter["begin"]}}',
									end: '={{$parameter["end"]}}',
									project: '={{$parameter["project"]}}',
									activity: '={{$parameter["activity"]}}',
									description: '={{$parameter["description"]}}',
									fixedRate: '={{$parameter["fixedRate"]}}',
									hourlyRate: '={{$parameter["hourlyRate"]}}',
									user: '={{$parameter["user"]}}',
									tags: '={{$parameter["tags"]}}',
									exported: '={{$parameter["exported"]}}',
									billable: '={{$parameter["billable"]}}',
								},
							},
						},
					},
					{
						name: 'Stop',
						value: 'stop',
						action: 'Stop active timesheet',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/timesheets/{{$parameter["id"]}}/stop',
							},
						},
					},
					{
						name: 'Restart',
						value: 'restart',
						action: 'Restart timesheet',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/timesheets/{{$parameter["id"]}}/restart',
								body: {
									copy: '={{$parameter["copy"]}}',
									begin: '={{$parameter["begin"]}}',
								},
							},
						},
					},
					{
						name: 'Duplicate',
						value: 'duplicate',
						action: 'Duplicate timesheet',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/timesheets/{{$parameter["id"]}}/duplicate',
							},
						},
					},
					{
						name: 'Toggle Export',
						value: 'toggleExport',
						action: 'Toggle timesheet export state',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/timesheets/{{$parameter["id"]}}/export',
							},
						},
					},
					{
						name: 'Update Meta',
						value: 'updateMeta',
						action: 'Update timesheet custom field',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/timesheets/{{$parameter["id"]}}/meta',
								body: {
									name: '={{$parameter["metaName"]}}',
									value: '={{$parameter["metaValue"]}}',
								},
							},
						},
					},
					{
						name: 'Get Recent',
						value: 'getRecent',
						action: 'Get recent timesheets',
						routing: {
							request: {
								method: 'GET',
								url: '/api/timesheets/recent',
								qs: {
									begin: '={{$parameter["begin"]}}',
									size: '={{$parameter["size"]}}',
								},
							},
						},
					},
					{
						name: 'Get Active',
						value: 'getActive',
						action: 'Get active timesheets',
						routing: {
							request: {
								method: 'GET',
								url: '/api/timesheets/active',
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Timesheet ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['get', 'update', 'delete', 'stop', 'restart', 'duplicate', 'toggleExport', 'updateMeta'],
					},
				},
				default: '',
			},
			{
				displayName: 'Project ID',
				name: 'project',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Activity ID',
				name: 'activity',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Begin',
				name: 'begin',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update', 'restart', 'getAll', 'getRecent'],
					},
				},
				default: '',
			},
			{
				displayName: 'End',
				name: 'end',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update', 'getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Fixed Rate',
				name: 'fixedRate',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update'],
					},
				},
				default: 0,
			},
			{
				displayName: 'Hourly Rate',
				name: 'hourlyRate',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update'],
					},
				},
				default: 0,
			},
			{
				displayName: 'User ID',
				name: 'user',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update', 'getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Users',
				name: 'users',
				type: 'string',
				description: 'Comma-separated list of user IDs',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'users[]',
						value: '={{$value.split(",").map(v => v.trim())}}',
					},
				},
			},
			{
				displayName: 'Customer ID',
				name: 'customer',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Customers',
				name: 'customers',
				type: 'string',
				description: 'Comma-separated list of customer IDs',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'customers[]',
						value: '={{$value.split(",").map(v => v.trim())}}',
					},
				},
			},
			{
				displayName: 'Project ID',
				name: 'project',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Projects',
				name: 'projects',
				type: 'string',
				description: 'Comma-separated list of project IDs',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'projects[]',
						value: '={{$value.split(",").map(v => v.trim())}}',
					},
				},
			},
			{
				displayName: 'Activity ID',
				name: 'activity',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Activities',
				name: 'activities',
				type: 'string',
				description: 'Comma-separated list of activity IDs',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'activities[]',
						value: '={{$value.split(",").map(v => v.trim())}}',
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: 1,
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll', 'getRecent'],
					},
				},
				default: 50,
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				description: 'Comma-separated list of tags',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update', 'getAll'],
					},
				},
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'tags[]',
						value: '={{$value ? $value.split(",").map(t => t.trim()) : undefined}}',
					},
				},
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'ID', value: 'id' },
					{ name: 'Begin', value: 'begin' },
					{ name: 'End', value: 'end' },
					{ name: 'Rate', value: 'rate' },
				],
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: 'begin',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'ASC' },
					{ name: 'Descending', value: 'DESC' },
				],
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: 'DESC',
			},
			{
				displayName: 'Exported',
				name: 'exported',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Not Exported', value: '0' },
					{ name: 'Exported', value: '1' },
				],
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Active',
				name: 'active',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Stopped', value: '0' },
					{ name: 'Active', value: '1' },
				],
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Billable',
				name: 'billable',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Non-Billable', value: '0' },
					{ name: 'Billable', value: '1' },
				],
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Full',
				name: 'full',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'getAll'],
					},
				},
				default: false,
				routing: {
					send: {
						type: 'query',
						property: 'full',
						value: '={{$value ? "1" : "0"}}',
					},
				},
			},
			{
				displayName: 'Search Term',
				name: 'term',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Modified After',
				name: 'modifiedAfter',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Exported',
				name: 'exported',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update'],
					},
				},
				default: false,
			},
			{
				displayName: 'Billable',
				name: 'billable',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['create', 'update'],
					},
				},
				default: true,
			},
			{
				displayName: 'Copy',
				name: 'copy',
				type: 'string',
				description: 'Set to "all" to copy all data',
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['restart'],
					},
				},
				default: '',
			},
			{
				displayName: 'Meta Field Name',
				name: 'metaName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['updateMeta'],
					},
				},
				default: '',
			},
			{
				displayName: 'Meta Field Value',
				name: 'metaValue',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['timesheet'],
						operation: ['updateMeta'],
					},
				},
				default: '',
			},
			// User Resource
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create a user',
						routing: {
							request: {
								method: 'POST',
								url: '/api/users',
								body: {
									username: '={{$parameter["username"]}}',
									alias: '={{$parameter["alias"]}}',
									title: '={{$parameter["title"]}}',
									accountNumber: '={{$parameter["accountNumber"]}}',
									color: '={{$parameter["color"]}}',
									email: '={{$parameter["email"]}}',
									language: '={{$parameter["language"]}}',
									locale: '={{$parameter["locale"]}}',
									timezone: '={{$parameter["timezone"]}}',
									supervisor: '={{$parameter["supervisor"]}}',
									roles: '={{$parameter["roles"]}}',
									plainPassword: '={{$parameter["plainPassword"]}}',
									plainApiToken: '={{$parameter["plainApiToken"]}}',
									enabled: '={{$parameter["enabled"]}}',
									systemAccount: '={{$parameter["systemAccount"]}}',
									requiresPasswordReset: '={{$parameter["requiresPasswordReset"]}}',
								},
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get a user',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/users/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all users',
						routing: {
							request: {
								method: 'GET',
								url: '/api/users',
								qs: {
									visible: '={{$parameter["visible"]}}',
									orderBy: '={{$parameter["orderBy"]}}',
									order: '={{$parameter["order"]}}',
									term: '={{$parameter["term"]}}',
									full: '={{$parameter["full"]}}',
								},
							},
						},
					},
					{
						name: 'Get Me',
						value: 'getMe',
						action: 'Get current user',
						routing: {
							request: {
								method: 'GET',
								url: '/api/users/me',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update a user',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/users/{{$parameter["id"]}}',
								body: {
									alias: '={{$parameter["alias"]}}',
									title: '={{$parameter["title"]}}',
									accountNumber: '={{$parameter["accountNumber"]}}',
									color: '={{$parameter["color"]}}',
									email: '={{$parameter["email"]}}',
									language: '={{$parameter["language"]}}',
									locale: '={{$parameter["locale"]}}',
									timezone: '={{$parameter["timezone"]}}',
									supervisor: '={{$parameter["supervisor"]}}',
									roles: '={{$parameter["roles"]}}',
									enabled: '={{$parameter["enabled"]}}',
									systemAccount: '={{$parameter["systemAccount"]}}',
									requiresPasswordReset: '={{$parameter["requiresPasswordReset"]}}',
								},
							},
						},
					},
					{
						name: 'Update Preferences',
						value: 'updatePreferences',
						action: 'Update user preferences',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/api/users/{{$parameter["id"]}}/preferences',
								body: '={{$parameter["preferences"]}}',
							},
						},
					},
					{
						name: 'Delete API Token',
						value: 'deleteApiToken',
						action: 'Delete API token',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/api/users/api-token/{{$parameter["tokenId"]}}',
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'User ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['get', 'update', 'updatePreferences'],
					},
				},
				default: '',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: 'en',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: 'en_US',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: 'Europe/Berlin',
			},
			{
				displayName: 'Plain Password',
				name: 'plainPassword',
				type: 'string',
				typeOptions: {
					password: true,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Visible',
				name: 'visible',
				type: 'options',
				options: [
					{ name: 'Visible', value: '1' },
					{ name: 'Hidden', value: '2' },
					{ name: 'All', value: '3' },
				],
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getAll'],
					},
				},
				default: '1',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'ID', value: 'id' },
					{ name: 'Username', value: 'username' },
					{ name: 'Alias', value: 'alias' },
					{ name: 'Email', value: 'email' },
				],
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getAll'],
					},
				},
				default: 'username',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'ASC' },
					{ name: 'Descending', value: 'DESC' },
				],
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getAll'],
					},
				},
				default: 'ASC',
			},
			{
				displayName: 'Search Term',
				name: 'term',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Full',
				name: 'full',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getAll'],
					},
				},
				default: false,
				routing: {
					send: {
						type: 'query',
						property: 'full',
						value: '={{$value ? "1" : "0"}}',
					},
				},
			},
			{
				displayName: 'Alias',
				name: 'alias',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Account Number',
				name: 'accountNumber',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Supervisor',
				name: 'supervisor',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: '',
			},
			{
				displayName: 'Roles',
				name: 'roles',
				type: 'json',
				description: 'Array of role names',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: '[]',
			},
			{
				displayName: 'Plain API Token',
				name: 'plainApiToken',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: true,
			},
			{
				displayName: 'System Account',
				name: 'systemAccount',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: false,
			},
			{
				displayName: 'Requires Password Reset',
				name: 'requiresPasswordReset',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['create', 'update'],
					},
				},
				default: false,
			},
			{
				displayName: 'Preferences',
				name: 'preferences',
				type: 'json',
				required: true,
				description: 'Array of preference objects with name and value',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['updatePreferences'],
					},
				},
				default: '[{"name": "preference_name", "value": "preference_value"}]',
			},
			{
				displayName: 'Token ID',
				name: 'tokenId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['deleteApiToken'],
					},
				},
				default: '',
			},
			// Invoice Resource
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['invoice'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get an invoice',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/invoices/{{$parameter["id"]}}',
							},
						},
					},
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all invoices',
						routing: {
							request: {
								method: 'GET',
								url: '/api/invoices',
								qs: {
									begin: '={{$parameter["begin"]}}',
									end: '={{$parameter["end"]}}',
									'customers[]': '={{$parameter["customers"]}}',
									'status[]': '={{$parameter["status"]}}',
									page: '={{$parameter["page"]}}',
									size: '={{$parameter["size"]}}',
								},
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Invoice ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['get'],
					},
				},
				default: '',
			},
			{
				displayName: 'Begin',
				name: 'begin',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'End',
				name: 'end',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				default: '',
			},
			{
				displayName: 'Customers',
				name: 'customers',
				type: 'string',
				description: 'Comma-separated list of customer IDs',
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'customers[]',
						value: '={{$value.split(",").map(v => v.trim())}}',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				description: 'Comma-separated list: pending, paid, canceled, new',
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'status[]',
						value: '={{$value.split(",").map(v => v.trim())}}',
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				default: 1,
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				default: 50,
			},
			// Default Resource
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['default'],
					},
				},
				options: [
					{
						name: 'Get Timesheet Config',
						value: 'getTimesheetConfig',
						action: 'Get timesheet configuration',
						routing: {
							request: {
								method: 'GET',
								url: '/api/config/timesheet',
							},
						},
					},
					{
						name: 'Get Colors',
						value: 'getColors',
						action: 'Get configured color codes',
						routing: {
							request: {
								method: 'GET',
								url: '/api/config/colors',
							},
						},
					},
					{
						name: 'Ping',
						value: 'ping',
						action: 'Test API connection',
						routing: {
							request: {
								method: 'GET',
								url: '/api/ping',
							},
						},
					},
					{
						name: 'Get Version',
						value: 'getVersion',
						action: 'Get Kimai version',
						routing: {
							request: {
								method: 'GET',
								url: '/api/version',
							},
						},
					},
					{
						name: 'Get Plugins',
						value: 'getPlugins',
						action: 'Get installed plugins',
						routing: {
							request: {
								method: 'GET',
								url: '/api/plugins',
							},
						},
					},
				],
				default: 'ping',
			},
		],
	};
}


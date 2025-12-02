import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class KimaiApi implements ICredentialType {
	name = 'kimaiApi';
	displayName = 'Kimai API';
	documentationUrl = 'https://www.kimai.org/documentation/rest-api.html';
	properties: INodeProperties[] = [
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: '',
			placeholder: 'https://kimai.example.com',
			required: true,
			description: 'Base URL of your Kimai instance (e.g., https://kimai.example.com)',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API token for Bearer authentication',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.apiUrl}}',
			url: '/api/ping',
		},
	};
}


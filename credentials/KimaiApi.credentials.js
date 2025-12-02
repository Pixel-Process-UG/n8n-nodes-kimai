"use strict";
exports.__esModule = true;
exports.KimaiApi = void 0;
var KimaiApi = /** @class */ (function () {
    function KimaiApi() {
        this.name = 'kimaiApi';
        this.displayName = 'Kimai API';
        this.documentationUrl = 'https://www.kimai.org/documentation/rest-api.html';
        this.properties = [
            {
                displayName: 'API URL',
                name: 'apiUrl',
                type: 'string',
                "default": '',
                placeholder: 'https://kimai.example.com',
                required: true,
                description: 'Base URL of your Kimai instance (e.g., https://kimai.example.com)'
            },
            {
                displayName: 'API Token',
                name: 'apiToken',
                type: 'string',
                typeOptions: {
                    password: true
                },
                "default": '',
                required: true,
                description: 'API token for Bearer authentication'
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.apiToken}}'
                }
            }
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.apiUrl}}',
                url: '/api/ping'
            }
        };
    }
    return KimaiApi;
}());
exports.KimaiApi = KimaiApi;

/// <reference types="svelte" />
/// <reference types="vite/client" />

declare namespace App {
    type JsonSymbol = {
        indent: number;
        value: any;
        color: string;
        breakAfter: boolean;
    }
    type Request = {
        name: string;
        url: string;
        routeParam: {
            [key: string]: any;
        };
        queryParam: {
            [key: string]: any;
        };
        bodyParam: {
            [key: string]: any;
        };
        method: RequestMethods;
        mode: RequestModes;
        credentials: RequestCredentials;
        ContentType: RequestContentTypes;
    };
}
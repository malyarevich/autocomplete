export interface INYTimes {
    status: string;
    copyright: string;
    response: {
        docs: IDoc[];
    }
}

export interface IDoc {
    abstract:  string;
    web_url: string;
    snippet: string;
    print_section: string;
    print_page: string;
    source: string;
    multimedia: any[];
    headline: any[];
}

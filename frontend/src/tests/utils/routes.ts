const REACT_APP_PROD_URL = process.env.REACT_APP_PROD_URL || 'http://localhost';

export const findUrlByRoute = (route: string): Promise<string> =>
    new Promise(resolve => resolve(REACT_APP_PROD_URL.concat(route)));
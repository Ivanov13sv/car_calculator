import { IUserApplication } from 'types/IUserApplication';

const baseURL = 'https://eoj3r7f3r4ef6v4.m.pipedream.net';

export class ApiService {
    static async sendApplication(body: IUserApplication) {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Ошибка, попробуйте позже');
        }
        return response;
    }
}

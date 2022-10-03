export enum INotificationType {
    success = 'success',
    error = 'error',
    warning = 'warning',
}

export interface INotification {
    id: number;
    type: INotificationType;
    message: string;
}

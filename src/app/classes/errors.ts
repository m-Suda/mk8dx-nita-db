class BaseError extends Error {
    constructor(e?: string) {
        super(e);
        this.name = new.target.name;
    }
}

export class UserSettingNotFoundError extends BaseError {
    constructor() {
        super('UserSettingが存在しません');
    }
}
export const enum ProjectStatus {
    Active = 'active',
    Finished = 'finished'
}

export class ValidationMessages {
    constructor(
        public inputField: string,
        public errorMessages: string[],
    ) {
    }

    public hasErrors(): boolean {
        return this.errorMessages.length > 0;
    }
}

export class Project {
    public readonly id: string = Math.random().toString();

    constructor(
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {
    }

    public validate(): ValidationMessages[] {
        const result: ValidationMessages[] = [];

        const titleValidationMessages = new ValidationMessages('title', []);
        const descriptionValidationMessages = new ValidationMessages('description', []);
        const peopleValidationMessages = new ValidationMessages('people', []);

        if (this.title.trim().length === 0) {
            titleValidationMessages.errorMessages.push('Title is required');
        }

        if (this.description.trim().length === 0) {
            descriptionValidationMessages.errorMessages.push('Description is required');
        }

        if (this.people <= 0) {
            peopleValidationMessages.errorMessages.push('People must be more than 0');
        }

        if (titleValidationMessages.hasErrors()) {
            result.push(titleValidationMessages);
        }

        if (descriptionValidationMessages.hasErrors()) {
            result.push(descriptionValidationMessages);
        }

        if (peopleValidationMessages.hasErrors()) {
            result.push(peopleValidationMessages);
        }

        return result;
    }

    public isValid(): boolean {
        return this.validate().length === 0;
    }
}
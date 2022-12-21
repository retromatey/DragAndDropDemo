import {Component} from "./BaseComponent";
import {Project, ProjectStatus, ValidationMessages} from "../Models/ProjectModel";
import {projectState} from "../State/ProjectState";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    private readonly _titleInput: HTMLInputElement;
    private get titleInput(): HTMLInputElement {
        return this._titleInput;
    }

    private readonly _descriptionInput: HTMLInputElement;
    private get descriptionInput(): HTMLInputElement {
        return this._descriptionInput;
    }

    private readonly _peopleInput: HTMLInputElement;
    private get peopleInput(): HTMLInputElement {
        return this._peopleInput;
    }

    private get projects(): Project[] {
        return this._projects;
    }

    private readonly _projects: Project[] = [];

    constructor() {
        super('app', 'project-input', 'afterbegin', 'user-input');

        this._titleInput = this.element.querySelector('#title') as HTMLInputElement;
        this._descriptionInput = this.element.querySelector('#description') as HTMLInputElement;
        this._peopleInput = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    protected renderContent() {
    }

    protected configure() {
        this.element.addEventListener('submit', e => this.onFormSubmit(e));
    }

    private getUserInput(): Project {
        return new Project(this.titleInput.value, this.descriptionInput.value, +this.peopleInput.value, ProjectStatus.Active);
        // project.people = +this.peopleInput.value;   // the '+' will convert the string input to a number.  parseInt() can be used, but will result in NaN if input is null
    }

    private displayErrors(validationMessages: ValidationMessages[]): void {

        for (const validationMessage of validationMessages) {
            const errorInput = document.querySelector(`#${validationMessage.inputField}`) as HTMLElement;
            const errorDiv = document.createElement('div') as HTMLDivElement;
            errorDiv.className = 'error-messages';

            for (const errorMessage of validationMessage.errorMessages) {
                const errorParagraph = document.createElement('p') as HTMLParagraphElement;
                errorParagraph.innerText = errorMessage;
                errorParagraph.className = 'error-message';
                errorDiv.insertAdjacentElement('afterbegin', errorParagraph);
            }

            errorInput.insertAdjacentElement('afterend', errorDiv);
        }
    }

    private clearUserInput(): void {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
        const errorDivs = document.querySelectorAll('.error-messages');

        for (const errorDiv of errorDivs) {
            errorDiv.parentNode?.removeChild(errorDiv);
        }
    }

    private onFormSubmit(event: Event) {
        event.preventDefault();

        const project = this.getUserInput();

        if (project.isValid()) {
            projectState.addProject(project);
            this.clearUserInput();

        } else {
            const validationMessages = project.validate();
            this.displayErrors(validationMessages);
        }

        this.projects.push(project);
    }
}
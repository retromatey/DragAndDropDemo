import {Draggable} from "../Models/DDInterfaces";
import {Component} from "./BaseComponent";
import {Project} from "../Models/ProjectModel";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    public get project(): Project {
        return this._project;
    }

    private readonly _project: Project;

    constructor(project: Project, hostElementId: string) {
        super(hostElementId, 'single-project', 'beforeend', project.id);

        this._project = project;
        this.configure();
        this.renderContent();
    }

    protected configure(): void {
        this.element.addEventListener('dragstart', event => this.dragStartHandler(event));
        this.element.addEventListener('dragend', event => this.dragEndHandler(event));
    }

    protected renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        const text = this.project.people === 1 ? "1 person" : `${this.project.people} people`;
        this.element.querySelector('h3')!.textContent = `${text} assigned`;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
    
    public dragEndHandler(_: DragEvent): void { }

    public dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
}
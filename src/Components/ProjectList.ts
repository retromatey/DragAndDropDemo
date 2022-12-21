import {DragTarget} from "../Models/DDInterfaces";
import {Component} from "./BaseComponent";
import {Project, ProjectStatus} from "../Models/ProjectModel";
import {projectState} from "../State/ProjectState";
import {ProjectItem} from "./ProjectItem";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    private readonly _type: ProjectStatus;
    private _assignedProjects: Project[] = [];

    constructor(type: ProjectStatus) {
        super('app', 'project-list', 'beforeend', `${type}-projects`);

        this._type = type;
        this.configure();
        this.renderContent();
    }

    public dragOverHandler(event: DragEvent): void {

        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listElement = this.element.querySelector('ul') as HTMLUListElement;
            listElement.classList.add('droppable');
        }
    }

    public dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this._type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    public dragLeaveHandler(_: DragEvent): void {
        const listElement = this.element.querySelector('ul') as HTMLUListElement;
        listElement.classList.remove('droppable');
    }

    protected configure(): void {
        this.element.addEventListener('dragover', event => this.dragOverHandler(event));
        this.element.addEventListener('dragleave', event => this.dragLeaveHandler(event));
        this.element.addEventListener('drop', event => this.dropHandler(event));

        projectState.addListener((projects: Project[]) => {
            this._assignedProjects = projects.filter(project => project.status === this._type);
            this.renderProjects();
        });
    }

    protected renderContent() {
        this.element.querySelector('ul')!.id = `${this._type}-projects-list`;
        this.element.querySelector('h2')!.textContent = `${this._type.toUpperCase()} PROJECTS`;
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this._type}-projects-list`) as HTMLUListElement;
        listElement.innerHTML = '';
        this._assignedProjects.forEach(project => new ProjectItem(project, listElement.id));
    }
}
import {Project, ProjectStatus} from "../Models/ProjectModel";

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected _listeners: Listener<T>[] = [];

    public addListener(listenerFunc: Listener<T>) {
        this._listeners.push(listenerFunc);
    }
}

export class ProjectState extends State<Project> {
    private _projects: Project[] = [];
    private static _instance: ProjectState;

    private constructor() {
        super();
    }

    public static getInstance(): ProjectState {

        if (this._instance) {
            return this._instance;
        }

        this._instance = new ProjectState();
        return this._instance;
    }

    public addProject(project: Project) {
        this._projects.push(project);
        this.updateListeners();
    }

    public moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this._projects.find(x => x.id === projectId);

        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {

        for (const listenerFunc of this._listeners) {
            listenerFunc(this._projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();

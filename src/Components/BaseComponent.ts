export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    private readonly _hostElement: T;
    protected get hostElement(): T {
        return this._hostElement;
    }

    private readonly _template: HTMLTemplateElement;
    protected get template(): HTMLTemplateElement {
        return this._template;
    }

    private readonly _element: U;
    protected get element(): U {
        return this._element;
    }

    protected constructor(
        hostElementId: string,
        templateId: string,
        insertPosition: InsertPosition,
        newElementId?: string
    ) {
        this._hostElement = document.getElementById(hostElementId) as T;

        this._template = document.getElementById(templateId) as HTMLTemplateElement;
        const importedNode = document.importNode(this.template.content, true);
        this._element = importedNode.firstElementChild as U;

        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertPosition);
    }

    private attach(insertPosition: InsertPosition) {
        this.hostElement.insertAdjacentElement(insertPosition, this.element);
    }

    protected abstract configure(): void;

    protected abstract renderContent(): void;
}

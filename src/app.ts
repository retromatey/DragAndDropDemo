import {ProjectInput} from "./Components/ProjectInput";
import {ProjectStatus} from "./Models/ProjectModel";
import {ProjectList} from "./Components/ProjectList";

window.onload = function () {
    new ProjectInput();
    new ProjectList(ProjectStatus.Active);
    new ProjectList(ProjectStatus.Finished);
}
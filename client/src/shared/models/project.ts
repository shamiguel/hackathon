export class IProject {
    constructor(
        public id:number,
        public projectTitle:string, 
        public projectDescription:string,
        public projectTech:string[],
        public projectUrl:string
        ){ 
    }
}

import { ResourceRequest } from "./resourcesModel";

export class IntrospectResponse {
    // token status
    active: String;

    // resources
    resources: [ResourceRequest];

    
    constructor(Obj: any) {
        this.active = Obj.active;
        this.resources = Obj.resources;
    }
  }
import * as mongoose from 'mongoose';

export const ResourceSchema = new mongoose.Schema({
  actions: [String],
  locations: [String],
  data: [String]
});

export const ResourcesSchema = new mongoose.Schema({
  handle: String,
  resources: [ResourceSchema]
});
export const ResourceModel = mongoose.model('Resource', ResourceSchema);

export const ResourcesModel = mongoose.model('Resources', ResourcesSchema);

export class ResourceRequest {
  actions: String[];
  locations: String[];
  data: String[];

  constructor(Obj: any) {
    this.actions = Obj.actions;
    this.locations = Obj.locations;
    this.data = Obj.data;
  }

  public toSchema() {
    var resource = new ResourceModel({
      actions: this.actions,
      locations: this.locations,
      data: this.data
    });

    return resource;
  }
}

import { AdminModule } from "./admin.module";

describe('HierarchyModule', () => {
  let hierarchyModule: AdminModule;

  beforeEach(() => {
    hierarchyModule = new AdminModule();
  });

  it('should create an instance', () => {
    expect(hierarchyModule).toBeTruthy();
  });
});

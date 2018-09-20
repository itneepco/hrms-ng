import { HierarchyModule } from './hierarchy.module';

describe('HierarchyModule', () => {
  let hierarchyModule: HierarchyModule;

  beforeEach(() => {
    hierarchyModule = new HierarchyModule();
  });

  it('should create an instance', () => {
    expect(hierarchyModule).toBeTruthy();
  });
});

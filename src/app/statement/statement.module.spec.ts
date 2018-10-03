import { StatementModule } from './statement.module';

describe('StatementModule', () => {
  let statementModule: StatementModule;

  beforeEach(() => {
    statementModule = new StatementModule();
  });

  it('should create an instance', () => {
    expect(statementModule).toBeTruthy();
  });
});

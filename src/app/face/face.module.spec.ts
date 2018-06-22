import { FaceModule } from './face.module';

describe('FaceModule', () => {
  let faceModule: FaceModule;

  beforeEach(() => {
    faceModule = new FaceModule();
  });

  it('should create an instance', () => {
    expect(faceModule).toBeTruthy();
  });
});

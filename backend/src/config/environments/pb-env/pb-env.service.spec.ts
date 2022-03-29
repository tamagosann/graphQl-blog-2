import { Test, TestingModule } from '@nestjs/testing';
import { PbEnv } from './pb-env.service';

describe('PbEnvService', () => {
  let service: PbEnv;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PbEnv],
    }).compile();

    service = module.get<PbEnv>(PbEnv);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

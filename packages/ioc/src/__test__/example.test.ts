import { describe, beforeEach, test  } from 'vitest'
import { InstantiationService } from '../instantiationService';
import { ServiceRegistry } from '../service-registry';
import { ServiceCollection } from '../serviceCollection';
import { IApple, Apple } from './service/apple';
import { IPerson, Person } from './service/person';

describe('DI', () => {
  beforeEach(() => {});

  test('example', () => {
    const registory = new ServiceRegistry();

    registory.regiser(IApple, Apple, true);
    registory.regiser(IPerson, Person, true);

    const serviceCollection = new ServiceCollection();

    const contributedServices = registory.getDescriptors();
    for (const [id, descriptor] of contributedServices) {
      serviceCollection.set(id, descriptor);
    }

    const instantiationService = new InstantiationService(serviceCollection, true);

    const person = instantiationService.invokeFunction((accessor) => accessor.get(IPerson));

    person.eatApple();
  });
});

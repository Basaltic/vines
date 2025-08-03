import type { Container } from 'inversify';
import type { Module } from './module';

/**
 * Scan the module & register the providers
 */
export class ModulesScanner {
    constructor(private container: Container) {}

   async scan(module: Module) {
        if (module) {
            const meta = module.metadata


            if (meta.imports && meta.imports.length > 0) {
                for (let i = 0; i < meta.imports.length; i++) {
                    const moduleImport = meta.imports[i];
                     this.scan(moduleImport);
                }
            }

             this.container.loadSync(module)
        }
    }
}

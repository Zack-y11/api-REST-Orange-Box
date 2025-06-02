import { Router } from 'express';
import { ProviderController } from '../controllers/Provider.controller';

const router = Router();
const providerController = new ProviderController();

router.post('/', providerController.createProvider);
router.get('/', providerController.getProviders);
router.get('/:id', providerController.getProviderById);
router.patch('/:id', providerController.updateProvider);
router.put('/:id', providerController.replaceProvider);
router.delete('/:id', providerController.deleteProvider);

export default router;


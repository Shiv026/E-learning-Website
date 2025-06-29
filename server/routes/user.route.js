import express from 'express';

const userRouter = express.Router();

router.post('/', (req, res) => res.send({title: 'Create user'}));
router.get('/:id', (req, res) => res.send({title: 'Get user'}));  
router.put('/:id',(req, res) => res.send({title: 'Update user'}));    
router.delete('/:id', (req, res) => res.send({title: 'Delete user'}));                
router.get('/', (req, res) => res.send({ title: 'Get all users' })); // for admin                   

export default userRouter;

// MIDDLEWARE
const express = require('express');

const { 
    validateProjectId, 
    validateProject 
    } = require('./projects-middleware');

const projectsRouter = express.Router();
const projectsModel = require('./projects-model');

//GET
projectsRouter.get('/', async (req, res, next) => {
	try {
		const result = await projectsModel.get();
		res.status(200).json(result ?? []);
	} catch (err) {
		next(err)
	}
});

projectsRouter.get('/:id', validateProjectId, (req, res, next) => {
    res.status(200).json(req.project)
})

//POST
projectsRouter.post('/', validateProject, async (req, res, next) => {
    try {
		const result = await projectsModel.insert(req.project);
    if(result)
		res.status(201).json(result);
    else
        res.status(400).send('Failed!');
	} catch (err) {
		next(err)
	}
});

//PUT
projectsRouter.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try {
		const result = await projectsModel.insert(req.project);
    if(result)
		res.status(201).json(result);
    else
        res.status(400).send('Failed!');
	} catch (err) {
		next(err)
	}
})


projectsRouter.delete('/:id', validateProjectId, async (req, res, next) => {
    projectsModel.remove(req.params.id)
        .then(result => {
            if(result)
                res.status(200).send();
            else
                res.status(400).message('Cant be deleted!')
        }, err => next(err))
})

projectsRouter.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await projectsModel.getProjectActions(req.params.id)
        res.status(200).json(result)
    } catch(err){
        next(err)
    }
})


projectsRouter.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom:'something went wrong in the projectsRouter!',
        message: err.message,
        stack: err.stack
    })
})


module.exports = projectsRouter;
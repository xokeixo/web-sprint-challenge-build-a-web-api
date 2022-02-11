const express = require('express');
const { validateId, validateAction } = require('./actions-middlware');

const actionsRouter = express.Router();
const actionsModel = require('./actions-model');

actionsRouter.get('/', (req, res, next) => {
    actionsModel.get()
        .then(actions => {
            res.status(200).json(actions ?? []);
    }).catch(next)
})

actionsRouter.get('/:id', validateId, (req, res, next) => {
    res.status(200).json(req.action);
})

actionsRouter.post('/', validateAction, (req, res, next) => {
    actionsModel.insert(req.action)
        .then(result => {
            if(result)
                res.status(201).json(result);
            else    
                res.status(400).send();
        }) .catch(next)
})

actionsRouter.put('/:id', validateId, validateAction, (req, res, next) => {
    actionsModel.update(req.actionId, req.action)
        .then(result => {
            res.status(200).json(result);
        }) .catch(next);
})

actionsRouter.delete('/:id', validateId, (req, res, next) => {
    actionsModel.remove(req.actionId)
        .then(result => {
            if(result)
                res.status(200).send();
            else
                res.status(400).send('Cannot delete!');
        }) .catch(next);
})


actionsRouter.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: "something went wrong in the actionsRouter!",
        message: err.message,
        stack: err.stack
    })
})

module.exports = actionsRouter
require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/server/server');

const should = chai.should();

const { expect } = chai;

chai.use(chaiHttp);

describe('DEMO component', () => {
    it('get demos', (done) => {
        chai.request(server)
            .get('/v1/demo')
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');

                done();
            });
    });
});

describe('Task component', () => {
    const jwt = process.env.JWT_TOKEN_FOR_TESTING;
    let id;

    it('get all tasks for user', (done) => {
        chai.request(server)
            .get('/v1/task/all')
            .set({ Authorization: jwt })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('data');

                done();
            });
    });

    it('get task by page', (done) => {
        chai.request(server)
            .get('/v1/task?page=0')
            .set({ Authorization: jwt })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('data');

                done();
            });
    });

    it('create task', (done) => {
        const rndInt = Math.floor(Math.random() * 20) + 1;
        const task = {
            title: `title ${rndInt}`,
            description: `description ${rndInt}`,
            estimatedTime: rndInt,
            expiredAt: '2023-01-29T17:37:34.364+00:00',
        };

        chai.request(server)
            .post('/v1/task')
            .set({ Authorization: jwt })
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('data');

                id = res.body.data._id;

                done();
            });
    });

    it('get task by id', (done) => {

        chai.request(server)
            .get(`/v1/task/${id}`)
            .set({ Authorization: jwt })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('data');

                done();
            });
    });

    it('update task by id', (done) => {
        const rndInt = Math.floor(Math.random() * 20) + 1;
        const task = {
            id,
            title: `title ${rndInt}`,
            description: `description ${rndInt}`,
            estimatedTime: rndInt,
            expiredAt: '2023-01-29T17:37:34.364+00:00',
        };

        chai.request(server)
            .put('/v1/task')
            .set({ Authorization: jwt })
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('data');

                done();
            });
    });

    it('patch task by id', (done) => {
        const rndInt = Math.floor(Math.random() * 20) + 1;

        chai.request(server)
            .patch(`/v1/task/${id}`)
            .set({ Authorization: jwt })
            .send({ estimatedTime: rndInt })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('data');

                done();
            });
    });

    it('delete task by id', (done) => {
        chai.request(server)
            .delete('/v1/task/')
            .set({ Authorization: jwt })
            .send({ id })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('data');

                done();
            });
    });
});

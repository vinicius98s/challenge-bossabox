const expect  = require('chai').expect;
const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const baseUrl = 'http://localhost:3000';

describe('VUTTR API', () => {
    it('Deve listar todas as tools', done => {
        request(`${baseUrl}/tools`, (err, res, body) => {
            let _body = JSON.parse(body);
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(200);
            expect(_body).to.be.an('array');
            done();
        });
    });

    it('Deve filtrar as tools', done => {
        let filtro = 'node';
        request(`${baseUrl}/tools?tag=${filtro}`, (err, res, body) => {
            let _body = JSON.parse(body);
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(200);
            expect(_body).to.be.an('array');
            for(let i = 0; i < _body.length; i++) {
                expect(_body[i].tags).to.include(filtro);
            }
            done();
        });
    });

    it('Deve inserir uma tool', done => {
        chai.request(baseUrl)
        .post('/tools')
        .send({
            "title": "Teste",
            "link": "https://github.com/teste",
            "description": "Teste.",
            "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        })
        .then(res => {
            expect(res.statusCode).to.equal(200);
        })
        .catch(err => {
            throw err;
        })
        done();
    });

    it('Deve excluir uma tool', done => {
        let id = '5bec08080ed7b42b4ccd1e53';
        chai.request(baseUrl)
        .delete(`/tools/${id}`)
        .then(res => {
            expect(res.statusCode).to.equal(200);
        })
        .catch(err => {
            throw err;
        });
        done();
    });
});

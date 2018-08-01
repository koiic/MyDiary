import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();
const username = Math.random().toString(36).substring(2, 15);
const email = Math.random().toString(36).substring(2, 15);

describe('Authentication', () => {
  describe('registration', () => {
    it('should not signup if email is empty', (done) => {
      const signup = {
        email: '',
        firstname: 'fish',
        lastname: 'octopus',
        username: 'bob',
        password: 'secret',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signup)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.a.property('message').to.equal('Please fill all fields');
          done();
        });
    });

    it('should not signup if password is empty', (done) => {
      const signup = {
        email: 'calory@gmail.com',
        firstname: 'fish',
        lastname: 'octopus',
        username,
        password: '',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signup)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.a.property('message').to.equal('Please fill all fields');
          done();
        });
    });

    it('Can not signup if email is not present', (done) => {
      const signup = {
        firstname: 'fish',
        lastname: 'octopus',
        username: 'bob',
        password: 'secret',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signup)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.a.property('message').to.equal('Please define all fields');
          done();
        });
    });

    it('should not signup if password is not present', (done) => {
      const signup = {
        email: 'calory@gmail.com',
        firstname: 'fish',
        lastname: 'octopus',
        username: 'bob',

      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signup)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.a.property('message').to.equal('Please define all fields');
          done();
        });
    });

    it('should not signup if email is invalid', (done) => {
      const signup = {
        email: 'fishbababa',
        firstname: 'fish',
        lastname: 'octopus',
        username: 'bob',
        password: 'secret',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signup)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.a.property('message').to.equal('Invalid email');
          done();
        });
    });

    it('should not signup if email exist', (done) => {
      const signup = {
        email: 'calory@gmail.com',
        firstname: 'fish',
        lastname: 'octopus',
        username,
        password: 'secret',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signup)
        .end((err, response) => {
          response.should.have.status(409);
          response.body.should.have.a.property('message').to.equal('User Already exists');
          done();
        });
    });

    it('should signup if fields are valid', (done) => {
      const signup = {
        email: `${email}@gmail.com`,
        firstname: 'fish',
        lastname: 'octopus',
        username,
        password: 'secret',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signup)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          done();
        });
    });

    it('should not signup if username exist', (done) => {
      const signup = {
        email: `${email}@gmail.com`,
        firstname: 'fish',
        lastname: 'octopus',
        username: 'bsn4cbj9av',
        password: 'secret',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signup)
        .end((err, response) => {
          response.should.have.status(409);
          response.body.should.be.a('object');
          response.body.should.have.a.property('message').to.equal('User Already exists');
          done();
        });
    });
  });

  describe('login', () => {
    it('should not login if username is empty', (done) => {
      const login = {
        username: '',
        password: 'secret',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(login)
        .end((err, response) => {

          response.should.have.status(400);
          response.body.should.have.a.property('message').to.equal('Please fill all fields');
          done();
        });
    });

    it('should not login if password is incorrect', (done) => {
      const login = {
        username: 'amw6hwexjm',
        password: 'secret555',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(login)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.a.property('message').to.equal('Invalid username or password');
          done();
        });
    });

    it('should login a registered user', (done) => {
      const login = {
        username: 'hjnb3kbh0ji',
        password: 'secret',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(login)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          done();
        });
    });

    it('should not login if password is empty', (done) => {
      const login = {
        username: 'amw6hwexjm',
        password: '',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(login)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.a.property('message').to.equal('Please fill all fields');
          done();
        });
    });
  });
});

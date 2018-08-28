

import chai from 'chai';
import chaiHttp from 'chai-http';
// import chaiThings from 'chai-things';
import expect from 'expect';
import app from '../index';
import 'regenerator-runtime/runtime';


chai.use(chaiHttp);
// chai.use(chaiThings);
// const { expect } = chai.expect;
// const expect = chai.expect();
const title = Math.random().toString(36).substring(2, 15);
let token;

const signup = {
  email: 'bro@gmail.com',
  firstname: 'fish',
  lastname: 'octopus',
  username: 'sam',
  password: 'secret',
}

// before(function(done) {
//   chai.request(app)
//     .post('/api/v1/auth/login')
//     .send(signup)
//     .end((err, response) => {
//       response.should.have.status(200);
//       response.body.should.be.a('object');
//       this.token = response.body.token;
//       console.log(this.token);
//       done();
//     });
// });

describe('DiaryEntries', () => {

  let responseBody;
  let user;
  before('add user to db and log him in before test', async () => {
    await chai.request(app).post('/api/v1/auth/signup').send(signup);
    const login = await chai.request(app).post('/api/v1/auth/login')
      .send({ username: signup.username, password: signup.password });
      console.log(login);
    user = login.body;
    console.log(user);
  });
    // after('delete user after test', async () => {
    //   after('remove user after test', async () => {
    //     const response = await User.remove(user.username);
    //     expect(response.rowCount).to.equal(1);
    //     expect(response.rows[0]).to.include({ username: user.username });
    //   });
    // });
 
  describe('addEntry', () => {
    it('should add new entry if request is correct', (done) => {
      const newEntry = {
        title ,
        note: 'my new entry',
        imageUrl: 'dfghjk.png',
      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', `Bearer ${user.token}`)
        .send(newEntry)
        .end((err, response) => {
          expect(response.status).toBe(201);
          expect(response.body.message).toEqual('A new Entry added sucessfully');
          done();
        });
    });
    it('should not add new entry if title is empty', (done) => {
      const newEntry = {
        title: '',
        note: 'my new entry',
        imageUrl: 'dfghjk',

      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', `Bearer ${user.token}`)
        .send(newEntry)
        .end((err, response) => {
          expect(response.status).toBe(400);
          expect(response.body.message).toEqual(['title cannot be empty']);
          done();
        });
    });
    it('should not add new entry if title has special character', (done) => {
      const newEntry = {
        title: '*&*()',
        note: 'my new entry',
        imageUrl: 'dfghjk',

      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', `Bearer ${user.token}`)
        .send(newEntry)
        .end((err, response) => {
          expect(response.status).toBe(400);
          expect(response.body.message).toEqual(['Invalid title']);
          done();
        });
    });
    it('should not add new entry if title exist in database', (done) => {
      const newEntry = {
        title: 'ymjwfa15i7',
        note: 'my new entry',
        imageUrl: 'calory.png',
        
      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', `Bearer ${user.token}`)
        .send(newEntry)
        .end((err, response) => {
          expect(response.status).toBe(409);
          expect(response.body.message).toEqual('Title already exist, change title');
          done();
        });
    });
    it('should not add new entry if note is empty', (done) => {
      const newEntry = {
        title: 'FirstTitle',
        note: ' ',
        imageUrl: 'dfghjk',
        
      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', `Bearer ${user.token}`)
        .send(newEntry)
        .end((err, response) => {
          expect(response.status).toBe(400);
          expect(response.body.message).toEqual(['Invalid note']);
          done();
        });
    });
   
  });
  describe('fetchEntry', () => {
    describe('getAll', () => {
      it('should fetch all entry', (done) => {
        chai.request(app)
          .get('/api/v1/entries/')
          .set('Authorization', `Bearer ${user.token}`)
          .end((err, response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'fetch entries successfully');
            done();
          });
      });
    
    });
  });
  describe('updateEntry', () => {
    describe('modifyEntry', () => {
      it('should not update if id is not a number', (done) => {
        const id = 'fish';
        const updateRequest = {

          title: 'firstupdate',
          note: ' lorem ipsum calculs',
          imageUrl: 'calory.jpg',
        };
        chai.request(app)
          .put(`/api/v1/entries/${id}`)
          .send(updateRequest)
          .set('Authorization', `Bearer ${user.token}`)
          .end((err, response) => {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Id must be a number');
            expect(response.body).toHaveProperty('status', 'failed');
            done();
          });
      });
      it('should not update if id does not exist', (done) => {
        const id = 99;
        const updateRequest = {

          title: 'firstupdate',
          note: ' lorem ipsum calculs',
          imageUrl: 'calory.jpg',
        };
        chai.request(app)
          .put(`/api/v1/entries/${id}`)
          .send(updateRequest)
          .set('Authorization', `Bearer ${user.token}`)
          .end((err, response) => {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('status', 'failed');
            expect(response.body).toHaveProperty('message', `Cannot update entries for id : ${id}`);
            done();
          });
      });
      it('should update if request are correct', (done) => {
        const id = 3;
        const updateRequest = {

          title: 'fish',
          note: ' lorem ipsum calculs',
          imageUrl: 'calory.jpg',
        };
        chai.request(app)
          .put(`/api/v1/entries/${id}`)
          .send(updateRequest)
          .set('Authorization', `Bearer ${user.token}`)
          .end((err, response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body).toHaveProperty('message', `An entry with ${id} has been updated successfully`);
            done();
          });
      });
    });
  });
  describe('fetchSingleEntry', () => {
    describe('fetchOne', () => {
      it('should not fetch entry if id is not a number', (done) => {
        const id = 'ola';
        chai.request(app)
          .get(`/api/v1/entries/${id}`)
          .set('Authorization', `Bearer ${user.token}`)
          .end((err, response) => {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Id must be a number');
            done();
          });
      });
      it('should fetch entry if id exist', (done) => {
        const id = 4;
        chai.request(app)
          .get(`/api/v1/entries/${id}`)
          .set('Authorization', `Bearer ${user.token}`)
          .end((err, response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', `Entry for id : ${id} fetched successfully`);
            done();
          });
      });
      it('should not fetch entry if id does not  exist', (done) => {
        const id = 1000;
        chai.request(app)
          .get(`/api/v1/entries/${id}`)
          .set('Authorization', `Bearer ${user.token}`)
          .end((err, response) => {
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', `Entry not found for id : ${id}`);
            done();
          });
      });
    });
  });
  // describe('deleteEntry', () => {
  //   describe('removeEntry', () => {
  //     it('should not delete entry if id is not valid', (done) => {
  //       const id = 'fish';
  //       chai.request(app)
  //         .delete(`/api/v1/entries/${id}`)
  //         .set('Authorization', `Bearer ${user.token}`)
  //         .end((err, response) => {
  //           expect(response.status).toBe(400);
  //           expect(response.body).toHaveProperty('message', 'Id must be a number');
  //           done();
  //         });
  //     });
  //     it('should  delete entry if id is valid', (done) => {
  //       const id = 8;
  //       chai.request(app)
  //         .delete(`/api/v1/entries/${id}`)
  //         .set('Authorization', `Bearer ${user.token}`)
  //         .end((err, response) => {
  //           expect(response.status).toBe(200);
  //           expect(response.body).toHaveProperty('message', `An entry with ${id} has been deleted successfully`);
  //           done();
  //         });
  //     });
  //   });
  // });
  // describe('fetchTodayEntry', () => {
  //   describe('fetch current day entry', () => {
  //     it('should return entry for current day', (done) => {
  //       chai.request(app)
  //         .get('/api/v1/entries/today')
  //         .end((err, response) => {
  //           expect(response.status).toBe(200);
  //           expect(response.body).toHaveProperty('message', 'Todays entry fetched successfully');
  //           done();
  //         });
  //     });
  //   });
  // });
  // describe('fecthFavouriteEntry', () => {
  //   describe('fetch all favourite entry', () => {
  //     it('should return favourite entry', (done) => {
  //       chai.request(app)
  //         .get('/api/v1/entries/favourite')
  //         .end((err, response) => {
  //           expect(response.status).toBe(200);
  //           expect(response.body).toHaveProperty('message', 'Favourite entry fetched successfully');
  //           done();
  //         });
  //     });

  //     // it('should return empty if no favourite entry', (done) => {
  //     //   chai.request(app)
  //     //     .get('/api/v1/entries/favourite')
  //     //     .end((err, response) => {
  //     //       expect(response.status).toBe(404);
  //     //       expect(response.body).toHaveProperty('message', 'No Favourites Entries');
  //     //       done();
  //     //     });
  //     // });
  //   });
  // });
  // describe('fetchEntryCount', () => {
  //   describe('fetch all favourite entry', () => {
  //     it('should return favourite entry count', (done) => {
  //       chai.request(app)
  //         .get('/api/v1/entries/favourite/count')
  //         .end((err, response) => {
  //           expect(response.status).toBe(200);
  //           expect(response.body).toHaveProperty('message', 'Favourite entry count fetched successfully');
  //           done();
  //         });
  //     });

  //   //   it('should return 0 if no favourite entry', (done) => {
  //   //     chai.request(app)
  //   //       .get('/api/v1/entries/favourite')
  //   //       .end((err, response) => {
  //   //         expect(response.status).toBe(404);
  //   //         expect(response.body).toHaveProperty('message', 'No Favourites Entries');
  //   //         done();
  //   //       });
  //   //   });
  //   // });
  //   });
  // });
  describe('fetchTodayEntryCount', () => {
    describe('fetch all Today entry count', () => {
      it('should return today entry count', (done) => {
        chai.request(app)
          .get('/api/v1/entries/today/count')
          .set('Authorization', `Bearer ${user.token}`)
          .end((err, response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'fetch today entry count successfully');
            done();
          });
      });

      // it('should return 0 if no favourite entry', (done) => {
      //   chai.request(app)
      //     .get('/api/v1/entries/today/count')
      //     .end((err, response) => {
      //       expect(response.status).toBe(404);
      //       expect(response.body).toHaveProperty('message', 'No entry found for today');
      //       done();
      //     });
      // });
    });
  });
  describe('fetchEntryCount', () => {
    describe('fetch all  entry volume', () => {
      it('should return  entry count', (done) => {
        chai.request(app)
          .get('/api/v1/entries/count')
          .set('Authorization', `Bearer ${user.token}`)
          .end((err, response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Entry Count for user fetched successfully');
            done();
          });
      });
    });
  });
});

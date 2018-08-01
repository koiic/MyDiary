

import chai from 'chai';
import chaiHttp from 'chai-http';
// import chaiThings from 'chai-things';
import expect from 'expect';
import app from '../index';

chai.use(chaiHttp);
// chai.use(chaiThings);
// const { expect } = chai.expect;
// const expect = chai.expect();
const title = Math.random().toString(36).substring(2, 15);
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTMzMDc3NTQyLCJleHAiOjE1MzMxNjM5NDJ9.M_Cm9Fq_eGNTya2rcqnSR70lyGU2psS_lbaKv-PQxlE';

describe('DiaryEntries', () => {
  describe('addEntry', () => {
    it('should not add new entry if title is empty', (done) => {
      const newEntry = {
        title: '',
        note: 'my new entry',
        imageUrl: 'dfghjk',
        isFavourite: true,
      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', token)
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
        isFavourite: true,
      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', token)
        .send(newEntry)
        .end((err, response) => {
          expect(response.status).toBe(400);
          expect(response.body.message).toEqual(['Invalid title']);
          done();
        });
    });
    it('should not add new entry if imageUrl is not empty', (done) => {
      const newEntry = {
        title: 'TheTitle',
        note: 'my new entry',
        // imageUrl: 'dfghjk',
        isFavourite: true,
      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', token)
        .send(newEntry)
        .end((err, response) => {
          expect(response.status).toBe(400);
          expect(response.body.message).toEqual(['Invalid image url']);
          done();
        });
    });
    it('should not add new entry if note is empty', (done) => {
      const newEntry = {
        title: 'FirstTitle',
        note: ' ',
        imageUrl: 'dfghjk',
        isFavourite: true,
      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', token)
        .send(newEntry)
        .end((err, response) => {
          expect(response.status).toBe(400);
          expect(response.body.message).toEqual(['Invalid note']);
          done();
        });
    });
    it('should add new entry if request is correct', (done) => {
      const newEntry = {
        title,
        note: 'my new entry',
        imageUrl: 'dfghjk.png',
        isFavourite: true,
      };
      chai.request(app)
        .post('/api/v1/entries/')
        .set('Authorization', token)
        .send(newEntry)
        .end((err, response) => {
          expect(response.status).toBe(201);
          expect(response.body.message).toEqual('A new Entry added sucessfully');
          done();
        });
    });
  });
  // describe('updateEntry', () => {
  //   describe('modifyEntry', () => {
  //     it('should not update if id is not a number', (done) => {
  //       const id = 'fish';
  //       const updateRequest = {

  //         title: 'first update',
  //         note: ' lorem ipsum calculs',
  //         image: 'calory.jpg',
  //         isFavourite: false,
  //       };
  //       chai.request(app)
  //         .put(`/api/v1/entries/${id}`)
  //         .send(updateRequest)
  //         .end((err, response) => {
  //           expect(response.status).toBe(400);
  //           expect(response.body).toHaveProperty('message', 'id must be a number');
  //           done();
  //         });
  //     });
  //     it('should not update if id does not exist', (done) => {
  //       const id = 99;
  //       const updateRequest = {

  //         title: 'first update',
  //         note: ' lorem ipsum calculs',
  //         image: 'calory.jpg',
  //         isFavourite: false,
  //       };
  //       chai.request(app)
  //         .put(`/api/v1/entries/${id}`)
  //         .send(updateRequest)
  //         .end((err, response) => {
  //           expect(response.status).toBe(400);
  //           expect(response.body).toHaveProperty('message', 'Id does not exist');
  //           done();
  //         });
  //     });
  //     it('should update if request are correct', (done) => {
  //       const id = 6;
  //       const updateRequest = {

  //         title,
  //         note: ' lorem ipsum calculs',
  //         image: 'calory.jpg',
  //         isFavourite: true,
  //       };
  //       chai.request(app)
  //         .put(`/api/v1/entries/${id}`)
  //         .send(updateRequest)
  //         .end((err, response) => {
  //           // expect(response.status).toBe(200);
  //           expect(response.body).toHaveProperty('message', `An entry with ${id} has been updated successfully`);
  //           done();
  //         });
  //     });
  //   });
  // });
  // describe('fetchEntry', () => {
  //   describe('getAll', () => {
  //     it('should fetch all entry', (done) => {
  //       chai.request(app)
  //         .get('/api/v1/entries/')
  //         .end((err, response) => {
  //           expect(response.status).toBe(200);
  //           expect(response.body).toHaveProperty('message', 'fetch all entries succesfully');
  //           done();
  //         });
  //     });
  //   });
  // });
  // describe('fetchSingleEntry', () => {
  //   describe('fetchOne', () => {
  //     it('should not fetch entry if id is not a number', (done) => {
  //       const id = 'ola';
  //       chai.request(app)
  //         .get(`/api/v1/entries/${id}`)
  //         .end((err, response) => {
  //           expect(response.status).toBe(400);
  //           expect(response.body).toHaveProperty('message', 'id must be a number');
  //           done();
  //         });
  //     });
  //     it('should fetch entry if id exist', (done) => {
  //       const id = 1;
  //       chai.request(app)
  //         .get(`/api/v1/entries/${id}`)
  //         .end((err, response) => {
  //           expect(response.status).toBe(200);
  //           expect(response.body).toHaveProperty('message', `An entry with ${id} has been fetched successfully`);
  //           done();
  //         });
  //     });
  //   });
  // });
  // describe('deleteEntry', () => {
  //   describe('removeEntry', () => {
  //     it('should not delete entry if id is not valid', (done) => {
  //       const id = 'fish';
  //       chai.request(app)
  //         .delete(`/api/v1/entries/${id}`)
  //         .end((err, response) => {
  //           expect(response.status).toBe(400);
  //           expect(response.body).toHaveProperty('message', 'id must be a number');
  //           done();
  //         });
  //     });
  //     it('should  delete entry if id is valid', (done) => {
  //       const id = 2;
  //       chai.request(app)
  //         .delete(`/api/v1/entries/${id}`)
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
  // describe('fetchTodayEntryCount', () => {
  //   describe('fetch all Today entry count', () => {
  //     it('should return today entry count', (done) => {
  //       chai.request(app)
  //         .get('/api/v1/entries/today/count')
  //         .end((err, response) => {
  //           expect(response.status).toBe(200);
  //           expect(response.body).toHaveProperty('message', 'Todays Entry count fetched successfully');
  //           done();
  //         });
  //     });

  //     // it('should return 0 if no favourite entry', (done) => {
  //     //   chai.request(app)
  //     //     .get('/api/v1/entries/today/count')
  //     //     .end((err, response) => {
  //     //       expect(response.status).toBe(404);
  //     //       expect(response.body).toHaveProperty('message', 'No entry found for today');
  //     //       done();
  //     //     });
  //     // });
  //   });
  // });
  // describe('fetchEntryCount', () => {
  //   describe('fetch all  entry volume', () => {
  //     it('should return  entry count', (done) => {
  //       chai.request(app)
  //         .get('/api/v1/entries/count')
  //         .end((err, response) => {
  //           expect(response.status).toBe(200);
  //           expect(response.body).toHaveProperty('message', 'Entry volume successfully fetched');
  //           done();
  //         });
  //     });
  //   });
  // });
});

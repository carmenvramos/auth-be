require('dotenv').config();
require('../../lib/utils/connect')();


const User = require('../../lib/models/User');
const { Types } = require('mongoose');
const mongoose = require('mongoose');

describe('User model', () => {
  it('validates a good model', () =>  {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Types.ObjectId) });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    // console.log('Errors', errors);
    expect(errors.email.message).toEqual('Email required');
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'carmen@email.com', password: 'password' });
    expect(user._tempPassword).toEqual('password');
  });

  it('password hash is set after user.save()', () => {
    // const user = new User({ email: 'carmen@email.com', password: 'password' });
    // user.save();

    return User.create({ 
      email: 'carmen@email.com', 
      password: 'password' 
    })
      .then(user => {
        user.save()
          .then(user => {
            expect(user.passwordHash).toEqual(expect.any(String));
            expect(user.password).toBeUndefined();
          });
        
      });      
  });  

});




